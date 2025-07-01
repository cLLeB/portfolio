'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Server, Smartphone, Cloud, Settings, TrendingUp, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'

const TouchOptimizedSkills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
      title: 'Languages',
      icon: Code,
      color: 'from-green-500 to-emerald-600',
      skills: [
        { name: 'JavaScript/TypeScript', level: 75 },
        { name: 'Python', level: 80 },
        { name: 'Java', level: 70 },
        { name: 'C++', level: 65 },
        { name: 'PHP', level: 60 },
        { name: 'Solidity', level: 55 }
      ]
    },
    {
      title: 'Frontend',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-600',
      skills: [
        { name: 'React/Next.js', level: 75 },
        { name: 'HTML5/CSS3', level: 85 },
        { name: 'Tailwind CSS', level: 70 },
        { name: 'Bootstrap', level: 75 },
        { name: 'Framer Motion', level: 60 },
        { name: 'React Native', level: 55 }
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'from-purple-500 to-violet-600',
      skills: [
        { name: 'Node.js/Express', level: 75 },
        { name: 'RESTful APIs', level: 80 },
        { name: 'FastAPI/Flask', level: 65 },
        { name: 'GraphQL', level: 50 },
        { name: 'Socket.io', level: 60 },
        { name: 'JWT Auth', level: 70 }
      ]
    },
    {
      title: 'Database',
      icon: Database,
      color: 'from-orange-500 to-red-600',
      skills: [
        { name: 'MongoDB', level: 70 },
        { name: 'PostgreSQL', level: 65 },
        { name: 'MySQL', level: 75 },
        { name: 'Firebase', level: 60 },
        { name: 'Redis', level: 55 },
        { name: 'SQLite', level: 70 }
      ]
    },
    {
      title: 'DevOps',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-600',
      skills: [
        { name: 'Git/GitHub', level: 85 },
        { name: 'Docker', level: 60 },
        { name: 'Linux', level: 70 },
        { name: 'AWS Basics', level: 50 },
        { name: 'CI/CD', level: 55 },
        { name: 'Nginx', level: 45 }
      ]
    },
    {
      title: 'Tools',
      icon: Settings,
      color: 'from-pink-500 to-rose-600',
      skills: [
        { name: 'VS Code', level: 90 },
        { name: 'Postman', level: 80 },
        { name: 'Jest/Testing', level: 60 },
        { name: 'Figma', level: 55 },
        { name: 'ANTLR', level: 65 },
        { name: 'Web3.js', level: 50 }
      ]
    }
  ]

  const ProgressBar = ({ skill, index, categoryColor }: { 
    skill: { name: string; level: number }, 
    index: number,
    categoryColor: string 
  }) => {
    return (
      <motion.div
        className="mb-3 sm:mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span 
            className="text-sm font-medium text-gray-200 relative z-20"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {skill.name}
          </span>
          <span 
            className="text-sm text-cyan-300 relative z-20 font-mono"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-2 sm:h-2.5 overflow-hidden">
          <motion.div
            className={`bg-gradient-to-r ${categoryColor} h-full rounded-full relative`}
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-12 sm:py-20 bg-black/90 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20"></div>
      
      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 relative z-20">
            <span className="drop-shadow-2xl">Skills &</span>{' '}
            <span 
              className="text-cyan-400 drop-shadow-2xl"
              style={{
                textShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.6), 2px 2px 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              Technologies
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-lg relative z-20 px-4">
            Technical expertise across various domains of software development.
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex overflow-x-auto pb-4 space-x-2 scrollbar-hide">
              {skillCategories.map((category, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCategory(index)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeCategory === index
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <category.icon size={18} />
                  <span className="font-medium whitespace-nowrap">{category.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Grid */}
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-6 sm:gap-8`}>
          {(isMobile ? [skillCategories[activeCategory]] : skillCategories).map((category, categoryIndex) => (
            <motion.div
              key={isMobile ? `mobile-${activeCategory}` : categoryIndex}
              variants={itemVariants}
              className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-cyan-500/30 hover:border-blue-500/50 transition-all duration-300 relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.6) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
              }}
              whileHover={{
                boxShadow: '0 12px 40px rgba(6, 182, 212, 0.2), 0 0 20px rgba(6, 182, 212, 0.1)',
                y: -4
              }}
              layout={isMobile}
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <motion.div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mr-3 sm:mr-4`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <category.icon size={isMobile ? 20 : 24} className="text-white" />
                </motion.div>
                <h3 
                  className="text-lg sm:text-xl font-bold text-white relative z-20"
                  style={{
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <ProgressBar 
                    key={skillIndex} 
                    skill={skill} 
                    index={skillIndex} 
                    categoryColor={category.color}
                  />
                ))}
              </div>

              {/* Category Stats */}
              <motion.div 
                className="mt-4 sm:mt-6 pt-4 border-t border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <TrendingUp size={14} />
                    <span>Avg Level</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-300 font-mono">
                      {Math.round(category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length)}%
                    </span>
                    <Zap size={14} className="text-yellow-400" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Navigation Dots */}
        {isMobile && (
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-2 mt-8"
          >
            {skillCategories.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCategory === index ? 'bg-cyan-400 w-6' : 'bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

export default TouchOptimizedSkills
