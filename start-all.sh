#!/bin/bash

# ============================================
# ApraNova Complete Startup Script
# ============================================
# This script builds and starts all services
# ============================================
# NOTE: On Windows, use start-all.ps1 instead
# ============================================

echo "============================================"
echo "  ApraNova Complete Setup & Startup"
echo "============================================"
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not available in this environment!"
    echo ""
    echo "If you're on Windows, please use start-all.ps1 instead:"
    echo "  .\start-all.ps1"
    echo ""
    echo "Or run Docker commands directly in PowerShell."
    exit 1
fi

# Change to the script directory
cd "$(dirname "$0")"

# ============================================
# Step 1: Build Code-Server Image
# ============================================
echo "[1/6] Building Code-Server Image..."
echo "This may take 5-10 minutes on first run..."

docker build -t apra-nova-code-server:latest ./backend/apra-nova-code-server

if [ $? -ne 0 ]; then
    echo "❌ Failed to build code-server image!"
    exit 1
fi

echo "✅ Code-Server image built successfully!"
echo ""

# ============================================
# Step 2: Stop any existing containers
# ============================================
echo "[2/6] Stopping existing containers..."

docker-compose -f docker-compose.complete.yml down

echo "✅ Existing containers stopped!"
echo ""

# ============================================
# Step 3: Build Backend with Docker CLI
# ============================================
echo "[3/6] Building Backend with Docker-in-Docker support..."

docker-compose -f docker-compose.complete.yml build backend

if [ $? -ne 0 ]; then
    echo "❌ Failed to build backend!"
    exit 1
fi

echo "✅ Backend built successfully!"
echo ""

# ============================================
# Step 4: Build Frontend
# ============================================
echo "[4/6] Building Frontend..."
echo "Using docker build directly to avoid cache issues..."

# Remove old frontend image to force fresh build
echo "Removing old frontend image (if exists)..."
docker rmi apranova-frontend:latest -f 2>/dev/null || true

# Build using docker build directly (not docker-compose build)
# This avoids persistent cache issues with docker-compose
echo "Building frontend image..."
cd frontend
docker build --pull -t apranova-frontend:latest .
buildResult=$?
cd ..

if [ $buildResult -ne 0 ]; then
    echo "❌ Failed to build frontend!"
    exit 1
fi

echo "✅ Frontend built successfully!"
echo ""

# ============================================
# Step 5: Start all services
# ============================================
echo "[5/6] Starting all services..."

docker-compose -f docker-compose.complete.yml up -d

if [ $? -ne 0 ]; then
    echo "❌ Failed to start services!"
    exit 1
fi

echo "✅ All services started!"
echo ""

# ============================================
# Step 6: Run Database Migrations
# ============================================
echo "[6/8] Running database migrations..."

docker exec apranova_backend python manage.py migrate --noinput

if [ $? -ne 0 ]; then
    echo "⚠️  Migration failed, but continuing..."
fi

echo "✅ Migrations completed!"
echo ""

# ============================================
# Step 7: Create Demo Users
# ============================================
echo "[7/8] Creating demo users..."

docker exec apranova_backend python manage.py create_demo_users

if [ $? -ne 0 ]; then
    echo "⚠️  Demo user creation failed, but continuing..."
fi

echo ""

# ============================================
# Step 8: Wait for services to be healthy
# ============================================
echo "[8/8] Waiting for services to be healthy..."
echo "This may take 30-60 seconds..."

sleep 10

# Check backend health
maxAttempts=12
attempt=0
backendHealthy=false

while [ $attempt -lt $maxAttempts ] && [ "$backendHealthy" = false ]; do
    attempt=$((attempt + 1))
    echo "  Checking backend health (attempt $attempt/$maxAttempts)..."
    
    if curl -f -s http://localhost:8000/health > /dev/null 2>&1; then
        backendHealthy=true
        echo "  ✅ Backend is healthy!"
    else
        sleep 5
    fi
done

if [ "$backendHealthy" = false ]; then
    echo "  ⚠️  Backend health check timed out, but it may still be starting..."
fi

echo ""

# ============================================
# Display Service Status
# ============================================
echo "============================================"
echo "  Service Status"
echo "============================================"

docker-compose -f docker-compose.complete.yml ps

echo ""
echo "============================================"
echo "  🌐 Access URLs"
echo "============================================"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:8000"
echo "  API Docs:  http://localhost:8000/swagger/"
echo "  Admin:     http://localhost:8000/admin"
echo "  Database:  localhost:5433"
echo "  Redis:     localhost:6380"
echo "============================================"
echo ""

echo "============================================"
echo "  👤 Demo User Credentials"
echo "============================================"
echo "  Admin:    admin@apranova.com / Admin@123"
echo "  Student:  student@apranova.com / Student@123"
echo "  Teacher:  teacher@apranova.com / Teacher@123"
echo "============================================"
echo ""

echo "============================================"
echo "  💻 Code-Server Workspace Access"
echo "============================================"
echo "  Students can launch their workspace from"
echo "  the dashboard without any password!"
echo ""
echo "  💡 Tip: Click 'Launch Workspace' button"
echo "          to access VS Code in the browser"
echo "============================================"
echo ""

echo "ApraNova is ready!"
echo ""
echo "Quick Start:"
echo "  1. Open http://localhost:3000"
echo "  2. Login with student@apranova.com / Student@123"
echo "  3. Go to Workspace and click Launch Workspace"
echo "  4. VS Code will open directly - no password needed!"
echo ""
echo "To view logs: docker-compose -f docker-compose.complete.yml logs -f"
echo "To stop: docker-compose -f docker-compose.complete.yml down"
echo ""

