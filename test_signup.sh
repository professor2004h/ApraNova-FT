#!/bin/bash

# Test Signup API Endpoint
# This script tests the signup functionality

echo "========================================="
echo "Testing ApraNova Signup API"
echo "========================================="
echo ""

# Test 1: Successful Signup
echo "Test 1: Successful Signup"
echo "-----------------------------------------"
curl -X POST http://localhost:8000/api/auth/registration/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1@example.com",
    "name": "Test User 1",
    "email": "testuser1@example.com",
    "password1": "TestPass123!@#",
    "password2": "TestPass123!@#",
    "role": "student",
    "track": "web-development"
  }' | python -m json.tool

echo ""
echo ""

# Test 2: Login with the created user
echo "Test 2: Login with Created User"
echo "-----------------------------------------"
curl -X POST http://localhost:8000/api/users/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser1@example.com",
    "password": "TestPass123!@#",
    "role": "student"
  }' | python -m json.tool

echo ""
echo ""

# Test 3: Duplicate Email (Should Fail)
echo "Test 3: Duplicate Email (Should Fail)"
echo "-----------------------------------------"
curl -X POST http://localhost:8000/api/auth/registration/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser1@example.com",
    "name": "Test User 1 Duplicate",
    "email": "testuser1@example.com",
    "password1": "TestPass123!@#",
    "password2": "TestPass123!@#",
    "role": "student",
    "track": "web-development"
  }' | python -m json.tool

echo ""
echo ""

# Test 4: Password Mismatch (Should Fail)
echo "Test 4: Password Mismatch (Should Fail)"
echo "-----------------------------------------"
curl -X POST http://localhost:8000/api/auth/registration/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2@example.com",
    "name": "Test User 2",
    "email": "testuser2@example.com",
    "password1": "TestPass123!@#",
    "password2": "DifferentPass123!@#",
    "role": "student",
    "track": "web-development"
  }' | python -m json.tool

echo ""
echo ""

echo "========================================="
echo "Tests Completed!"
echo "========================================="

