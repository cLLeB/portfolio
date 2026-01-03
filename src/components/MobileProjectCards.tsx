"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github,
  ExternalLink,
  Server,
  Globe,
  Code,
  Shield,
  ChevronRight,
  MessageCircle,
  Smartphone,
} from "lucide-react";
import Image from 'next/image';
import { useState } from 'react';
import ImageModal from './ui/ImageModal';

const MobileProjectCards = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedAlt, setSelectedAlt] = useState('');

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
      href: "https://github.com/cLLeB/custom-lang-interpreter",
      demo: "https://drive.google.com/file/d/1JyCnuFcxy1rQczPMszvznoTu3jDlsswy/view",
      category: "Programming Languages",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
      image: '/awards/custom-lang.png'
    },
    {
      title: "Ephemeral Chat",
      shortTitle: "Ephemeral Chat",
      description:
        "A real-time anonymous chat application with self-destructing messages and instant room creation. Features WebSocket-based messaging, automatic cleanup, and cross-platform compatibility for secure, temporary communications.",
      shortDesc:
        "Real-time anonymous chat with self-destructing messages and instant rooms.",
      technologies: ["Node.js", "Socket.io", "React", "WebSockets", "MongoDB", "Express"],
      features: [
        "Instant room creation with unique identifiers",
        "Anonymous participation without accounts",
        "Real-time messaging via WebSockets",
        "Self-destructing messages after reading",
        "Automatic room closure after inactivity",
        "Cross-platform support (web, mobile, desktop)",
      ],
      icon: MessageCircle,
      href: "https://github.com/cLLeB/ephemeral-chat",
      demo: "https://chat.kyere.me",
      category: "Real-Time Application",
      color: "from-purple-500 to-violet-600",
      bgColor: "bg-purple-500/10",
      image: '/awards/chat.png'
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
      title: "Looply - Food Delivery System (CodeFest '25)",
      shortTitle: "Looply",
      description:
        "Achieved 1st Runner-up position in the 2025 CodeFest competition organized by the KNUST Department of Computer Science. Served as the principal frontend developer, building a comprehensive food delivery mobile application using React Native and Bootstrap.",
      shortDesc:
        "Award-winning food delivery mobile app built with React Native.",
      technologies: ["React Native", "Bootstrap", "Mobile Development", "UI/UX"],
      features: [
        "Award-winning project (1st Runner-up)",
        "Comprehensive food delivery interface",
        "Real-time order tracking",
        "User-friendly navigation",
        "Team collaboration and rapid prototyping",
      ],
      icon: Smartphone,
      href: 'https://github.com/cLLeB/HubtelClone-Public',
      demo: "https://drive.google.com/file/d/1RQZIu7f-NeHHZTHBEbZxkhkEXeJ_vLxM/view",
      category: "Mobile Application",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-500/10",
      image: '/awards/award_pic.png'
    },
  ];

  return (
    <section
      className="py-12 sm:py-20 bg-gray-50 dark:bg-black/90 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-blue-900/5 to-cyan-900/5 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"></div>

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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 drop-shadow-2xl">
            Featured <span className="holographic text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Projects</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 drop-shadow-lg px-4">
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
              className="group relative bg-white dark:bg-black/60 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-blue-500/30 hover:border-purple-500/50 transition-all duration-500 overflow-hidden project-card-while-hover shadow-lg dark:shadow-none"
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
                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center overflow-hidden cursor-pointer`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      onClick={() => {
                        // @ts-ignore
                        if (project.image) {
                          // @ts-ignore
                          setSelectedImage(project.image);
                          setSelectedAlt(project.title);
                        }
                      }}
                    >
                      {/* @ts-ignore */}
                      {project.image ? (
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          width={48} 
                          height={48} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <project.icon size={20} className="text-white" />
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 truncate">
                        <span className="hidden sm:inline">
                          {project.title}
                        </span>
                        <span className="sm:hidden">{project.shortTitle}</span>
                      </h3>
                      <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2" style={{ position: 'relative', zIndex: 20, pointerEvents: 'auto' }}>
                    {project.href && (
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
                        className="p-2 sm:p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 hover:bg-blue-100 dark:hover:bg-blue-600/50 transition-colors duration-300 group"
                        style={{ touchAction: 'manipulation' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="View on GitHub"
                      >
                        <Github
                          size={16}
                          className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors duration-300"
                        />
                      </motion.button>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 sm:p-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 hover:bg-green-100 dark:hover:bg-green-600/50 transition-colors duration-300 group"
                        style={{ pointerEvents: 'auto', touchAction: 'manipulation' }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        title="View Live Demo"
                      >
                        <ExternalLink
                          size={16}
                          className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-white transition-colors duration-300"
                        />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
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
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-500/30"
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-200 dark:bg-gray-500/20 text-gray-600 dark:text-gray-400 rounded-md text-xs">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover Gradient Overlay */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
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

      <ImageModal 
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageSrc={selectedImage}
        alt={selectedAlt}
      />
    </section>
  );
};

export default MobileProjectCards;
