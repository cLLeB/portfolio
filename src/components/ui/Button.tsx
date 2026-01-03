'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  href?: string
  target?: string
  disabled?: boolean
  isLoading?: boolean
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  target,
  disabled = false,
  isLoading = false,
  type = 'button',
  icon,
  iconPosition = 'left'
}: ButtonProps) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg transition-all duration-300
    focus-ring disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden group
  `

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-600 to-purple-600
      hover:from-purple-600 hover:to-blue-600
      text-white shadow-lg hover:shadow-xl
      hover:shadow-blue-500/25
    `,
    secondary: `
      bg-white/10 backdrop-blur-sm border border-white/20
      hover:bg-white/20 text-white
    `,
    outline: `
      border-2 border-blue-500 text-blue-500
      hover:bg-blue-500 hover:text-white
    `,
    ghost: `
      text-gray-300 hover:text-white hover:bg-white/10
    `
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `

  const content = (
    <>
      {/* Shimmer Effect */}
      {variant === 'primary' && !isLoading && (
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      )}
      
      {/* Content */}
      <span className={`relative z-10 flex items-center space-x-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {icon && iconPosition === 'left' && <span>{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === 'right' && <span>{icon}</span>}
      </span>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <LoadingSpinner size="sm" className="text-current" />
        </div>
      )}
    </>
  )

  const motionProps = {
    whileHover: { scale: (disabled || isLoading) ? 1 : 1.02, y: (disabled || isLoading) ? 0 : -2 },
    whileTap: { scale: (disabled || isLoading) ? 1 : 0.98 },
    transition: { duration: 0.2 }
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        className={buttonClasses}
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      {...motionProps}
    >
      {content}
    </motion.button>
  )
}

export default Button
