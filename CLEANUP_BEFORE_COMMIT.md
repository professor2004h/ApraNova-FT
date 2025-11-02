# 🧹 Cleanup Before Commit

This guide helps you clean up unnecessary files before committing to GitHub.

---

## 🗑️ Files to Delete Before Commit

### **Temporary Setup Documentation**

These files were created during setup and can be removed:

```bash
# Delete temporary setup files
rm COMPLETED_SETUP.md
rm EMAIL_VERIFICATION_SETUP.md
rm FINAL_SETUP_SUMMARY.md
rm README-COMPLETE-SETUP.md
rm SERVICES_RUNNING.md
rm SETUP_COMPLETE.md
rm SIGNUP_FINAL_FIX.md
rm SIGNUP_FIXED.md
rm SIGNUP_TEST_RESULTS.md
rm START_HERE_FIRST.md
rm WORKSPACE_SETUP.md
```

### **Temporary Test Scripts**

```bash
# Delete test scripts (optional - keep if useful)
rm test_signup.ps1
rm test_signup.sh
rm START_HERE.bat
```

### **Keep These Important Files**

✅ **DO NOT DELETE**:
- `README.md` - Main documentation
- `QUICK_REFERENCE.md` - Command reference
- `PROJECT_STRUCTURE.md` - Project structure
- `DOCUMENTATION_SETUP.md` - Docs setup guide
- `DOCUMENTATION_SUMMARY.md` - Docs summary
- `GITHUB_SETUP_GUIDE.md` - This guide
- All files in `docs/` directory
- All source code files

---

## 🧹 Quick Cleanup Script

### **Windows PowerShell**

```powershell
# Navigate to project directory
cd C:\Users\Admin\Desktop\frontend\ApraNova

# Delete temporary files
$tempFiles = @(
    "COMPLETED_SETUP.md",
    "EMAIL_VERIFICATION_SETUP.md",
    "FINAL_SETUP_SUMMARY.md",
    "README-COMPLETE-SETUP.md",
    "SERVICES_RUNNING.md",
    "SETUP_COMPLETE.md",
    "SIGNUP_FINAL_FIX.md",
    "SIGNUP_FIXED.md",
    "SIGNUP_TEST_RESULTS.md",
    "START_HERE_FIRST.md",
    "WORKSPACE_SETUP.md",
    "START_HERE.bat"
)

foreach ($file in $tempFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "Deleted: $file" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Cleanup complete!" -ForegroundColor Cyan
```

### **Linux/Mac**

```bash
# Navigate to project directory
cd ~/path/to/ApraNova

# Delete temporary files
rm -f COMPLETED_SETUP.md \
      EMAIL_VERIFICATION_SETUP.md \
      FINAL_SETUP_SUMMARY.md \
      README-COMPLETE-SETUP.md \
      SERVICES_RUNNING.md \
      SETUP_COMPLETE.md \
      SIGNUP_FINAL_FIX.md \
      SIGNUP_FIXED.md \
      SIGNUP_TEST_RESULTS.md \
      START_HERE_FIRST.md \
      WORKSPACE_SETUP.md \
      START_HERE.bat

echo "Cleanup complete!"
```

---

## 📋 Pre-Commit Checklist

Run this checklist before committing:

```powershell
# Run the verification script
.\check-before-commit.ps1
```

Or manually verify:

- [ ] No `.env` files (except `.env.example`)
- [ ] No `node_modules/` directories
- [ ] No `__pycache__/` directories
- [ ] No SSL certificates (`*.pem`, `*.crt`, `*.key`)
- [ ] No database files (`*.sqlite3`, `*.sql`)
- [ ] No large files (>50MB)
- [ ] `.gitignore` is present
- [ ] `.env.example` is present
- [ ] `README.md` is complete
- [ ] `docs/` directory exists
- [ ] No sensitive data in code

---

## 🔍 Verify What Will Be Committed

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# See what will be committed
git status

# See detailed diff
git diff --cached

# See list of files to be committed
git diff --cached --name-only

# See what's being ignored
git status --ignored
```

---

## ✅ Final Verification

Before pushing to GitHub:

1. **Run verification script**:
   ```powershell
   .\check-before-commit.ps1
   ```

2. **Review files to commit**:
   ```bash
   git status
   ```

3. **Check file count** (should be reasonable):
   ```bash
   git ls-files | wc -l
   ```

4. **Verify no secrets**:
   ```bash
   # Search for potential secrets
   git grep -i "password\s*=" -- '*.py' '*.js' '*.ts'
   git grep -i "api_key\s*=" -- '*.py' '*.js' '*.ts'
   git grep -i "secret_key\s*=" -- '*.py' '*.js' '*.ts'
   ```

---

## 🚀 Ready to Commit

Once cleanup is complete and verification passes:

```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: ApraNova LMS with Django REST + Next.js + Docker"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## 📚 Next Steps

After successful push:

1. **Enable GitHub Pages** (see `GITHUB_SETUP_GUIDE.md`)
2. **Update documentation URLs** in `docs/_config.yml`
3. **Add repository topics/tags**
4. **Invite collaborators**
5. **Set up branch protection rules**

---

**For complete setup instructions, see: `GITHUB_SETUP_GUIDE.md`**

