# Professional CS Portfolio Website

A modern, responsive, and highly interactive portfolio website built with Next.js, TypeScript, and Framer Motion. Designed specifically for Computer Science students and professionals to showcase their skills, projects, and certifications with a polished, mobile-first approach.

## ✨ Features

- **Advanced UI/UX**:
  - **Dark/Light Mode**: Fully supported with persistent theme switching.
  - **Custom Cursor**: Interactive custom cursor for a unique feel.
  - **Glitch Text Effects**: Cyberpunk-inspired text animations.
  - **Glassmorphism**: Modern frosted glass effects on cards and navigation.
  
- **Mobile-First Architecture**:
  - **Dedicated Mobile Components**: Specialized views for mobile devices (`MobileOptimizedHero`, `MobileProjectCards`, `TouchOptimizedSkills`) ensuring native-app-like experience.
  - **Responsive Navigation**: Adaptive navigation bar with mobile menu overlay.
  - **Touch Optimizations**: Swipe-friendly interfaces and appropriate touch targets.

- **Rich Content Sections**:
  - **Enhanced Hero**: Dynamic typing effects and particle animations.
  - **About**: Professional bio with interest highlights.
  - **Experience**: Timeline view of professional history.
  - **Certifications**: Grid layout for certificates with modal preview.
  - **Projects**: Detailed project showcase with GitHub/Demo links and tech stack tags.
  - **Skills**: Animated progress bars and categorized skill sets.
  - **Contact**: Integrated contact form and social links.

- **Interactive Elements**:
  - **Image Modals**: Full-screen, scroll-locked image previews for certificates and project screenshots.
  - **Scroll Animations**: Elements animate into view as you scroll.
  - **Hover Effects**: Interactive states for cards, buttons, and links.

- **Performance & SEO**:
  - **Next.js App Router**: Leveraging the latest React features.
  - **Optimized Images**: Automatic image optimization with `next/image`.
  - **SEO Ready**: Meta tags, Open Graph support, and structured data.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Forms**: [React Hook Form](https://react-hook-form.com/) (Ready for integration)

## 📁 Project Structure

```
portfolio-website/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles & Tailwind imports
│   │   ├── layout.tsx           # Root layout with Providers
│   │   └── page.tsx             # Main landing page
│   ├── components/
│   │   ├── ui/                  # Reusable UI components (Buttons, Modals, etc.)
│   │   ├── EnhancedHero.tsx     # Desktop Hero section
│   │   ├── MobileOptimizedHero.tsx # Mobile Hero section
│   │   ├── Projects.tsx         # Desktop Projects grid
│   │   ├── MobileProjectCards.tsx # Mobile Projects view
│   │   ├── Skills.tsx           # Desktop Skills section
│   │   ├── TouchOptimizedSkills.tsx # Mobile Skills section
│   │   ├── ResponsiveNavigation.tsx # Main Navigation
│   │   ├── Certifications.tsx   # Certifications section
│   │   ├── Experience.tsx       # Experience timeline
│   │   └── ...
│   └── utils/                   # Utility functions
├── public/                      # Static assets (images, icons)
├── docs/                        # Documentation
└── ...
```

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Customization

### Personal Information
- **Hero**: Update `src/components/EnhancedHero.tsx` and `src/components/MobileOptimizedHero.tsx`.
- **About**: Update `src/components/About.tsx`.
- **Experience**: Update `src/components/Experience.tsx`.
- **Certifications**: Update `src/components/Certifications.tsx`.
- **Projects**: Update `src/components/Projects.tsx` (Desktop) and `src/components/MobileProjectCards.tsx` (Mobile).
- **Skills**: Update `src/components/Skills.tsx` (Desktop) and `src/components/TouchOptimizedSkills.tsx` (Mobile).
- **Contact**: Update `src/components/Contact.tsx`.

### Images
- Place your images in the `public/` directory.
- Update image paths in the respective components (e.g., `/dp/me.jpg`, `/certs/my-cert.png`).

## 🌐 Deployment

This project is optimized for deployment on **Vercel**, **Netlify**, or **GitHub Pages**.

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends.
- Icons by Lucide.
- Animations powered by Framer Motion.

