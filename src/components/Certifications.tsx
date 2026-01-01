'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Shield, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ImageModal from './ui/ImageModal'

const Certifications = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState('')

  const certifications = [
    {
      name: 'Certified Network Security Practitioner (CNSP)',
      issuer: 'The SecOps Group',
      date: 'Issued Nov 2025',
      focus: 'Defensive Security, Network Protocol & Traffic Analysis',
      icon: Shield,
      image: '/certs/cnsp.png'
    },
    {
      name: 'Certified Cybersecurity Educator Professional (CCEP)',
      issuer: 'Red Team Leaders',
      date: 'Issued Nov 2025',
      focus: 'Network Security, Information Security Architecture',
      icon: Award,
      image: '/certs/ccep.png'
    },
    {
      name: 'Research Methodologies in Strategy and Product Development',
      issuer: 'Institute of Management, Technology and Finance',
      date: 'Issued Jul 2025',
      focus: 'Strategy, Product Development, Research',
      icon: BookOpen,
      image: '/certs/product-management.jpg'
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
    <section id="certifications" className="py-20 bg-black/60 relative overflow-hidden">
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Certifications & <span className="text-purple-500">Licenses</span>
          </h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="mb-6 relative w-16 h-16 mx-auto md:mx-0">
                {cert.image ? (
                  <div 
                    className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedImage(cert.image)
                      setSelectedAlt(cert.issuer)
                    }}
                  >
                    <Image 
                      src={cert.image} 
                      alt={cert.issuer} 
                      width={64} 
                      height={64} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <cert.icon size={32} />
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 min-h-[3.5rem]">{cert.name}</h3>
              <p className="text-purple-400 font-medium mb-1">{cert.issuer}</p>
              <p className="text-sm text-gray-400 mb-4">{cert.date}</p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-300">
                  <span className="text-purple-400 font-semibold">Focus:</span> {cert.focus}
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
