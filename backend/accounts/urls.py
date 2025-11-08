from django.urls import path

from . import views, workspace_views

urlpatterns = [
    path("profile/", views.get_user_profile, name="user-profile"),
    path("profile", views.get_user_profile, name="user-profile-no-slash"),  # Without trailing slash
    path("my-students/", views.get_my_students, name="my-students"),
    path("my-students", views.get_my_students, name="my-students-no-slash"),  # Without trailing slash
    path("callback/", views.oauth_callback, name="oauth-callback"),
    path("update-role/", views.update_user_role, name="update-role"),
    path("login/", views.custom_login, name="custom_login"),
    path("login", views.custom_login, name="custom_login_no_slash"),  # Without trailing slash
    path("refresh/", views.refresh_token, name="token-refresh"),
    path("logout/", views.logout, name="logout"),
    path("logout", views.logout, name="logout_no_slash"),  # Without trailing slash
    path("check-email/", views.check_email_exists, name="check_email_exists"),
    path("check-email", views.check_email_exists, name="check_email_exists_no_slash"),  # Without trailing slash
    path("workspace/create/", workspace_views.create_workspace, name="create_workspace"),
    path("workspace/create", workspace_views.create_workspace, name="create_workspace_no_slash"),  # Without trailing slash
]
