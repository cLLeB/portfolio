'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useCallback } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const [hasInitialGlitch, setHasInitialGlitch] = useState(false)

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return
    
    setIsGlitching(true)
    const originalText = text
    let iterations = 0
    
    const interval = setInterval(() => {
      setGlitchText(
        originalText
          .split('')
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index]
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          .join('')
      )
      
      iterations += 1/3
      
      if (iterations >= originalText.length) {
        clearInterval(interval)
        setGlitchText(originalText)
        setIsGlitching(false)
      }
    }, 50)
  }, [text, isGlitching, glitchChars])

  // Initial glitch effect on mount
  useEffect(() => {
    if (!hasInitialGlitch) {
      const initialTimer = setTimeout(() => {
        triggerGlitch()
        setHasInitialGlitch(true)
      }, 1000) // Trigger after 1 second

      return () => clearTimeout(initialTimer)
    }
  }, [hasInitialGlitch, triggerGlitch])

  // Random glitch effects
  useEffect(() => {
    if (!hasInitialGlitch) return

    const timer = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 3 seconds
        triggerGlitch()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [triggerGlitch, hasInitialGlitch])

  return (
    <motion.span
      className={`${className} ${isGlitching ? 'text-red-400' : ''} transition-colors duration-100 cursor-pointer`}
      onMouseEnter={triggerGlitch}
      style={{
        textShadow: isGlitching
          ? '2px 0 #ff0040, -2px 0 #00ff41, 0 2px #004cff, 1px 1px #ffffff'
          : '0 0 20px rgba(59, 130, 246, 0.5)',
        animation: isGlitching
          ? 'glitch 0.3s ease-in-out infinite alternate'
          : 'none',
        filter: isGlitching ? 'hue-rotate(90deg) saturate(1.5)' : 'none'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {glitchText}
    </motion.span>
  )
}

export default GlitchText
