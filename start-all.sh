#!/bin/bash

# ============================================
# ApraNova Complete Startup Script
# ============================================
# This script builds and starts all services
# ============================================

echo "============================================"
echo "  ApraNova Complete Setup & Startup"
echo "============================================"
echo ""

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

docker-compose -f docker-compose.complete.yml build frontend

if [ $? -ne 0 ]; then
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
# Step 6: Wait for services to be healthy
# ============================================
echo "[6/6] Waiting for services to be healthy..."
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
echo "  Access URLs"
echo "============================================"
echo "  Frontend:  http://localhost:3000"
echo "  Backend:   http://localhost:8000"
echo "  API Docs:  http://localhost:8000/swagger/"
echo "  Database:  localhost:5433"
echo "  Redis:     localhost:6380"
echo "============================================"
echo ""

echo "✅ ApraNova is ready!"
echo ""
echo "To view logs: docker-compose -f docker-compose.complete.yml logs -f"
echo "To stop:      docker-compose -f docker-compose.complete.yml down"
echo ""

