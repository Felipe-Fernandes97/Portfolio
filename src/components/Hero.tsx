import { useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Hero() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLParagraphElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)

  useScrollAnimation(ref1, 'fade-left')
  useScrollAnimation(ref2, 'fade-up')
  useScrollAnimation(ref3, 'fade-right')

  return (
    <section
      id="section-0"
      className="min-h-screen flex items-center px-10 py-10"
    >
      <div className="grid grid-cols-2 gap-20 items-center max-w-[1400px] mx-auto w-full">
        <div ref={ref1} className="flex flex-col gap-6 scroll-animate fade-left">
          <p ref={ref2} className="text-[1.8rem] font-bold text-white tracking-[0.5px] scroll-animate fade-up">
            Full Stack & Prompt Engineer
          </p>
          <p className="text-[1.1rem] text-white leading-[1.8] max-w-[600px]">
            Crio experiências web modernas, acessíveis e seguras. Construo interfaces elegantes, resolvo
            desafios complexos de programação e dou vida a ideias através de código limpo e escalável.
          </p>
        </div>

        <div ref={ref3} className="relative w-full flex items-center justify-center scroll-animate fade-right">
          <div className="relative" style={{ perspective: '800px', transformStyle: 'preserve-3d' }}>
            <img
              src="/Faceimage/euteste.jpg"
              alt="Felipe Fernandes"
              className="hero-image"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
