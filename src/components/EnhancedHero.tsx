'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown, Github, Linkedin, Mail, Download, MapPin } from 'lucide-react'
import Button from './ui/Button'
import GlitchText from './GlitchText'

const EnhancedHero = () => {
  const [orbStyles, setOrbStyles] = useState<{ width: string; height: string; left: string; top: string }[]>([])
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particlePositions, setParticlePositions] = useState<{ left: string; top: string }[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Enhanced typing animation
  useEffect(() => {
    const roles = [
      'Computer Science Student',
      'Network Engineer',
      'Security Professional',
      'Problem Solver',
      'Tech Enthusiast'
    ]
    const currentRoleText = roles[currentRole]
    let currentIndex = 0
    
    const typeText = () => {
      if (currentIndex < currentRoleText.length) {
        setDisplayText(currentRoleText.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, 100)
      } else {
        setTimeout(() => {
          setIsTyping(false)
          setTimeout(() => {
            setDisplayText('')
            setCurrentRole((prev) => (prev + 1) % roles.length)
            setIsTyping(true)
          }, 1000)
        }, 2000)
      }
    }

    if (isTyping) {
      typeText()
    }
  }, [currentRole, isTyping])

  // Mouse tracking for interactive elements
  // Removed duplicate useEffect


  useEffect(() => {
    const styles = [...Array(6)].map((_, i) => ({
      width: `${Math.random() * 300 + 100}px`,
      height: `${Math.random() * 300 + 100}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setOrbStyles(styles)
  }, [])

  useEffect(() => {
    const positions = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }))
    setParticlePositions(positions)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-500">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbs */}
        {orbStyles.map((style, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"
            style={style}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Interactive Particles */}
        {typeof window !== 'undefined' && particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: position.left,
              top: position.top,
            }}
            animate={{
              x: (mousePosition.x - (window?.innerWidth || 0) / 2) * 0.01,
              y: (mousePosition.y - (window?.innerHeight || 0) / 2) * 0.01,
              opacity: [0.2, 1, 0.2]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 text-center relative z-10"
        style={{ opacity }}
      >
        {/* Professional Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium tracking-wide uppercase">
              Available for Opportunities
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-gray-500 dark:text-gray-400 mb-8">
            <MapPin size={16} />
            <span className="text-sm">Based in Ghana</span>
          </div>
        </motion.div>

        {/* Enhanced Name Display with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-display-2xl md:text-display-xl font-bold mb-4">
            <motion.span
              className="block text-gray-800 dark:text-gray-200 mb-2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Hello, I am
            </motion.span>
            <motion.div
              className="block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <GlitchText
                text="Caleb Kwabena Kyere Boateng"
                className="gradient-text text-display-2xl md:text-display-xl font-bold"
              />
            </motion.div>
          </h1>
        </motion.div>

        {/* Enhanced Role Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <div className="text-heading-xl text-gray-600 dark:text-gray-300 mb-6 h-16 flex items-center justify-center">
            <span className="font-mono">
              {displayText}
              <motion.span
                className="inline-block w-0.5 h-8 bg-blue-400 ml-1"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </span>
          </div>
          
          <motion.p
            className="text-body-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Passionate about creating innovative solutions through code. 
            Specializing in full-stack development, computer networking, 
            and building user-centric applications that make a difference.
          </motion.p>
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="min-w-[200px]"
          >
            View My Work
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            href="/resume.pdf"
            target="_blank"
            icon={<Download size={20} />}
            className="min-w-[200px]"
          >
            Download Resume
          </Button>
        </motion.div>

        {/* Enhanced Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="flex justify-center space-x-6 mb-16"
        >
          {[
            { 
              icon: Github, 
              href: 'https://github.com/cLLeB', 
              label: 'GitHub',
              color: 'hover:text-gray-900 dark:hover:text-gray-300'
            },
            { 
              icon: Linkedin, 
              href: 'https://www.linkedin.com/in/caleb-kyere-boateng-6736092b4', 
              label: 'LinkedIn',
              color: 'hover:text-blue-400'
            },
            { 
              icon: Mail, 
              href: 'mailto:kyereboatengcaleb@gmail.com', 
              label: 'Email',
              color: 'hover:text-green-400'
            }
          ].map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                p-4 rounded-full glass-card text-gray-500 dark:text-gray-400 ${color}
                transition-all duration-300 group
              `}
              whileHover={{ 
                scale: 1.1, 
                y: -5,
                boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon size={24} />
              <span className="sr-only">{label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to about section"
          >
            <span className="text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
              Discover More
            </span>
            <motion.div
              className="p-2 rounded-full border border-gray-300 dark:border-gray-600 group-hover:border-blue-500 dark:group-hover:border-blue-400 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Ambient Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-900/5 pointer-events-none" />
    </section>
  )
}

export default EnhancedHero
