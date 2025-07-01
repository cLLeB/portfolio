'use client'

import { motion } from 'framer-motion'
import { Code, Database, Server, Cpu, Zap, Globe } from 'lucide-react'

const FloatingElements = () => {
  const elements = [
    { icon: Code, delay: 0, x: '10%', y: '20%' },
    { icon: Database, delay: 0.5, x: '80%', y: '15%' },
    { icon: Server, delay: 1, x: '15%', y: '70%' },
    { icon: Cpu, delay: 1.5, x: '85%', y: '75%' },
    { icon: Zap, delay: 2, x: '50%', y: '10%' },
    { icon: Globe, delay: 2.5, x: '70%', y: '60%' }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: element.x, top: element.y }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0.1, 0.3],
            scale: [0, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
            y: [0, -20, 0, -10, 0]
          }}
          transition={{
            duration: 8,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          <div className="relative">
            <motion.div
              className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-300/30 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 45 }}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 0 40px rgba(147, 51, 234, 0.3)',
                  '0 0 20px rgba(59, 130, 246, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <element.icon size={24} className="text-blue-400" />
            </motion.div>
            
            {/* Orbiting particles */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-2 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2"></div>
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 360],
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            delay: Math.random() * 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div 
            className={`w-4 h-4 ${
              i % 3 === 0 ? 'bg-blue-400/30 rounded-full' :
              i % 3 === 1 ? 'bg-purple-400/30 rotate-45' :
              'bg-cyan-400/30 rounded-sm'
            } backdrop-blur-sm`}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements
