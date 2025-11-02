# ApraNova - Learning Management System

A comprehensive Learning Management System (LMS) built with Django REST Framework backend and Next.js frontend, featuring Docker-based workspace provisioning for students.

## 🚀 Features

- **User Management**: Multi-role authentication (Student, Trainer, Admin)
- **Workspace Provisioning**: Docker-based VS Code environments for each student
- **Course Management**: Track-based learning (Data Professional, Full Stack Development)
- **Email Verification**: Secure account creation with email verification
- **JWT Authentication**: Token-based authentication with refresh tokens
- **Responsive UI**: Modern, mobile-friendly interface built with Next.js and Tailwind CSS
- **Docker-in-Docker**: Isolated development environments for students

## 📋 Prerequisites

- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: For cloning the repository
- **Ports Available**: 3000 (Frontend), 8000 (Backend), 5433 (PostgreSQL), 6380 (Redis)

### Windows Requirements
- Windows 10/11 with WSL2 enabled
- Docker Desktop for Windows
- PowerShell 5.1 or higher

### Linux Requirements
- Docker Engine installed
- Docker Compose plugin installed
- User added to docker group: `sudo usermod -aG docker $USER`

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ApraNova
```

### 2. Environment Setup

The `.env` file is already configured with default values. Review and modify if needed:

```bash
# Windows
notepad .env

# Linux
nano .env
```

Key environment variables:
- `POSTGRES_USER`: Database username (default: apranova_user)
- `POSTGRES_PASSWORD`: Database password (default: apranova_pass)
- `POSTGRES_DB`: Database name (default: apranova_db)
- `REDIS_PASSWORD`: Redis password (default: redis_pass)
- `DEBUG`: Debug mode (default: True)

### 3. Start All Services

#### Windows (PowerShell)

```powershell
# Option 1: Using the startup script (Recommended)
.\start-all.ps1

# Option 2: Manual startup
docker-compose -f docker-compose.complete.yml up -d --build
```

#### Linux/Mac (Bash)

```bash
# Option 1: Using the startup script (Recommended)
chmod +x start-all.sh
./start-all.sh

# Option 2: Manual startup
docker-compose -f docker-compose.complete.yml up -d --build
```

### 4. Wait for Services to Start

The startup script will automatically wait for all services to be healthy. If starting manually, wait 30-60 seconds for all containers to initialize.

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin
- **API Documentation**: http://localhost:8000/swagger

## 📦 Project Structure

```
ApraNova/
├── backend/                    # Django REST Framework backend
│   ├── accounts/              # User authentication & workspace management
│   ├── core/                  # Django settings and configuration
│   ├── payments/              # Payment processing
│   ├── apra-nova-code-server/ # Code-server Docker image
│   ├── manage.py              # Django management script
│   └── requirements.txt       # Python dependencies
├── frontend/                   # Next.js frontend
│   ├── app/                   # Next.js app directory
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   ├── services/              # API service layer
│   └── package.json           # Node.js dependencies
├── docker-compose.complete.yml # Main Docker Compose file
├── .env                       # Environment variables
├── start-all.ps1              # Windows startup script
└── start-all.sh               # Linux/Mac startup script
```

## 🐳 Docker Commands

### Service Management

#### Start Services
```bash
# Windows
docker-compose -f docker-compose.complete.yml up -d

# Linux/Mac
docker-compose -f docker-compose.complete.yml up -d
```

#### Stop Services
```bash
# Windows & Linux
docker-compose -f docker-compose.complete.yml down
```

#### Restart Services
```bash
# Restart all services
docker-compose -f docker-compose.complete.yml restart

# Restart specific service
docker-compose -f docker-compose.complete.yml restart backend
docker-compose -f docker-compose.complete.yml restart frontend
```

#### View Service Status
```bash
docker-compose -f docker-compose.complete.yml ps
```

### Logs and Debugging

#### View All Logs
```bash
docker-compose -f docker-compose.complete.yml logs -f
```

#### View Specific Service Logs
```bash
# Backend logs
docker-compose -f docker-compose.complete.yml logs -f backend

# Frontend logs
docker-compose -f docker-compose.complete.yml logs -f frontend

# Database logs
docker-compose -f docker-compose.complete.yml logs -f db

# Redis logs
docker-compose -f docker-compose.complete.yml logs -f redis
```

#### View Last N Lines
```bash
# Windows PowerShell
docker logs apranova_backend --tail=50

# Linux/Mac
docker logs apranova_backend --tail 50
```

### Database Management

#### Run Migrations
```bash
docker exec apranova_backend python manage.py migrate
```

#### Create Migrations
```bash
docker exec apranova_backend python manage.py makemigrations
```

#### Create Superuser
```bash
docker exec -it apranova_backend python manage.py createsuperuser
```

#### Access Database Shell
```bash
docker exec -it apranova_db psql -U apranova_user -d apranova_db
```

#### Backup Database
```bash
# Windows PowerShell
docker exec apranova_db pg_dump -U apranova_user apranova_db > backup_$(Get-Date -Format "yyyyMMdd_HHmmss").sql

# Linux/Mac
docker exec apranova_db pg_dump -U apranova_user apranova_db > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Django Management

#### Open Django Shell
```bash
docker exec -it apranova_backend python manage.py shell
```

#### Collect Static Files
```bash
docker exec apranova_backend python manage.py collectstatic --noinput
```

#### Run Tests
```bash
docker exec apranova_backend python manage.py test
```

### Frontend Management

#### Access Frontend Shell
```bash
docker exec -it apranova_frontend /bin/sh
```

#### Install Dependencies
```bash
docker exec apranova_frontend npm install
```

#### Rebuild Frontend
```bash
docker-compose -f docker-compose.complete.yml up -d --build frontend
```

## 🔧 Workspace Provisioning

The workspace feature provides isolated Docker-based VS Code environments for students.

### Build Code-Server Image

```bash
# Navigate to code-server directory
cd backend/apra-nova-code-server

# Build the image
docker build -t apra-nova-code-server:latest .

# Return to root
cd ../..
```

### Verify Workspace Setup

```bash
# Check if backend can access Docker
docker exec apranova_backend docker ps

# View workspace containers
docker ps --filter "name=workspace_"
```

### Workspace Management

#### List All Workspaces
```bash
docker ps -a --filter "name=workspace_"
```

#### Stop a Workspace
```bash
docker stop workspace_<user_id>
```

#### Remove a Workspace
```bash
docker rm -f workspace_<user_id>
```

#### View Workspace Logs
```bash
docker logs workspace_<user_id>
```

## 🧪 Testing

### Test Signup Flow

#### Windows
```powershell
.\test_signup.ps1
```

#### Linux/Mac
```bash
chmod +x test_signup.sh
./test_signup.sh
```

### Manual Testing

1. **Signup**: http://localhost:3000/signup
   - Create a student account
   - Verify email (check backend logs for verification link)

2. **Login**: http://localhost:3000/login
   - Login with created credentials

3. **Workspace**: http://localhost:3000/student/workspace
   - Click "Launch Workspace"
   - Wait for provisioning
   - VS Code should open in new tab

## 🔍 Troubleshooting

### Services Not Starting

```bash
# Check service status
docker-compose -f docker-compose.complete.yml ps

# Check logs for errors
docker-compose -f docker-compose.complete.yml logs

# Restart services
docker-compose -f docker-compose.complete.yml restart
```

### Database Connection Issues

```bash
# Check database is running
docker ps --filter "name=apranova_db"

# Check database logs
docker logs apranova_db

# Restart database
docker-compose -f docker-compose.complete.yml restart db
```

### Frontend Build Errors

```bash
# Rebuild frontend
docker-compose -f docker-compose.complete.yml up -d --build frontend

# Check frontend logs
docker logs apranova_frontend -f
```

### Workspace Provisioning Fails

```bash
# Verify code-server image exists
docker images | grep apra-nova-code-server

# Check backend can access Docker
docker exec apranova_backend docker ps

# Check backend logs
docker logs apranova_backend --tail=50
```

### Port Already in Use

```bash
# Windows - Find process using port
netstat -ano | findstr :3000
netstat -ano | findstr :8000

# Linux/Mac - Find process using port
lsof -i :3000
lsof -i :8000

# Kill the process or change ports in docker-compose.complete.yml
```

## 🧹 Cleanup

### Stop and Remove Containers

```bash
docker-compose -f docker-compose.complete.yml down
```

### Remove Containers and Volumes

```bash
docker-compose -f docker-compose.complete.yml down -v
```

### Complete Cleanup (Including Images)

```bash
# Stop and remove everything
docker-compose -f docker-compose.complete.yml down -v --rmi all

# Remove workspace containers
docker rm -f $(docker ps -a --filter "name=workspace_" -q)

# Clean Docker system
docker system prune -af
```

## 📚 Complete Documentation

### 📖 Online Documentation (GitHub Pages)

Visit our comprehensive documentation site: **[ApraNova Documentation](https://your-org.github.io/apranova/)**

The documentation includes:
- **System Architecture** - Complete system design and component interactions
- **Authentication Flow** - User authentication and authorization diagrams
- **Workspace Provisioning** - Docker-based workspace creation flow
- **API Documentation** - Complete REST API reference
- **Database Schema** - Database design and relationships
- **Payment Processing** - Stripe integration flow

### 📄 Additional Documentation Files

- `docs/` - Complete documentation source (GitHub Pages)
- `WORKSPACE_SETUP.md` - Detailed workspace provisioning guide
- `EMAIL_VERIFICATION_SETUP.md` - Email verification configuration
- `QUICK_REFERENCE.md` - Quick command reference guide
- `backend/README.md` - Backend-specific documentation
- `frontend/README.md` - Frontend-specific documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation in the repository
- Review Docker logs for error messages

## 🔐 Security Notes

- Change default passwords in `.env` before production deployment
- Never commit `.env` file to version control
- Use strong passwords for database and Redis
- Enable HTTPS in production
- Review and update ALLOWED_HOSTS and CORS settings for production

---

**Built with ❤️ using Django, Next.js, and Docker**

