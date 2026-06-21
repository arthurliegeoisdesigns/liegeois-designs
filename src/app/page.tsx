import Hero from '@/components/Hero'
import Logos from '@/components/Logos'
import FeaturedWork from '@/components/FeaturedWork'
import Services from '@/components/Services'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Blog from '@/components/Blog'
import CTA from '@/components/CTA'
export default function Home() {
  return (
    <main>
      <Hero />
      <Logos />
      <FeaturedWork />
      <Services />
      <About />
      <Blog />
      <Testimonials />
      <CTA />
    </main>
  )
}
