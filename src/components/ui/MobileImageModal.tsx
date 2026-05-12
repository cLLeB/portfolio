'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useMobileScrollLock } from '../../hooks/useMobileScrollLock'

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
    const [shouldRender, setShouldRender] = useState(false)
    const [visible, setVisible] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)

    useMobileScrollLock(visible)

    // Client-side mount check for portal
    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle open/close with scroll lock
    useEffect(() => {
        if (isOpen) {
            setShouldRender(true)
            setVisible(true)
            setImageLoaded(false)
        } else {
            setVisible(false)
            const timer = setTimeout(() => setShouldRender(false), 250)
            return () => clearTimeout(timer)
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
    if (!mounted || !shouldRender || !imageSrc) return null

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
                    opacity: visible ? 1 : 0,
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
