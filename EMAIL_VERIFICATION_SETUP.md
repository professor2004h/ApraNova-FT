# ✅ Email Verification - Configuration Guide

## 🎯 Overview

Email verification has been **ENABLED** for the ApraNova signup process. Users must verify their email address before they can login.

---

## ⚙️ Current Configuration

### **Email Verification Mode**: `MANDATORY`

**File**: `backend/core/settings.py`

```python
ACCOUNT_EMAIL_VERIFICATION = "mandatory"  # Require email verification before users can login
```

### **Email Backend**: SMTP (Gmail)

**File**: `backend/core/settings.py`

```python
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL", default=EMAIL_HOST_USER)
SERVER_EMAIL = DEFAULT_FROM_EMAIL
```

---

## 📧 Email Configuration Options

You have **3 options** for email verification:

### **Option 1: Gmail SMTP (Recommended for Testing)**

**Steps**:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Copy the 16-character password
3. **Update `.env` file**:

```env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-app-password
DEFAULT_FROM_EMAIL=noreply@apranova.com
```

4. **Restart backend**:
```bash
docker-compose restart backend
```

---

### **Option 2: SendGrid (Recommended for Production)**

**Steps**:

1. **Sign up** at https://sendgrid.com (Free tier: 100 emails/day)
2. **Create API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
   - Copy the API key
3. **Update `.env` file**:

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=apikey
EMAIL_HOST_PASSWORD=your-sendgrid-api-key
DEFAULT_FROM_EMAIL=noreply@apranova.com
```

4. **Restart backend**:
```bash
docker-compose restart backend
```

---

### **Option 3: Console Backend (Development Only)**

For **testing without real emails**, use console backend (emails print to logs):

**Update `.env` file**:

```env
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

**Update `settings.py`**:

```python
ACCOUNT_EMAIL_VERIFICATION = "optional"  # or "none"
```

**Restart backend**:
```bash
docker-compose restart backend
```

**View emails in logs**:
```bash
docker logs apranova_backend -f
```

---

## 🔄 How Email Verification Works

### **Signup Flow**:

1. **User fills signup form** at http://localhost:3000/signup
2. **Backend creates user account** (inactive)
3. **Backend sends verification email** to user's email
4. **User clicks verification link** in email
5. **Backend activates account**
6. **User can now login**

### **Email Content**:

Django Allauth sends a verification email with:
- Subject: "Please Confirm Your E-mail Address"
- Body: Contains verification link
- Link format: `http://localhost:3000/accounts/confirm-email/<key>/`

---

## 🧪 Testing Email Verification

### **Test 1: Console Backend (No Real Emails)**

1. **Set console backend** in `.env`:
```env
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

2. **Restart backend**:
```bash
docker-compose restart backend
```

3. **Signup** at http://localhost:3000/signup

4. **Check backend logs** for email:
```bash
docker logs apranova_backend -f
```

5. **Copy verification link** from logs

6. **Open link** in browser to verify email

---

### **Test 2: Real Email (Gmail/SendGrid)**

1. **Configure email** in `.env` (see Option 1 or 2 above)

2. **Restart backend**:
```bash
docker-compose restart backend
```

3. **Signup** with your real email at http://localhost:3000/signup

4. **Check your inbox** for verification email

5. **Click verification link** in email

6. **Login** at http://localhost:3000/login

---

## 🛠️ Troubleshooting

### **Issue 1: Emails Not Sending**

**Symptoms**: User signs up but no email received

**Solutions**:

1. **Check backend logs**:
```bash
docker logs apranova_backend --tail=50
```

2. **Verify email credentials** in `.env`:
```bash
docker exec apranova_backend env | grep EMAIL
```

3. **Test SMTP connection**:
```bash
docker exec -it apranova_backend python manage.py shell
```
```python
from django.core.mail import send_mail
send_mail(
    'Test Subject',
    'Test message.',
    'from@example.com',
    ['to@example.com'],
    fail_silently=False,
)
```

4. **Check spam folder** in email

---

### **Issue 2: Gmail "Less Secure Apps" Error**

**Error**: `SMTPAuthenticationError: Username and Password not accepted`

**Solution**: Use **App Password** instead of regular password
- Enable 2FA on Gmail
- Generate App Password at https://myaccount.google.com/apppasswords
- Use 16-character app password in `.env`

---

### **Issue 3: Verification Link Not Working**

**Symptoms**: Click link but get 404 or error

**Solutions**:

1. **Check FRONTEND_URL** in `.env`:
```env
FRONTEND_URL=http://localhost:3000
```

2. **Verify allauth URLs** are configured in `core/urls.py`:
```python
path("accounts/", include("allauth.urls")),
```

3. **Check frontend routing** for `/accounts/confirm-email/` route

---

### **Issue 4: User Can't Login After Signup**

**Symptoms**: "Email not verified" error

**Solutions**:

1. **Check email verification status** in database:
```bash
docker exec -it apranova_backend python manage.py shell
```
```python
from allauth.account.models import EmailAddress
EmailAddress.objects.all()
```

2. **Manually verify email** (for testing):
```python
from allauth.account.models import EmailAddress
email = EmailAddress.objects.get(email='user@example.com')
email.verified = True
email.primary = True
email.save()
```

3. **Resend verification email**:
```bash
docker exec -it apranova_backend python manage.py shell
```
```python
from allauth.account.models import EmailAddress
from allauth.account.utils import send_email_confirmation
from accounts.models import CustomUser

user = CustomUser.objects.get(email='user@example.com')
send_email_confirmation(None, user)
```

---

## 📝 Configuration Summary

### **Current Settings**:

| Setting | Value | Location |
|---------|-------|----------|
| Email Verification | `mandatory` | `settings.py` |
| Email Backend | SMTP | `settings.py` |
| Email Host | Gmail | `.env` |
| Email Port | 587 | `.env` |
| Email TLS | Enabled | `.env` |
| Default From Email | Configurable | `.env` |

### **Environment Variables** (`.env`):

```env
# Email Configuration
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-specific-password
DEFAULT_FROM_EMAIL=noreply@apranova.com
SERVER_EMAIL=admin@apranova.com
```

---

## 🔐 Security Best Practices

1. **Never commit** email credentials to Git
2. **Use App Passwords** instead of regular passwords
3. **Use environment variables** for sensitive data
4. **Enable 2FA** on email accounts
5. **Use SendGrid/Mailgun** for production (not Gmail)
6. **Set proper FROM email** (not Gmail address)
7. **Monitor email sending** for abuse

---

## 🚀 Quick Start

### **For Development (Console Backend)**:

```bash
# 1. Update .env
echo "EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend" >> .env

# 2. Update settings.py
# Change: ACCOUNT_EMAIL_VERIFICATION = "optional"

# 3. Restart backend
docker-compose restart backend

# 4. Signup and check logs
docker logs apranova_backend -f
```

### **For Production (Gmail)**:

```bash
# 1. Generate Gmail App Password
# Visit: https://myaccount.google.com/apppasswords

# 2. Update .env
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-app-password

# 3. Restart backend
docker-compose restart backend

# 4. Test signup
# Go to: http://localhost:3000/signup
```

---

## 📚 Additional Resources

- **Django Allauth Docs**: https://django-allauth.readthedocs.io/
- **Gmail App Passwords**: https://support.google.com/accounts/answer/185833
- **SendGrid Setup**: https://sendgrid.com/docs/for-developers/sending-email/django/
- **Django Email Docs**: https://docs.djangoproject.com/en/5.2/topics/email/

---

**Last Updated**: 2025-11-02  
**Status**: Email Verification Enabled ✅  
**Mode**: Mandatory ✅  
**Backend**: SMTP (Configurable) ✅

