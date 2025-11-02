# 🚀 Enable GitHub Pages - Step by Step

Your code is on GitHub, but GitHub Pages needs to be manually enabled. Follow these exact steps:

---

## 📋 **Step-by-Step Instructions**

### **Step 1: Go to Your Repository**
1. Open your browser
2. Go to: **https://github.com/prempp/ApraNova**
3. You should see your repository with all the code

---

### **Step 2: Open Settings**
1. Click the **"Settings"** tab (top right of the page)
2. You'll see a menu on the left side

---

### **Step 3: Navigate to Pages**
1. In the left sidebar, scroll down
2. Click **"Pages"** (under "Code and automation" section)

---

### **Step 4: Configure GitHub Pages**

You'll see a section called **"Build and deployment"**

1. **Source**: 
   - Click the dropdown that says "None" or "Deploy from a branch"
   - Select: **"Deploy from a branch"**

2. **Branch**:
   - First dropdown: Select **"main"**
   - Second dropdown: Select **"/docs"**
   - Click **"Save"** button

---

### **Step 5: Wait for Deployment**

After clicking Save:
1. GitHub will show a message: "GitHub Pages source saved"
2. A blue box will appear at the top saying: "Your site is ready to be published at https://prempp.github.io/ApraNova/"
3. Wait **2-5 minutes** for the first build
4. Refresh the page - the box will turn **green** when ready

---

### **Step 6: Verify It's Working**

1. After the green box appears, click the **"Visit site"** button
2. OR go directly to: **https://prempp.github.io/ApraNova/**
3. You should see your documentation homepage!

---

## ✅ **What You Should See**

When GitHub Pages is enabled correctly, you'll see:

- ✅ Green box saying: "Your site is published at https://prempp.github.io/ApraNova/"
- ✅ A link to visit your site
- ✅ Build status showing "Active"

---

## 🐛 **Troubleshooting**

### **If you see "404 - Site not found"**
- Wait 2-5 more minutes (first build takes time)
- Refresh the page
- Check that you selected **/docs** folder (not root)

### **If Settings → Pages shows an error**
- Make sure the repository is **Public** (not Private)
- Free GitHub accounts can only use Pages with public repos

### **If the build fails**
- Go to the **"Actions"** tab in your repository
- Check if there are any failed builds
- The error message will tell you what's wrong

---

## 📚 **Your Documentation Pages**

Once enabled, these pages will be available:

- **Home**: https://prempp.github.io/ApraNova/
- **Architecture**: https://prempp.github.io/ApraNova/architecture
- **Authentication**: https://prempp.github.io/ApraNova/auth-flow
- **Workspace**: https://prempp.github.io/ApraNova/workspace-flow
- **API Docs**: https://prempp.github.io/ApraNova/api-documentation
- **Database**: https://prempp.github.io/ApraNova/database-schema
- **Payments**: https://prempp.github.io/ApraNova/payment-flow

---

## 🎯 **Quick Checklist**

- [ ] Go to https://github.com/prempp/ApraNova
- [ ] Click "Settings" tab
- [ ] Click "Pages" in left sidebar
- [ ] Source: "Deploy from a branch"
- [ ] Branch: "main" + "/docs"
- [ ] Click "Save"
- [ ] Wait 2-5 minutes
- [ ] Visit https://prempp.github.io/ApraNova/

---

## 📸 **Visual Guide**

### What the Settings → Pages should look like:

```
Build and deployment
├── Source: Deploy from a branch
├── Branch: main    /docs    [Save]
└── Custom domain: (leave empty)
```

---

## ✨ **After It's Working**

Your documentation will include:
- 📊 Interactive Mermaid diagrams
- 📝 Complete API documentation
- 🔐 Authentication flows
- 🐳 Docker workspace provisioning
- 💳 Payment integration docs
- 🗄️ Database schema with ERD

---

**Need help? The issue is likely just that GitHub Pages hasn't been enabled yet in Settings → Pages!**

