'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Smartphone, Code, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import ImageModal from './ui/ImageModal'
import { useLanguage } from '@/context/LanguageContext'

const Projects = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Static config for icons and links
  const projectConfig = [
    {
      icon: Smartphone,
      github: 'https://github.com/cLLeB/HubtelClone-Public',
      demo: 'https://drive.google.com/file/d/1RQZIu7f-NeHHZTHBEbZxkhkEXeJ_vLxM/view',
      technologies: ['React Native', 'Bootstrap', 'Mobile Development', 'UI/UX'],
      image: '/awards/award_pic.png'
    },
    {
      icon: MessageCircle,
      github: 'https://github.com/cLLeB/ephemeral-chat',
      demo: 'https://chat.kyere.me',
      technologies: ['Node.js', 'Socket.io', 'React', 'WebSockets', 'MongoDB', 'Express'],
      image: '/awards/chat.png'
    },
    {
      icon: Code,
      github: 'https://github.com/cLLeB/custom-lang-interpreter',
      demo: 'https://drive.google.com/file/d/1JyCnuFcxy1rQczPMszvznoTu3jDlsswy/view',
      technologies: ['Python', 'ANTLR', 'AST', 'Compiler Design', 'Language Theory'],
      image: '/awards/custom-lang.png'
    }
  ]

  // Combine with translations
  const projects = (t('projects.items') as any[]).map((item, index) => ({
    ...item,
    ...(projectConfig[index] || {}),
    // provide shortTitle fallback
    shortTitle: item.shortTitle || (item.title ? item.title.split('-')[0].trim() : item.title),
    shortDesc: item.shortDesc || (item.description ? item.description.split('.').slice(0, 1)[0] + '.' : item.description)
  }))

  const itemsToShow = 1
  const maxIndex = projects.length - 1

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

  // Get current chunk of projects
  const visibleProjects = [projects[currentIndex]]

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-black/90 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/5 via-blue-900/5 to-cyan-900/5 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-2xl">
            {t('projects.title')} <span className="text-blue-600 dark:text-blue-400">{t('projects.subtitle')}</span>
          </h2>
          {!isMobile && (
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              {t('projects.description')}
            </p>
          )}
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative group max-w-4xl mx-auto px-4 md:px-0">
          {/* Navigation Arrows - Only visible on desktop hover */}
          <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={() => navigate(-1)}
              className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={28} />
            </motion.button>
          </div>

          <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.button
              onClick={() => navigate(1)}
              className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={28} />
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
                {visibleProjects.map((project, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    className="group relative bg-white dark:bg-black/60 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-blue-500/30 hover:border-indigo-500/50 transition-all duration-500 shadow-xl flex flex-col h-full overflow-hidden"
                    whileHover={{ y: -5 }}
                  >
                    {/* Glassmorphism Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 rounded-3xl pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-4">
                          {project.image ? (
                            <div
                              className="w-12 h-12 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-white/10 shadow-md flex-shrink-0"
                              onClick={() => {
                                setSelectedImage(project.image)
                                setSelectedAlt(project.title)
                              }}
                            >
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={56}
                                height={56}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-md flex-shrink-0">
                              {project.icon && <project.icon size={24} className="text-white" />}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {isMobile ? (project.shortTitle || project.title) : project.title}
                            </h3>
                            <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium tracking-wider uppercase">
                              {project.category}
                            </span>
                          </div>

                        </div>

                        <div className="flex space-x-2">
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Github size={18} />
                            </motion.a>
                          )}
                          {project.demo && (
                            <motion.a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <ExternalLink size={18} />
                            </motion.a>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-base sm:text-lg">
                        {isMobile ? (project.shortDesc || project.description) : project.description}
                      </p>


                      <div className="mb-6 flex-grow">
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white mb-4 uppercase tracking-widest opacity-70">{t('projects.key_features')}</h4>
                        <ul className="space-y-2">
                          {Array.isArray(project.features) && project.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                              <span className="line-clamp-2">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies && project.technologies.slice(0, 4).map((tech: string, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full text-[10px] sm:text-xs font-semibold border border-gray-200 dark:border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mt-8 sm:mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => paginate(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i
                  ? 'w-8 sm:w-12 bg-gradient-to-r from-blue-500 to-indigo-600'
                  : 'w-2 sm:w-3 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                  }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* GitHub Link */}
        <motion.div
          className="text-center mt-12 sm:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <motion.a
            href="https://github.com/cLLeB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-900 dark:text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg border border-gray-200 dark:border-white/10 shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={22} className="group-hover:text-blue-500 transition-colors" />
            <span>{t('projects.view_github')}</span>
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage}
        alt={selectedAlt}
      />
    </section>
  )
}

export default Projects
