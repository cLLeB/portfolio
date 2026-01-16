'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import MobileImageModal from './MobileImageModal'

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageSrc: string | null
    alt: string
}

/**
 * Responsive Image Modal - automatically uses MobileImageModal on mobile devices.
 */
const ImageModal = ({ isOpen, onClose, imageSrc, alt }: ImageModalProps) => {
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [visible, setVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const scrollY = useRef(0)

    // Client-side mount and mobile detection
    useEffect(() => {
        setMounted(true)
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Handle visibility with animation delay
    useEffect(() => {
        if (isOpen) {
            setVisible(true)
            setLoaded(false)
            scrollY.current = window.scrollY
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY.current}px`
            document.body.style.width = '100%'
        } else {
            // CRITICAL: Save position before clearing styles
            const savedPosition = scrollY.current

            // Clear styles
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            document.body.style.overflow = ''

            // Restore scroll instantly (no animation)
            window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' })

            const timer = setTimeout(() => setVisible(false), 200)
            return () => clearTimeout(timer)
        }
        return () => {
            document.body.style.overflow = ''
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
        }
    }, [isOpen])

    // ESC to close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.addEventListener('keydown', handleKey)
            return () => document.removeEventListener('keydown', handleKey)
        }
    }, [isOpen, onClose])

    // Use MobileImageModal for mobile devices
    if (mounted && isMobile) {
        return <MobileImageModal isOpen={isOpen} onClose={onClose} imageSrc={imageSrc} alt={alt} />
    }

    // Don't render until mounted or if not visible (desktop)
    if (!mounted || !visible || !imageSrc) return null

    // Desktop modal content
    const modalContent = (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 999999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0)',
                transition: 'background-color 0.2s ease',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                }}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    zIndex: 1000000,
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: '48px',
                    minHeight: '48px',
                }}
                aria-label="Close"
            >
                <X size={24} />
            </button>

            {!loaded && (
                <div
                    style={{
                        position: 'absolute',
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                    }}
                />
            )}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={imageSrc}
                alt={alt}
                onClick={(e) => e.stopPropagation()}
                onLoad={() => setLoaded(true)}
                style={{
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                    opacity: isOpen && loaded ? 1 : 0,
                    transform: isOpen && loaded ? 'scale(1)' : 'scale(0.9)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
            />
        </div>
    )

    return createPortal(modalContent, document.body)
}

export default ImageModal
