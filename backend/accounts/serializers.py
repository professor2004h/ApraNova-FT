from rest_framework import serializers
from django.db import models
from .models import CustomUser
from dj_rest_auth.registration.serializers import SocialLoginSerializer
from dj_rest_auth.registration.serializers import RegisterSerializer
import logging

logger = logging.getLogger(__name__)

class TrainerSerializer(serializers.ModelSerializer):
    """Serializer for trainer info"""
    class Meta:
        model = CustomUser
        fields = ["id", "email", "name"]
        read_only_fields = ["id", "email", "name"]

class UserSerializer(serializers.ModelSerializer):
    assigned_trainer = TrainerSerializer(read_only=True)
    
    class Meta:
        model = CustomUser
        fields = ["id", "email", "username", "name", "role", "track", "profile_image", "created_at", "assigned_trainer"]
        read_only_fields = ["id", "created_at"]


class CustomSocialLoginSerializer(SocialLoginSerializer):
    """Custom serializer to include user role in social login response"""
    
    def get_response_data(self, user):
        data = super().get_response_data(user)
        data['role'] = user.role
        data['redirect_url'] = f"/{user.role}/dashboard"
        return data
    
class CustomRegisterSerializer(RegisterSerializer):
    name = serializers.CharField(required=True)
    track = serializers.CharField(required=False, allow_blank=True)
    role = serializers.CharField(required=True)

    def validate_role(self, value):
        """Prevent superadmin role from being assigned during registration"""
        if value == "superadmin":
            raise serializers.ValidationError("SuperAdmin role cannot be assigned through registration")
        return value

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['name'] = self.validated_data.get('name', '')
        data['track'] = self.validated_data.get('track', '')
        data['role'] = self.validated_data.get('role', '')
        return data
    
    def save(self, request):
        print("********* RegisterSerializer Save called: ", self.validated_data.get('role'))
        user = super().save(request)
        logger.debug(f"Saving user with role: {self.validated_data.get('role')}")
        user.name = self.validated_data.get('name', '')
        user.track = self.validated_data.get('track', '')
        user.role = self.validated_data.get('role', '')
        
        # Auto-assign trainer if user is a student
        if user.role == 'student':
            user.assigned_trainer = self._assign_trainer_to_student()
            
        user.save()
        return user
    
    def _assign_trainer_to_student(self):
        """
        Auto-assign a trainer to student during signup.
        Finds trainer with least students (max 20 per trainer).
        Returns None if no trainers available or all are full.
        """
        from django.db.models import Count
        
        # Find trainers with < 20 students, ordered by student count
        available_trainers = CustomUser.objects.filter(
            role='trainer'
        ).annotate(
            num_students=Count('students', filter=models.Q(students__role='student'))
        ).filter(
            num_students__lt=20
        ).order_by('num_students')
        
        if available_trainers.exists():
            trainer = available_trainers.first()
            logger.info(f"Assigned trainer {trainer.email} (has {trainer.num_students} students)")
            return trainer
        else:
            logger.warning("No available trainers for student assignment")
            return None