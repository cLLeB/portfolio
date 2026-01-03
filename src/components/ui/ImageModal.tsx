'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string | null
  alt: string
  lockScroll?: boolean
}

const ImageModal = ({ isOpen, onClose, imageSrc, alt, lockScroll = true }: ImageModalProps) => {
  const [isLoading, setIsLoading] = useState(true)

  // Reset loading state when imageSrc changes
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
    }
  }, [imageSrc, isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (!lockScroll) return

    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen, lockScroll])

  return (
    <AnimatePresence>
      {isOpen && imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 h-screen w-screen z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
          onClick={onClose}
        >
          <motion.button
            className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-50"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[30vh] sm:h-[85vh] overflow-hidden rounded-lg shadow-2xl border border-white/10 bg-black/20 flex items-center justify-center">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <LoadingSpinner size="lg" className="text-purple-500" />
                </div>
              )}
              <Image
                src={imageSrc}
                alt={alt}
                fill
                className={`object-contain transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                priority
                unoptimized
                sizes="100vw"
                onLoadingComplete={() => setIsLoading(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ImageModal
