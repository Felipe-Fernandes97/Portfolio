import { useState, useEffect, useCallback } from 'react'
import DarkVeil from './components/DarkVeil'
import Header from './components/Header'
import SideNav from './components/SideNav'
import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Experience from './components/Experience'

const SECTION_IDS = ['section-0', 'section-1', 'section-2', 'section-3', 'section-4']

export default function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [headerVisible, setHeaderVisible] = useState(true)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id, index) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index)
          }
        },
        { threshold: 0.4 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHeaderVisible(window.scrollY < 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigate to section
  const navigateToSection = useCallback((index: number) => {
    const el = document.getElementById(SECTION_IDS[index])
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && activeSection < SECTION_IDS.length - 1) {
        e.preventDefault()
        navigateToSection(activeSection + 1)
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        e.preventDefault()
        navigateToSection(activeSection - 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, navigateToSection])

  return (
    <>
      {/* DarkVeil Background - fixed behind everything */}
      <div className="fixed inset-0 z-0 w-full h-full">
        <DarkVeil
          hueShift={0}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      {/* Header */}
      <Header visible={headerVisible} />

      {/* Side Navigation */}
      <SideNav activeSection={activeSection} onNavigate={navigateToSection} />

      {/* Main Content */}
      <main className="relative z-[2]">
        <Hero />
        <AboutMe />
        <TechStack />
        <Projects />
        <Experience />
      </main>
    </>
  )
}
