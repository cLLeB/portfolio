# Customization Guide

This guide will help you personalize your portfolio website with your own information, projects, and styling preferences.

## 🎯 Personal Information

### Hero Section (`src/components/Hero.tsx`)

1. **Update Your Name**
   ```tsx
   <span className="text-gradient">Your Actual Name</span>
   ```

2. **Modify Role Titles**
   ```tsx
   const roles = [
     'Computer Science Student',
     'Full Stack Developer',
     'Your Specialization',
     'Your Focus Area'
   ]
   ```

3. **Update Description**
   ```tsx
   <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
     Write your personal introduction here. Highlight your passion,
     experience, and what you're looking for in terms of opportunities.
   </p>
   ```

4. **Update Social Links**
   ```tsx
   const socialLinks = [
     { icon: Github, href: 'https://github.com/yourusername', label: 'GitHub' },
     { icon: Linkedin, href: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
     { icon: Mail, href: 'mailto:your.email@example.com', label: 'Email' }
   ]
   ```

### About Section (`src/components/About.tsx`)

1. **Personal Story**
   Update the paragraphs in the "Computer Science Journey" section with your own story.

2. **What Drives You**
   Modify the motivation items to reflect your personal values and goals.

3. **Areas of Interest**
   Update the interests array with your specific technical interests.

### Contact Section (`src/components/Contact.tsx`)

1. **Contact Information**
   ```tsx
   const contactInfo = [
     {
       icon: Mail,
       title: 'Email',
       value: 'your.actual.email@example.com',
       href: 'mailto:your.actual.email@example.com'
     },
     {
       icon: Phone,
       title: 'Phone',
       value: '+1 (555) 123-4567',
       href: 'tel:+15551234567'
     },
     {
       icon: MapPin,
       title: 'Location',
       value: 'Your City, Country',
       href: null
     }
   ]
   ```

## 🚀 Projects Showcase

### Adding Your Projects (`src/components/Projects.tsx`)

Replace the projects array with your actual projects:

```tsx
const projects = [
  {
    title: 'Your Project Name',
    description: 'Detailed description of what your project does, the problems it solves, and its impact.',
    technologies: ['Tech1', 'Tech2', 'Tech3', 'Tech4'],
    features: [
      'Key feature 1',
      'Key feature 2',
      'Key feature 3',
      'Key feature 4',
      'Key feature 5'
    ],
    icon: YourChosenIcon, // Import from lucide-react
    github: 'https://github.com/yourusername/project-repo',
    demo: 'https://your-project-demo.com', // Optional
    category: 'Project Category'
  },
  // Add more projects...
]
```

### Project Writing Tips

1. **Title**: Use clear, descriptive names
2. **Description**: Focus on impact and technical challenges
3. **Technologies**: List the main technologies used
4. **Features**: Highlight the most impressive features
5. **Links**: Ensure GitHub links work and demos are live

### Project Categories
- Web Application
- Mobile Application
- Distributed Systems
- API/Backend
- Data Science
- Machine Learning
- DevOps/Infrastructure
- Open Source Contribution

## 💼 Skills Section

### Updating Skills (`src/components/Skills.tsx`)

Modify the skillCategories array to reflect your actual skills:

```tsx
const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'JavaScript/TypeScript', level: 90 }, // Adjust levels 0-100
      { name: 'Python', level: 85 },
      // Add your languages...
    ]
  },
  // Modify other categories...
]
```

### Skill Level Guidelines
- **90-100%**: Expert level, can teach others
- **80-89%**: Advanced, comfortable with complex projects
- **70-79%**: Intermediate, can work independently
- **60-69%**: Beginner-intermediate, learning actively
- **50-59%**: Beginner, basic understanding

## 🎨 Visual Customization

### Color Scheme (`tailwind.config.js`)

1. **Primary Colors**
   ```javascript
   primary: {
     50: '#f0f9ff',   // Lightest
     500: '#0ea5e9',  // Main brand color
     900: '#0c4a6e',  // Darkest
   }
   ```

2. **Custom Color Palette**
   ```javascript
   colors: {
     brand: {
       light: '#your-light-color',
       main: '#your-main-color',
       dark: '#your-dark-color',
     }
   }
   ```

### Typography (`src/app/globals.css`)

1. **Font Changes**
   ```css
   @import url('https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap');
   
   body {
     font-family: 'YourFont', system-ui, sans-serif;
   }
   ```

2. **Update Tailwind Config**
   ```javascript
   fontFamily: {
     sans: ['YourFont', 'system-ui', 'sans-serif'],
   }
   ```

### Logo/Branding (`src/components/Navigation.tsx`)

Replace the logo section:
```tsx
<div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
  <span className="text-white font-bold text-lg">YI</span> {/* Your Initials */}
</div>
```

## 📱 Layout Customization

### Section Order (`src/app/page.tsx`)

Rearrange sections as needed:
```tsx
export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <Hero />
      <About />
      <Skills />      {/* Moved before Projects */}
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
```

### Adding New Sections

1. Create a new component in `src/components/`
2. Import and add to the main page
3. Update navigation if needed

## 🔧 Advanced Customization

### Animation Customization

1. **Timing Adjustments**
   ```tsx
   // In any component
   transition={{ duration: 0.8, ease: "easeOut" }} // Slower animation
   ```

2. **Custom Animations**
   ```tsx
   const customVariants = {
     hidden: { opacity: 0, scale: 0.8 },
     visible: { opacity: 1, scale: 1 }
   }
   ```

### Form Integration

To make the contact form functional:

1. **EmailJS Integration**
   ```bash
   npm install @emailjs/browser
   ```

2. **Formspree Integration**
   ```tsx
   <form action="https://formspree.io/f/your-form-id" method="POST">
   ```

3. **Custom Backend**
   Set up your own API endpoint for form handling.

### SEO Customization (`src/app/layout.tsx`)

Update metadata:
```tsx
export const metadata: Metadata = {
  title: 'Your Name | Computer Science Portfolio',
  description: 'Your personalized description highlighting your expertise and goals.',
  keywords: ['Your', 'Relevant', 'Keywords'],
  // Update other fields...
}
```

## 📊 Analytics Integration

### Google Analytics

1. **Install Package**
   ```bash
   npm install @next/third-parties
   ```

2. **Add to Layout**
   ```tsx
   import { GoogleAnalytics } from '@next/third-parties/google'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
         </body>
       </html>
     )
   }
   ```

## 🎯 Content Strategy

### Writing Effective Descriptions

1. **Use Action Words**: Built, Developed, Implemented, Designed
2. **Quantify Impact**: "Improved performance by 40%"
3. **Highlight Challenges**: Explain technical problems solved
4. **Show Growth**: Mention learning and skill development

### Professional Tone

- Be confident but not arrogant
- Focus on value and impact
- Use technical terms appropriately
- Keep descriptions concise but informative

## 🔍 Testing Your Changes

1. **Local Testing**
   ```bash
   npm run dev
   ```

2. **Build Testing**
   ```bash
   npm run build
   npm run start
   ```

3. **Type Checking**
   ```bash
   npm run type-check
   ```

4. **Responsive Testing**
   - Test on different screen sizes
   - Use browser dev tools
   - Test on actual devices

## 📝 Content Checklist

- [ ] Personal information updated
- [ ] All placeholder text replaced
- [ ] Projects reflect your actual work
- [ ] Skills accurately represent your abilities
- [ ] Contact information is correct
- [ ] Social links work properly
- [ ] Images are optimized and relevant
- [ ] SEO metadata is personalized
- [ ] All links are functional
- [ ] Content is proofread and professional

Remember to commit your changes regularly and test thoroughly before deploying!
