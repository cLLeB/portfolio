'use client'

import { useEffect, useState } from 'react'
import MobileImageModal from './MobileImageModal'
import DesktopImageModal from './DesktopImageModal'
import { MOBILE_MEDIA_QUERY } from '../../hooks/useMobileScrollLock'

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    imageSrc: string | null
    alt: string
}

/**
 * Responsive image modal. This is a dispatcher only — it owns no scroll-lock or
 * body state of its own. Each variant is a separate component so that only one
 * set of scroll-lock effects is ever mounted; two locks running together
 * overwrite each other's saved scroll offset and dump the page at the top.
 */
const ImageModal = ({ isOpen, onClose, imageSrc, alt }: ImageModalProps) => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null)

    useEffect(() => {
        const query = window.matchMedia(MOBILE_MEDIA_QUERY)
        const update = () => setIsMobile(query.matches)

        update()
        query.addEventListener('change', update)
        return () => query.removeEventListener('change', update)
    }, [])

    // null until the client has measured the viewport (avoids an SSR mismatch)
    if (isMobile === null) return null

    return isMobile ? (
        <MobileImageModal isOpen={isOpen} onClose={onClose} imageSrc={imageSrc} alt={alt} />
    ) : (
        <DesktopImageModal isOpen={isOpen} onClose={onClose} imageSrc={imageSrc} alt={alt} />
    )
}

export default ImageModal
