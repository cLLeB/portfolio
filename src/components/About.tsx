'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Database, Server, Smartphone, Globe, Brain, Cloud } from 'lucide-react'

const About = () => {
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

  const interests = [
     {
      icon: Server,
      title: 'Computer Networking',
      description: 'Exploring networks, switches, routers, and cable infrastructure for robust connectivity.'
    },
    {
      icon: Code,
      title: 'Programming Languages',
      description: 'Fascinated by language design and implementation, from lexical analysis to interpreter development.'
    },
    {
      icon: Cloud,
      title: 'Cloud Networking & Security',
      description: 'Securing cloud deployments and remote workflows through robust access controls and safe data transfer protocols.'
    },
    {
      icon: Globe,
      title: 'Web Technologies',
      description: 'Staying current with modern frameworks, tools, and best practices in web development.'
    },
    {
      icon: Brain,
      title: 'Algorithm Design',
      description: 'Developing efficient algorithms and data structures to solve complex computational problems.'
    },
    {
      icon: Smartphone,
      title: 'Software Architecture',
      description: 'Designing scalable, maintainable systems with clean code principles and design patterns.'
    }
  ]

  return (
    <section id="about" className="py-12 sm:py-20 bg-black/80 backdrop-blur-sm relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
            About <span className="holographic">Me</span>
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
          <motion.div variants={itemVariants}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3 animate-pulse"></div>
              <div className="relative bg-black/80 backdrop-blur-sm border border-blue-500/30 p-6 sm:p-8 rounded-2xl shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 drop-shadow-lg">
                  Computer Science Journey
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-6">
                  I'm a dedicated Computer Science student at Kwame Nkrumah University of Science and Technology (KNUST),
                  passionate about creating innovative software solutions that make a difference. My journey in technology
                  is driven by curiosity and a desire to understand how complex systems work, from programming language
                  design to blockchain technology.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Through hands-on projects and continuous learning, I've developed skills in full-stack development,
                  language interpretation, and blockchain systems. I thrive on challenging problems that push the
                  boundaries of what's possible and enjoy collaborating with others to build meaningful solutions.
                </p>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Key Coursework:</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      'Data Structures & Algorithms',
                      'Programming Languages',
                      'Computer Networks',
                      'Database Systems',
                      'Software Engineering',
                      'Operating Systems',
                      'Compiler Design',
                      'Discrete Mathematics'
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-xs font-medium"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {['Problem Solving', 'Team Collaboration', 'Continuous Learning', 'Innovation'].map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
              What Drives Me
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: 'Creating Innovative Solutions',
                  description: 'I enjoy building systems from the ground up, whether it\'s designing a programming language interpreter or developing blockchain applications.'
                },
                {
                  title: 'Continuous Learning',
                  description: 'Technology evolves rapidly, and I\'m committed to staying current with new frameworks, languages, and development methodologies.'
                },
                {
                  title: 'Problem-Solving Mindset',
                  description: 'I thrive on breaking down complex challenges into manageable components and finding creative, efficient solutions.'
                },
                {
                  title: 'Seeking Growth Opportunities',
                  description: 'I\'m actively seeking internship opportunities where I can contribute to meaningful projects while expanding my technical expertise.'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <h3 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Areas of Interest
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                className="group p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <interest.icon size={24} className="text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                  {interest.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {interest.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
