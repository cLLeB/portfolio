'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Server, Cloud, Brain, Layout, Globe, Code, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface InterestsCarouselProps {
    embedded?: boolean
}

const InterestsCarousel = ({ embedded = false }: InterestsCarouselProps) => {
    const { t } = useLanguage()
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    })

    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const interests = [
        {
            icon: Server,
            title: t('about.interests.0.title'),
            description: t('about.interests.0.description')
        },
        {
            icon: Cloud,
            title: t('about.interests.1.title'),
            description: t('about.interests.1.description')
        },
        {
            icon: Brain,
            title: t('about.interests.2.title'),
            description: t('about.interests.2.description')
        },
        {
            icon: Layout,
            title: t('about.interests.3.title'),
            description: t('about.interests.3.description')
        },
        {
            icon: Globe,
            title: t('about.interests.4.title'),
            description: t('about.interests.4.description')
        },
        {
            icon: Code,
            title: t('about.interests.5.title'),
            description: t('about.interests.5.description')
        }
    ]

    const maxIndex = interests.length - 1

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
            }
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.4 }
            }
        })
    }

    const navigate = (newDirection: number) => {
        setDirection(newDirection)
        const nextIndex = currentIndex + newDirection
        if (nextIndex < 0) {
            setCurrentIndex(maxIndex)
        } else if (nextIndex > maxIndex) {
            setCurrentIndex(0)
        } else {
            setCurrentIndex(nextIndex)
        }
    }

    const paginate = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    const currentInterest = interests[currentIndex]

    return (
        <section className={`${embedded ? 'py-0' : 'py-20 bg-white dark:bg-black/95'} relative overflow-hidden`}>
            {/* Background Effects - Only show if not embedded */}
            {!embedded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-cyan-900/5 to-indigo-900/5 dark:from-blue-900/10 dark:via-cyan-900/10 dark:to-indigo-900/10"></div>
            )}

            <motion.div
                ref={ref}
                className={`container mx-auto ${embedded ? 'px-0' : 'px-6'} relative z-10`}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
            >
                {!embedded && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-2xl">
                            {t('about.interests_title')}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
                    </motion.div>
                )}


                <div className="relative group max-w-3xl mx-auto px-4 md:px-0">
                    {/* Subtitle */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        {t('about.interests_title')}
                    </h3>

                    {/* Navigation Arrows */}
                    <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 z-20">
                        <motion.button
                            onClick={() => navigate(-1)}
                            className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.button>
                    </div>

                    <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                        <motion.button
                            onClick={() => navigate(1)}
                            className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight size={20} />
                        </motion.button>
                    </div>

                    {/* Carousel Content */}
                    <div className="min-h-[350px] flex items-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, { offset, velocity }) => {
                                    const swipe = Math.abs(offset.x) > 50 && Math.abs(velocity.x) > 500
                                    if (swipe) {
                                        navigate(offset.x > 0 ? -1 : 1)
                                    }
                                }}
                            >
                                <motion.div
                                    className="group relative bg-white dark:bg-black/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-gray-200 dark:border-blue-500/30 hover:border-indigo-500/50 transition-all duration-500 shadow-xl flex flex-col items-center text-center"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                                        <currentInterest.icon size={40} className="text-white" />
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {currentInterest.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg max-w-2xl px-4">
                                        {currentInterest.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Indicators */}
                    <div className="flex justify-center items-center space-x-2 sm:space-x-3 mt-10">
                        {interests.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => paginate(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${currentIndex === i
                                    ? 'w-10 bg-gradient-to-r from-blue-500 to-indigo-600'
                                    : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default InterestsCarousel
