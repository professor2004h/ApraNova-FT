---
layout: default
title: System Architecture - ApraNova LMS
---

<div style="text-align: center; padding: 30px 0 20px 0;">
  <h1 style="font-size: 3em; margin-bottom: 10px; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">🏗️ System Architecture</h1>
  <p style="font-size: 1.2em; color: #7f8c8d; max-width: 700px; margin: 0 auto;">
    Complete architectural overview of the ApraNova Learning Management System
  </p>
</div>

<div style="background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); padding: 30px; border-radius: 12px; color: white; margin: 30px 0; box-shadow: 0 8px 25px rgba(52, 152, 219, 0.3);">
  <h3 style="margin-top: 0; color: white; font-size: 1.6em;">📋 Architecture Overview</h3>
  <p style="font-size: 1.1em; line-height: 1.7; margin-bottom: 0;">
    ApraNova follows a <strong>modern microservices architecture</strong> with clear separation of concerns.
    The system is built on a <strong>3-tier architecture</strong> (Presentation, Application, Data) with
    Docker containerization for scalability and isolation.
  </p>
</div>

---

## 🏗️ High-Level Architecture

```mermaid
graph TB
    subgraph "Presentation Layer"
        UI[React Components]
        Pages[Next.js Pages]
        Middleware[Next.js Middleware]
    end

    subgraph "Application Layer"
        APIClient[Axios API Client]
        AuthContext[Auth Context]
        Services[Service Layer]
    end

    subgraph "API Gateway"
        NextAPI[Next.js API Routes<br/>Proxy Layer]
        CORS[CORS Handler]
    end

    subgraph "Backend Services"
        DjangoAPI[Django REST API]
        AuthService[Authentication Service]
        WorkspaceService[Workspace Service]
        PaymentService[Payment Service]
        UserService[User Service]
    end

    subgraph "Data Access Layer"
        ORM[Django ORM]
        CacheManager[Redis Cache Manager]
        FileStorage[File Storage]
    end

    subgraph "Infrastructure"
        DB[(PostgreSQL)]
        Cache[(Redis)]
        Docker[Docker Engine]
        Storage[Volume Storage]
    end

    UI --> Pages
    Pages --> Middleware
    Middleware --> APIClient
    APIClient --> AuthContext
    APIClient --> Services
    Services --> NextAPI
    NextAPI --> CORS
    CORS --> DjangoAPI
    
    DjangoAPI --> AuthService
    DjangoAPI --> WorkspaceService
    DjangoAPI --> PaymentService
    DjangoAPI --> UserService
    
    AuthService --> ORM
    WorkspaceService --> Docker
    PaymentService --> ORM
    UserService --> ORM
    
    ORM --> DB
    CacheManager --> Cache
    FileStorage --> Storage
    WorkspaceService --> Storage

    style UI fill:#61dafb,stroke:#333,stroke-width:2px
    style DjangoAPI fill:#092e20,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style Cache fill:#dc382d,stroke:#333,stroke-width:2px,color:#fff
    style Docker fill:#2496ed,stroke:#333,stroke-width:2px,color:#fff
```

---

## 📦 Component Architecture

<div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 5px 20px rgba(250, 112, 154, 0.2);">
  <h3 style="margin-top: 0; color: #2c3e50; font-size: 1.5em;">⚛️ Frontend Architecture</h3>
  <p style="color: #2c3e50; font-size: 1.05em; line-height: 1.6; margin-bottom: 0;">
    Built with <strong>Next.js 15.2.4</strong> using the App Router pattern. Features React 19 components,
    Context API for state management, and Axios for API communication with interceptors for authentication.
  </p>
</div>

### Frontend Component Diagram

```mermaid
graph LR
    subgraph "Frontend Components"
        App[App Router]
        Layout[Layout Components]
        Pages[Page Components]
        Auth[Auth Components]
        Dashboard[Dashboard Components]
        Workspace[Workspace Components]
    end

    subgraph "State Management"
        Context[React Context]
        LocalStorage[Local Storage]
        SessionStorage[Session Storage]
    end

    subgraph "API Layer"
        APIClient[Axios Client]
        Interceptors[Request/Response Interceptors]
        Services[Service Functions]
    end

    App --> Layout
    Layout --> Pages
    Pages --> Auth
    Pages --> Dashboard
    Pages --> Workspace
    
    Auth --> Context
    Dashboard --> Context
    Workspace --> Context
    
    Context --> LocalStorage
    Context --> SessionStorage
    
    Pages --> Services
    Services --> APIClient
    APIClient --> Interceptors

    style App fill:#61dafb,stroke:#333,stroke-width:2px
    style Context fill:#764abc,stroke:#333,stroke-width:2px,color:#fff
    style APIClient fill:#5ed3f3,stroke:#333,stroke-width:2px
```

<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; margin: 25px 0; box-shadow: 0 5px 20px rgba(102, 126, 234, 0.2); color: white;">
  <h3 style="margin-top: 0; color: white; font-size: 1.5em;">⚙️ Backend Architecture</h3>
  <p style="font-size: 1.05em; line-height: 1.6; margin-bottom: 0;">
    Powered by <strong>Django 5.2.7</strong> with Django REST Framework. Implements JWT authentication,
    Docker-in-Docker workspace provisioning, Stripe payment integration, and PostgreSQL + Redis for data persistence.
  </p>
</div>

### Backend Component Diagram

```mermaid
graph TB
    subgraph "API Layer"
        URLs[URL Router]
        Views[API Views]
        Serializers[Serializers]
    end

    subgraph "Business Logic"
        AuthLogic[Authentication Logic]
        WorkspaceLogic[Workspace Logic]
        PaymentLogic[Payment Logic]
        UserLogic[User Logic]
    end

    subgraph "Data Layer"
        Models[Django Models]
        Migrations[Database Migrations]
        Managers[Model Managers]
    end

    subgraph "External Integrations"
        DockerAPI[Docker API]
        StripeAPI[Stripe API]
        OAuth[OAuth Providers]
    end

    URLs --> Views
    Views --> Serializers
    Serializers --> AuthLogic
    Serializers --> WorkspaceLogic
    Serializers --> PaymentLogic
    Serializers --> UserLogic
    
    AuthLogic --> Models
    WorkspaceLogic --> Models
    PaymentLogic --> Models
    UserLogic --> Models
    
    Models --> Migrations
    Models --> Managers
    
    WorkspaceLogic --> DockerAPI
    PaymentLogic --> StripeAPI
    AuthLogic --> OAuth

    style URLs fill:#092e20,stroke:#333,stroke-width:2px,color:#fff
    style Models fill:#44b78b,stroke:#333,stroke-width:2px,color:#fff
    style DockerAPI fill:#2496ed,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🔄 Request Flow

### Standard API Request Flow

```mermaid
sequenceDiagram
    participant Browser
    participant NextJS
    participant Middleware
    participant APIClient
    participant Django
    participant Database

    Browser->>NextJS: User Action
    NextJS->>Middleware: Route Request
    Middleware->>Middleware: Check Auth
    Middleware->>APIClient: Make API Call
    APIClient->>APIClient: Add JWT Token
    APIClient->>Django: HTTP Request
    Django->>Django: Validate Token
    Django->>Django: Check Permissions
    Django->>Database: Query Data
    Database-->>Django: Return Data
    Django-->>APIClient: JSON Response
    APIClient-->>NextJS: Process Response
    NextJS-->>Browser: Render UI
```

### Authenticated Request with Token Refresh

```mermaid
sequenceDiagram
    participant Browser
    participant APIClient
    participant Django
    participant Redis

    Browser->>APIClient: API Request
    APIClient->>APIClient: Add Access Token
    APIClient->>Django: Request with Token
    Django->>Django: Validate Token
    Django-->>APIClient: 401 Unauthorized
    APIClient->>APIClient: Detect 401
    APIClient->>Django: Refresh Token Request
    Django->>Redis: Check Token Blacklist
    Redis-->>Django: Token Valid
    Django-->>APIClient: New Access Token
    APIClient->>APIClient: Save New Token
    APIClient->>Django: Retry Original Request
    Django-->>APIClient: Success Response
    APIClient-->>Browser: Return Data
```

---

## 🗄️ Data Flow Architecture

```mermaid
graph LR
    subgraph "Client Side"
        Form[User Form]
        State[Component State]
    end

    subgraph "API Layer"
        Validation[Client Validation]
        Request[API Request]
    end

    subgraph "Server Side"
        Serializer[DRF Serializer]
        BusinessLogic[Business Logic]
        Model[Django Model]
    end

    subgraph "Storage"
        DB[(Database)]
        Cache[(Cache)]
        Files[File Storage]
    end

    Form --> State
    State --> Validation
    Validation --> Request
    Request --> Serializer
    Serializer --> BusinessLogic
    BusinessLogic --> Model
    Model --> DB
    BusinessLogic --> Cache
    BusinessLogic --> Files

    style Form fill:#61dafb,stroke:#333,stroke-width:2px
    style Serializer fill:#092e20,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#336791,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🐳 Docker Architecture

```mermaid
graph TB
    subgraph "Docker Host"
        subgraph "ApraNova Network"
            Frontend[Frontend Container<br/>Next.js:3000]
            Backend[Backend Container<br/>Django:8000]
            DB[PostgreSQL Container<br/>:5432]
            Redis[Redis Container<br/>:6379]
        end
        
        subgraph "Workspace Containers"
            WS1[Workspace 1<br/>Code-Server]
            WS2[Workspace 2<br/>Code-Server]
            WSN[Workspace N<br/>Code-Server]
        end
        
        DockerSocket[Docker Socket<br/>/var/run/docker.sock]
    end

    subgraph "Volumes"
        PGData[postgres_data]
        RedisData[redis_data]
        StaticFiles[static_volume]
        MediaFiles[media_volume]
        WorkspaceData[workspace_data]
    end

    Frontend --> Backend
    Backend --> DB
    Backend --> Redis
    Backend --> DockerSocket
    
    DockerSocket --> WS1
    DockerSocket --> WS2
    DockerSocket --> WSN
    
    DB --> PGData
    Redis --> RedisData
    Backend --> StaticFiles
    Backend --> MediaFiles
    WS1 --> WorkspaceData
    WS2 --> WorkspaceData
    WSN --> WorkspaceData

    style Frontend fill:#61dafb,stroke:#333,stroke-width:2px
    style Backend fill:#092e20,stroke:#333,stroke-width:2px,color:#fff
    style DB fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style Redis fill:#dc382d,stroke:#333,stroke-width:2px,color:#fff
    style DockerSocket fill:#2496ed,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🔌 Integration Points

### External Service Integration

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| **Stripe** | Payment Processing | REST API |
| **Google OAuth** | Social Authentication | OAuth 2.0 |
| **GitHub OAuth** | Social Authentication | OAuth 2.0 |
| **Docker Engine** | Workspace Provisioning | Docker SDK |
| **SMTP Server** | Email Notifications | SMTP Protocol |

### Internal Service Communication

| From | To | Protocol | Purpose |
|------|-----|----------|---------|
| Frontend | Backend | HTTP/HTTPS | API Requests |
| Backend | PostgreSQL | TCP | Database Queries |
| Backend | Redis | TCP | Caching |
| Backend | Docker | Unix Socket | Container Management |
| Next.js | Django | HTTP Proxy | SSR API Calls |

---

## 📊 Scalability Considerations

### Horizontal Scaling

```mermaid
graph TB
    LB[Load Balancer]
    
    subgraph "Frontend Cluster"
        FE1[Frontend 1]
        FE2[Frontend 2]
        FE3[Frontend N]
    end
    
    subgraph "Backend Cluster"
        BE1[Backend 1]
        BE2[Backend 2]
        BE3[Backend N]
    end
    
    subgraph "Data Layer"
        DBMaster[(DB Master)]
        DBReplica1[(DB Replica 1)]
        DBReplica2[(DB Replica 2)]
        RedisCluster[(Redis Cluster)]
    end

    LB --> FE1
    LB --> FE2
    LB --> FE3
    
    FE1 --> BE1
    FE2 --> BE2
    FE3 --> BE3
    
    BE1 --> DBMaster
    BE2 --> DBMaster
    BE3 --> DBMaster
    
    DBMaster --> DBReplica1
    DBMaster --> DBReplica2
    
    BE1 --> RedisCluster
    BE2 --> RedisCluster
    BE3 --> RedisCluster

    style LB fill:#f9f,stroke:#333,stroke-width:4px
    style DBMaster fill:#336791,stroke:#333,stroke-width:2px,color:#fff
    style RedisCluster fill:#dc382d,stroke:#333,stroke-width:2px,color:#fff
```

---

## 🔒 Security Architecture

### Security Layers

1. **Network Layer**: CORS, HTTPS, Firewall rules
2. **Application Layer**: JWT validation, CSRF protection
3. **Data Layer**: Encrypted connections, password hashing
4. **Container Layer**: Isolated workspaces, resource limits

### Authentication Flow

See [Authentication Flow](./auth-flow.md) for detailed diagrams.

---

## 📈 Performance Optimization

### Caching Strategy

- **Redis Cache**: User sessions, API responses
- **Browser Cache**: Static assets, images
- **Database Cache**: Query result caching
- **CDN**: Static file delivery (production)

### Database Optimization

- **Indexes**: On frequently queried fields
- **Connection Pooling**: Reuse database connections
- **Query Optimization**: Select only needed fields
- **Lazy Loading**: Load related objects on demand

---

## 🔗 Related Documentation

- [Database Schema](./database-schema.md)
- [API Documentation](./api-documentation.md)
- [Deployment Guide](./deployment.md)

---

[← Back to Index](./index.md)

