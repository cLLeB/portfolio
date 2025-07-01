import ResponsiveNavigation from '@/components/ResponsiveNavigation'
import MobileOptimizedHero from '@/components/MobileOptimizedHero'
import About from '@/components/About'
import MobileProjectCards from '@/components/MobileProjectCards'
import TouchOptimizedSkills from '@/components/TouchOptimizedSkills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import MatrixRain from '@/components/MatrixRain'

export default function Home() {
  return (
    <main className="relative bg-black">
      <CustomCursor />
      <MatrixRain />
      <ResponsiveNavigation />
      <MobileOptimizedHero />
      <About />
      <MobileProjectCards />
      <TouchOptimizedSkills />
      <Contact />
      <Footer />
    </main>
  )
}
