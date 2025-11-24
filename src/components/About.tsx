'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Rocket, Users } from 'lucide-react'
import { Social } from './Social'
import HoverGlowCard from './ui/HoverGlowCard'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const features = [
    {
      icon: <Code size={40} />,
      title: 'Clean Code',
      description: 'Writing maintainable, scalable, and efficient code is my priority.',
    },
    {
      icon: <Rocket size={40} />,
      title: 'Fast Performance',
      description: 'Optimized applications that load fast and run smoothly.',
    },
    {
      icon: <Users size={40} />,
      title: 'User Focused',
      description: 'Creating intuitive experiences that users love.',
    },
  ]

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <div className="flex items-center gap-4">
              <hr className="flex-1 border-t-2 border-purple-500 dark:border-purple-500" />
              <h2 className="text-5xl font-bold mb-4 text-white">About Me</h2>
              <hr className="flex-1 border-t-2 border-pink-500 dark:border-pink-500" />
          </div>
          
          <p className="text-xl text-gray-300 text-justify mt-6 mx-auto">
            I’m passionate about in full-stack web development and software engineering. 
            Passionate about building scalable, user-friendly applications. My academic journey 
            and freelance projects have equipped me with problem-solving skills, teamwork, and 
            adaptability in fast-paced environments. I am eager to apply my technical knowledge 
            to real-world challenges, contribute to innovative solutions, and grow into a 
            versatile software engineer. My career goal is to specialize in full-stack 
            development and contribute to impactful digital products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <HoverGlowCard>
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
              </HoverGlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}