'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Shield, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ImageModal from './ui/ImageModal'
import { useLanguage } from '@/context/LanguageContext'

const Certifications = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState('')

  const certifications = [
    {
      name: t('certifications.items.0.name'),
      issuer: t('certifications.items.0.issuer'),
      date: t('certifications.items.0.date'),
      focus: t('certifications.items.0.focus'),
      icon: Shield,
      image: '/certs/cnsp.png'
    },
    {
      name: t('certifications.items.1.name'),
      issuer: t('certifications.items.1.issuer'),
      date: t('certifications.items.1.date'),
      focus: t('certifications.items.1.focus'),
      icon: Award,
      image: '/certs/ccep.png'
    },
    {
      name: t('certifications.items.2.name'),
      issuer: t('certifications.items.2.issuer'),
      date: t('certifications.items.2.date'),
      focus: t('certifications.items.2.focus'),
      icon: BookOpen,
      image: '/certs/product-management.jpg'
    }
    ,
    {
      name: t('certifications.items.3.name'),
      issuer: t('certifications.items.3.issuer'),
      date: t('certifications.items.3.date'),
      focus: t('certifications.items.3.focus'),
      icon: Award,
      image: '/certs/cisco.png'
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
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-black/60 relative overflow-hidden">
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t('certifications.title')} <span className="text-purple-500">{t('certifications.subtitle')}</span>
          </h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </motion.div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 group shadow-lg dark:shadow-none"
            >
              <div className="mb-6 relative w-16 h-16 mx-auto md:mx-0 xl:w-20 xl:h-20">
                {cert.image ? (
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors cursor-pointer xl:w-20 xl:h-20"
                    onClick={() => {
                      setSelectedImage(cert.image)
                      setSelectedAlt(cert.issuer)
                    }}
                  >
                    <Image
                      src={cert.image}
                      alt={cert.issuer}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <cert.icon size={32} />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 min-h-[3.5rem]">{cert.name}</h3>
              <p className="text-purple-600 dark:text-purple-400 font-medium mb-1">{cert.issuer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cert.date}</p>
              <div className="pt-4 border-t border-gray-200 dark:border-white/10">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">{t('certifications.focus_label')}</span> {cert.focus}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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

export default Certifications
