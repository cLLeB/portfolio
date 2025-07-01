'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
}

interface Wave {
  x: number
  y: number
  radius: number
  opacity: number
  speed: number
}

const DynamicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const wavesRef = useRef<Wave[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 8000))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: `hsl(${200 + Math.random() * 80}, 70%, ${50 + Math.random() * 30}%)`,
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100
        })
      }
      
      particlesRef.current = particles
    }

    const createWave = (x: number, y: number) => {
      wavesRef.current.push({
        x,
        y,
        radius: 0,
        opacity: 0.8,
        speed: 2
      })
    }

    const updateParticles = () => {
      const particles = particlesRef.current
      const mouse = mouseRef.current

      particles.forEach((particle, index) => {
        // Update life
        particle.life++
        if (particle.life > particle.maxLife) {
          particle.life = 0
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.vx = (Math.random() - 0.5) * 2
          particle.vy = (Math.random() - 0.5) * 2
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction - much stronger effect
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          const angle = Math.atan2(dy, dx)
          particle.vx += Math.cos(angle) * force * 0.5
          particle.vy += Math.sin(angle) * force * 0.5
          
          // Change color when near mouse
          particle.color = `hsl(${280 + Math.random() * 40}, 80%, 70%)`
          particle.size = Math.min(particle.size * 1.1, 8)
        } else {
          // Reset color and size
          particle.color = `hsl(${200 + Math.random() * 80}, 70%, ${50 + Math.random() * 30}%)`
          particle.size = Math.max(particle.size * 0.99, 1)
        }

        // Boundary collision with bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Add some randomness
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1

        // Damping
        particle.vx *= 0.995
        particle.vy *= 0.995
      })
    }

    const updateWaves = () => {
      wavesRef.current = wavesRef.current.filter(wave => {
        wave.radius += wave.speed
        wave.opacity *= 0.98
        return wave.opacity > 0.01 && wave.radius < 300
      })
    }

    const drawParticles = () => {
      const particles = particlesRef.current

      // Draw connections with dynamic opacity
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)'
      ctx.lineWidth = 1
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.3
            ctx.globalAlpha = opacity
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles with glow
      particles.forEach(particle => {
        ctx.globalAlpha = particle.opacity
        
        // Outer glow
        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2)
        ctx.fill()
        
        // Inner particle
        ctx.shadowBlur = 5
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.shadowBlur = 0
      })
    }

    const drawWaves = () => {
      wavesRef.current.forEach(wave => {
        ctx.globalAlpha = wave.opacity
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.stroke()
      })
    }

    const draw = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      updateParticles()
      updateWaves()
      drawParticles()
      drawWaves()
      
      ctx.globalAlpha = 1
    }

    const animate = () => {
      draw()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const newMouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      }
      
      // Create wave on significant mouse movement
      const dx = newMouse.x - mouseRef.current.x
      const dy = newMouse.y - mouseRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance > 50) {
        createWave(newMouse.x, newMouse.y)
      }
      
      mouseRef.current = newMouse
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      createWave(e.clientX - rect.left, e.clientY - rect.top)
    }

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    // Initialize
    resizeCanvas()
    createParticles()
    animate()

    // Event listeners
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  )
}

export default DynamicBackground
