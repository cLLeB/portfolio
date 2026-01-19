'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown, Github, Linkedin, Mail, Download, MapPin } from 'lucide-react'
import Button from './ui/Button'
import { useLanguage } from '@/context/LanguageContext'

const EnhancedHero = () => {
  const { t, language } = useLanguage()
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
    const roles = t('hero.roles') as unknown as string[];
    // Guard against invalid roles data
    if (!Array.isArray(roles) || roles.length === 0) return;

    const currentRoleText = roles[currentRole] || '';
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, 100);
      } else {
        // Finished typing, wait before clearing
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Clearing phase
      timeoutId = setTimeout(() => {
        setDisplayText('');
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentRole, t]);

  // Reset animation on language change
  useEffect(() => {
    setDisplayText('');
    setIsTyping(true);
  }, [language]);

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-500 pt-24 sm:pt-28">
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
            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl"
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


        {/* Enhanced Name Display with Gradient Effect */}
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
              {t('hero.hello')}
            </motion.span>
            <motion.div
              className="block"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 text-display-2xl md:text-display-xl font-bold"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Caleb Kwabena Kyere Boateng
              </motion.span>
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
            {t('hero.description')}
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
            {t('hero.view_work')}
          </Button>

          <Button
            variant="outline"
            size="lg"
            href={language === 'fr' ? "/resume-fr.pdf" : "/resume.pdf"}
            target="_blank"
            icon={<Download size={20} />}
            className="min-w-[200px]"
          >
            {t('hero.download_resume')}
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
              {t('hero.discover_more')}
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
