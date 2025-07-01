# 🚀 Portfolio Deployment Guide

## Option 1: Vercel (Recommended) - FREE

### Why Vercel?
- **Perfect for Next.js** - Zero configuration
- **Free tier**: Unlimited personal projects
- **Custom domains** supported
- **Automatic deployments** from GitHub
- **Global CDN** for fast loading
- **HTTPS** included

### Steps:

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/cLLeB/portfolio-website.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your portfolio repository
   - Click "Deploy" (Vercel auto-detects Next.js)
   - Your site will be live in ~2 minutes!

3. **Custom Domain** (Optional):
   - Buy domain from Namecheap/GoDaddy (~$10/year)
   - Add domain in Vercel dashboard
   - Update DNS settings

---

## Option 2: Netlify - FREE

### Steps:
1. **Build your project**:
   ```bash
   npm run build
   npm run export  # If using static export
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop your `out` folder
   - Or connect GitHub for auto-deployments

---

## Option 3: GitHub Pages - FREE

### Steps:
1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d out",
       "export": "next export"
     },
     "homepage": "https://cLLeB.github.io/portfolio-website"
   }
   ```

3. **Deploy**:
   ```bash
   npm run build
   npm run export
   npm run deploy
   ```

---

## Option 4: Railway - FREE

### Steps:
1. Go to [railway.app](https://railway.app)
2. Connect GitHub
3. Deploy from repository
4. Automatic HTTPS and custom domains

---

## 🎯 RECOMMENDED WORKFLOW:

### Quick Start (5 minutes):
```bash
# 1. Push to GitHub
git add .
git commit -m "Portfolio ready for deployment"
git push

# 2. Go to vercel.com
# 3. Import GitHub repo
# 4. Click Deploy
# 5. Done! Your portfolio is live
```

### Your Live URLs will be:
- **Vercel**: `https://portfolio-website-clleb.vercel.app`
- **Netlify**: `https://amazing-portfolio-clleb.netlify.app`
- **GitHub Pages**: `https://clleb.github.io/portfolio-website`

---

## 🔧 PRE-DEPLOYMENT CHECKLIST:

### 1. Update Contact Info:
- ✅ Email: kyereboatengcaleb@gmail.com
- ✅ Phone: +233 20 418 5163
- ✅ GitHub: https://github.com/cLLeB
- ✅ LinkedIn: https://www.linkedin.com/in/caleb-kyere-boateng-6736092b4

### 2. Test Locally:
```bash
npm run build  # Should complete without errors
npm run start  # Test production build
```

### 3. Environment Variables (if needed):
- Create `.env.local` for sensitive data
- Add to deployment platform settings

---

## 🌟 CUSTOM DOMAIN SETUP:

### Buy Domain ($10-15/year):
- **Namecheap** (recommended)
- **GoDaddy**
- **Google Domains**

### Popular Domain Ideas:
- `calebkyere.dev`
- `calebboateng.com`
- `ckboateng.dev`
- `calebkyere.tech`

### DNS Setup:
1. Point domain to your hosting platform
2. Add CNAME record: `www` → `your-app.vercel.app`
3. Add A record: `@` → Platform IP

---

## 📊 PERFORMANCE OPTIMIZATION:

### Before Deployment:
```bash
# Optimize images
npm install next-optimized-images

# Analyze bundle
npm install @next/bundle-analyzer
```

### SEO Checklist:
- ✅ Meta descriptions
- ✅ Open Graph tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Favicon

---

## 🚨 TROUBLESHOOTING:

### Common Issues:
1. **Build fails**: Check for TypeScript errors
2. **Images not loading**: Use Next.js Image component
3. **Routing issues**: Ensure proper Next.js routing
4. **Environment variables**: Add to platform settings

### Support:
- **Vercel**: Excellent documentation and Discord
- **Netlify**: Great community forums
- **GitHub Pages**: GitHub community support

---

## 💡 PRO TIPS:

1. **Use Vercel** for easiest deployment
2. **Connect GitHub** for automatic deployments
3. **Enable analytics** to track visitors
4. **Set up monitoring** for uptime
5. **Use custom domain** for professional look

---

## 🎉 NEXT STEPS AFTER DEPLOYMENT:

1. **Share your portfolio**:
   - Add to LinkedIn profile
   - Include in resume
   - Share on social media

2. **Monitor performance**:
   - Google Analytics
   - Vercel Analytics
   - Core Web Vitals

3. **Keep updating**:
   - Add new projects
   - Update skills
   - Refresh content

---

**Your portfolio will be live and accessible worldwide in just a few minutes!** 🌍✨
