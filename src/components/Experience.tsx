'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Shield, Search } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ImageModal from './ui/ImageModal'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedAlt, setSelectedAlt] = useState('')

  const experiences = [
    {
      role: 'Student Researcher',
      company: 'Computer Science Society | KNUST, Kumasi',
      period: '2025 - PRESENT',
      description: 'Conduct applied research within the Computer Science Society at KNUST, Ghana, contributing to collaborative projects aligned with emerging computer science trends. Support project design, documentation, and peer knowledge sharing while maintaining ethical and academic research standards. Foster an engaging research environment that strengthens student participation and technical skill development.',
      icon: Search,
      image: null
    },
    {
      role: 'Security Intern',
      company: 'Information Security and Technology Assurance Division | KNUST, Kumasi',
      period: 'SEPTEMBER 2025 - NOVEMBER 2025',
      description: 'Performed network security analysis to safeguard university digital assets within the Information Security and Technology Assurance Division at KNUST. Analyzed student portal traffic using Wireshark to detect anomalies and used Nmap for port scanning and host discovery to identify potential vulnerabilities. Supported vulnerability assessment, penetration testing activities, and security policy documentation.',
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
    <section id="experience" className="py-20 bg-black/40 relative overflow-hidden">
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional <span className="text-blue-500">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  {exp.image ? (
                    <div 
                      className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:scale-105 transition-transform"
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
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="mt-2 md:mt-0 px-4 py-1 bg-white/10 rounded-full text-sm text-gray-300 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
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

export default Experience
