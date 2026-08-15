'use client'

import { useLayoutEffect, useRef } from 'react'

export const MOBILE_MEDIA_QUERY = '(max-width: 767px)'

/**
 * Locks body scrolling while a mobile overlay is open and restores the exact
 * scroll offset when it closes.
 *
 * The offset is captured into a ref before the body is pinned. It is never read
 * back out of `body.style.top`, because once the body is `position: fixed` the
 * document scroll offset reads as 0 and any re-read would silently collapse the
 * saved position to the top of the page.
 */
export function useMobileScrollLock(isLocked: boolean) {
  const scrollYRef = useRef(0)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia(MOBILE_MEDIA_QUERY).matches) return
    if (!isLocked) return

    const body = document.body
    const html = document.documentElement

    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehavior: body.style.overscrollBehavior,
    }

    scrollYRef.current = window.scrollY

    body.style.position = 'fixed'
    body.style.top = `-${scrollYRef.current}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.overscrollBehavior = 'contain'

    // Unlock on close AND on unmount, so the page can never stay frozen.
    return () => {
      body.style.position = previous.position
      body.style.top = previous.top
      body.style.left = previous.left
      body.style.right = previous.right
      body.style.width = previous.width
      body.style.overflow = previous.overflow
      body.style.overscrollBehavior = previous.overscrollBehavior

      // <html> carries `scroll-behavior: smooth`; suppress it so restoring the
      // offset is instant rather than an animated scroll back down the page.
      const previousScrollBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      window.scrollTo(0, scrollYRef.current)
      html.style.scrollBehavior = previousScrollBehavior
    }
  }, [isLocked])
}
