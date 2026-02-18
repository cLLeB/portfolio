import { ThemeProvider, useTheme } from 'next-themes'
import { LanguageProvider } from '@/context/LanguageContext'
import { useEffect } from 'react'

function ThemeColorSync() {
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    const activeTheme = theme === 'system' ? resolvedTheme : theme
    const color = activeTheme === 'dark' ? '#000000' : '#ffffff'
    const metaTag = document.querySelector('meta[name="theme-color"]')
    if (metaTag) {
      metaTag.setAttribute('content', color)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'theme-color'
      newMeta.content = color
      document.getElementsByTagName('head')[0].appendChild(newMeta)
    }
  }, [theme, resolvedTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeColorSync />
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
