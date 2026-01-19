'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, Coffee } from 'lucide-react'
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
      href: 'https://linkedin.com/in/yourprofile',
      label: 'LinkedIn'
    },
    {
      icon: Mail,
      href: 'mailto:your.email@example.com',
      label: 'Email'
    }
  ]

  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-white py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section - hide on small screens */}
          <div className="space-y-4 hidden sm:block">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CKB</span>
              </div>
              <span className="text-xl font-bold">Caleb Kyere Boateng</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links - show 2x2 on mobile */}
          <div>
            <h3 className="text-lg font-semibold hidden sm:block">{t('footer.quick_links')}</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'about', label: t('nav.about') },
                { id: 'experience', label: t('nav.experience') },
                { id: 'projects', label: t('nav.projects') },
                { id: 'contact', label: t('nav.contact') }
              ].map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id)
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="text-left text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Contact Info - hide title and on small screens show only icons and remove 'Get in touch' title */}
          <div className="space-y-4 hidden sm:block">
            <h3 className="text-lg font-semibold">{t('footer.get_in_touch')}</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>kyereboatengcaleb@gmail.com</p>
              <p>+233 20 418 5163</p>
              <p>Kumasi, Ghana</p>
            </div>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors duration-300 shadow-sm dark:shadow-none"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>© {currentYear} Caleb Kyere Boateng. {t('footer.made_with')}</span>
              <Heart size={16} className="text-red-500" />
              <span>{t('footer.coffee')}</span>
              <Coffee size={16} className="text-amber-700 dark:text-amber-500" />
            </div>

            <motion.button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={16} />
              <span>{t('footer.back_to_top')}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
