'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
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

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language
        if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
            setLanguage(savedLang)
        }
        setMounted(true)
    }, [])

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('language', language)
        }
    }, [language, mounted])

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
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
