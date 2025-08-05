'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Send, MessageCircle, Copy } from 'lucide-react'
import { useState } from 'react'
import { submitContactForm, copyEmailToClipboard, contactViaWhatsApp } from '@/utils/contactForm'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await submitContactForm(formData)

    if (result.success) {
      setFormData({ name: '', email: '', subject: '', message: '' })
    }

    setIsSubmitting(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'kyereboatengcaleb@gmail.com',
      href: 'mailto:kyereboatengcaleb@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+233 20 418 5163',
      href: 'tel:+233204185163'
    },
    {
      icon: Phone,
      title: 'Call',
      value: '+233 53 727 0382',
      href: 'tel:+233537270382'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Kumasi, Ghana',
      href: null
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/cLLeB',
      color: 'hover:text-gray-800 dark:hover:text-gray-200'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/caleb-kyere-boateng-6736092b4',
      color: 'hover:text-blue-600'
    },
    {
      icon: Mail,
      name: 'Email',
      href: 'mailto:kyereboatengcaleb@gmail.com',
      color: 'hover:text-green-600'
    },
    {
      icon: Phone,
      name: 'Phone',
      href: 'tel:+233204185163',
      color: 'hover:text-purple-600'
    },
    {
      icon: Phone,
      name: 'Call',
      href: 'tel:+233537270382',
      color: 'hover:text-purple-600'
    }
  ]

  return (
    <section id="contact" className="py-12 sm:py-20 bg-black/90 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.1),transparent_60%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 relative z-20">
            <span className="drop-shadow-2xl">Get In</span>{' '}
            <span
              className="text-pink-400 drop-shadow-2xl"
              style={{
                textShadow: '0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              Touch
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-lg relative z-20 px-4">
            I'm always interested in new opportunities, collaborations, and interesting projects. 
            Let's connect and discuss how we can work together!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3
                className="text-2xl font-bold text-white mb-6 relative z-20"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                Let's Start a Conversation
              </h3>
              <p
                className="text-gray-200 leading-relaxed mb-8 relative z-20"
                style={{
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                }}
              >
                Whether you're looking for a dedicated intern, have a project in mind, or just want to
                connect with a fellow developer, I'd love to hear from you. I'm particularly interested
                in opportunities involving software development, blockchain technology, programming language
                design, and innovative technology solutions.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <info.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-white relative z-20"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {info.title}
                    </h4>
                    {info.href ? (
                      <div className="flex items-center gap-2">
                        <a
                          href={info.href}
                          className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative z-20"
                          style={{
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                          }}
                        >
                          {info.value}
                        </a>
                        {info.title === 'Email' && (
                          <motion.button
                            onClick={copyEmailToClipboard}
                            className="p-1 rounded hover:bg-gray-700/50 transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Copy email address"
                          >
                            <Copy size={14} className="text-gray-400 hover:text-cyan-400" />
                          </motion.button>
                        )}
                      </div>
                    ) : (
                      <span
                        className="text-gray-300 relative z-20"
                        style={{
                          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                        }}
                      >
                        {info.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div>
              <h4
                className="font-semibold text-white mb-4 relative z-20"
                style={{
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                }}
              >
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div
              className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-pink-500/30 shadow-xl relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,41,59,0.6) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(236, 72, 153, 0.1)'
              }}
            >
              <h3
                className="text-2xl font-bold text-white mb-6 relative z-20"
                style={{
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.3)'
                }}
              >
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-200 mb-2 relative z-20"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-black/50 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 relative z-20"
                      style={{
                        backdropFilter: 'blur(10px)'
                      }}
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-200 mb-2 relative z-20"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-black/50 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 relative z-20"
                      style={{
                        backdropFilter: 'blur(10px)'
                      }}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-200 mb-2 relative z-20"
                    style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-black/50 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 relative z-20"
                    style={{
                      backdropFilter: 'blur(10px)'
                    }}
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-200 mb-2 relative z-20"
                    style={{
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-black/50 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 resize-none relative z-20"
                    style={{
                      backdropFilter: 'blur(10px)'
                    }}
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <Send size={20} />
                    <span>{isSubmitting ? 'Opening Email...' : 'Send Message'}</span>
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={() => contactViaWhatsApp()}
                    className="sm:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    title="Contact via WhatsApp"
                  >
                    <MessageCircle size={20} />
                    <span>WhatsApp</span>
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
