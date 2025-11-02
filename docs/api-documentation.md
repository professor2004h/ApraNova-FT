---
layout: default
title: API Documentation
---

# API Documentation

Complete REST API reference for ApraNova Learning Management System.

---

## 🌐 Base URL

- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.apranova.com/api`

---

## 🔐 Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## 📚 API Endpoints

### Authentication Endpoints

#### Register User

```http
POST /api/auth/registration/
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password1": "SecurePass123!",
  "password2": "SecurePass123!",
  "role": "student",
  "track": "DP"
}
```

**Response** (201 Created):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "student",
    "track": "DP"
  }
}
```

---

#### Login

```http
POST /api/users/login/
```

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "student"
}
```

**Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "student"
  },
  "redirect_url": "/student/dashboard"
}
```

---

#### Refresh Token

```http
POST /api/auth/token/refresh/
```

**Request Body**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

#### Logout

```http
POST /api/users/logout/
```

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request Body**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response** (200 OK):
```json
{
  "message": "Logout successful"
}
```

---

#### Check Email Exists

```http
POST /api/users/check-email/
```

**Request Body**:
```json
{
  "email": "john@example.com"
}
```

**Response** (200 OK):
```json
{
  "exists": true
}
```

---

### User Endpoints

#### Get User Profile

```http
GET /api/users/profile/
```

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response** (200 OK):
```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "role": "student",
  "track": "DP",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

#### Update User Role

```http
POST /api/users/update-role/
```

**Headers**:
```
Authorization: Bearer <access_token>
```

**Request Body**:
```json
{
  "role": "trainer"
}
```

**Response** (200 OK):
```json
{
  "message": "Role updated successfully",
  "user": {
    "id": 1,
    "role": "trainer"
  }
}
```

---

### Workspace Endpoints

#### Create/Get Workspace

```http
POST /api/users/workspace/create/
```

**Headers**:
```
Authorization: Bearer <access_token>
```

**Response** (201 Created - New Workspace):
```json
{
  "url": "http://localhost:8081",
  "port": 8081,
  "msg": "Workspace created successfully."
}
```

**Response** (200 OK - Existing Workspace):
```json
{
  "url": "http://localhost:8081"
}
```

**Error Response** (503 Service Unavailable):
```json
{
  "error": "Workspace feature not available",
  "message": "Docker is not accessible from the backend container.",
  "details": "Please contact your administrator to enable workspace provisioning."
}
```

---

### Payment Endpoints

#### Create Payment

```http
POST /api/payments/create-payment/
```

**Request Body**:
```json
{
  "amount": 999.00,
  "currency": "usd"
}
```

**Response** (200 OK):
```json
{
  "clientSecret": "pi_3KJ..._secret_...",
  "publishableKey": "pk_test_..."
}
```

---

### OAuth Endpoints

#### Google OAuth Login

```http
POST /api/auth/google/
```

**Request Body**:
```json
{
  "code": "4/0AY0e-g7...",
  "redirect_uri": "http://localhost:3000/auth/callback"
}
```

**Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "john@gmail.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

---

#### GitHub OAuth Login

```http
POST /api/auth/github/
```

**Request Body**:
```json
{
  "code": "a1b2c3d4e5f6...",
  "redirect_uri": "http://localhost:3000/auth/callback"
}
```

**Response** (200 OK):
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "email": "john@github.com",
    "name": "John Doe",
    "role": "student"
  }
}
```

---

## 📊 Response Codes

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | Service temporarily unavailable |

---

## 🔒 Error Responses

### Standard Error Format

```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": "Additional error details"
}
```

### Common Errors

#### Authentication Error

```json
{
  "error": "Invalid credentials",
  "message": "Email or password is incorrect"
}
```

#### Permission Error

```json
{
  "error": "Unauthorized role access",
  "detail": "You are registered as 'student' but tried to login as 'trainer'",
  "actual_role": "student"
}
```

#### Validation Error

```json
{
  "email": ["This field is required."],
  "password1": ["Password must be at least 8 characters."]
}
```

---

## 🔄 Rate Limiting

- **Anonymous Users**: 100 requests/hour
- **Authenticated Users**: 1000 requests/hour
- **Workspace Creation**: 10 requests/hour per user

---

## 📝 Request Examples

### cURL Examples

#### Register

```bash
curl -X POST http://localhost:8000/api/auth/registration/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password1": "SecurePass123!",
    "password2": "SecurePass123!",
    "role": "student",
    "track": "DP"
  }'
```

#### Login

```bash
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!",
    "role": "student"
  }'
```

#### Get Profile

```bash
curl -X GET http://localhost:8000/api/users/profile/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

#### Create Workspace

```bash
curl -X POST http://localhost:8000/api/users/workspace/create/ \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
```

---

## 🔗 Related Documentation

- [Authentication Flow](./auth-flow.md)
- [Workspace Flow](./workspace-flow.md)
- [System Architecture](./architecture.md)

---

[← Back to Index](./index.md)

