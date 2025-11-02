# 🚀 ApraNova Workspace Setup Guide

This guide explains how to set up and use the student workspace provisioning feature.

## 📋 Overview

The workspace feature provides each student with their own isolated VS Code environment (code-server) running in a Docker container. Students can write, run, and test code directly in their browser.

## 🏗️ Architecture

```
┌─────────────────┐
│   Student       │
│   Browser       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Frontend      │
│   (Next.js)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│   Backend       │─────▶│  Docker Engine   │
│   (Django)      │      │  (via socket)    │
└─────────────────┘      └────────┬─────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    ▼                           ▼
            ┌───────────────┐          ┌───────────────┐
            │  Workspace 1  │          │  Workspace 2  │
            │  (code-server)│          │  (code-server)│
            └───────────────┘          └───────────────┘
```

## 🔧 Setup Instructions

### Option 1: Quick Start (Recommended)

Use the automated startup script:

**Windows (PowerShell):**
```powershell
cd C:\Users\Admin\Desktop\frontend\ApraNova
.\start-all.ps1
```

**Linux/Mac:**
```bash
cd /path/to/ApraNova
chmod +x start-all.sh
./start-all.sh
```

This script will:
1. Build the code-server image
2. Build the backend with Docker-in-Docker support
3. Build the frontend
4. Start all services
5. Wait for health checks
6. Display service status

### Option 2: Manual Setup

#### Step 1: Build Code-Server Image

```bash
cd C:\Users\Admin\Desktop\frontend\ApraNova
docker build -t apra-nova-code-server:latest ./backend/apra-nova-code-server
```

#### Step 2: Build and Start Services

```bash
docker-compose -f docker-compose.complete.yml build
docker-compose -f docker-compose.complete.yml up -d
```

#### Step 3: Verify Services

```bash
docker-compose -f docker-compose.complete.yml ps
```

All services should show as "Up" or "healthy".

## 🧪 Testing the Workspace Feature

### 1. Create a Student Account

1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Name: Test Student
   - Email: student@test.com
   - Password: TestPass123!@#
   - Role: Student
   - Track: DP or FSD
3. Check "I agree to Terms & Conditions"
4. Click "Create Account"

### 2. Login

1. Go to http://localhost:3000/login
2. Enter credentials
3. Click "Login"

### 3. Launch Workspace

1. Navigate to the Student Dashboard
2. Click on "Workspace" in the sidebar
3. Click "Launch Workspace"
4. Wait for provisioning (3-5 seconds)
5. A new tab will open with your VS Code environment

### 4. Verify Workspace

In the code-server window, you should see:
- VS Code interface
- File explorer
- Terminal access
- Extensions panel

## 🔍 Troubleshooting

### Issue: "Docker is not accessible"

**Cause:** The backend container doesn't have permission to access Docker.

**Solution:**
1. Check if Docker socket is mounted:
   ```bash
   docker exec apranova_backend ls -la /var/run/docker.sock
   ```

2. Check if django user is in docker group:
   ```bash
   docker exec apranova_backend groups django
   ```

3. Rebuild backend:
   ```bash
   docker-compose -f docker-compose.complete.yml build backend
   docker-compose -f docker-compose.complete.yml up -d backend
   ```

### Issue: "Code-server image not found"

**Cause:** The apra-nova-code-server image hasn't been built.

**Solution:**
```bash
docker build -t apra-nova-code-server:latest ./backend/apra-nova-code-server
```

### Issue: Workspace container won't start

**Cause:** Port conflict or network issue.

**Solution:**
1. Check available ports:
   ```bash
   docker ps
   ```

2. Check Docker networks:
   ```bash
   docker network ls
   docker network inspect apranova_network
   ```

3. Restart all services:
   ```bash
   docker-compose -f docker-compose.complete.yml restart
   ```

### Issue: Can't access workspace URL

**Cause:** Port not exposed or container not running.

**Solution:**
1. Check workspace container:
   ```bash
   docker ps | grep workspace_
   ```

2. Check logs:
   ```bash
   docker logs workspace_<user_id>
   ```

3. Verify port mapping:
   ```bash
   docker port workspace_<user_id>
   ```

## 📊 Monitoring

### View All Containers

```bash
docker ps -a
```

### View Backend Logs

```bash
docker logs apranova_backend -f
```

### View Workspace Logs

```bash
docker logs workspace_<user_id> -f
```

### View All Service Logs

```bash
docker-compose -f docker-compose.complete.yml logs -f
```

## 🛠️ Configuration

### Environment Variables

Add to `.env` file:

```env
# Workspace Configuration
WORKSPACE_BASE_PATH=/app/workspaces
DEBUG=True
```

### Workspace Storage

Workspaces are stored in a Docker volume: `apranova_workspace_data`

To backup workspace data:
```bash
docker run --rm -v apranova_workspace_data:/data -v $(pwd):/backup alpine tar czf /backup/workspaces-backup.tar.gz /data
```

To restore workspace data:
```bash
docker run --rm -v apranova_workspace_data:/data -v $(pwd):/backup alpine tar xzf /backup/workspaces-backup.tar.gz -C /
```

## 🔒 Security Considerations

1. **Password Protection:** Each workspace is password-protected with `{user_id}_workspace`
2. **Network Isolation:** Workspaces run on the same Docker network but are isolated from each other
3. **Resource Limits:** Consider adding resource limits in production:

```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 1G
```

## 🚀 Production Deployment

For production, consider:

1. **Domain-based URLs:** Use subdomains like `workspace-{user_id}.apranova.com`
2. **SSL/TLS:** Add HTTPS support with Let's Encrypt
3. **Resource Limits:** Set CPU and memory limits per workspace
4. **Auto-cleanup:** Implement automatic cleanup of inactive workspaces
5. **Monitoring:** Add monitoring for workspace health and resource usage

## 📝 API Endpoints

### Create/Get Workspace

```
POST /api/users/workspace/create/
```

**Response (Success):**
```json
{
  "url": "http://localhost:8080",
  "port": 8080,
  "msg": "Workspace created successfully."
}
```

**Response (Error):**
```json
{
  "error": "Docker is not accessible",
  "message": "Detailed error message",
  "details": "Additional information"
}
```

## 🎯 Next Steps

1. ✅ Set up workspace provisioning
2. ✅ Test workspace creation
3. 🔄 Add workspace management (stop, restart, delete)
4. 🔄 Add resource monitoring
5. 🔄 Add workspace templates
6. 🔄 Add collaborative features

## 📚 Additional Resources

- [code-server Documentation](https://coder.com/docs/code-server)
- [Docker-in-Docker Best Practices](https://jpetazzo.github.io/2015/09/03/do-not-use-docker-in-docker-for-ci/)
- [Docker SDK for Python](https://docker-py.readthedocs.io/)

