# Professional CS Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Framer Motion, designed specifically for Computer Science students and professionals seeking internship opportunities.

## ✨ Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Performance**: Fast loading times with optimized images and code splitting
- **SEO Optimized**: Proper meta tags, structured data, and accessibility features
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Interactive**: Hover effects, scroll animations, and dynamic content
- **Professional Sections**:
  - Hero section with animated typing effect
  - About section highlighting CS background
  - Projects showcase with detailed descriptions
  - Skills section with animated progress bars
  - Contact form with social links

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see your portfolio

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel, Netlify, or GitHub Pages

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Projects.tsx
│       ├── Skills.tsx
│       ├── Contact.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── manifest.json
├── docs/
│   ├── DEPLOYMENT.md
│   ├── CUSTOMIZATION.md
│   └── PROJECT_SHOWCASE.md
├── .github/workflows/
│   └── deploy.yml
├── vercel.json
├── netlify.toml
└── package.json
```

## 🎨 Customization

### Personal Information

1. **Update Hero Section** (`src/components/Hero.tsx`):
   - Replace "Your Name" with your actual name
   - Modify the roles array with your titles
   - Update the description paragraph

2. **Update Contact Information** (`src/components/Contact.tsx`):
   - Replace email, phone, and location
   - Update social media links

3. **Update Projects** (`src/components/Projects.tsx`):
   - Replace with your actual projects
   - Update GitHub links and descriptions
   - Modify technology stacks

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Update font imports in `src/app/globals.css`
- **Animations**: Customize animations in component files

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 📈 Performance Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Components load as they enter viewport
- **Caching**: Proper caching headers for static assets

## 🌐 Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions for:
- Vercel
- Netlify
- GitHub Pages
- Custom hosting

## 📋 Customization Guide

See [CUSTOMIZATION.md](docs/CUSTOMIZATION.md) for detailed customization instructions.

## 🎯 Project Showcase Tips

See [PROJECT_SHOWCASE.md](docs/PROJECT_SHOWCASE.md) for tips on effectively showcasing your projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the documentation in the `docs/` folder
2. Search existing issues on GitHub
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

**Happy coding!  🚀**
