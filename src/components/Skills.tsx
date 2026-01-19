'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Network, Server, Smartphone, Cloud, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useState, useEffect } from 'react'

const Skills = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // detect mobile for hiding the description
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const onResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const skillCategories = [
    {
      title: t('skills.categories.programming'),
      icon: Code,
      skills: [
        { name: 'JavaScript/TypeScript', level: 15 },
        { name: 'Python', level: 18 },
        { name: 'Java', level: 12 },
        { name: 'C++', level: 14 },
        { name: 'PHP', level: 10 }
      ]
    },
    {
      title: t('skills.categories.frontend'),
      icon: Smartphone,
      skills: [
        { name: 'React/Next.js', level: 16 },
        { name: 'HTML5/CSS3', level: 20 },
        { name: 'Tailwind CSS', level: 12 },
        { name: 'Bootstrap', level: 10 },
        { name: 'React Native', level: 14 }
      ]
    },
    {
      title: t('skills.categories.backend'),
      icon: Server,
      skills: [
        { name: 'Node.js/Express', level: 12 },
        { name: 'RESTful APIs', level: 18 },
        { name: 'FastAPI/Flask', level: 10 },
        { name: 'Socket.io', level: 8 },
        { name: 'JWT Authentication', level: 11 }
      ]
    },
    {
      title: t('skills.categories.network'),
      icon: Network,
      skills: [
        { name: 'Packet Tracer', level: 22 },
        { name: 'Wireshark', level: 21 },
        { name: 'GNS3', level: 23 },
        { name: 'Nmap', level: 20 },
        { name: 'Cisco IOS', level: 24 },
        { name: 'Linux Networking', level: 25 }
      ]
    },
    {
      title: t('skills.categories.devops'),
      icon: Cloud,
      skills: [
        { name: 'Git/GitHub', level: 20 },
        { name: 'Docker', level: 15 },
        { name: 'Linux', level: 22 },
        { name: 'CI/CD', level: 12 },
        { name: 'Nginx', level: 14 }
      ]
    },
    {
      title: t('skills.categories.tools'),
      icon: Settings,
      skills: [
        { name: 'VS Code', level: 25 },
        { name: 'Postman', level: 15 },
        { name: 'Jest/Testing', level: 10 },
        { name: 'Figma', level: 12 },
        { name: 'ANTLR', level: 11 }
      ]
    }
  ]

  const maxIndex = skillCategories.length - 1

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 }
      }
    })
  }

  const navigate = (newDirection: number) => {
    setDirection(newDirection)
    const nextIndex = currentIndex + newDirection
    if (nextIndex < 0) {
      setCurrentIndex(maxIndex)
    } else if (nextIndex > maxIndex) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(nextIndex)
    }
  }

  const paginate = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const ProgressBar = ({ skill, index }: { skill: { name: string; level: number }, index: number }) => {
    // Make animation duration dynamic per bar for a more lively effect
    const flowDuration = 3.5 + (index % 4) * 0.7; // 3.5s to 5.6s
    return (
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-medium text-gray-700 dark:text-gray-200 relative z-20"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {skill.name}
          </span>
          <span
            className="text-sm text-cyan-600 dark:text-cyan-300 relative z-20"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 relative overflow-hidden">
          {/* White flow animation overlay, always full width, only animates when in view */}
          <motion.div
            className="absolute inset-0 h-full pointer-events-none"
            style={{ zIndex: 1 }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: flowDuration, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full bg-white/20 rounded-full" />
          </motion.div>
          {/* Filled bar */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
            style={{ zIndex: 2, position: 'relative' }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    )
  }

  const currentCategory = skillCategories[currentIndex]

  return (
    <section className="py-20 bg-gray-50 dark:bg-black/90 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-blue-900/5 to-indigo-900/5 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-indigo-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_60%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 relative z-20">
            {t('skills.title')} <span
              className="text-blue-600 dark:text-blue-400 drop-shadow-2xl"
            >
              {t('skills.subtitle')}
            </span>
          </h2>
          {!isMobile && (
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg relative z-20">
              {t('skills.description')}
            </p>
          )}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative group max-w-3xl mx-auto px-4 md:px-0">
          {/* Navigation Arrows */}
          <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={() => navigate(-1)}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          </div>

          <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={() => navigate(1)}
              className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          {/* Carousel Content */}
          <div className="min-h-[500px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500
                  if (swipe) {
                    navigate(offset.x > 0 ? -1 : 1)
                  }
                }}
              >
                <motion.div
                  className="bg-white dark:bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-cyan-500/30 shadow-xl transition-all duration-300 relative z-10 dark:bg-gradient-to-br dark:from-black/80 dark:to-slate-900/60"
                >
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <currentCategory.icon size={32} className="text-white" />
                    </div>
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white relative z-20"
                      style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      {currentCategory.title}
                    </h3>
                  </div>

                  <div className="space-y-6 max-w-2xl mx-auto">
                    {currentCategory.skills.map((skill, skillIndex) => (
                      <ProgressBar key={skillIndex} skill={skill} index={skillIndex} />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mt-10">
            {skillCategories.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => paginate(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i
                  ? 'w-10 bg-gradient-to-r from-blue-500 to-indigo-600'
                  : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>



      </motion.div>
    </section>
  )
}

export default Skills
