'use client'

import { useEffect } from 'react'

export function useMobileScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) return

    if (isOpen) {
      const scrollY = window.scrollY
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.dataset.scrollY = String(scrollY)

      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.body.style.overscrollBehavior = 'contain'
      document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      const scrollY = document.body.dataset.scrollY

      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
      document.body.style.paddingRight = ''

      delete document.body.dataset.scrollY

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10))
      }
    }

    return () => {
      const scrollY = document.body.dataset.scrollY

      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.body.style.overscrollBehavior = ''
      document.body.style.paddingRight = ''

      delete document.body.dataset.scrollY

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10))
      }
    }
  }, [isOpen])
}
