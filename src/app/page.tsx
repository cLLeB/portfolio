import ResponsiveNavigation from '@/components/ResponsiveNavigation'
import EnhancedHero from '@/components/EnhancedHero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import MobileProjectCards from '@/components/MobileProjectCards'
import TouchOptimizedSkills from '@/components/TouchOptimizedSkills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <main className="relative bg-black">
      <CustomCursor />
      <ResponsiveNavigation />
      <EnhancedHero />
      <About />
      <Experience />
      <Certifications />
      <MobileProjectCards />
      <TouchOptimizedSkills />
      <Contact />
      <Footer />
    </main>
  )
}
