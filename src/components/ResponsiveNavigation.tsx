'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Menu, X, Home, User, Briefcase, Code, Mail, Zap, Award, Clock, Folder, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import ImageModal from './ui/ImageModal'
import { useLanguage } from '@/context/LanguageContext'

const ResponsiveNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMobile, setIsMobile] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['hero', 'about', 'experience', 'certifications', 'projects', 'skills', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu or modal is open
  useEffect(() => {
    if (isOpen || !!selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, selectedImage])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const navItems = [
    { id: 'hero', label: t('nav.home'), icon: Home },
    { id: 'about', label: t('nav.about'), icon: User },
    { id: 'experience', label: t('nav.experience'), icon: Briefcase },
    { id: 'certifications', label: t('nav.certifications'), icon: Award },
    { id: 'projects', label: t('nav.projects'), icon: Folder },
    { id: 'skills', label: t('nav.skills'), icon: Code },
    { id: 'contact', label: t('nav.contact'), icon: Mail }
  ]

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-2xl border-b border-gray-200 dark:border-blue-500/30'
            : 'bg-white/20 dark:bg-black/20 backdrop-blur-sm'
          }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)' : 'none'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.button
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer bg-transparent border-none p-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage('/dp/me.jpg')}
            >
              <motion.div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-blue-500"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.5)',
                    '0 0 30px rgba(147, 51, 234, 0.5)',
                    '0 0 20px rgba(59, 130, 246, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Image
                  src="/dp/me.jpg"
                  alt="Caleb Kyere Boateng"
                  fill
                  sizes="40px"
                  priority
                  className="object-cover"
                />
              </motion.div>
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white drop-shadow-lg">
                {isMobile ? 'CKB' : 'Caleb Kyere Boateng'}
              </span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3 lg:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${activeSection === item.id
                      ? 'text-white bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                    }`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: activeSection === item.id
                      ? '0 0 25px rgba(59, 130, 246, 0.6)'
                      : '0 0 15px rgba(100, 100, 100, 0.2)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={activeSection === item.id ? {
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.6)',
                      '0 0 30px rgba(147, 51, 234, 0.6)',
                      '0 0 20px rgba(59, 130, 246, 0.6)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="flex items-center gap-2">
                    <item.icon size={16} />
                    {item.label}
                  </span>
                </motion.button>
              ))}

              {/* Language Toggle */}
              <motion.button
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors font-bold w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {language.toUpperCase()}
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <motion.button
                onClick={toggleLanguage}
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors font-bold w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {language.toUpperCase()}
              </motion.button>

              <motion.button
                className="p-2 rounded-lg bg-gray-100 dark:bg-white/10 backdrop-blur-sm text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-white/20"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 h-screen w-screen z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-blue-500/30 shadow-2xl overflow-hidden"
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="p-6">
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-300 ${activeSection === item.id
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`p-2 rounded-lg ${activeSection === item.id
                          ? 'bg-white/20'
                          : 'bg-blue-100 dark:bg-blue-500/20'
                        }`}>
                        <item.icon size={20} />
                      </div>
                      <span className="font-medium text-lg">{item.label}</span>
                      {activeSection === item.id && (
                        <motion.div
                          className="ml-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Zap size={16} className="text-yellow-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage}
        alt="Profile Picture"
        lockScroll={false}
      />
    </>
  )
}

export default ResponsiveNavigation
