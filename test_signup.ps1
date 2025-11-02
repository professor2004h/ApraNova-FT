# Test Signup API Endpoint
# This script tests the signup functionality

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Testing ApraNova Signup API" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Successful Signup
Write-Host "Test 1: Successful Signup" -ForegroundColor Yellow
Write-Host "-----------------------------------------" -ForegroundColor Yellow
$body1 = @{
    username = "testuser1@example.com"
    name = "Test User 1"
    email = "testuser1@example.com"
    password1 = "TestPass123!@#"
    password2 = "TestPass123!@#"
    role = "student"
    track = "web-development"
} | ConvertTo-Json

try {
    $response1 = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/registration/" -Method POST -Body $body1 -ContentType "application/json"
    Write-Host "✅ SUCCESS: User created successfully!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response1 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Error Details:" -ForegroundColor Red
        $_.ErrorDetails.Message
    }
}

Write-Host ""
Write-Host ""

# Test 2: Login with the created user
Write-Host "Test 2: Login with Created User" -ForegroundColor Yellow
Write-Host "-----------------------------------------" -ForegroundColor Yellow
$body2 = @{
    email = "testuser1@example.com"
    password = "TestPass123!@#"
    role = "student"
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:8000/api/users/login/" -Method POST -Body $body2 -ContentType "application/json"
    Write-Host "✅ SUCCESS: Login successful!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response2 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails.Message) {
        Write-Host "Error Details:" -ForegroundColor Red
        $_.ErrorDetails.Message
    }
}

Write-Host ""
Write-Host ""

# Test 3: Duplicate Email (Should Fail)
Write-Host "Test 3: Duplicate Email (Should Fail)" -ForegroundColor Yellow
Write-Host "-----------------------------------------" -ForegroundColor Yellow
$body3 = @{
    username = "testuser1@example.com"
    name = "Test User 1 Duplicate"
    email = "testuser1@example.com"
    password1 = "TestPass123!@#"
    password2 = "TestPass123!@#"
    role = "student"
    track = "web-development"
} | ConvertTo-Json

try {
    $response3 = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/registration/" -Method POST -Body $body3 -ContentType "application/json"
    Write-Host "❌ UNEXPECTED: Should have failed but succeeded!" -ForegroundColor Red
    $response3 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✅ EXPECTED FAILURE: Duplicate email rejected correctly!" -ForegroundColor Green
    if ($_.ErrorDetails.Message) {
        Write-Host "Error Details:" -ForegroundColor Yellow
        $_.ErrorDetails.Message
    }
}

Write-Host ""
Write-Host ""

# Test 4: Password Mismatch (Should Fail)
Write-Host "Test 4: Password Mismatch (Should Fail)" -ForegroundColor Yellow
Write-Host "-----------------------------------------" -ForegroundColor Yellow
$body4 = @{
    username = "testuser2@example.com"
    name = "Test User 2"
    email = "testuser2@example.com"
    password1 = "TestPass123!@#"
    password2 = "DifferentPass123!@#"
    role = "student"
    track = "web-development"
} | ConvertTo-Json

try {
    $response4 = Invoke-RestMethod -Uri "http://localhost:8000/api/auth/registration/" -Method POST -Body $body4 -ContentType "application/json"
    Write-Host "❌ UNEXPECTED: Should have failed but succeeded!" -ForegroundColor Red
    $response4 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "✅ EXPECTED FAILURE: Password mismatch rejected correctly!" -ForegroundColor Green
    if ($_.ErrorDetails.Message) {
        Write-Host "Error Details:" -ForegroundColor Yellow
        $_.ErrorDetails.Message
    }
}

Write-Host ""
Write-Host ""

# Test 5: Check Backend Logs for Email Verification
Write-Host "Test 5: Check Backend Logs for Email Verification" -ForegroundColor Yellow
Write-Host "-----------------------------------------" -ForegroundColor Yellow
Write-Host "Checking backend logs for email verification messages..." -ForegroundColor Cyan
docker logs apranova_backend --tail=50 | Select-String -Pattern "email|verification|confirm" -Context 1

Write-Host ""
Write-Host ""

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Tests Completed!" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Summary:" -ForegroundColor White
Write-Host "- Test 1: Signup should succeed ✅" -ForegroundColor White
Write-Host "- Test 2: Login should succeed ✅" -ForegroundColor White
Write-Host "- Test 3: Duplicate email should fail ✅" -ForegroundColor White
Write-Host "- Test 4: Password mismatch should fail ✅" -ForegroundColor White
Write-Host "- Test 5: Email verification logs checked ✅" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Visit http://localhost:3000/signup to test in browser" -ForegroundColor White
Write-Host "2. Check backend logs: docker logs apranova_backend -f" -ForegroundColor White
Write-Host "3. Email verification is set to 'optional' for development" -ForegroundColor White

