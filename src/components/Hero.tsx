// 'use client'

// import { ArrowDown } from 'lucide-react'
// import { useState } from 'react'
// import { Social } from './Social'
// import { motion } from "framer-motion"
// import Galaxy from './ui/Galaxy'

// export default function Hero() {
//   const [clicked, setClicked] = useState(false)

//   const handleScroll = () => {
//     setClicked(true)
//     const aboutSection = document.querySelector("#about")
//     if (aboutSection) {
//       aboutSection.scrollIntoView({ behavior: "smooth" })
//     }

//     setTimeout(() => setClicked(false), 400)
//   }

//   return (
//     <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Rotating Galaxy Background */}
//         <Galaxy />
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto text-center animate-fade-in min-h-screen content-center sm:px-6 lg:px-8 md:py-10">
//         <div className="md:flex-row xl:mx-40 lg:mx-30 md:mx-20 sm:mx-10 xs:mx-10">
//           <h1 
//             className="text-6xl md:text-7xl mt-24 font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-red-500 animate-slide-up"
//           >
//             Hi, I&apos;m SURANJITH JAYAWARDHANA
//           </h1>

//           <p className="text-gray-300 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//             BSc (Hons) Software Eng | Cardiff Met.
//           </p>

//           <p className="text-2xl md:text-4xl text-gray-300 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
//             Full Stack Web Developer
//           </p>

//           <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
//             I develop responsive, functional, and scalable web applications that make a difference.
//           </p>

//           <div className="flex gap-4 justify-center mb-12 flex-wrap animate-slide-up" style={{ animationDelay: '0.6s' }}>
//             <a
//               href="#contact"
//               className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
//             >
//               Get In Touch
//             </a>
//             <a
//               href="#projects"
//               className="border-2 border-purple-500 text-purple-400 hover:border-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full font-medium transition-all"
//             >
//               View Work
//             </a>
//           </div>

//           <div className='mb-20 animate-slide-up' style={{ animationDelay: '0.8s' }}>
//             <Social />
//           </div>

//           <div className="absolute mt-20 bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
//             <motion.button
//               onClick={handleScroll}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//               animate={clicked ? { rotate: 360 } : { rotate: 0 }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="p-3 rounded-full hover:bg-purple-700/60 backdrop-blur-md text-purple-400 shadow-md"
//             >
//               <ArrowDown size={32} />
//             </motion.button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

'use client'

import { ArrowDown } from 'lucide-react'
import { useState } from 'react'
import { Social } from './Social'
import { motion } from "framer-motion"

export default function Hero() {
  const [clicked, setClicked] = useState(false)

  const handleScroll = () => {
    setClicked(true)
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }

    setTimeout(() => setClicked(false), 400)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        >
          <source src="/videos/background.mp4" type="video/mp4" />
          <source src="/videos/background.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* linear Overlay for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/50 via-purple-900/30 to-gray-900/80" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center animate-fade-in min-h-screen content-center sm:px-6 lg:px-8 md:py-10">
        <div className="md:flex-row xl:mx-40 lg:mx-30 md:mx-20 sm:mx-10 xs:mx-10">
          <h2 
          className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-5xl mt-24 font-bold bg-clip-text text-gray-200 animate-slide-up"
          >
            Hi, I&apos;m 
          </h2>

          <h1 
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-400 via-pink-500 to-red-500 animate-slide-up px-4"
          >
            SURANJITH JAYAWARDHANA
          </h1>

          <p className="text-gray-200 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            BSc (Hons) Software Eng | Cardiff Met.
          </p>

          <p className="text-2xl md:text-4xl text-gray-200 font-bold mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Full Stack Web Developer
          </p>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            I develop responsive, functional, and scalable web applications that make a difference.
          </p>

          <div className="flex gap-4 justify-center mb-12 flex-wrap animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <a
              href="#contact"
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="border-2 border-purple-500 text-purple-400 hover:border-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full font-medium transition-all"
            >
              View Work
            </a>
          </div>

          <div className='mb-20 animate-slide-up' style={{ animationDelay: '0.8s' }}>
            <Social />
          </div>

          <div className="absolute mt-20 bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <motion.button
              onClick={handleScroll}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              animate={clicked ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-3 rounded-full hover:bg-purple-700/60 backdrop-blur-md text-purple-400 shadow-md"
            >
              <ArrowDown size={32} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}