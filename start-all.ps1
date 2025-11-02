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

docker-compose -f docker-compose.complete.yml build frontend

if ($LASTEXITCODE -ne 0) {
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
# Step 6: Wait for services to be healthy
# ============================================
Write-Host "[6/6] Waiting for services to be healthy..." -ForegroundColor Yellow
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
Write-Host "  Access URLs" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Frontend:  http://localhost:3000" -ForegroundColor Green
Write-Host "  Backend:   http://localhost:8000" -ForegroundColor Green
Write-Host "  API Docs:  http://localhost:8000/swagger/" -ForegroundColor Green
Write-Host "  Database:  localhost:5433" -ForegroundColor Green
Write-Host "  Redis:     localhost:6380" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "✅ ApraNova is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "To view logs: docker-compose -f docker-compose.complete.yml logs -f" -ForegroundColor Gray
Write-Host "To stop:      docker-compose -f docker-compose.complete.yml down" -ForegroundColor Gray
Write-Host ""

