---
layout: default
title: Authentication Flow
---

# Authentication Flow

Complete authentication and authorization flow diagrams for ApraNova LMS.

---

## 🔐 Authentication Overview

ApraNova supports multiple authentication methods:
- **Email/Password**: Traditional credentials-based authentication
- **Google OAuth**: Social authentication via Google
- **GitHub OAuth**: Social authentication via GitHub
- **JWT Tokens**: Stateless authentication with access and refresh tokens

---

## 📝 User Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant APIClient
    participant Django
    participant Database
    participant Email

    User->>Frontend: Fill Signup Form
    Frontend->>Frontend: Client-side Validation
    Frontend->>APIClient: POST /api/auth/registration/
    APIClient->>Django: Registration Request
    Django->>Django: Validate Data
    Django->>Database: Check Email Exists
    Database-->>Django: Email Available
    Django->>Database: Create User
    Database-->>Django: User Created
    Django->>Django: Generate JWT Tokens
    Django->>Email: Send Verification Email
    Django-->>APIClient: Return Tokens + User Data
    APIClient->>APIClient: Save Tokens to localStorage
    APIClient-->>Frontend: Success Response
    Frontend->>Frontend: Redirect to Dashboard
    Frontend-->>User: Show Dashboard
```

### Registration Request

**Endpoint**: `POST /api/auth/registration/`

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

**Response**:
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

## 🔑 Login Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant APIClient
    participant Django
    participant Database
    participant Redis

    User->>Frontend: Enter Credentials
    Frontend->>Frontend: Validate Input
    Frontend->>APIClient: POST /api/users/login/
    APIClient->>Django: Login Request
    Django->>Database: Authenticate User
    Database-->>Django: User Found
    Django->>Django: Verify Password
    Django->>Django: Check Role Match
    Django->>Django: Generate JWT Tokens
    Django->>Redis: Store Session
    Django-->>APIClient: Return Tokens + User
    APIClient->>APIClient: Save to localStorage
    APIClient-->>Frontend: Success Response
    Frontend->>Frontend: Determine Redirect URL
    Frontend-->>User: Redirect to Dashboard
```

### Login Request

**Endpoint**: `POST /api/users/login/`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "student"
}
```

**Response**:
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

## 🔄 Token Refresh Flow

```mermaid
sequenceDiagram
    participant Frontend
    participant APIClient
    participant Django
    participant Redis

    Frontend->>APIClient: API Request
    APIClient->>APIClient: Add Access Token
    APIClient->>Django: Request with Token
    Django->>Django: Validate Access Token
    Django-->>APIClient: 401 Unauthorized
    
    Note over APIClient: Token Expired
    
    APIClient->>APIClient: Get Refresh Token
    APIClient->>Django: POST /api/auth/token/refresh/
    Django->>Redis: Check Token Blacklist
    Redis-->>Django: Token Not Blacklisted
    Django->>Django: Generate New Access Token
    Django-->>APIClient: New Access Token
    APIClient->>APIClient: Save New Token
    APIClient->>Django: Retry Original Request
    Django-->>APIClient: Success Response
    APIClient-->>Frontend: Return Data
```

### Token Refresh Request

**Endpoint**: `POST /api/auth/token/refresh/`

**Request Body**:
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response**:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

## 🚪 Logout Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant APIClient
    participant Django
    participant Redis

    User->>Frontend: Click Logout
    Frontend->>APIClient: POST /api/users/logout/
    APIClient->>APIClient: Get Refresh Token
    APIClient->>Django: Logout Request
    Django->>Redis: Blacklist Refresh Token
    Redis-->>Django: Token Blacklisted
    Django-->>APIClient: Success Response
    APIClient->>APIClient: Clear localStorage
    APIClient->>APIClient: Clear sessionStorage
    APIClient-->>Frontend: Logout Complete
    Frontend->>Frontend: Redirect to Login
    Frontend-->>User: Show Login Page
```

---

## 🌐 OAuth Flow (Google/GitHub)

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant OAuth Provider
    participant Django
    participant Database

    User->>Frontend: Click "Login with Google"
    Frontend->>OAuth Provider: Redirect to OAuth
    OAuth Provider->>User: Show Consent Screen
    User->>OAuth Provider: Grant Permission
    OAuth Provider->>Frontend: Redirect with Code
    Frontend->>Django: POST /api/auth/google/
    Django->>OAuth Provider: Exchange Code for Token
    OAuth Provider-->>Django: Access Token
    Django->>OAuth Provider: Get User Info
    OAuth Provider-->>Django: User Profile
    Django->>Database: Find or Create User
    Database-->>Django: User Object
    Django->>Django: Generate JWT Tokens
    Django-->>Frontend: Return Tokens + User
    Frontend->>Frontend: Save Tokens
    Frontend-->>User: Redirect to Dashboard
```

### OAuth Login Request

**Endpoint**: `POST /api/auth/google/` or `POST /api/auth/github/`

**Request Body**:
```json
{
  "code": "4/0AY0e-g7...",
  "redirect_uri": "http://localhost:3000/auth/callback"
}
```

**Response**:
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

## 🛡️ Protected Route Access

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Middleware
    participant APIClient
    participant Django

    User->>Browser: Navigate to /student/dashboard
    Browser->>Middleware: Route Request
    Middleware->>Middleware: Check localStorage
    
    alt Token Exists
        Middleware->>APIClient: Verify Token
        APIClient->>Django: GET /api/users/profile/
        Django->>Django: Validate JWT
        Django-->>APIClient: User Data
        APIClient-->>Middleware: Valid User
        Middleware->>Browser: Allow Access
        Browser-->>User: Show Dashboard
    else No Token
        Middleware->>Browser: Redirect to Login
        Browser-->>User: Show Login Page
    end
```

---

## 🔐 Role-Based Access Control

```mermaid
graph TB
    Request[Incoming Request]
    Auth[Authentication Check]
    Role[Role Verification]
    Permission[Permission Check]
    
    Student[Student Routes]
    Trainer[Trainer Routes]
    Admin[Admin Routes]
    SuperAdmin[SuperAdmin Routes]
    
    Denied[Access Denied]
    Allowed[Access Granted]

    Request --> Auth
    Auth -->|Valid Token| Role
    Auth -->|Invalid Token| Denied
    
    Role -->|Student| Permission
    Role -->|Trainer| Permission
    Role -->|Admin| Permission
    Role -->|SuperAdmin| Permission
    
    Permission -->|Match| Allowed
    Permission -->|Mismatch| Denied
    
    Allowed --> Student
    Allowed --> Trainer
    Allowed --> Admin
    Allowed --> SuperAdmin

    style Auth fill:#ffd700,stroke:#333,stroke-width:2px
    style Permission fill:#90ee90,stroke:#333,stroke-width:2px
    style Denied fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
    style Allowed fill:#51cf66,stroke:#333,stroke-width:2px,color:#fff
```

### Role Hierarchy

| Role | Access Level | Permissions |
|------|-------------|-------------|
| **Student** | Basic | Own dashboard, workspace, submissions |
| **Trainer** | Elevated | Student management, grading, batch access |
| **Admin** | High | User management, system config, reports |
| **SuperAdmin** | Full | All permissions, can access any role |

---

## 🔒 Security Measures

### Token Security

1. **Access Token**: Short-lived (15 minutes)
2. **Refresh Token**: Long-lived (7 days)
3. **Token Blacklisting**: Logout invalidates tokens
4. **HTTPS Only**: Tokens transmitted over secure connection
5. **HttpOnly Cookies**: Optional cookie-based storage

### Password Security

1. **Hashing**: bcrypt with salt
2. **Minimum Length**: 8 characters
3. **Complexity**: Uppercase, lowercase, numbers, symbols
4. **Reset Flow**: Email-based password reset
5. **Rate Limiting**: Prevent brute force attacks

---

## 📊 Authentication State Management

```mermaid
stateDiagram-v2
    [*] --> Unauthenticated
    
    Unauthenticated --> Authenticating: Login/Signup
    Authenticating --> Authenticated: Success
    Authenticating --> Unauthenticated: Failure
    
    Authenticated --> RefreshingToken: Token Expired
    RefreshingToken --> Authenticated: Refresh Success
    RefreshingToken --> Unauthenticated: Refresh Failed
    
    Authenticated --> Unauthenticated: Logout
    Authenticated --> Unauthenticated: Token Invalid
```

---

## 🔗 Related Documentation

- [API Documentation](./api-documentation.md)
- [Database Schema](./database-schema.md)
- [System Architecture](./architecture.md)

---

[← Back to Index](./index.md)

