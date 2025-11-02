# ApraNova Setup Script
# Run this script to set up the entire project

Write-Host "========================================" -ForegroundColor Blue
Write-Host "ApraNova Project Setup" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""

# Check if Docker is running
Write-Host "Checking Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running" -ForegroundColor Red
    Write-Host "Starting Docker Desktop..." -ForegroundColor Yellow
    Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    Write-Host "Waiting for Docker to start (60 seconds)..." -ForegroundColor Yellow
    Start-Sleep -Seconds 60
    
    # Check again
    try {
        docker ps | Out-Null
        Write-Host "✓ Docker is now running" -ForegroundColor Green
    } catch {
        Write-Host "✗ Docker failed to start. Please start Docker Desktop manually and run this script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Check if .env exists
if (-not (Test-Path .env)) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    
    # Generate secure SECRET_KEY
    Write-Host "Generating secure SECRET_KEY..." -ForegroundColor Yellow
    $secretKey = -join ((65..90) + (97..122) + (48..57) + @(33,35,36,37,38,42,43,45,61,63,64,94) | Get-Random -Count 50 | ForEach-Object {[char]$_})
    
    # Generate secure passwords
    Write-Host "Generating secure passwords..." -ForegroundColor Yellow
    $postgresPass = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 24 | ForEach-Object {[char]$_})
    $redisPass = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 24 | ForEach-Object {[char]$_})
    
    # Update .env file
    (Get-Content .env) `
        -replace 'SECRET_KEY=django-insecure-change-this-in-production-use-strong-random-key', "SECRET_KEY=$secretKey" `
        -replace 'POSTGRES_PASSWORD=change_this_secure_password_123', "POSTGRES_PASSWORD=$postgresPass" `
        -replace 'REDIS_PASSWORD=change_this_redis_password_456', "REDIS_PASSWORD=$redisPass" `
        -replace 'change_this_secure_password_123', $postgresPass `
        -replace 'change_this_redis_password_456', $redisPass `
        -replace 'DEBUG=False', 'DEBUG=True' |
        Set-Content .env
    
    Write-Host "✓ .env file created with secure credentials" -ForegroundColor Green
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

Write-Host ""

# Build containers
Write-Host "Building Docker containers..." -ForegroundColor Yellow
Write-Host "(This may take several minutes on first run)" -ForegroundColor Cyan
docker-compose build
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Containers built successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to build containers" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Start services
Write-Host "Starting services..." -ForegroundColor Yellow
docker-compose up -d
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Services started" -ForegroundColor Green
} else {
    Write-Host "✗ Failed to start services" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Wait for database to be ready
Write-Host "Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Run migrations
Write-Host "Running database migrations..." -ForegroundColor Yellow
docker-compose exec -T backend python manage.py migrate
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Migrations completed" -ForegroundColor Green
} else {
    Write-Host "⚠ Migrations may have failed. Check logs with: docker-compose logs backend" -ForegroundColor Yellow
}

Write-Host ""

# Initialize APROVOVA
Write-Host "Initializing APROVOVA directory..." -ForegroundColor Yellow
docker-compose exec -T backend python scripts/init_aprovova.py
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ APROVOVA initialized" -ForegroundColor Green
} else {
    Write-Host "⚠ APROVOVA initialization may have failed" -ForegroundColor Yellow
}

Write-Host ""

# Collect static files
Write-Host "Collecting static files..." -ForegroundColor Yellow
docker-compose exec -T backend python manage.py collectstatic --noinput
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Static files collected" -ForegroundColor Green
} else {
    Write-Host "⚠ Static files collection may have failed" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Blue
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Blue
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a superuser:" -ForegroundColor White
Write-Host "   docker-compose exec backend python manage.py createsuperuser" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Access your application:" -ForegroundColor White
Write-Host "   Frontend:     http://localhost:3000/" -ForegroundColor Gray
Write-Host "   Backend API:  http://localhost:8000/" -ForegroundColor Gray
Write-Host "   Admin Panel:  http://localhost:8000/admin/" -ForegroundColor Gray
Write-Host "   API Docs:     http://localhost:8000/swagger/" -ForegroundColor Gray
Write-Host "   Health Checks:" -ForegroundColor Gray
Write-Host "     - Backend:  http://localhost:8000/health" -ForegroundColor Gray
Write-Host "     - Frontend: http://localhost:3000/api/health" -ForegroundColor Gray
Write-Host ""
Write-Host "3. View logs:" -ForegroundColor White
Write-Host "   docker-compose logs -f" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Stop services:" -ForegroundColor White
Write-Host "   docker-compose down" -ForegroundColor Gray
Write-Host ""
Write-Host "For more commands, see: make help" -ForegroundColor Cyan
Write-Host ""

