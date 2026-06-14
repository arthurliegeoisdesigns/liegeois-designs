import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import Portfolio from '@/components/Portfolio'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <Logos />
      <Portfolio />
      <Services />
      <About />
      <Testimonials />
      <Blog />
      <CTA />
      <Footer />
    </main>
  )
}
