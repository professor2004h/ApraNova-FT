#!/usr/bin/env pwsh
# ============================================
# Pre-Commit Verification Script
# ============================================
# Run this before committing to GitHub to verify
# no sensitive data is being committed

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║        🔍 PRE-COMMIT VERIFICATION CHECK 🔍                     ║" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# ============================================
# 1. Check for .env files
# ============================================
Write-Host "1. Checking for .env files..." -ForegroundColor Yellow

$envFiles = Get-ChildItem -Path . -Filter ".env*" -Recurse -File | Where-Object { $_.Name -ne ".env.example" -and $_.Name -ne ".env.sample" }

if ($envFiles) {
    Write-Host "   ❌ CRITICAL: Found .env files that should NOT be committed:" -ForegroundColor Red
    foreach ($file in $envFiles) {
        Write-Host "      - $($file.FullName)" -ForegroundColor Red
    }
    $errors++
} else {
    Write-Host "   ✅ No .env files found (good!)" -ForegroundColor Green
}

# ============================================
# 2. Check for SSL certificates
# ============================================
Write-Host ""
Write-Host "2. Checking for SSL certificates..." -ForegroundColor Yellow

$certFiles = Get-ChildItem -Path . -Include "*.pem","*.crt","*.key","*.csr" -Recurse -File

if ($certFiles) {
    Write-Host "   ⚠️  WARNING: Found SSL certificate files:" -ForegroundColor Yellow
    foreach ($file in $certFiles) {
        Write-Host "      - $($file.FullName)" -ForegroundColor Yellow
    }
    Write-Host "   Make sure these are in .gitignore!" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "   ✅ No SSL certificates found" -ForegroundColor Green
}

# ============================================
# 3. Check for database files
# ============================================
Write-Host ""
Write-Host "3. Checking for database files..." -ForegroundColor Yellow

$dbFiles = Get-ChildItem -Path . -Include "*.sqlite3","*.db","*.sql" -Recurse -File

if ($dbFiles) {
    Write-Host "   ⚠️  WARNING: Found database files:" -ForegroundColor Yellow
    foreach ($file in $dbFiles) {
        Write-Host "      - $($file.FullName)" -ForegroundColor Yellow
    }
    $warnings++
} else {
    Write-Host "   ✅ No database files found" -ForegroundColor Green
}

# ============================================
# 4. Check for node_modules
# ============================================
Write-Host ""
Write-Host "4. Checking for node_modules..." -ForegroundColor Yellow

$nodeModules = Get-ChildItem -Path . -Filter "node_modules" -Recurse -Directory

if ($nodeModules) {
    Write-Host "   ⚠️  WARNING: Found node_modules directories:" -ForegroundColor Yellow
    foreach ($dir in $nodeModules) {
        Write-Host "      - $($dir.FullName)" -ForegroundColor Yellow
    }
    Write-Host "   These should be in .gitignore!" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "   ✅ No node_modules found" -ForegroundColor Green
}

# ============================================
# 5. Check for __pycache__
# ============================================
Write-Host ""
Write-Host "5. Checking for Python cache..." -ForegroundColor Yellow

$pycache = Get-ChildItem -Path . -Filter "__pycache__" -Recurse -Directory

if ($pycache) {
    Write-Host "   ⚠️  WARNING: Found __pycache__ directories:" -ForegroundColor Yellow
    Write-Host "      Found $($pycache.Count) directories" -ForegroundColor Yellow
    Write-Host "   These should be in .gitignore!" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "   ✅ No __pycache__ found" -ForegroundColor Green
}

# ============================================
# 6. Check for large files
# ============================================
Write-Host ""
Write-Host "6. Checking for large files (>10MB)..." -ForegroundColor Yellow

$largeFiles = Get-ChildItem -Path . -Recurse -File | Where-Object { $_.Length -gt 10MB }

if ($largeFiles) {
    Write-Host "   ⚠️  WARNING: Found large files:" -ForegroundColor Yellow
    foreach ($file in $largeFiles) {
        $sizeMB = [math]::Round($file.Length / 1MB, 2)
        $sizeText = "$sizeMB MB"
        Write-Host "      - $($file.FullName) ($sizeText)" -ForegroundColor Yellow
    }
    Write-Host "   GitHub has a 100 MB file size limit!" -ForegroundColor Yellow
    $warnings++
} else {
    Write-Host "   ✅ No large files found" -ForegroundColor Green
}

# ============================================
# 7. Check for .gitignore
# ============================================
Write-Host ""
Write-Host "7. Checking for .gitignore..." -ForegroundColor Yellow

if (Test-Path ".gitignore") {
    Write-Host "   ✅ .gitignore exists" -ForegroundColor Green
} else {
    Write-Host "   ❌ CRITICAL: .gitignore is missing!" -ForegroundColor Red
    $errors++
}

# ============================================
# 8. Check for .env.example
# ============================================
Write-Host ""
Write-Host "8. Checking for .env.example..." -ForegroundColor Yellow

if (Test-Path ".env.example") {
    Write-Host "   ✅ .env.example exists" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  WARNING: .env.example is missing" -ForegroundColor Yellow
    Write-Host "   Consider creating one for other developers" -ForegroundColor Yellow
    $warnings++
}

# ============================================
# 9. Check for README.md
# ============================================
Write-Host ""
Write-Host "9. Checking for README.md..." -ForegroundColor Yellow

if (Test-Path "README.md") {
    Write-Host "   ✅ README.md exists" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  WARNING: README.md is missing" -ForegroundColor Yellow
    $warnings++
}

# ============================================
# 10. Check for docs/ directory
# ============================================
Write-Host ""
Write-Host "10. Checking for docs/ directory..." -ForegroundColor Yellow

if (Test-Path "docs") {
    Write-Host "   ✅ docs/ directory exists" -ForegroundColor Green
    
    # Check for required docs files
    $requiredDocs = @("index.md", "_config.yml")
    foreach ($doc in $requiredDocs) {
        if (Test-Path "docs/$doc") {
            Write-Host "      ✅ docs/$doc exists" -ForegroundColor Green
        } else {
            Write-Host "      ⚠️  docs/$doc is missing" -ForegroundColor Yellow
            $warnings++
        }
    }
} else {
    Write-Host "   ⚠️  WARNING: docs/ directory is missing" -ForegroundColor Yellow
    Write-Host "   GitHub Pages won't work without it!" -ForegroundColor Yellow
    $warnings++
}

# ============================================
# 11. Search for common secrets in code
# ============================================
Write-Host ""
Write-Host "11. Scanning for potential secrets in code..." -ForegroundColor Yellow

$secretPatterns = @(
    'password\s*=\s*[''"](?!.*your-|.*example|.*changeme)[^''"]{8,}',
    'api[_-]?key\s*=\s*[''"][^''"]{20,}',
    'secret[_-]?key\s*=\s*[''"](?!.*your-|.*example)[^''"]{20,}',
    'token\s*=\s*[''"][^''"]{20,}'
)

$foundSecrets = $false
foreach ($pattern in $secretPatterns) {
    $matches = Get-ChildItem -Path . -Include "*.py","*.js","*.ts","*.jsx","*.tsx" -Recurse -File | 
        Select-String -Pattern $pattern -CaseSensitive:$false
    
    if ($matches) {
        if (-not $foundSecrets) {
            Write-Host "   ⚠️  WARNING: Potential secrets found in code:" -ForegroundColor Yellow
            $foundSecrets = $true
        }
        foreach ($match in $matches) {
            Write-Host "      - $($match.Path):$($match.LineNumber)" -ForegroundColor Yellow
        }
    }
}

if (-not $foundSecrets) {
    Write-Host "   ✅ No obvious secrets found in code" -ForegroundColor Green
} else {
    Write-Host "   Review these files carefully!" -ForegroundColor Yellow
    $warnings++
}

# ============================================
# Summary
# ============================================
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "║                    VERIFICATION SUMMARY                        ║" -ForegroundColor Cyan
Write-Host "║                                                                ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "✅ ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your repository is ready to commit to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. git add ." -ForegroundColor White
    Write-Host "  2. git commit -m 'Initial commit: ApraNova LMS'" -ForegroundColor White
    Write-Host "  3. git push -u origin main" -ForegroundColor White
    Write-Host ""
} elseif ($errors -gt 0) {
    Write-Host "❌ CRITICAL ERRORS FOUND: $errors" -ForegroundColor Red
    Write-Host "⚠️  WARNINGS: $warnings" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "DO NOT COMMIT until critical errors are resolved!" -ForegroundColor Red
    Write-Host ""
} else {
    Write-Host "⚠️  WARNINGS FOUND: $warnings" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Review warnings before committing." -ForegroundColor Yellow
    Write-Host "You can proceed if warnings are expected." -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "For detailed setup instructions, see: GITHUB_SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

