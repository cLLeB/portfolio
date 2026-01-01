'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import DynamicBackground from './DynamicBackground'
import FloatingElements from './FloatingElements'
import GlitchText from './GlitchText'
import { downloadResume } from '@/utils/downloadResume'

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const roles = [
    'Computer Science Student',
    'Full Stack Developer',
    'Software Engineer',
    'Backend Developer',
    'Problem Solver'
  ]

  useEffect(() => {
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
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }, 2000)
      }
    }

    setDisplayText('')
    setIsTyping(true)
    setTimeout(typeText, 500)
  }, [currentRole])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50 dark:bg-black">
      {/* Dynamic Interactive Background */}
      <DynamicBackground />

      {/* Floating Tech Elements */}
      <FloatingElements />

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)',
            'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.4) 0%, transparent 60%)',
            'radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 60%)',
            'radial-gradient(circle at 60% 30%, rgba(236, 72, 153, 0.4) 0%, transparent 60%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 60%)'
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing Energy Rings */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 2 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-blue-400/20 rounded-full"
            style={{
              width: 200 + i * 150,
              height: 200 + i * 150,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
              rotate: 360
            }}
            transition={{
              duration: 4 + i * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="container mx-auto px-6 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ zIndex: 10 }}
      >
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span
              className="text-gray-900 dark:text-white drop-shadow-2xl"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255, 255, 255, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(255, 255, 255, 0.5)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Hi, I'm{' '}
            </motion.span>
            <GlitchText text="Caleb Kwabena Kyere Boateng" className="holographic text-5xl md:text-7xl" />
          </motion.h1>
          
          <motion.div
            className="text-2xl md:text-3xl text-cyan-600 dark:text-cyan-300 mb-8 h-12 flex items-center justify-center font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="drop-shadow-lg"
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

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg"
          animate={{
            textShadow: [
              '0 0 10px rgba(255, 255, 255, 0.3)',
              '0 0 20px rgba(255, 255, 255, 0.5)',
              '0 0 10px rgba(255, 255, 255, 0.3)'
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          Passionate Computer Science student at KNUST with a drive for creating innovative software solutions.
          Experienced in full-stack development, system design, and modern programming paradigms.
          Currently seeking internship opportunities to contribute to meaningful projects and grow as a developer.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="magnetic-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:shadow-2xl relative overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={downloadResume}
            className="magnetic-button border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              borderColor: "#8b5cf6"
            }}
            whileTap={{ scale: 0.95 }}
            title="Download Resume"
          >
            <Download size={20} className="relative z-10" />
            <span className="relative z-10">Download Resume</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
          </motion.button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-16"
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
              className="p-3 rounded-full bg-gray-100 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 hover:bg-gray-200 dark:hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label={label}
            >
              <Icon size={24} className="text-gray-600 dark:text-gray-300" />
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            aria-label="Scroll to about section"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown size={24} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero
