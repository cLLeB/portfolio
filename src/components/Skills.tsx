'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Network, Server, Smartphone, Cloud, Settings, TrendingUp, Zap } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const Skills = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
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

  const skillCategories = [
    {
      title: t('skills.categories.programming'),
      icon: Code,
      skills: [
        { name: 'JavaScript/TypeScript', level: 35 },
        { name: 'Python', level: 31 },
        { name: 'Java', level: 30 },
        { name: 'C++', level: 35 },
        { name: 'PHP', level: 28 },
        { name: 'Solidity', level: 20 }
      ]
    },
    {
      title: t('skills.categories.frontend'),
      icon: Smartphone,
      skills: [
        { name: 'React/Next.js', level: 45 },
        { name: 'HTML5/CSS3', level: 40 },
        { name: 'Tailwind CSS', level: 30 },
        { name: 'Bootstrap', level: 20 },
        { name: 'Framer Motion', level: 22 },
        { name: 'React Native', level: 35 }
      ]
    },
    {
      title: t('skills.categories.backend'),
      icon: Server,
      skills: [
        { name: 'Node.js/Express', level: 42 },
        { name: 'RESTful APIs', level: 30 },
        { name: 'FastAPI/Flask', level: 24 },
        { name: 'GraphQL', level: 15 },
        { name: 'Socket.io', level: 11 },
        { name: 'JWT Authentication', level: 24 }
      ]
    },
    {
      title: t('skills.categories.network'),
      icon: Network,
      skills: [
        { name: 'Packet Tracer', level: 40 },
        { name: 'Wireshark', level: 38 },
        { name: 'GNS3', level: 35 },
        { name: 'Nmap', level: 32 },
        { name: 'Cisco IOS', level: 36 },
        { name: 'Linux Networking', level: 39 }
      ]
    },
    {
      title: t('skills.categories.devops'),
      icon: Cloud,
      skills: [
        { name: 'Git/GitHub', level: 45 },
        { name: 'Docker', level: 35 },
        { name: 'Linux', level: 48 },
        { name: 'AWS Basics', level: 20 },
        { name: 'CI/CD', level: 35 },
        { name: 'Nginx', level: 25 }
      ]
    },
    {
      title: t('skills.categories.tools'),
      icon: Settings,
      skills: [
        { name: 'VS Code', level: 55 },
        { name: 'Postman', level: 32 },
        { name: 'Jest/Testing', level: 22 },
        { name: 'Figma', level: 48 },
        { name: 'ANTLR', level: 23 },
        { name: 'Web3.js', level: 15 }
      ]
    }
  ]

  const ProgressBar = ({ skill, index }: { skill: { name: string; level: number }, index: number }) => {
    // Make animation duration dynamic per bar for a more lively effect
    const flowDuration = 3.5 + (index % 4) * 0.7; // 3.5s to 5.6s
    return (
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span
            className="text-sm font-medium text-gray-700 dark:text-gray-200 relative z-20"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {skill.name}
          </span>
          <span
            className="text-sm text-cyan-600 dark:text-cyan-300 relative z-20"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 relative overflow-hidden">
          {/* White flow animation overlay, always full width, only animates when in view */}
          <motion.div
            className="absolute inset-0 h-full pointer-events-none"
            style={{ zIndex: 1 }}
            animate={inView ? { x: ['-100%', '100%'] } : { x: '-100%' }}
            transition={{ duration: flowDuration, repeat: inView ? Infinity : 0, ease: "linear" }}
          >
            <div className="w-full h-full bg-white/20 rounded-full" />
          </motion.div>
          {/* Filled bar */}
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            style={{ zIndex: 2, position: 'relative' }}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-black/90 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 via-blue-900/5 to-purple-900/5 dark:from-cyan-900/20 dark:via-blue-900/20 dark:to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_60%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 relative z-20">
            {t('skills.title')} <span
              className="text-cyan-600 dark:text-cyan-400 drop-shadow-2xl"
              style={{
                textShadow: '0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2), 2px 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {t('skills.subtitle')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg relative z-20">
            {t('skills.description')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-white dark:bg-black/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-cyan-500/30 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 relative z-10 dark:bg-gradient-to-br dark:from-black/80 dark:to-slate-900/60"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
              whileHover={{
                boxShadow: '0 12px 40px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)'
              }}
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                  <category.icon size={24} className="text-white" />
                </div>
                <h3
                  className="text-xl font-bold text-gray-900 dark:text-white relative z-20"
                  style={{
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <ProgressBar key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
              {t('skills.additional_title')}
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t('skills.competencies').map((competency: any, index: number) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={itemVariants}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {competency.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {competency.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
