# ApraNova Project Structure

## 📁 Complete Directory Structure

```
ApraNova/
├── backend/                           # Django REST API Backend
│   ├── APROVOVA/                     # Centralized Reports Directory
│   │   ├── user_reports/
│   │   │   ├── csv/                  # User data in CSV format
│   │   │   ├── pdf/                  # User reports in PDF
│   │   │   └── json/                 # User data in JSON
│   │   ├── payment_reports/
│   │   │   ├── csv/                  # Payment transactions CSV
│   │   │   ├── pdf/                  # Payment invoices PDF
│   │   │   └── json/                 # Payment data JSON
│   │   ├── batch_reports/
│   │   │   ├── csv/                  # Batch processing CSV
│   │   │   ├── pdf/                  # Batch summaries PDF
│   │   │   └── json/                 # Batch data JSON
│   │   └── analytics_reports/
│   │       ├── csv/                  # Analytics data CSV
│   │       ├── pdf/                  # Analytics charts PDF
│   │       └── json/                 # Analytics metrics JSON
│   │
│   ├── accounts/                     # User Management App
│   │   ├── migrations/
│   │   ├── models.py                 # User models
│   │   ├── views.py                  # User views
│   │   ├── serializers.py            # User serializers
│   │   └── urls.py                   # User routes
│   │
│   ├── payments/                     # Payment Processing App
│   │   ├── migrations/
│   │   ├── models.py                 # Payment models
│   │   ├── views.py                  # Payment views
│   │   ├── serializers.py            # Payment serializers
│   │   └── urls.py                   # Payment routes
│   │
│   ├── core/                         # Django Core Settings
│   │   ├── settings.py               # Main settings
│   │   ├── urls.py                   # Root URL configuration
│   │   ├── wsgi.py                   # WSGI configuration
│   │   ├── asgi.py                   # ASGI configuration
│   │   └── report_utils.py           # Report generation utilities
│   │
│   ├── scripts/                      # Utility Scripts
│   │   ├── init_aprovova.py          # Initialize APROVOVA directory
│   │   ├── health_check.sh           # System health check
│   │   └── migrate_to_apranova.ps1   # Migration script
│   │
│   ├── staticfiles/                  # Collected static files (generated)
│   ├── media/                        # User uploaded files
│   │
│   ├── Dockerfile                    # Backend Docker image
│   ├── requirements.txt              # Python dependencies
│   ├── manage.py                     # Django management script
│   ├── .dockerignore                 # Docker ignore rules
│   └── .env                          # Backend environment variables
│
├── frontend/                          # Next.js Frontend Application
│   ├── app/                          # Next.js App Directory
│   │   ├── admin/                    # Admin pages
│   │   │   ├── dashboard/
│   │   │   └── settings/
│   │   ├── student/                  # Student pages
│   │   │   ├── dashboard/
│   │   │   ├── workspace/
│   │   │   └── settings/
│   │   ├── trainer/                  # Trainer pages
│   │   │   ├── dashboard/
│   │   │   └── settings/
│   │   ├── superadmin/               # Super admin pages
│   │   │   └── dashboard/
│   │   ├── auth/                     # Authentication pages
│   │   │   └── callback/
│   │   ├── login/                    # Login page
│   │   ├── signup/                   # Signup page
│   │   ├── api/                      # API routes
│   │   │   └── health/               # Health check endpoint
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # React Components
│   │   ├── ui/                       # UI components (Radix UI)
│   │   └── ...                       # Custom components
│   │
│   ├── services/                     # API Services
│   │   └── api.ts                    # API client configuration
│   │
│   ├── lib/                          # Utility Libraries
│   │   └── utils.ts                  # Helper functions
│   │
│   ├── public/                       # Static Assets
│   │   └── ...                       # Images, fonts, etc.
│   │
│   ├── styles/                       # Additional Styles
│   │
│   ├── types/                        # TypeScript Types
│   │
│   ├── Dockerfile                    # Frontend Docker image
│   ├── package.json                  # Node dependencies
│   ├── next.config.mjs               # Next.js configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── .dockerignore                 # Docker ignore rules
│   └── .env.example                  # Frontend environment template
│
├── nginx/                             # Nginx Configuration (Production)
│   ├── nginx.conf                    # Main nginx configuration
│   └── conf.d/
│       └── default.conf              # Site configuration
│
├── certs/                             # SSL Certificates (Production)
│   ├── fullchain.pem                 # SSL certificate
│   └── privkey.pem                   # SSL private key
│
├── docker-compose.yml                 # Docker Compose Orchestration
├── .env                              # Root environment variables
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── Makefile                          # Convenient commands
├── setup.ps1                         # Automated setup script (PowerShell)
├── START_HERE.bat                    # Quick start batch file
├── README.md                         # Main documentation
├── PROJECT_STRUCTURE.md              # This file
├── SETUP_COMPLETE.md                 # Setup guide
└── COMPLETED_SETUP.md                # Completed setup summary
```

## 🐳 Docker Services

### Backend Service
- **Image**: Custom Django image (multi-stage build)
- **Port**: 8000
- **Dependencies**: PostgreSQL, Redis
- **Volumes**: 
  - `./backend:/app` - Source code
  - `static_volume:/app/staticfiles` - Static files
  - `media_volume:/app/media` - Media files
  - `aprovova_reports:/app/APROVOVA` - Reports

### Frontend Service
- **Image**: Custom Next.js image (multi-stage build)
- **Port**: 3000
- **Dependencies**: Backend
- **Environment**: Production-optimized Node.js

### Database Service (PostgreSQL)
- **Image**: postgres:14-alpine
- **Port**: 5432
- **Volume**: `postgres_data:/var/lib/postgresql/data`

### Cache Service (Redis)
- **Image**: redis:7-alpine
- **Port**: 6379
- **Volume**: `redis_data:/data`

### Nginx Service (Production)
- **Image**: nginx:alpine
- **Ports**: 80, 443
- **Profile**: production
- **Volumes**: Static files, media files, SSL certs

## 📦 Key Files

### Root Level

#### docker-compose.yml
Orchestrates all services (backend, frontend, database, Redis, nginx).

#### .env
Environment variables for all services. Contains:
- Django settings (SECRET_KEY, DEBUG, ALLOWED_HOSTS)
- Database credentials
- Redis password
- OAuth credentials
- Stripe API keys
- Frontend URLs

#### Makefile
Convenient commands for:
- Docker operations (build, up, down, logs)
- Django management (migrate, shell, createsuperuser)
- Frontend operations (shell, install, build)
- Maintenance (backup, clean)

### Backend

#### Dockerfile
Multi-stage build:
1. **Builder stage**: Install dependencies, copy code
2. **Production stage**: Non-root user, gunicorn server

#### requirements.txt
Python dependencies including:
- Django 5.2.7
- djangorestframework
- psycopg2-binary (PostgreSQL)
- redis
- stripe
- reportlab (PDF generation)
- And more...

#### core/settings.py
Django settings with:
- APROVOVA directory configuration
- Database configuration
- Redis cache configuration
- OAuth settings
- Stripe settings
- Security settings

### Frontend

#### Dockerfile
Multi-stage build:
1. **Deps stage**: Install dependencies
2. **Builder stage**: Build Next.js application
3. **Runner stage**: Production server with non-root user

#### package.json
Node dependencies including:
- Next.js 15.2.4
- React 19
- Tailwind CSS
- Radix UI components
- Axios for API calls

#### next.config.mjs
Next.js configuration with:
- Standalone output for Docker
- API rewrites to backend
- Image optimization settings

## 🔐 Environment Variables

### Backend (.env)
```env
# Django
SECRET_KEY=...
DEBUG=True/False
ALLOWED_HOSTS=...

# Database
POSTGRES_DB=apranova_db
POSTGRES_USER=apranova_user
POSTGRES_PASSWORD=...
DATABASE_URL=postgresql://...

# Redis
REDIS_PASSWORD=...
REDIS_URL=redis://...

# OAuth
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Stripe
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
```

### Frontend (.env)
```env
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=ApraNova
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Features
NEXT_PUBLIC_AUTH_ENABLED=true
NEXT_PUBLIC_ENABLE_PAYMENTS=true
```

## 📊 Data Persistence

### Docker Volumes
- `postgres_data` - PostgreSQL database
- `redis_data` - Redis cache
- `static_volume` - Django static files
- `media_volume` - User uploaded files
- `aprovova_reports` - Generated reports

### Backup Strategy
```bash
# Backup database
make backup-db

# Backup reports
make backup-reports
```

## 🌐 Network Architecture

```
Internet
    ↓
[Nginx] (Port 80/443) - Production only
    ↓
    ├─→ [Frontend] (Port 3000) - Next.js
    │       ↓
    │   [Backend] (Port 8000) - Django API
    │       ↓
    │       ├─→ [PostgreSQL] (Port 5432)
    │       └─→ [Redis] (Port 6379)
    │
    └─→ [Backend] (Port 8000) - Direct API access
            ↓
            ├─→ [PostgreSQL] (Port 5432)
            └─→ [Redis] (Port 6379)
```

## 🚀 Deployment

### Development
```bash
make init
make createsuperuser
```

### Production
```bash
# Set production environment variables
# Update .env with production values

# Start with production profile
docker-compose --profile production up -d
```

## 📝 Notes

- All files use Unix line endings (LF)
- Docker images use non-root users for security
- Multi-stage builds minimize image sizes
- Health checks ensure service availability
- Volumes persist data across container restarts

