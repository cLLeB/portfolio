# Deployment Guide

This guide covers deploying your portfolio website to various hosting platforms. Choose the platform that best fits your needs.

## 🚀 Vercel (Recommended)

Vercel is the easiest option for Next.js applications and offers excellent performance.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your portfolio repository
   - Configure settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `out`
   - Click "Deploy"

3. **Custom Domain (Optional)**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Update DNS records as instructed

### Environment Variables
If you add environment variables later:
- Go to project settings
- Add variables in "Environment Variables" section
- Redeploy the project

## 🌐 Netlify

Great alternative with excellent CI/CD features.

### Steps

1. **Build Configuration**
   Ensure `netlify.toml` is in your root directory (already included).

2. **Deploy to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Sign in with GitHub
   - Click "New site from Git"
   - Choose your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `out`
   - Click "Deploy site"

3. **Custom Domain**
   - Go to site settings
   - Click "Domain management"
   - Add custom domain
   - Configure DNS records

### Form Handling
To enable contact form submissions:
1. Add `netlify` attribute to your form
2. Configure form notifications in Netlify dashboard

## 📄 GitHub Pages

Free hosting directly from your GitHub repository.

### Prerequisites
- GitHub repository
- GitHub Actions enabled

### Steps

1. **Enable GitHub Pages**
   - Go to repository settings
   - Scroll to "Pages" section
   - Source: "GitHub Actions"

2. **Configure Deployment**
   The workflow file is already included at `.github/workflows/deploy.yml`.

3. **Update Configuration**
   In `next.config.js`, update the `basePath` and `assetPrefix`:
   ```javascript
   basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '',
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages"
   git push origin main
   ```

5. **Access Your Site**
   Your site will be available at: `https://yourusername.github.io/your-repo-name`

### Custom Domain for GitHub Pages
1. Add a `CNAME` file to the `public` directory with your domain
2. Configure DNS records with your domain provider
3. Enable "Enforce HTTPS" in repository settings

## 🔧 Custom Hosting

For VPS or shared hosting providers.

### Build for Production
```bash
npm run build
```

### Upload Files
1. Upload the contents of the `out` directory to your web server
2. Configure your web server to serve the files
3. Set up proper redirects for client-side routing

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/out/directory;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /static/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/your/out/directory
    
    <Directory /path/to/your/out/directory>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # Fallback for client-side routing
    FallbackResource /index.html
</VirtualHost>
```

## 🔍 Performance Optimization

### Image Optimization
- Use WebP format when possible
- Compress images before uploading
- Use appropriate image sizes for different devices

### Caching
- Configure proper cache headers
- Use CDN for static assets
- Enable gzip compression

### Monitoring
- Set up analytics (Google Analytics, Vercel Analytics)
- Monitor Core Web Vitals
- Use Lighthouse for performance audits

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Routing Issues**
   - Ensure proper fallback configuration
   - Check `next.config.js` settings
   - Verify base path configuration

3. **Asset Loading Issues**
   - Check asset prefix configuration
   - Verify file paths are correct
   - Ensure images are in the `public` directory

### Debug Commands
```bash
# Check for TypeScript errors
npm run type-check

# Run linting
npm run lint

# Build locally to test
npm run build
npm run start
```

## 📊 Analytics Setup

### Google Analytics
1. Create a Google Analytics account
2. Add tracking code to `layout.tsx`
3. Configure goals and conversions

### Vercel Analytics
1. Enable in Vercel dashboard
2. Add analytics package if needed
3. Monitor performance metrics

## 🔒 Security Considerations

- Keep dependencies updated
- Use HTTPS for custom domains
- Configure proper security headers
- Validate form inputs
- Use environment variables for sensitive data

## 📱 Testing Deployment

Before going live:
1. Test on multiple devices
2. Check all links and forms
3. Verify SEO meta tags
4. Test loading performance
5. Validate HTML and accessibility

---

Choose the deployment method that best fits your needs and technical comfort level. Vercel is recommended for beginners, while custom hosting offers more control for advanced users.
