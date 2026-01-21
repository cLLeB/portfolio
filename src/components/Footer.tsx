'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowUp, Phone, MapPin } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/cLLeB',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/caleb-kyere-boateng-6736092b4',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: t('contact.email_href') || 'mailto:kyereboatengcaleb@gmail.com',
      label: 'Email'
    },
    {
      icon: Phone,
      href: 'tel:+233537270382',
      label: 'Phone'
    },
    {
      icon: MapPin,
      href: 'https://maps.google.com/?q=Kumasi,Ghana',
      label: 'Location'
    }
  ]

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white py-6 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 text-sm">
            <span>© {currentYear} {t('footer.all_rights_reserved')}</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={16} />
            <span>{t('footer.back_to_top')}</span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
