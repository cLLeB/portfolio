'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Shield, Search } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import ImageModal from './ui/ImageModal'
import { useLanguage } from '@/context/LanguageContext'

const Experience = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const scrollTimeout = useRef<number | null>(null)

  useEffect(() => {
    const onResize = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const experiences = [
    {
      role: t('experience.jobs.0.role'),
      company: t('experience.jobs.0.company'),
      period: t('experience.jobs.0.period'),
      description: t('experience.jobs.0.description'),
      description_mobile: t('experience.jobs.0.description_mobile'),
      icon: Search,
      image: '/exp/css.png'
    },
    {
      role: t('experience.jobs.1.role'),
      company: t('experience.jobs.1.company'),
      period: t('experience.jobs.1.period'),
      description: t('experience.jobs.1.description'),
      description_mobile: t('experience.jobs.1.description_mobile'),
      icon: Shield,
      image: '/exp/istad.jpeg'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
        duration: 0.5
      }
    }
  }

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-black/40 relative overflow-hidden transition-colors duration-500">
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('experience.title')} <span className="text-blue-500">{t('experience.subtitle')}</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Desktop list, Mobile: scroll-snap carousel */}
        {!isMobile ? (
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300 shadow-lg dark:shadow-none"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    {exp.image ? (
                      <div
                        className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                          setSelectedImage(exp.image)
                          setSelectedAlt(exp.company)
                        }}
                      >
                        <Image
                          src={exp.image}
                          alt={exp.company}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="p-4 bg-blue-500/20 rounded-xl text-blue-400 w-16 h-16 flex items-center justify-center">
                        <exp.icon size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{exp.role}</h3>
                        <p className="text-blue-500 dark:text-blue-400 font-medium">{exp.company}</p>
                      </div>
                      <span className="mt-2 md:mt-0 px-4 py-1 bg-gray-100 dark:bg-white/10 rounded-full text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-hidden">
            <div className="min-h-[320px] flex items-center">
              <div
                ref={scrollRef}
                className="exp-snap-container flex gap-4 w-full overflow-x-auto touch-pan-x"
                style={{ scrollSnapType: 'x mandatory', paddingLeft: '6%', paddingRight: '6%' }}
                onScroll={() => {
                  if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current)
                  scrollTimeout.current = window.setTimeout(() => {
                    const container = scrollRef.current
                    if (!container) return
                    const children = Array.from(container.children) as HTMLElement[]
                    const containerCenter = container.scrollLeft + container.clientWidth / 2
                    let closest: HTMLElement | null = null
                    let closestDistance = Infinity
                    children.forEach((c) => {
                      const child = c as HTMLElement
                      const childLeft = child.offsetLeft
                      const childCenter = childLeft + child.clientWidth / 2
                      const dist = Math.abs(childCenter - containerCenter)
                      if (dist < closestDistance) {
                        closestDistance = dist
                        closest = child
                      }
                    })
                    if (closest) {
                      const closestEl = closest as HTMLElement
                      const targetScroll = closestEl.offsetLeft - (container.clientWidth - closestEl.clientWidth) / 2
                      container.scrollTo({ left: targetScroll, behavior: 'smooth' })
                    }
                  }, 120)
                }}
              >
                {experiences.map((exp, index) => (
                  <div key={index} className="min-w-[88%] bg-white dark:bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-white/10 shadow-lg overflow-hidden" style={{ scrollSnapAlign: 'center', flex: '0 0 88%' }}>
                    <div className="flex justify-center mb-3">
                      {exp.image ? (
                        <button
                          onClick={() => {
                            setSelectedImage(exp.image)
                            setSelectedAlt(exp.company)
                          }}
                          className="w-20 h-20 overflow-hidden border border-gray-200 dark:border-white/10 flex items-center justify-center p-0 focus:outline-none rounded-md"
                        >
                          <Image src={exp.image} alt={exp.company} width={80} height={80} className="object-cover w-full h-full rounded-md" />
                        </button>
                      ) : (
                        <div className="w-20 h-20 bg-blue-500/20 rounded-md flex items-center justify-center">
                          <exp.icon size={28} />
                        </div>
                      )}
                    </div>
                    <div className="px-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{exp.role}</h3>
                      <p className="text-sm text-blue-500 dark:text-blue-400 mb-2">{exp.company}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{exp.period}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{isMobile ? (exp.description_mobile || exp.description) : exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <style jsx>{`
            .exp-snap-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .exp-snap-container::-webkit-scrollbar {
              display: none;
              height: 0;
            }
          `}</style>
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

export default Experience
