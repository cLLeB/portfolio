"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github,
  ExternalLink,
  Server,
  Database,
  Smartphone,
  Globe,
  Code,
  Shield,
  ChevronRight,
  Star,
} from "lucide-react";
import { useState } from "react";

const MobileProjectCards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const projects = [
    {
      title: "Custom Language Interpreter",
      shortTitle: "Lang Interpreter",
      description:
        "A sophisticated interpreter for a custom programming language featuring lexical analysis, parsing, and execution with comprehensive error handling.",
      shortDesc:
        "Custom programming language interpreter with advanced parsing capabilities.",
      technologies: ["Python", "ANTLR", "AST", "Compiler Design"],
      features: [
        "Complete lexical and syntax analysis",
        "Abstract Syntax Tree generation",
        "Variable scoping and memory management",
        "Function definitions and recursion",
        "Comprehensive error reporting",
        "Interactive REPL environment",
      ],
      icon: Code,
      href: "https://github.com/cLLeB/language-interpreter",
      demo: null,
      category: "Programming Languages",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Blockchain Voting System",
      shortTitle: "Blockchain Voting",
      description:
        "Decentralized voting platform built on blockchain technology ensuring transparency, immutability, and security with smart contracts.",
      shortDesc:
        "Secure decentralized voting platform using blockchain technology.",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      features: [
        "Smart contract-based validation",
        "Immutable vote recording",
        "Real-time vote counting",
        "Transparent audit trail",
        "Voter authentication system",
        "Multi-signature wallet integration",
      ],
      icon: Shield,
      href: "https://github.com/cLLeB/blockchain-voting",
      demo: null,
      category: "Blockchain",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "URL Shortener Pro",
      shortTitle: "URL Shortener",
      description:
        "Professional URL shortening service with enterprise features including analytics, rate limiting, and custom domains.",
      shortDesc:
        "Enterprise-level URL shortening service with advanced analytics.",
      technologies: ["Node.js", "React", "PostgreSQL", "Redis"],
      features: [
        "Custom domain support",
        "Advanced analytics dashboard",
        "Rate limiting and security",
        "User authentication",
        "QR code generation",
        "Bulk URL processing",
      ],
      icon: Globe,
      href: "https://github.com/cLLeB/URL-shortening",
      demo: null,
      category: "Web Application",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Distributed File System",
      shortTitle: "File System",
      description:
        "A high-performance, fault-tolerant distributed file storage system built with Go. Implements the Raft consensus algorithm for distributed coordination and provides enterprise-grade security and scalability.",
      shortDesc:
        "High-performance distributed file system with fault tolerance and scalability.",
      technologies: [
        "Go",
        "Raft",
        "Docker",
        "Kubernetes",
        "Prometheus",
        "Grafana",
      ],
      features: [
        "Distributed consensus with Raft algorithm",
        "Multi-node replication and automatic failover",
        "AES-256-GCM encryption at rest and in transit",
        "JWT authentication and RBAC",
        "Prometheus monitoring & Grafana dashboards",
      ],
      icon: Server,
      href: "https://github.com/cLLeB/distributed-fs",
      demo: null,
      category: "Distributed Systems",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <section
      id="projects"
      className="py-12 sm:py-20 bg-black/90 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 sm:px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl">
            Featured <span className="holographic">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-lg px-4">
            A showcase of distributed systems, full-stack applications, and
            innovative solutions built with modern technologies and best
            practices.
          </p>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Mobile-First Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-black/60 backdrop-blur-sm rounded-2xl border border-blue-500/30 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              layout
            >
              {/* Card Header */}
              <div className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <motion.div
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <project.icon size={20} className="text-white" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                        <span className="hidden sm:inline">
                          {project.title}
                        </span>
                        <span className="sm:hidden">{project.shortTitle}</span>
                      </h3>
                      <span className="text-xs sm:text-sm text-blue-400 font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      onClick={() => {
                        if (project.href) {
                          window.open(
                            project.href,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }
                      }}
                      className="p-2 rounded-lg bg-gray-800/50 hover:bg-blue-600/50 transition-colors duration-300 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="View on GitHub"
                    >
                      <Github
                        size={16}
                        className="text-gray-400 group-hover:text-white transition-colors duration-300"
                      />
                    </motion.button>
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-gray-800/50 hover:bg-green-600/50 transition-colors duration-300 group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Live Demo"
                      >
                        <ExternalLink
                          size={16}
                          className="text-gray-400 group-hover:text-white transition-colors duration-300"
                        />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                  <span className="hidden sm:inline">
                    {project.description}
                  </span>
                  <span className="sm:hidden">{project.shortDesc}</span>
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-md text-xs font-medium border border-blue-500/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-md text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Expandable Features */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedCard === index ? "auto" : 0,
                    opacity: expandedCard === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {expandedCard === index && (
                    <div className="pt-4 border-t border-gray-700/50">
                      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <Star size={14} className="text-yellow-400" />
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            className="flex items-start text-sm text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {feature}
                          </motion.li>
                        ))}
                      </ul>

                      {/* Additional Project Info */}
                      <div className="mt-4 pt-3 border-t border-gray-700/30">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs text-gray-400">
                            Category:
                          </span>
                          <span className="text-xs text-blue-400 font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Expand Button */}
                <motion.button
                  onClick={() =>
                    setExpandedCard(expandedCard === index ? null : index)
                  }
                  className="w-full mt-4 py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>
                    {expandedCard === index ? "Show Less" : "Show More"}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedCard === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </motion.button>
              </div>

              {/* Hover Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-12 sm:mt-16"
        >
          <motion.a
            href="https://github.com/cLLeB"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>View All Projects</span>
            <ChevronRight size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MobileProjectCards;
