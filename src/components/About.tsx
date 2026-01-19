'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { Server, Cloud, Brain, Layout, Globe, Code } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const About = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Mobile-only flag (assumption: mobile when width < 768)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

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

  return (
    <section id="about" className="py-12 sm:py-20 bg-white/80 dark:bg-black/80 backdrop-blur-sm relative overflow-hidden transition-colors duration-500">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 drop-shadow-2xl">
            {t('about.title')} <span className="holographic">{t('about.me')}</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3 animate-pulse"></div>
              <div className="relative bg-white/90 dark:bg-black/80 backdrop-blur-sm border border-blue-200 dark:border-blue-500/30 p-6 sm:p-8 rounded-2xl shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-lg">
                  {t('about.journey_title')}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
                  {isMobile ? t('about.journey_desc1_mobile') : t('about.journey_desc1')}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {isMobile ? t('about.journey_desc2_mobile') : t('about.journey_desc2')}
                </p>
                {/* Hide coursework on mobile to reduce card length */}
                {!isMobile && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">{t('about.key_coursework')}</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Array.isArray(t('about.courses')) && t('about.courses').map((course: string) => (
                        <span
                          key={course}
                          className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  {Array.isArray(t('about.traits')) && t('about.traits').map((trait: string) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              {t('about.drives_title')}
            </h3>
            <div className="space-y-6">
                {Array.isArray(t('about.drives')) && t('about.drives').map((item: any, index: number) => {
                  return (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-4"
                      variants={itemVariants}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {isMobile ? (item.description_mobile || item.description) : item.description}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About
