# 🚀 GitHub Quick Start Guide

**Quick guide to push ApraNova to GitHub and enable GitHub Pages**

---

## ✅ What to Include in Git

### **Include These:**
- ✅ All source code (`backend/`, `frontend/`)
- ✅ Documentation (`docs/`, `README.md`, `*.md`)
- ✅ Configuration files (`docker-compose.yml`, `Dockerfile`, etc.)
- ✅ Scripts (`start-all.ps1`, `start-all.sh`, etc.)
- ✅ `.gitignore` file
- ✅ `.env.example` file
- ✅ GitHub workflows (`.github/workflows/`)

### **Exclude These (Already in .gitignore):**
- ❌ `.env` files with real credentials
- ❌ `node_modules/` directories
- ❌ `__pycache__/` directories
- ❌ SSL certificates (`*.pem`, `*.crt`, `*.key`)
- ❌ Database files (`*.sqlite3`, `*.sql`)
- ❌ Docker volumes (`vhost.d/`, `html/`, `certs/`)
- ❌ IDE files (`.vscode/`, `.idea/`)
- ❌ Log files (`*.log`)
- ❌ Generated reports (`APROVOVA/*/*.csv`, etc.)

---

## 📝 Step-by-Step Instructions

### **1. Clean Up Temporary Files (Optional)**

```powershell
# Navigate to project
cd C:\Users\Admin\Desktop\frontend\ApraNova

# Delete temporary setup files
Remove-Item COMPLETED_SETUP.md -ErrorAction SilentlyContinue
Remove-Item EMAIL_VERIFICATION_SETUP.md -ErrorAction SilentlyContinue
Remove-Item FINAL_SETUP_SUMMARY.md -ErrorAction SilentlyContinue
Remove-Item README-COMPLETE-SETUP.md -ErrorAction SilentlyContinue
Remove-Item SERVICES_RUNNING.md -ErrorAction SilentlyContinue
Remove-Item SETUP_COMPLETE.md -ErrorAction SilentlyContinue
Remove-Item SIGNUP_FINAL_FIX.md -ErrorAction SilentlyContinue
Remove-Item SIGNUP_FIXED.md -ErrorAction SilentlyContinue
Remove-Item SIGNUP_TEST_RESULTS.md -ErrorAction SilentlyContinue
Remove-Item START_HERE_FIRST.md -ErrorAction SilentlyContinue
Remove-Item WORKSPACE_SETUP.md -ErrorAction SilentlyContinue
Remove-Item START_HERE.bat -ErrorAction SilentlyContinue
```

### **2. Initialize Git Repository**

```bash
# Navigate to project
cd C:\Users\Admin\Desktop\frontend\ApraNova

# Initialize git
git init

# Configure git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### **3. Add Files to Git**

```bash
# Add all files (respecting .gitignore)
git add .

# Check what will be committed
git status

# See file count
git ls-files | Measure-Object -Line
```

### **4. Create Initial Commit**

```bash
git commit -m "Initial commit: ApraNova LMS with Django REST + Next.js + Docker"
```

### **5. Create GitHub Repository**

**Option A: Via GitHub Website**
1. Go to https://github.com
2. Click **"+"** → **"New repository"**
3. Repository name: `apranova-lms`
4. Description: "Full-stack Learning Management System with Django REST Framework and Next.js"
5. Visibility: **Public** (required for free GitHub Pages)
6. **DO NOT** add README, .gitignore, or license (you already have them)
7. Click **"Create repository"**

**Option B: Via GitHub CLI**
```bash
gh auth login
gh repo create apranova-lms --public --description "Full-stack Learning Management System"
```

### **6. Push to GitHub**

```bash
# Add remote (replace YOUR-USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/apranova-lms.git

# Push to main branch
git branch -M main
git push -u origin main
```

### **7. Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Click **"Pages"** in left sidebar
4. Under **"Build and deployment"**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/docs**
5. Click **"Save"**
6. Wait 2-5 minutes for deployment

### **8. Update Documentation URLs**

Edit `docs/_config.yml`:

```yaml
baseurl: "/apranova-lms"  # Your repo name
url: "https://YOUR-USERNAME.github.io"  # Your GitHub username
```

Commit and push:

```bash
git add docs/_config.yml
git commit -m "Update GitHub Pages configuration"
git push
```

### **9. Access Your Documentation**

Your documentation will be live at:
```
https://YOUR-USERNAME.github.io/apranova-lms/
```

---

## 🔍 Verification Checklist

Before pushing, verify:

- [ ] `.gitignore` exists
- [ ] `.env.example` exists (but NOT `.env`)
- [ ] No `node_modules/` directories
- [ ] No `__pycache__/` directories
- [ ] No SSL certificates
- [ ] No database files
- [ ] `docs/` directory exists
- [ ] `README.md` is complete
- [ ] No sensitive data in code

---

## 📊 Expected File Count

Your repository should have approximately:
- **~100-200 files** (source code, configs, docs)
- **~10-20 directories** (main folders)

If you see thousands of files, you might be including `node_modules/` or `__pycache__/`!

---

## 🐛 Common Issues

### **Issue: "node_modules/ being committed"**
```bash
# Remove from git
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

### **Issue: ".env file committed"**
```bash
# Remove immediately!
git rm --cached .env
git commit -m "Remove .env file"
# Then rotate all secrets!
```

### **Issue: "Permission denied (publickey)"**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR-USERNAME/apranova-lms.git
```

### **Issue: "GitHub Pages not building"**
- Ensure repository is **public**
- Check that `/docs` folder exists
- Verify `docs/_config.yml` is valid YAML
- Check GitHub Actions tab for errors

---

## 📚 Documentation Structure

Your GitHub Pages will include:

- **Home** (`index.md`) - System overview
- **Architecture** (`architecture.md`) - System design
- **Authentication** (`auth-flow.md`) - Auth flows
- **Workspace** (`workspace-flow.md`) - Docker provisioning
- **API Reference** (`api-documentation.md`) - REST API docs
- **Database** (`database-schema.md`) - Schema & ERD
- **Payments** (`payment-flow.md`) - Stripe integration

All with **25+ interactive Mermaid diagrams**!

---

## 🎉 Success!

Once complete, you'll have:
- ✅ Code on GitHub
- ✅ Professional documentation site
- ✅ Automated deployment
- ✅ No secrets committed
- ✅ Ready for collaboration

---

## 📖 More Information

- **Detailed Guide**: See `GITHUB_SETUP_GUIDE.md`
- **Cleanup Guide**: See `CLEANUP_BEFORE_COMMIT.md`
- **Documentation Setup**: See `DOCUMENTATION_SETUP.md`

---

**Ready to push? Follow the steps above!** 🚀

