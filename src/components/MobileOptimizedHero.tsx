'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Download, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import GlitchText from './GlitchText'
import { useLanguage } from '@/context/LanguageContext'

const ROLES = [
  'CS Student',
  'Security Dev',
  'Network Engineer',
  'Problem Solver'
]

const MobileOptimizedHero = () => {
  const { t, language } = useLanguage()
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [particles, setParticles] = useState<{ left: string; top: string; duration: number; delay: number }[]>([])

  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)

      // Generate particles based on mobile state
      const particleCount = mobile ? 8 : 15
      const newParticles = Array.from({ length: particleCount }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2
      }))
      setParticles(newParticles)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const roles = t('hero.roles')
    const currentRoleText = roles[currentRole]
    let currentIndex = 0

    const typeText = () => {
      if (currentIndex < currentRoleText.length) {
        setDisplayText(currentRoleText.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeText, 100)
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setIsTyping(true)
          setCurrentRole((prev) => (prev + 1) % ROLES.length)
        }, 2000)
      }
    }

    setDisplayText('')
    setIsTyping(true)
    setTimeout(typeText, 500)
  }, [currentRole])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-black">
      {/* Mobile-Optimized Background */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
      >
        {/* Simplified mobile background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-cyan-100/30 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-cyan-900/30" />

        {/* Mobile floating particles */}
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 text-center relative z-10"
        style={{ opacity }}
      >
        {/* Mobile-First Name Display */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <motion.h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 min-h-[160px] sm:min-h-0 flex flex-col sm:block justify-center">
            <motion.span
              className="block text-gray-900 dark:text-white drop-shadow-2xl mb-2 sm:mb-0 sm:inline"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(255, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {t('hero.hello')}{' '}
            </motion.span>
            <GlitchText
              text="Caleb Kwabena Kyere Boateng"
              className="holographic text-3xl sm:text-5xl md:text-7xl block sm:inline"
            />
          </motion.h1>

          {/* Mobile-Optimized Role Display */}
          <motion.div
            className="text-lg sm:text-2xl md:text-3xl text-cyan-600 dark:text-cyan-300 mb-6 sm:mb-8 h-8 sm:h-12 flex items-center justify-center font-mono px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="drop-shadow-lg text-center"
              animate={{
                textShadow: [
                  '0 0 10px rgba(6, 182, 212, 0.8)',
                  '0 0 20px rgba(6, 182, 212, 1)',
                  '0 0 10px rgba(6, 182, 212, 0.8)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {displayText}
            </motion.span>
            <motion.span
              className="ml-1 text-cyan-600 dark:text-cyan-400"
              animate={{
                opacity: isTyping ? [1, 0] : 1,
                textShadow: [
                  '0 0 5px rgba(34, 211, 238, 1)',
                  '0 0 15px rgba(34, 211, 238, 1)',
                  '0 0 5px rgba(34, 211, 238, 1)'
                ]
              }}
              transition={{
                opacity: { duration: 0.5, repeat: isTyping ? Infinity : 0 },
                textShadow: { duration: 1, repeat: Infinity }
              }}
            >
              |
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Mobile-Optimized Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed drop-shadow-lg px-4"
        >
          {t('hero.description')}
        </motion.p>

        {/* Mobile-Optimized Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 px-4"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto magnetic-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:shadow-2xl relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles size={18} />
              {t('hero.view_work')}
            </span>
          </motion.button>

          <motion.a
            href={language === 'fr' ? "/resume-fr.pdf" : "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto magnetic-button border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              borderColor: "#8b5cf6"
            }}
            whileTap={{ scale: 0.95 }}
            title={t('hero.download_resume')}
          >
            <Download size={18} className="relative z-10" />
            <span className="relative z-10">{t('hero.download_resume')}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          </motion.a>
        </motion.div>

        {/* Mobile-Optimized Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-16"
        >
          {[
            { icon: Github, href: 'https://github.com/cLLeB', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/caleb-kyere-boateng-6736092b4', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:kyereboatengcaleb@gmail.com', label: 'Email' }
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 sm:p-4 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon size={isMobile ? 20 : 24} className="text-gray-600 dark:text-gray-300" />
            </motion.a>
          ))}
        </motion.div>

        {/* Mobile-Optimized Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to about section"
          >
            <span className="text-xs sm:text-sm mb-2">{t('hero.scroll_down')}</span>
            <ChevronDown size={isMobile ? 20 : 24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MobileOptimizedHero
