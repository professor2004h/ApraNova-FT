# 🚀 START HERE FIRST - ApraNova Setup Guide

## ✅ What Has Been Done

Your ApraNova Learning Management System is now **fully configured** with:

### ✨ Complete Full-Stack Application
```
ApraNova/
├── backend/          ✅ Django REST API (Python 3.10, Django 5.2.7)
├── frontend/         ✅ Next.js App (Next.js 15, React 19)
├── nginx/            ✅ Reverse proxy configuration
├── docker-compose.yml ✅ Orchestrates all services
├── .env              ✅ Environment configured with secure credentials
├── .gitattributes    ✅ Unix line endings enforced
└── Documentation     ✅ Complete guides
```

### 🔐 Security Configured
- ✅ **SECRET_KEY**: Auto-generated (50 random characters)
- ✅ **POSTGRES_PASSWORD**: Auto-generated (24 random characters)
- ✅ **REDIS_PASSWORD**: Auto-generated (24 random characters)
- ✅ **Non-root containers**: Both backend and frontend run as non-root users
- ✅ **Unix formatting**: All files use LF line endings

### 🐳 Docker Services Ready
- ✅ **Backend**: Django REST API on port 8000
- ✅ **Frontend**: Next.js app on port 3000
- ✅ **Database**: PostgreSQL 14 on port 5432
- ✅ **Cache**: Redis 7 on port 6379
- ✅ **Nginx**: Reverse proxy on ports 80/443 (production)

### 📊 APROVOVA Reports System
- ✅ Centralized report directory structure
- ✅ User reports (CSV, PDF, JSON)
- ✅ Payment reports with invoices
- ✅ Batch processing reports
- ✅ Analytics and metrics

---

## 🎯 Next Steps - Choose Your Path

### Path 1: Quick Start (Recommended) ⚡

**Just double-click this file:**
```
START_HERE.bat
```

This will automatically:
1. Build all Docker containers
2. Start all services
3. Run database migrations
4. Initialize APROVOVA directory
5. Collect static files
6. Prompt you to create a superuser

**Then access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin

---

### Path 2: Using PowerShell Script 🔧

```powershell
cd C:\Users\Admin\Desktop\frontend\ApraNova
.\setup.ps1
```

---

### Path 3: Using Makefile Commands 🛠️

```bash
cd C:\Users\Admin\Desktop\frontend\ApraNova
make init
make createsuperuser
```

---

### Path 4: Manual Step-by-Step 📝

```bash
# 1. Navigate to project
cd C:\Users\Admin\Desktop\frontend\ApraNova

# 2. Build containers
docker-compose build

# 3. Start services
docker-compose up -d

# 4. Wait for database to be ready
Start-Sleep -Seconds 15

# 5. Run migrations
docker-compose exec backend python manage.py migrate

# 6. Initialize APROVOVA
docker-compose exec backend python scripts/init_aprovova.py

# 7. Collect static files
docker-compose exec backend python manage.py collectstatic --noinput

# 8. Create superuser
docker-compose exec backend python manage.py createsuperuser

# 9. Check status
docker-compose ps
```

---

## 🌐 Access Your Application

Once services are running:

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:8000 | - |
| **Admin Panel** | http://localhost:8000/admin | Use superuser credentials |
| **API Docs** | http://localhost:8000/swagger | - |
| **Backend Health** | http://localhost:8000/health | - |
| **Frontend Health** | http://localhost:3000/api/health | - |

---

## 🛠️ Useful Commands

### Check Status
```bash
docker-compose ps              # Show all services
make status                    # Same as above
make health                    # Check health endpoints
```

### View Logs
```bash
make logs                      # All services
make logs-backend              # Backend only
make logs-frontend             # Frontend only
make logs-db                   # Database only
```

### Manage Services
```bash
make up                        # Start all services
make down                      # Stop all services
make restart                   # Restart all services
```

### Backend Operations
```bash
make shell                     # Django shell
make migrate                   # Run migrations
make makemigrations            # Create migrations
make createsuperuser           # Create admin user
```

### Frontend Operations
```bash
make frontend-shell            # Open frontend shell
make frontend-install          # Install dependencies
make frontend-build            # Build frontend
```

---

## 📚 Documentation

All documentation is in the project:

| File | Purpose |
|------|---------|
| **START_HERE_FIRST.md** | This file - Quick start guide |
| **FINAL_SETUP_SUMMARY.md** | Complete setup summary |
| **README.md** | Main project documentation |
| **PROJECT_STRUCTURE.md** | Detailed structure guide |
| **SETUP_COMPLETE.md** | Setup instructions |
| **backend/README.md** | Backend documentation |
| **backend/QUICKSTART.md** | Backend quick start |
| **backend/DEPLOYMENT.md** | Production deployment |
| **frontend/README.md** | Frontend documentation |

---

## 🔍 Verify Everything Works

### 1. Check Docker Services
```bash
docker-compose ps
```

Expected output: All services should be "Up" and "healthy"

### 2. Check Backend
```bash
curl http://localhost:8000/health
```

Expected: `{"status": "healthy", ...}`

### 3. Check Frontend
```bash
curl http://localhost:3000/api/health
```

Expected: `{"status": "healthy", ...}`

### 4. Check Database
```bash
docker-compose exec db psql -U apranova_user -d apranova_db -c "SELECT version();"
```

Expected: PostgreSQL version info

### 5. Check APROVOVA
```bash
docker-compose exec backend ls -la APROVOVA/
```

Expected: Directory structure with user_reports, payment_reports, etc.

---

## 🆘 Troubleshooting

### Services won't start
```bash
# Check logs
make logs

# Stop everything
make down

# Clean and rebuild
make clean
make build
make up
```

### Port already in use
```bash
# Check what's using the port
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Kill the process or change ports in docker-compose.yml
```

### Database connection errors
```bash
# Check database logs
make logs-db

# Restart database
docker-compose restart db

# Wait a bit longer for database to be ready
Start-Sleep -Seconds 30
```

### Frontend build errors
```bash
# Check frontend logs
make logs-frontend

# Rebuild frontend
docker-compose build frontend
docker-compose up -d frontend
```

---

## 🎉 You're Ready!

Your ApraNova Learning Management System is fully configured with:

✅ **Backend**: Django REST API with APROVOVA reports  
✅ **Frontend**: Next.js application with modern UI  
✅ **Database**: PostgreSQL with migrations  
✅ **Cache**: Redis for performance  
✅ **Proxy**: Nginx for production  
✅ **Docker**: Complete containerization  
✅ **Security**: Production-ready configuration  
✅ **Documentation**: Comprehensive guides  

---

## 🚀 Quick Start Command

**Run this now:**

```bash
cd C:\Users\Admin\Desktop\frontend\ApraNova
.\START_HERE.bat
```

**Or:**

```bash
cd C:\Users\Admin\Desktop\frontend\ApraNova
make init
make createsuperuser
```

---

## 📞 Need Help?

1. Check the logs: `make logs`
2. Read the documentation in the project
3. Verify Docker Desktop is running
4. Check service status: `make status`
5. Run health checks: `make health`

---

## 🎯 What to Do Next

After setup is complete:

1. **Create a superuser** (if not done)
   ```bash
   make createsuperuser
   ```

2. **Access the admin panel**
   - Go to: http://localhost:8000/admin
   - Login with superuser credentials

3. **Explore the API**
   - Go to: http://localhost:8000/swagger
   - Try out the endpoints

4. **Check the frontend**
   - Go to: http://localhost:3000
   - Explore the UI

5. **Generate a report**
   - Use the admin panel or API
   - Check APROVOVA directory for generated files

6. **Start developing**
   - Edit backend code in `backend/`
   - Edit frontend code in `frontend/`
   - Changes will be reflected automatically

---

**Ready to start? Run:**

```bash
cd C:\Users\Admin\Desktop\frontend\ApraNova
.\START_HERE.bat
```

**🎉 Happy coding!**

