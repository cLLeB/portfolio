'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

interface MobileImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageSrc: string | null
    alt: string
}

/**
 * Mobile-specific image modal with guaranteed viewport centering.
 * Uses portal + multiple CSS techniques to ensure the image always appears
 * centered on the screen, regardless of scroll position.
 */
const MobileImageModal = ({ isOpen, onClose, imageSrc, alt }: MobileImageModalProps) => {
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const scrollPositionRef = useRef(0)

    // Client-side mount check for portal
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle open/close with scroll lock
    useEffect(() => {
        if (isOpen) {
            // Save scroll position
            scrollPositionRef.current = window.scrollY

            // Lock the page - multiple methods for cross-browser compatibility
            const html = document.documentElement
            const body = document.body

            // Prevent scrolling
            html.style.overflow = 'hidden'
            html.style.height = '100%'
            body.style.overflow = 'hidden'
            body.style.position = 'fixed'
            body.style.top = `-${scrollPositionRef.current}px`
            body.style.left = '0'
            body.style.right = '0'
            body.style.width = '100%'
            body.style.height = '100%'

            setVisible(true)
            setImageLoaded(false)
        } else {
            // CRITICAL: Restore scroll position FIRST, before removing styles
            const savedPosition = scrollPositionRef.current

            // Restore scrolling styles
            const html = document.documentElement
            const body = document.body

            // Clear body position first
            body.style.position = ''
            body.style.top = ''
            body.style.left = ''
            body.style.right = ''
            body.style.width = ''
            body.style.height = ''
            body.style.overflow = ''
            html.style.overflow = ''
            html.style.height = ''

            // Immediately restore scroll position (no animation)
            window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' })

            // Delay hiding for exit animation
            const timer = setTimeout(() => setVisible(false), 200)
            return () => clearTimeout(timer)
        }

        // Cleanup on unmount
        return () => {
            const html = document.documentElement
            const body = document.body
            html.style.overflow = ''
            html.style.height = ''
            body.style.overflow = ''
            body.style.position = ''
            body.style.top = ''
            body.style.left = ''
            body.style.right = ''
            body.style.width = ''
            body.style.height = ''
        }
    }, [isOpen])

    // Close on ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            return () => document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    // Don't render until mounted or if not visible
    if (!mounted || !visible || !imageSrc) return null

    const modalContent = (
        <>
            {/* Global styles for this modal */}
            <style jsx global>{`
        .mobile-image-modal-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          height: 100dvh !important;
          z-index: 2147483647 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: rgba(0, 0, 0, 0.97) !important;
          padding: 16px !important;
          box-sizing: border-box !important;
          touch-action: none !important;
          -webkit-overflow-scrolling: none !important;
          overscroll-behavior: none !important;
        }
        .mobile-image-modal-close {
          position: absolute !important;
          top: 16px !important;
          right: 16px !important;
          z-index: 2147483647 !important;
          padding: 14px !important;
          background-color: rgba(255, 255, 255, 0.25) !important;
          border: none !important;
          border-radius: 50% !important;
          color: white !important;
          cursor: pointer !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          min-width: 52px !important;
          min-height: 52px !important;
        }
        .mobile-image-modal-image {
          max-width: 92vw !important;
          max-height: 78vh !important;
          max-height: 78dvh !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          border-radius: 8px !important;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.7) !important;
        }
        .mobile-image-modal-spinner {
          position: absolute !important;
          width: 44px !important;
          height: 44px !important;
          border: 4px solid rgba(255, 255, 255, 0.25) !important;
          border-top-color: white !important;
          border-radius: 50% !important;
          animation: mobileModalSpin 0.75s linear infinite !important;
        }
        @keyframes mobileModalSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>

            {/* Modal Overlay */}
            <div
                className="mobile-image-modal-overlay"
                onClick={onClose}
                style={{
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease-out',
                }}
            >
                {/* Close Button */}
                <button
                    className="mobile-image-modal-close"
                    onClick={(e) => {
                        e.stopPropagation()
                        onClose()
                    }}
                    aria-label="Close image"
                >
                    <X size={26} strokeWidth={2.5} />
                </button>

                {/* Loading Spinner */}
                {!imageLoaded && (
                    <div className="mobile-image-modal-spinner" />
                )}

                {/* The Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="mobile-image-modal-image"
                    src={imageSrc}
                    alt={alt}
                    onClick={(e) => e.stopPropagation()}
                    onLoad={() => setImageLoaded(true)}
                    style={{
                        opacity: imageLoaded ? 1 : 0,
                        transform: imageLoaded ? 'scale(1)' : 'scale(0.92)',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                    }}
                />
            </div>
        </>
    )

    // Render via portal to document.body
    return createPortal(modalContent, document.body)
}

export default MobileImageModal
