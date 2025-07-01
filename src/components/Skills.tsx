'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Server, Smartphone, Cloud, Settings } from 'lucide-react'

const Skills = () => {
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
      title: 'Programming Languages',
      icon: Code,
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
      title: 'Frontend Technologies',
      icon: Smartphone,
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
      title: 'Backend & APIs',
      icon: Server,
      skills: [
        { name: 'Node.js/Express', level: 75 },
        { name: 'RESTful APIs', level: 80 },
        { name: 'FastAPI/Flask', level: 65 },
        { name: 'GraphQL', level: 50 },
        { name: 'Socket.io', level: 60 },
        { name: 'JWT Authentication', level: 70 }
      ]
    },
    {
      title: 'Databases',
      icon: Database,
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
      title: 'DevOps & Cloud',
      icon: Cloud,
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
      title: 'Tools & Others',
      icon: Settings,
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

  const ProgressBar = ({ skill, index }: { skill: { name: string; level: number }, index: number }) => {
    return (
      <motion.div
        className="mb-4"
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
            className="text-sm text-cyan-300 relative z-20"
            style={{
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)'
            }}
          >
            {skill.level}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <section id="skills" className="py-20 bg-black/90 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_60%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-20">
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
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg relative z-20">
            A comprehensive overview of my technical expertise across various domains of software development.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="bg-black/70 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/30 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300 relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.6) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
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
                  className="text-xl font-bold text-white relative z-20"
                  style={{
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 255, 255, 0.3)'
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
              Additional Competencies
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'System Design',
                  description: 'Designing scalable, distributed architectures'
                },
                {
                  title: 'Problem Solving',
                  description: 'Breaking down complex challenges systematically'
                },
                {
                  title: 'Code Review',
                  description: 'Ensuring code quality and best practices'
                },
                {
                  title: 'Team Collaboration',
                  description: 'Working effectively in agile development teams'
                }
              ].map((competency, index) => (
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
