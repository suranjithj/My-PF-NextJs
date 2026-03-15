import Hero from "@/src/components/Hero";
import About from "@/src/components/About";
import Services from "@/src/components/Services";
import Projects from "@/src/components/Projects";
import WhyChooseUs from "@/src/components/WhyChooseUs";
import Packages from "@/src/components/Packages";
import CaseStudies from "@/src/components/CaseStudies";
import Contact from "@/src/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <WhyChooseUs />
      <Packages />
      <CaseStudies />
      <Contact />
    </main>
  );
}