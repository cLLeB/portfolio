'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Network, Server, Smartphone, Cloud, Settings, TrendingUp, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

const TouchOptimizedSkills = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const skillCategories = [
    {
      title: t('skills.categories.programming'),
      icon: Code,
      color: 'from-green-500 to-emerald-600',
      skills: [
        { name: 'JavaScript/TypeScript', level: 15 },
        { name: 'Python', level: 18 },
        { name: 'Java', level: 12 },
        { name: 'C++', level: 14 },
        { name: 'PHP', level: 10 },
        { name: 'Solidity', level: 8 }
      ]
    },
    {
      title: t('skills.categories.frontend'),
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-600',
      skills: [
        { name: 'React/Next.js', level: 16 },
        { name: 'HTML5/CSS3', level: 20 },
        { name: 'Tailwind CSS', level: 12 },
        { name: 'Bootstrap', level: 10 },
        { name: 'Framer Motion', level: 8 },
        { name: 'React Native', level: 14 }
      ]
    },
    {
      title: t('skills.categories.backend'),
      icon: Server,
      color: 'from-indigo-600 to-blue-800',
      skills: [
        { name: 'Node.js/Express', level: 12 },
        { name: 'RESTful APIs', level: 18 },
        { name: 'FastAPI/Flask', level: 10 },
        { name: 'GraphQL', level: 5 },
        { name: 'Socket.io', level: 8 },
        { name: 'JWT Authentication', level: 11 }
      ]
    },
    {
      title: t('skills.categories.network'),
      icon: Network,
      color: 'from-orange-500 to-red-600',
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
      color: 'from-cyan-500 to-blue-600',
      skills: [
        { name: 'Git/GitHub', level: 20 },
        { name: 'Docker', level: 15 },
        { name: 'Linux', level: 22 },
        { name: 'AWS Basics', level: 10 },
        { name: 'CI/CD', level: 12 },
        { name: 'Nginx', level: 14 }
      ]
    },
    {
      title: t('skills.categories.tools'),
      icon: Settings,
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'VS Code', level: 25 },
        { name: 'Postman', level: 15 },
        { name: 'Jest/Testing', level: 10 },
        { name: 'Figma', level: 12 },
        { name: 'ANTLR', level: 11 },
        { name: 'Web3.js', level: 8 }
      ]
    }
  ]

  const ProgressBar = ({ skill, index, categoryColor }: {
    skill: { name: string; level: number },
    index: number,
    categoryColor: string
  }) => {
    // Make animation duration dynamic per bar for a more lively effect
    const flowDuration = 3.5 + (index % 4) * 0.7; // 3.5s to 5.6s
    return (
      <motion.div
        className="mb-3 sm:mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
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
            className="text-sm text-cyan-600 dark:text-cyan-300 relative z-20 font-mono"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700/50 rounded-full h-2 sm:h-2.5 relative overflow-hidden">
          {/* White flow animation overlay, always full width, only animates when in view */}
          <motion.div
            className="absolute inset-0 h-full pointer-events-none"
            style={{ zIndex: 1 }}
            animate={inView ? { x: ['-100%', '100%'] } : { x: '-100%' }}
            transition={{ duration: flowDuration, repeat: inView ? Infinity : 0, ease: "linear" }}
          >
            <div className="w-full h-full bg-white/20 rounded-full" />
          </motion.div>
          {/* Filled bar */}
          <motion.div
            className={`bg-gradient-to-r ${categoryColor} h-full rounded-full relative`}
            style={{ zIndex: 2, position: 'relative' }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <section className="py-12 sm:py-20 bg-gray-50 dark:bg-black/90 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-blue-900/5 to-indigo-900/5 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-indigo-900/20"></div>

      {mounted && (
        <motion.div
          ref={ref}
          className="container mx-auto px-4 sm:px-6 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 relative z-20">
              {isMobile ? t('skills.title_mobile') : t('skills.title')}
              {/* On non-mobile show subtitle inline */}
              {!isMobile && (
                <span
                  className="text-blue-600 dark:text-blue-400 drop-shadow-2xl"
                >
                  {t('skills.subtitle')}
                </span>
              )}
            </h2>

            {/* Description only on non-mobile */}
            {!isMobile && (
              <>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-lg relative z-20 px-4">
                  {t('skills.description')}
                </p>
                <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
              </>
            )}
          </motion.div>

          {/* Mobile Tab Navigation */}
          {isMobile && (
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex overflow-x-auto pb-4 space-x-2 scrollbar-hide">
                {skillCategories.map((category, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${activeCategory === index
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-200 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700/50'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon size={18} />
                    <span className="font-medium whitespace-nowrap">{category.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Skills Grid */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8`}>
            {(isMobile ? [skillCategories[activeCategory]] : skillCategories).map((category, categoryIndex) => (
              <motion.div
                key={isMobile ? `mobile-${activeCategory}` : categoryIndex}
                variants={itemVariants}
                className="bg-white dark:bg-black/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-cyan-500/30 hover:border-blue-500/50 transition-all duration-300 relative z-10 dark:bg-gradient-to-br dark:from-black/80 dark:to-slate-900/60"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                whileHover={{
                  boxShadow: '0 12px 40px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)',
                  y: -4
                }}
                layout={isMobile}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <motion.div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-3 sm:mr-4`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <category.icon size={isMobile ? 20 : 24} className="text-white" />
                  </motion.div>
                  <h3
                    className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white relative z-20"
                    style={{
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {(
                    // On mobile, remove the skill with the lowest level before rendering
                    isMobile
                      ? (() => {
                        const skillsCopy = [...category.skills]
                        // find index of min
                        let minIdx = 0
                        for (let i = 1; i < skillsCopy.length; i++) {
                          if (skillsCopy[i].level < skillsCopy[minIdx].level) minIdx = i
                        }
                        skillsCopy.splice(minIdx, 1)
                        return skillsCopy
                      })()
                      : category.skills
                  ).map((skill, skillIndex) => (
                    <ProgressBar
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                      categoryColor={category.color}
                    />
                  ))}
                </div>

                {/* Category Stats */}
                <motion.div
                  className="mt-4 sm:mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                      <TrendingUp size={14} />
                      <span>{t('skills.avg_level')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-600 dark:text-cyan-300 font-mono">
                        {(() => {
                          // compute average based on displayed skills (exclude lowest on mobile)
                          const displayed = isMobile ? (() => {
                            const s = [...category.skills]
                            let minIdx = 0
                            for (let i = 1; i < s.length; i++) if (s[i].level < s[minIdx].level) minIdx = i
                            s.splice(minIdx, 1)
                            return s
                          })() : category.skills
                          return Math.round(displayed.reduce((acc, skill) => acc + skill.level, 0) / displayed.length)
                        })()}%
                      </span>
                      <Zap size={14} className="text-yellow-500 dark:text-yellow-400" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          {isMobile && (
            <motion.div
              variants={itemVariants}
              className="flex justify-center space-x-2 mt-8"
            >
              {skillCategories.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${activeCategory === index ? 'bg-cyan-400 w-6' : 'bg-gray-600'
                    }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  )
}

export default TouchOptimizedSkills
