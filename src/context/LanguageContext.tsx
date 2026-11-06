'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import en from '../translations/en.json'
import fr from '../translations/fr.json'

type Language = 'en' | 'fr'
type Translations = typeof en

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => any
    toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// The language comes from the address: /fr is French, everything else English.
// Each language has its own URL so search engines can index both.
export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const router = useRouter()
    const language: Language = pathname?.startsWith('/fr') ? 'fr' : 'en'

    useEffect(() => {
        document.documentElement.lang = language
    }, [language])

    // A visitor who chose French before lands on the English address: send them to /fr.
    useEffect(() => {
        if (language === 'en' && localStorage.getItem('language') === 'fr') {
            router.replace('/fr', { scroll: false })
        }
        // Only on first load, so choosing English later is respected.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setLanguage = (lang: Language) => {
        localStorage.setItem('language', lang)
        if (lang !== language) {
            router.push(lang === 'fr' ? '/fr' : '/', { scroll: false })
        }
    }

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'fr' : 'en')
    }

    const t = (path: string) => {
        const keys = path.split('.')
        let current: any = language === 'en' ? en : fr

        for (const key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation key not found: ${path}`)
                return path
            }
            current = current[key]
        }

        return current
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
