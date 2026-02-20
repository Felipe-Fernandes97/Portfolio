import { useState, useRef, useEffect, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { projects } from '../data/projects'
import CardSwap, { Card } from './CardSwap'

function VideoModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animate in
    requestAnimationFrame(() => {
      if (overlayRef.current) overlayRef.current.style.opacity = '1'
      if (contentRef.current) {
        contentRef.current.style.opacity = '1'
        contentRef.current.style.transform = 'scale(1) translateY(0)'
      }
    })

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const media = project.media[0]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 transition-opacity duration-300"
      style={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-[1000px] max-h-[85vh] rounded-2xl overflow-hidden bg-black/90 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] transition-all duration-400"
        style={{ opacity: 0, transform: 'scale(0.9) translateY(20px)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white/20 hover:scale-110"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>

        {/* Video / Image */}
        <div className="w-full aspect-video bg-black">
          {media?.type === 'video' ? (
            <video
              src={media.src}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={media?.src}
              alt={project.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Info bar */}
        <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white/40 text-[0.75rem] uppercase tracking-[2px] font-bold m-0">
              {project.category}
            </p>
            <h3 className="text-white text-[1.3rem] font-bold m-0 mt-1">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3">
            {project.links.demo && project.links.demo !== '#' && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/[0.08] border border-white/[0.15] rounded-lg text-white no-underline text-[0.85rem] font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:bg-white/[0.15]"
              >
                <i className="fa-solid fa-eye" /> Demo
              </a>
            )}
            {project.links.code && project.links.code !== '#' && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/[0.08] border border-white/[0.15] rounded-lg text-white no-underline text-[0.85rem] font-semibold inline-flex items-center gap-2 transition-all duration-200 hover:bg-white/[0.15]"
              >
                <i className="fa-brands fa-github" /> Código
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [activeCard, setActiveCard] = useState(0)
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(titleRef, 'fade-up')
  useScrollAnimation(containerRef, 'fade-up')

  const project = projects[activeCard]

  const handleCardClick = useCallback((idx: number) => {
    setActiveCard(idx)
    setModalProject(projects[idx])
  }, [])

  return (
    <section id="section-3" className="min-h-screen flex flex-col justify-center pt-10 pb-48 px-5 md:px-10">
      <h2 ref={titleRef} className="text-center text-[2rem] md:text-[2.5rem] text-white mb-10 md:mb-16 scroll-animate fade-up">
        Projetos
      </h2>

      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-8 items-center max-w-[1500px] mx-auto w-full scroll-animate fade-up">
        {/* Project Info - LEFT */}
        <div className="flex flex-col gap-4 md:gap-5 order-2 lg:order-1">
          <span className="text-white/60 text-[0.8rem] md:text-[0.85rem] uppercase tracking-[3px] font-bold">
            {project.category}
          </span>
          <h3 className="text-[1.6rem] md:text-[2.2rem] text-white m-0 leading-[1.2] font-bold">
            {project.title}
          </h3>
          <p className="text-white/70 leading-[1.8] text-[0.95rem] md:text-[1.05rem]">
            {project.desc}
          </p>
          <div>
            <p className="text-white/50 font-bold mb-2.5 text-[0.75rem] md:text-[0.8rem] uppercase tracking-[2px]">
              Construído com:
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techs.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 md:px-3 py-1 md:py-1.5 text-[0.75rem] md:text-[0.8rem] font-semibold text-white/90 rounded-lg backdrop-blur-[12px] bg-white/[0.06] border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.12] hover:border-white/[0.18]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 mt-2 flex-wrap">
            {project.links.demo && project.links.demo !== '#' && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-6 py-2.5 md:py-3 bg-white/[0.08] border border-white/[0.12] rounded-lg text-white no-underline transition-all duration-300 inline-flex items-center gap-2.5 text-[0.85rem] md:text-[0.9rem] font-semibold hover:-translate-y-[2px] hover:bg-white/[0.14]"
              >
                <i className="fa-solid fa-eye" /> Ver Demo
              </a>
            )}
            {project.links.code && project.links.code !== '#' && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 md:px-6 py-2.5 md:py-3 bg-white/[0.08] border border-white/[0.12] rounded-lg text-white no-underline transition-all duration-300 inline-flex items-center gap-2.5 text-[0.85rem] md:text-[0.9rem] font-semibold hover:-translate-y-[2px] hover:bg-white/[0.14]"
              >
                <i className="fa-brands fa-github" /> Código
              </a>
            )}
          </div>
        </div>

        {/* CardSwap - RIGHT */}
        <div className="relative h-[400px] md:h-[550px] lg:h-[600px] overflow-visible order-1 lg:order-2">
          <CardSwap
            cardDistance={45}
            verticalDistance={50}
            delay={3000}
            pauseOnHover={true}
            width="min(750px, 58vw)"
            height="min(420px, 32vw)"
            skewAmount={0}
            easing="linear"
            onCardClick={handleCardClick}
            onSwap={(idx) => setActiveCard(idx)}
          >
            {projects.map((proj, i) => (
              <Card key={i} customClass="overflow-hidden cursor-pointer">
                {proj.media[0]?.type === 'video' ? (
                  <video
                    src={proj.media[0].src}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-contain rounded-xl bg-black"
                  />
                ) : (
                  <img
                    src={proj.media[0]?.src}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-contain rounded-xl bg-black"
                  />
                )}
                {proj.media[0]?.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30 rounded-xl">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-full bg-white/20 border border-white/40 flex items-center justify-center">
                        <i className="fa-solid fa-play text-white text-xl ml-1" />
                      </div>
                      <span className="text-white text-[0.8rem] font-semibold tracking-wide">Ver completo</span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 md:p-5 rounded-b-xl">
                  <p className="text-white/50 text-[0.65rem] md:text-[0.7rem] uppercase tracking-[2px] font-bold m-0">
                    {proj.category}
                  </p>
                  <h4 className="text-white text-[0.95rem] md:text-[1.1rem] font-bold m-0 mt-1">
                    {proj.title}
                  </h4>
                </div>
              </Card>
            ))}
          </CardSwap>
        </div>
      </div>

      {/* Video Modal */}
      {modalProject && (
        <VideoModal
          project={modalProject}
          onClose={() => setModalProject(null)}
        />
      )}
    </section>
  )
}
