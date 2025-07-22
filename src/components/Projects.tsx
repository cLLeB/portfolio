'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, ExternalLink, Server, Database, Smartphone, Globe, Code, Shield } from 'lucide-react'

const Projects = () => {
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

  const projects = [
    {
      title: 'Custom Language Interpreter',
      description: 'A sophisticated interpreter for a custom programming language featuring lexical analysis, parsing, and execution. Supports variables, functions, control structures, and advanced language features with comprehensive error handling.',
      technologies: ['Python', 'ANTLR', 'AST', 'Compiler Design', 'Language Theory'],
      features: [
        'Complete lexical and syntax analysis',
        'Abstract Syntax Tree generation',
        'Variable scoping and memory management',
        'Function definitions and recursion',
        'Comprehensive error reporting'
      ],
      icon: Code,
      github: 'https://github.com/cLLeB/custom-lang-interpreter',
      demo: null,
      category: 'Programming Languages'
    },
    {
      title: 'Blockchain Voting System',
      description: 'Decentralized voting platform built on blockchain technology ensuring transparency, immutability, and security. Features smart contracts for vote validation, real-time results, and comprehensive audit trails.',
      technologies: ['Solidity', 'Web3.js', 'React', 'Ethereum', 'MetaMask', 'IPFS'],
      features: [
        'Smart contract-based vote validation',
        'Immutable vote recording on blockchain',
        'Real-time vote counting and results',
        'Voter authentication and verification',
        'Transparent audit trail system'
      ],
      icon: Shield,
      github: 'https://github.com/cLLeB/blockchain-voting-system',
      demo: null,
      category: 'Blockchain'
    },
    {
      title: 'URL Shortener Pro',
      description: 'Professional URL shortening service with enterprise features including analytics, rate limiting, custom domains, and user authentication. Built with microservices architecture for scalability and performance.',
      technologies: ['Node.js', 'React', 'PostgreSQL', 'Redis', 'Docker', 'Nginx'],
      features: [
        'Custom domain support',
        'Advanced analytics dashboard',
        'Rate limiting and security',
        'User authentication & management',
        'Microservices architecture'
      ],
      icon: Globe,
      github: 'https://github.com/cLLeB/URL-shortening',
      demo: null,
      category: 'Web Application'
    },
    {
      title: 'Distributed File System',
      description: 'A high-performance, fault-tolerant distributed file storage system built with Go. Implements the Raft consensus algorithm for distributed coordination and provides enterprise-grade security and scalability.',
      technologies: ['Go', 'Raft', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
      features: [
        'Distributed consensus with Raft algorithm',
        'Multi-node replication and automatic failover',
        'AES-256-GCM encryption at rest and in transit',
        'JWT authentication and RBAC',
        'Prometheus monitoring & Grafana dashboards'
      ],
      icon: Server,
      github: 'https://github.com/cLLeB/distributed-fs',
      demo: null,
      category: 'Distributed Systems'
    }
  ]

  return (
    <section id="projects" className="py-20 bg-black/90 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      <motion.div
        ref={ref}
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-2xl">
            Featured <span className="holographic">Projects</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 drop-shadow-lg">
            A showcase of distributed systems, full-stack applications, and innovative solutions 
            built with modern technologies and best practices.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 hover:border-purple-500/50 hover:shadow-2xl transition-all duration-500"
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: '0 25px 50px rgba(59, 130, 246, 0.3), 0 0 30px rgba(147, 51, 234, 0.2)'
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,41,59,0.4) 100%)',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <project.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300 relative z-10"
                      style={{ position: 'relative', zIndex: 10, pointerEvents: 'auto' }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} className="text-gray-600 dark:text-gray-400" />
                    </motion.a>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={20} className="text-gray-600 dark:text-gray-400" />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.slice(0, 3).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="text-center mt-16">
          <motion.a
            href="https://github.com/cLLeB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={24} />
            <span>View All Projects on GitHub</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Projects
