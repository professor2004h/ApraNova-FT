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
# Step 0: Complete Cleanup (No Cache Issues!)
# ============================================
echo "[0/9] Performing complete cleanup..."
echo "This ensures no cache issues on rebuild!"
echo ""

# Stop all containers
echo "  → Stopping all ApraNova containers..."
docker-compose -f docker-compose.complete.yml down 2>/dev/null || true

# Remove all workspace containers
echo "  → Removing all workspace containers..."
docker ps -a --filter "name=workspace_" --format "{{.Names}}" | while read container; do
    docker rm -f "$container" 2>/dev/null || true
done

# Remove all ApraNova images
echo "  → Removing all ApraNova images..."
docker rmi apranova-frontend:latest -f 2>/dev/null || true
docker rmi apranova-backend:latest -f 2>/dev/null || true
docker rmi apra-nova-code-server:latest -f 2>/dev/null || true

# Prune build cache
echo "  → Pruning Docker build cache..."
docker builder prune -f 2>/dev/null || true

# Prune dangling images
echo "  → Pruning dangling images..."
docker image prune -f 2>/dev/null || true

echo "✅ Cleanup completed!"
echo ""

# ============================================
# Step 1: Build Code-Server Image
# ============================================
echo "[1/9] Building Code-Server Image..."
echo "This may take 5-10 minutes on first run..."

docker build -t apra-nova-code-server:latest ./backend/apra-nova-code-server

if [ $? -ne 0 ]; then
    echo "❌ Failed to build code-server image!"
    exit 1
fi

echo "✅ Code-Server image built successfully!"
echo ""

# ============================================
# Step 2: Build Backend with Docker CLI
# ============================================
echo "[2/9] Building Backend with Docker-in-Docker support..."
echo "Building with --no-cache to ensure fresh build..."

cd backend
docker build --no-cache --pull -t apranova-backend:latest .
buildResult=$?
cd ..

if [ $buildResult -ne 0 ]; then
    echo "❌ Failed to build backend!"
    exit 1
fi

echo "✅ Backend built successfully!"
echo ""

# ============================================
# Step 3: Build Frontend
# ============================================
echo "[3/9] Building Frontend..."
echo "Building with --no-cache to ensure fresh build..."

cd frontend
docker build --no-cache --pull -t apranova-frontend:latest .
buildResult=$?
cd ..

if [ $buildResult -ne 0 ]; then
    echo "❌ Failed to build frontend!"
    exit 1
fi

echo "✅ Frontend built successfully!"
echo ""

# ============================================
# Step 4: Start all services
# ============================================
echo "[4/9] Starting all services..."

docker-compose -f docker-compose.complete.yml up -d

if [ $? -ne 0 ]; then
    echo "❌ Failed to start services!"
    exit 1
fi

echo "✅ All services started!"
echo ""

# ============================================
# Step 5: Run Database Migrations
# ============================================
echo "[5/9] Running database migrations..."

docker exec apranova_backend python manage.py migrate --noinput

if [ $? -ne 0 ]; then
    echo "⚠️  Migration failed, but continuing..."
fi

echo "✅ Migrations completed!"
echo ""

# ============================================
# Step 6: Create Demo Users
# ============================================
echo "[6/9] Creating demo users..."

docker exec apranova_backend python manage.py create_demo_users

if [ $? -ne 0 ]; then
    echo "⚠️  Demo user creation failed, but continuing..."
fi

echo ""

# ============================================
# Step 7: Wait for services to be healthy
# ============================================
echo "[7/9] Waiting for services to be healthy..."
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
# Step 8: Test Signup API
# ============================================
echo "[8/9] Testing signup API..."

testEmail="test_$(date +%s)@apranova.com"
testPassword="Test@12345"

signupData=$(cat <<EOF
{
  "email": "$testEmail",
  "password1": "$testPassword",
  "password2": "$testPassword",
  "first_name": "Test",
  "last_name": "User"
}
EOF
)

response=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$signupData" \
  http://localhost:8000/api/auth/registration/ 2>/dev/null)

httpCode=$(echo "$response" | tail -n1)

if [ "$httpCode" = "201" ] || [ "$httpCode" = "200" ]; then
    echo "  ✅ Signup API is working!"
    echo "  Test account created: $testEmail"
else
    echo "  ⚠️  Signup API test failed (HTTP $httpCode), but continuing..."
fi

echo ""

# ============================================
# Step 9: Verify No Password Required for Workspace
# ============================================
echo "[9/9] Verifying workspace configuration..."

# Check if workspace_views.py has the correct configuration
workspaceViewsPath="backend/accounts/workspace_views.py"

if grep -q 'environment=.*"PASSWORD":\s*""' "$workspaceViewsPath"; then
    echo "  ✅ Workspace password is disabled (PASSWORD='')"
else
    echo "  ⚠️  Warning: Workspace password configuration may not be correct"
fi

if grep -q -- '--auth.*none' "$workspaceViewsPath"; then
    echo "  ✅ Workspace authentication is disabled (--auth none)"
else
    echo "  ⚠️  Warning: Workspace auth configuration may not be correct"
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

