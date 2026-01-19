'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Smartphone, Code, MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
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

  const projects = [
    {
      title: t('projects.items.0.title'),
      description: t('projects.items.0.description'),
      technologies: ['React Native', 'Bootstrap', 'Mobile Development', 'UI/UX'],
      features: t('projects.items.0.features'),
      icon: Smartphone,
      github: 'https://github.com/cLLeB/HubtelClone-Public',
      demo: 'https://drive.google.com/file/d/1RQZIu7f-NeHHZTHBEbZxkhkEXeJ_vLxM/view',
      category: t('projects.items.0.category'),
      image: '/awards/award_pic.png'
    },
    {
      title: t('projects.items.1.title'),
      description: t('projects.items.1.description'),
      technologies: ['Node.js', 'Socket.io', 'React', 'WebSockets', 'MongoDB', 'Express'],
      features: t('projects.items.1.features'),
      icon: MessageCircle,
      github: 'https://github.com/cLLeB/ephemeral-chat',
      demo: 'https://chat.kyere.me',
      category: t('projects.items.1.category'),
      image: '/awards/chat.png'
    },
    {
      title: t('projects.items.2.title'),
      description: t('projects.items.2.description'),
      technologies: ['Python', 'ANTLR', 'AST', 'Compiler Design', 'Language Theory'],
      features: t('projects.items.2.features'),
      icon: Code,
      github: 'https://github.com/cLLeB/custom-lang-interpreter',
      demo: 'https://drive.google.com/file/d/1JyCnuFcxy1rQczPMszvznoTu3jDlsswy/view',
      category: t('projects.items.2.category'),
      image: '/awards/custom-lang.png'
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-black/90 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-blue-900/5 to-cyan-900/5 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-2xl">
            {t('projects.title')} <span className="holographic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">{t('projects.subtitle')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg">
            {t('projects.description')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-white dark:bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-blue-500/30 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-500 project-card-while-hover dark:bg-gradient-to-br dark:from-black/80 dark:to-slate-800/40"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3), 0 0 30px rgba(147, 51, 234, 0.2)'
              }}
              style={{
                position: 'relative',
                zIndex: 1
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {project.image ? (
                      <div
                        className="w-12 h-12 rounded-lg overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-white/10"
                        onClick={() => {
                          setSelectedImage(project.image)
                          setSelectedAlt(project.title)
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {project.icon && <project.icon size={24} className="text-white" />}
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300 relative z-10"
                        style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto', touchAction: 'manipulation' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={20} className="text-gray-600 dark:text-gray-400" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300"
                        style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={20} className="text-gray-600 dark:text-gray-400" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">{t('projects.key_features')}</h4>
                  <ul className="space-y-2">
                    {Array.isArray(project.features) && project.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies && project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-16">
          <motion.a
            href="https://github.com/cLLeB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} />
            <span>{t('projects.view_github')}</span>
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
