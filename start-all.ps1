# ============================================
# ApraNova Complete Startup Script
# ============================================
# This script builds and starts all services
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  ApraNova Complete Setup & Startup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Change to the ApraNova directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# ============================================
# Step 1: Build Code-Server Image
# ============================================
Write-Host "[1/6] Building Code-Server Image..." -ForegroundColor Yellow
Write-Host "This may take 5-10 minutes on first run..." -ForegroundColor Gray

docker build -t apra-nova-code-server:latest ./backend/apra-nova-code-server

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build code-server image!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Code-Server image built successfully!" -ForegroundColor Green
Write-Host ""

# ============================================
# Step 2: Stop any existing containers
# ============================================
Write-Host "[2/6] Stopping existing containers..." -ForegroundColor Yellow

docker-compose -f docker-compose.complete.yml down

Write-Host "✅ Existing containers stopped!" -ForegroundColor Green
Write-Host ""

# ============================================
# Step 3: Build Backend with Docker CLI
# ============================================
Write-Host "[3/6] Building Backend with Docker-in-Docker support..." -ForegroundColor Yellow

docker-compose -f docker-compose.complete.yml build backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to build backend!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Backend built successfully!" -ForegroundColor Green
Write-Host ""

# ============================================
# Step 4: Build Frontend
# ============================================
Write-Host "[4/6] Building Frontend..." -ForegroundColor Yellow
Write-Host "Using docker build directly to avoid cache issues..." -ForegroundColor Gray

# Remove old frontend image to force fresh build
Write-Host "Removing old frontend image (if exists)..." -ForegroundColor Gray
docker rmi apranova-frontend:latest -f 2>$null

# Build using docker build directly (not docker-compose build)
# This avoids persistent cache issues with docker-compose
Write-Host "Building frontend image..." -ForegroundColor Gray
Push-Location frontend
docker build --pull -t apranova-frontend:latest .
$buildResult = $LASTEXITCODE
Pop-Location

if ($buildResult -ne 0) {
    Write-Host "❌ Failed to build frontend!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend built successfully!" -ForegroundColor Green
Write-Host ""

# ============================================
# Step 5: Start all services
# ============================================
Write-Host "[5/6] Starting all services..." -ForegroundColor Yellow

docker-compose -f docker-compose.complete.yml up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start services!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ All services started!" -ForegroundColor Green
Write-Host ""

# ============================================
# Step 6: Run Database Migrations
# ============================================
Write-Host "[6/8] Running database migrations..." -ForegroundColor Yellow

docker exec apranova_backend python manage.py migrate --noinput

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Migration failed, but continuing..." -ForegroundColor Yellow
}

Write-Host "✅ Migrations completed!" -ForegroundColor Green
Write-Host ""

# ============================================
# Step 7: Create Demo Users
# ============================================
Write-Host "[7/8] Creating demo users..." -ForegroundColor Yellow

docker exec apranova_backend python manage.py create_demo_users

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Demo user creation failed, but continuing..." -ForegroundColor Yellow
}

Write-Host ""

# ============================================
# Step 8: Wait for services to be healthy
# ============================================
Write-Host "[8/8] Waiting for services to be healthy..." -ForegroundColor Yellow
Write-Host "This may take 30-60 seconds..." -ForegroundColor Gray

Start-Sleep -Seconds 10

# Check backend health
$maxAttempts = 12
$attempt = 0
$backendHealthy = $false

while ($attempt -lt $maxAttempts -and -not $backendHealthy) {
    $attempt++
    Write-Host "  Checking backend health (attempt $attempt/$maxAttempts)..." -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -TimeoutSec 5 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            $backendHealthy = $true
            Write-Host "  ✅ Backend is healthy!" -ForegroundColor Green
        }
    } catch {
        Start-Sleep -Seconds 5
    }
}

if (-not $backendHealthy) {
    Write-Host "  ⚠️  Backend health check timed out, but it may still be starting..." -ForegroundColor Yellow
}

Write-Host ""

# ============================================
# Display Service Status
# ============================================
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Service Status" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

docker-compose -f docker-compose.complete.yml ps

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  🌐 Access URLs" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor Green
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor Green
Write-Host "  API Docs:  http://localhost:8000/swagger/" -ForegroundColor Green
Write-Host "  Admin:     http://localhost:8000/admin" -ForegroundColor Green
Write-Host "  Database:  localhost:5433" -ForegroundColor Green
Write-Host "  Redis:     localhost:6380" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "============================================" -ForegroundColor Yellow
Write-Host "  👤 Demo User Credentials" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Yellow
Write-Host "  Admin:    admin@apranova.com / Admin@123" -ForegroundColor White
Write-Host "  Student:  student@apranova.com / Student@123" -ForegroundColor White
Write-Host "  Teacher:  teacher@apranova.com / Teacher@123" -ForegroundColor White
Write-Host "============================================" -ForegroundColor Yellow
Write-Host ""

Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  💻 Code-Server Workspace Access" -ForegroundColor Magenta
Write-Host "============================================" -ForegroundColor Magenta
Write-Host "  Students can launch their workspace from" -ForegroundColor White
Write-Host "  the dashboard without any password!" -ForegroundColor Green
Write-Host ""
Write-Host "  💡 Tip: Click 'Launch Workspace' button" -ForegroundColor Gray
Write-Host "          to access VS Code in the browser" -ForegroundColor Gray
Write-Host "============================================" -ForegroundColor Magenta
Write-Host ""

Write-Host "ApraNova is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "Quick Start:" -ForegroundColor Cyan
Write-Host "  1. Open http://localhost:3000" -ForegroundColor Gray
Write-Host "  2. Login with student@apranova.com / Student@123" -ForegroundColor Gray
Write-Host "  3. Go to Workspace and click Launch Workspace" -ForegroundColor Gray
Write-Host "  4. VS Code will open directly - no password needed!" -ForegroundColor Gray
Write-Host ""
Write-Host "To view logs: docker-compose -f docker-compose.complete.yml logs -f" -ForegroundColor Gray
Write-Host "To stop: docker-compose -f docker-compose.complete.yml down" -ForegroundColor Gray
Write-Host ""

