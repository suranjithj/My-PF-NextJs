// import Hero from '@/src/components/Hero'
// import About from '../components/About'
// import Projects from '../components/Projects'
// import Skills from '../components/Skills'
// import Services from '../components/Services'
// import Contact from '../components/Contact'

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-violet-900">
//       <Hero />
//       <About />
//       <Skills />
//       <Projects />
//       <Services />
//       <Contact />
//     </main>
//   )
// }

import Hero from '@/src/components/Hero'
import About from '@/src/components/About'
import Projects from '@/src/components/Projects'
import Skills from '@/src/components/Skills'
import Services from '@/src/components/Services'
import Contact from '@/src/components/Contact'
import ParallaxStars from '@/src/components/ui/ParallaxStars'

export default function Home() {
  return (
    <>
      {/* Parallax Stars Background - Fixed position */}
      <ParallaxStars 
        starCount={300} 
        autoMoveSpeed={0.1}
      />
      
      {/* Main content */}
      <main className="relative z-10 min-h-screen bg-gray-900/10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
    </>
  )
}