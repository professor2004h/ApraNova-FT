import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import HowItWorks from "@/components/landing/how-it-works"
import Tracks from "@/components/landing/tracks"
import Testimonials from "@/components/landing/testimonials"
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Tracks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
