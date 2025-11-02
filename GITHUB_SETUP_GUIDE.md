# 🚀 GitHub Repository Setup Guide

Complete guide to setting up your ApraNova LMS project on GitHub with GitHub Pages documentation.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [What to Include](#what-to-include)
3. [What to Ignore](#what-to-ignore)
4. [Initial Git Setup](#initial-git-setup)
5. [Create GitHub Repository](#create-github-repository)
6. [Push to GitHub](#push-to-github)
7. [Enable GitHub Pages](#enable-github-pages)
8. [Post-Setup Configuration](#post-setup-configuration)
9. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

- Git installed on your system
- GitHub account (free or organization)
- Project files ready in `ApraNova` directory

---

## 📦 What to Include

### ✅ **Source Code**
- `backend/` - Django backend application
- `frontend/` - Next.js frontend application
- `docs/` - Documentation for GitHub Pages

### ✅ **Configuration Files**
- `docker-compose.complete.yml` - Main Docker Compose file
- `docker-compose.yml` - Alternative Docker Compose
- `Dockerfile` files in backend/frontend
- `requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies
- `.env.example` - Example environment variables

### ✅ **Documentation**
- `README.md` - Main project documentation
- `QUICK_REFERENCE.md` - Command reference
- `DOCUMENTATION_SETUP.md` - Docs setup guide
- `DOCUMENTATION_SUMMARY.md` - Docs summary
- All files in `docs/` directory

### ✅ **Scripts**
- `start-all.ps1` / `start-all.sh` - Startup scripts
- `setup.ps1` - Setup script
- `backend/scripts/` - Backend utility scripts

### ✅ **GitHub Configuration**
- `.github/workflows/` - GitHub Actions workflows
- `.gitignore` - Git ignore rules

### ✅ **Nginx Configuration**
- `nginx/nginx.conf`
- `nginx/conf.d/`

---

## 🚫 What to Ignore (Already in .gitignore)

### ❌ **Never Commit These**

#### **Sensitive Information**
- `.env` files with real credentials
- `secrets/` directory
- SSL certificates (`*.pem`, `*.crt`, `*.key`)
- API keys and tokens

#### **Generated Files**
- `__pycache__/` - Python bytecode
- `node_modules/` - Node.js dependencies
- `.next/` - Next.js build output
- `staticfiles/` - Django static files
- `media/` - User uploaded files

#### **Database Files**
- `db.sqlite3` - SQLite database
- `*.sql` - Database dumps
- `backup_*.sql` - Database backups

#### **IDE/Editor Files**
- `.vscode/` - VSCode settings
- `.idea/` - PyCharm settings
- `*.code-workspace` - Workspace files

#### **Docker Volumes**
- `vhost.d/` - Nginx vhost data
- `html/` - Nginx HTML data
- `certs/` - SSL certificates
- `backend/workspaces/` - Student workspaces

#### **Logs**
- `*.log` - All log files
- `logs/` - Log directories

#### **OS Files**
- `.DS_Store` - macOS
- `Thumbs.db` - Windows
- `*~` - Linux backup files

#### **Reports**
- `APROVOVA/*/*.csv` - Generated CSV reports
- `APROVOVA/*/*.pdf` - Generated PDF reports

---

## 🔧 Initial Git Setup

### **Step 1: Navigate to Project Directory**

```bash
cd C:\Users\Admin\Desktop\frontend\ApraNova
```

### **Step 2: Initialize Git Repository**

```bash
# Initialize git (if not already initialized)
git init

# Check status
git status
```

### **Step 3: Configure Git (First Time Only)**

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### **Step 4: Review Files to Commit**

```bash
# See what will be committed
git status

# See what's ignored
git status --ignored
```

---

## 🌐 Create GitHub Repository

### **Option 1: Create via GitHub Website**

1. Go to [GitHub](https://github.com)
2. Click **"+"** → **"New repository"**
3. Fill in details:
   - **Repository name**: `apranova-lms` (or your preferred name)
   - **Description**: "Full-stack Learning Management System with Django REST Framework and Next.js"
   - **Visibility**: 
     - ✅ **Public** (recommended for GitHub Pages)
     - ⚠️ **Private** (requires GitHub Pro for Pages)
   - **Initialize**: 
     - ❌ Do NOT add README (you already have one)
     - ❌ Do NOT add .gitignore (you already have one)
     - ✅ Add a license (MIT recommended)
4. Click **"Create repository"**

### **Option 2: Create via GitHub CLI**

```bash
# Install GitHub CLI first: https://cli.github.com/

# Login to GitHub
gh auth login

# Create repository
gh repo create apranova-lms --public --description "Full-stack Learning Management System"
```

---

## 📤 Push to GitHub

### **Step 1: Add All Files**

```bash
# Add all files (respecting .gitignore)
git add .

# Verify what's staged
git status
```

### **Step 2: Create Initial Commit**

```bash
# Commit with descriptive message
git commit -m "Initial commit: ApraNova LMS with Django REST + Next.js + Docker"
```

### **Step 3: Add Remote Repository**

```bash
# Replace YOUR-USERNAME and YOUR-REPO-NAME
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git

# Verify remote
git remote -v
```

### **Step 4: Push to GitHub**

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

### **Step 5: Verify Upload**

```bash
# Check if push was successful
git status

# View commit history
git log --oneline
```

---

## 📚 Enable GitHub Pages

### **Step 1: Go to Repository Settings**

1. Open your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar

### **Step 2: Configure Source**

1. Under **"Build and deployment"**:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/docs`
2. Click **"Save"**

### **Step 3: Wait for Deployment**

- GitHub will build your site (takes 2-5 minutes)
- You'll see a message: "Your site is live at https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"

### **Step 4: Update Documentation URLs**

Update `docs/_config.yml`:

```yaml
baseurl: "/YOUR-REPO-NAME"  # Replace with your actual repo name
url: "https://YOUR-USERNAME.github.io"  # Replace with your GitHub username
```

Commit and push the change:

```bash
git add docs/_config.yml
git commit -m "Update GitHub Pages configuration"
git push
```

---

## ⚙️ Post-Setup Configuration

### **1. Update README.md**

Add your GitHub repository URL and GitHub Pages link to `README.md`:

```markdown
## 📚 Documentation

Complete documentation is available at: https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/

## 🔗 Repository

GitHub: https://github.com/YOUR-USERNAME/YOUR-REPO-NAME
```

### **2. Add Repository Secrets (for CI/CD)**

If you plan to use GitHub Actions for deployment:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add secrets:
   - `DJANGO_SECRET_KEY`
   - `STRIPE_SECRET_KEY`
   - `DATABASE_URL`
   - etc.

### **3. Enable GitHub Actions**

Your workflow is already in `.github/workflows/deploy-docs.yml`. It will:
- Automatically deploy documentation on push to `main`
- Build Jekyll site
- Deploy to GitHub Pages

### **4. Add Topics/Tags**

1. Go to repository main page
2. Click ⚙️ next to "About"
3. Add topics: `django`, `nextjs`, `docker`, `lms`, `education`, `learning-management-system`

### **5. Create .env File Locally**

```bash
# Copy example file
cp .env.example .env

# Edit with your actual values
# NEVER commit this file!
```

---

## 🐛 Troubleshooting

### **Issue: "Permission denied (publickey)"**

**Solution**: Set up SSH key or use HTTPS with personal access token

```bash
# Use HTTPS instead
git remote set-url origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
```

### **Issue: "GitHub Pages not building"**

**Solutions**:
1. Check that `/docs` folder exists in `main` branch
2. Verify `docs/_config.yml` is valid YAML
3. Check GitHub Actions tab for build errors
4. Ensure repository is public (or you have GitHub Pro)

### **Issue: "Large files rejected"**

**Solution**: GitHub has 100MB file limit

```bash
# Find large files
find . -type f -size +50M

# Remove from git if accidentally added
git rm --cached path/to/large/file
git commit -m "Remove large file"
```

### **Issue: ".env file committed accidentally"**

**Solution**: Remove from history immediately!

```bash
# Remove from git
git rm --cached .env
git commit -m "Remove .env file"

# Remove from history (if already pushed)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (WARNING: Rewrites history!)
git push origin --force --all
```

Then **immediately** rotate all secrets in that file!

---

## 📝 Quick Command Reference

```bash
# Check status
git status

# Add files
git add .

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# View remote URL
git remote -v
```

---

## ✅ Final Checklist

Before pushing to GitHub, verify:

- [ ] `.gitignore` is in place
- [ ] `.env.example` exists (but NOT `.env`)
- [ ] No sensitive data in code
- [ ] README.md is complete
- [ ] Documentation is in `docs/` folder
- [ ] All secrets are in `.env` (not committed)
- [ ] Docker Compose files are present
- [ ] GitHub Actions workflow is configured
- [ ] Repository name is correct
- [ ] License file is included

---

## 🎉 Success!

Your ApraNova LMS is now on GitHub with:
- ✅ Complete source code
- ✅ Professional documentation
- ✅ GitHub Pages site
- ✅ Automated deployment
- ✅ Proper security (no secrets committed)

**Next Steps**:
1. Share your repository URL
2. Invite collaborators
3. Set up CI/CD pipelines
4. Configure branch protection rules
5. Start accepting contributions!

---

**Need Help?**
- GitHub Docs: https://docs.github.com
- GitHub Pages: https://pages.github.com
- Git Documentation: https://git-scm.com/doc

