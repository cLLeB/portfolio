'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  background?: 'default' | 'gradient' | 'glass'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
}

const Section = ({ 
  id, 
  children, 
  className = '', 
  background = 'default',
  padding = 'lg',
  animate = true 
}: SectionProps) => {
  const backgroundClasses = {
    default: 'bg-transparent',
    gradient: 'bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50',
    glass: 'glass-card'
  }

  const paddingClasses = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24'
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const Component = animate ? motion.section : 'section'

  return (
    <Component
      id={id}
      className={`
        relative overflow-hidden
        ${backgroundClasses[background]}
        ${paddingClasses[padding]}
        ${className}
      `}
      {...(animate && {
        variants: sectionVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" }
      })}
    >
      <div className="container-professional relative z-10">
        {children}
      </div>
    </Component>
  )
}

export default Section
