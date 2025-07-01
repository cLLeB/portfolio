'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  const [glitchText, setGlitchText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const triggerGlitch = () => {
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
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 3 seconds
        triggerGlitch()
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.span
      className={`${className} ${isGlitching ? 'text-red-500' : ''} transition-colors duration-100`}
      onMouseEnter={triggerGlitch}
      style={{
        textShadow: isGlitching 
          ? '2px 0 #ff0000, -2px 0 #00ff00, 0 2px #0000ff' 
          : 'none',
        animation: isGlitching 
          ? 'glitch 0.3s ease-in-out infinite alternate' 
          : 'none'
      }}
    >
      {glitchText}
    </motion.span>
  )
}

export default GlitchText
