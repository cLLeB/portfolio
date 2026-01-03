import ResponsiveNavigation from '@/components/ResponsiveNavigation'
import EnhancedHero from '@/components/EnhancedHero'
import MobileOptimizedHero from '@/components/MobileOptimizedHero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Projects from '@/components/Projects'
import MobileProjectCards from '@/components/MobileProjectCards'
import Skills from '@/components/Skills'
import TouchOptimizedSkills from '@/components/TouchOptimizedSkills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <main className="relative bg-black">
      <CustomCursor />
      <ResponsiveNavigation />
      
      <div className="hidden md:block">
        <EnhancedHero />
      </div>
      <div className="md:hidden">
        <MobileOptimizedHero />
      </div>

      <About />
      <Experience />
      <Certifications />

      <div id="projects">
        <div className="hidden md:block">
          <Projects />
        </div>
        <div className="md:hidden">
          <MobileProjectCards />
        </div>
      </div>

      <div id="skills">
        <div className="hidden md:block">
          <Skills />
        </div>
        <div className="md:hidden">
          <TouchOptimizedSkills />
        </div>
      </div>

      <Contact />
      <Footer />
    </main>
  )
}
