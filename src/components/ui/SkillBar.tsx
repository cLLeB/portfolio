'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SkillBarProps {
  skill: string
  level: number
  icon?: React.ReactNode
  color?: string
  delay?: number
}

const SkillBar = ({ 
  skill, 
  level, 
  icon, 
  color = 'blue', 
  delay = 0 
}: SkillBarProps) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    red: 'from-red-500 to-red-600',
    cyan: 'from-cyan-500 to-cyan-600'
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {icon && <span className="text-gray-400">{icon}</span>}
          <span className="text-gray-200 font-medium">{skill}</span>
        </div>
        <span className="text-gray-400 text-sm">{level}%</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-full relative`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: delay + 1.7
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default SkillBar
