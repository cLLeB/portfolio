'use client'

import { useLayoutEffect } from 'react'

export function useMobileScrollLock(isOpen: boolean) {
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) return

    const body = document.body

    if (isOpen) {
      const scrollY = window.scrollY

      body.style.position = 'fixed'
      body.style.top = `-${scrollY}px`
      body.style.left = '0'
      body.style.right = '0'
      body.style.width = '100%'
      body.style.overflow = 'hidden'
      body.style.overscrollBehavior = 'contain'
    } else {
      const scrollY = Math.abs(parseInt(body.style.top || '0', 10))

      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      body.style.overflow = ''
      body.style.overscrollBehavior = ''

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY)
      })
    }

    return () => {
      body.style.position = ''
      body.style.top = ''
      body.style.left = ''
      body.style.right = ''
      body.style.width = ''
      body.style.overflow = ''
      body.style.overscrollBehavior = ''
    }
  }, [isOpen])
}
