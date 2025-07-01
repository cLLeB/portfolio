'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Play } from 'lucide-react'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  demoUrl?: string
  featured?: boolean
  index: number
}

const ProjectCard = ({
  title,
  description,
  image,
  technologies,
  githubUrl,
  liveUrl,
  demoUrl,
  featured = false,
  index
}: ProjectCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`
        group relative overflow-hidden rounded-2xl
        ${featured ? 'md:col-span-2 lg:col-span-2' : ''}
        card-professional
        hover:scale-[1.02] transition-all duration-500
      `}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-xs font-semibold bg-gradient-primary text-white rounded-full">
            Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 md:h-56 overflow-hidden rounded-xl mb-6">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex space-x-3">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={20} className="text-white" />
              </motion.a>
            )}
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={20} className="text-white" />
              </motion.a>
            )}
            {demoUrl && (
              <motion.a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play size={20} className="text-white" />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="space-y-4">
        <h3 className="text-heading-lg text-white group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-body-md text-gray-300 leading-relaxed">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 text-sm bg-white/10 text-gray-300 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex space-x-4 pt-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <Github size={16} />
              <span className="text-sm">Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-300 hover:text-blue-400 transition-colors"
            >
              <ExternalLink size={16} />
              <span className="text-sm">Live Demo</span>
            </a>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-xl" />
      </div>
    </motion.div>
  )
}

export default ProjectCard
