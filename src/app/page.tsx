import ResponsiveNavigation from '@/components/ResponsiveNavigation'
import EnhancedHero from '@/components/EnhancedHero'
import About from '@/components/About'
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
      <MobileProjectCards />
      <TouchOptimizedSkills />
      <Contact />
      <Footer />
    </main>
  )
}
