# Caleb Kyere Boateng's Portfolio

A modern, responsive, and highly interactive portfolio website built with Next.js, TypeScript, and Framer Motion. Designed to showcase my professional journey, projects, and skills with a focus on performance and user experience.

## ✨ Features

- **Advanced UI/UX**:
  - **Dark/Light Mode**: Seamless theme switching with system preference detection
  - **Custom Cursor**: Interactive cursor with hover effects
  - **Glitch Text Effects**: Dynamic text animations for headings
  - **Glassmorphism**: Modern frosted glass effects on cards and navigation
  - **Responsive Image Gallery**: Optimized image viewing experience across all devices
  
- **Mobile-First Architecture**:
  - **Dedicated Mobile Views**: Optimized components for mobile devices
  - **Touch-Friendly Navigation**: Smooth scrolling and touch interactions
  - **Adaptive Layouts**: Perfect display on any screen size

- **Rich Content Sections**:
  - **Interactive Hero**: Engaging introduction with animated elements
  - **Professional Experience**: Timeline of work history and achievements
  - **Certifications**: Showcase of professional certifications with previews
  - **Project Showcase**: Detailed case studies with live demos
  - **Skills Matrix**: Visual representation of technical proficiencies
  - **Contact Form**: Easy way to get in touch

- **Performance Optimized**:
  - **Next.js 14**: Leveraging the latest React features
  - **Image Optimization**: Automatic optimization with `next/image`
  - **Lazy Loading**: Fast initial load times
  - **SEO Optimized**: Meta tags and structured data

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
   git clone https://github.com/cLLeB/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Personal Information
1. **Update Profile**:
   - Edit `src/components/EnhancedHero.tsx` for desktop view
   - Update `src/components/MobileOptimizedHero.tsx` for mobile view
   - Modify `src/components/About.tsx` for your personal bio

2. **Update Professional Details**:
   - Work experience in `src/components/Experience.tsx`
   - Certifications in `src/components/Certifications.tsx`
   - Projects in `src/components/Projects.tsx` and `src/components/MobileProjectCards.tsx`
   - Skills in `src/components/Skills.tsx`

### Images
- Place your images in the `public/` directory:
  - Profile picture: `/public/dp/me.jpg`
  - Project screenshots: `/public/projects/`
  - Certifications: `/public/certs/`
  - Other assets: `/public/assets/`

### Styling
- Global styles: `src/app/globals.css`
- Color scheme: Update the Tailwind config in `tailwind.config.js`
- Animations: Modify in `src/components/Animations.tsx`

## 🌐 Deployment

This project is optimized for deployment on **Vercel**, **Netlify**, or **GitHub Pages**.

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FcLLeB%2Fportfolio)

### Manual Deployment
1. Build the project:
   ```bash
   npm run build
   ```
2. The output will be in the `.next` directory
3. Deploy the contents to your preferred hosting service

### Environment Variables
Create a `.env.local` file with the following variables:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
# Add other environment variables as needed
```

## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to:
1. Open an issue
2. Fork the repository
3. Create a new branch
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for beautiful animations
- **Lucide** for the clean icons
- **The open-source community** for continuous inspiration

## 📬 Contact

- **Email**: calebkyereboateng@gmail.com
- **LinkedIn**: [Caleb Kyere Boateng](https://linkedin.com/in/caleb-kyere-boateng-8a5b5b1b0/)
- **GitHub**: [cLLeB](https://github.com/cLLeB)

---

