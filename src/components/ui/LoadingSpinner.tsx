'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  }

  // Default colors if not provided in className
  const defaultColors = className.includes('border-') ? '' : 'border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400'

  return (
    <div className={`flex items-center justify-center`}>
      <motion.div
        className={`${sizeClasses[size]} rounded-full ${defaultColors} ${className}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export default LoadingSpinner
