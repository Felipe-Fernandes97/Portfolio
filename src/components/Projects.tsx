import { useState, useRef } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { projects } from '../data/projects'

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0)
  const [mediaIndexes, setMediaIndexes] = useState<number[]>(projects.map(() => 0))
  const titleRef = useRef<HTMLHeadingElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useScrollAnimation(titleRef, 'fade-up')
  useScrollAnimation(carouselRef, 'scale-in')

  const goToProject = (index: number) => setCurrentProject(index)

  const changeMedia = (projectIndex: number, direction: number) => {
    const totalMedia = projects[projectIndex].media.length
    if (totalMedia <= 1) return
    setMediaIndexes(prev => {
      const next = [...prev]
      next[projectIndex] = (next[projectIndex] + direction + totalMedia) % totalMedia
      return next
    })
  }

  return (
    <section id="section-3" className="min-h-screen flex flex-col justify-center py-10">
      <h2 ref={titleRef} className="text-center text-[2.5rem] text-white mb-20 scroll-animate fade-up">
        Projetos
      </h2>

      <div ref={carouselRef} className="relative w-full min-h-[600px] overflow-hidden pb-[100px] mb-10 scroll-animate scale-in">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentProject * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-screen max-w-full flex-shrink-0 grid grid-cols-[1fr_1.5fr] gap-20 items-center px-20 box-border"
            >
              {/* Project Info */}
              <div className="flex flex-col gap-6" style={{ animation: 'fadeInLeft 0.6s ease-out' }}>
                <span className="text-white text-[0.85rem] uppercase tracking-[3px] font-bold">
                  {project.category}
                </span>
                <h3 className="text-[2.5rem] text-white m-0 leading-[1.2]">
                  {project.title}
                </h3>
                <p className="text-white leading-[1.8] text-[1.1rem]">
                  {project.desc}
                </p>
                <div>
                  <p className="text-white font-bold mb-2.5 text-[0.9rem] uppercase tracking-[1px]">
                    Construído com:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.techs.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-[0.8rem] font-semibold text-white/90 rounded-lg backdrop-blur-[12px] bg-white/[0.06] border border-white/[0.08] transition-all duration-300 hover:bg-white/[0.12] hover:border-white/[0.18]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-[15px] mt-2.5">
                  {project.links.demo && project.links.demo !== '#' && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 bg-transparent text-white no-underline transition-all duration-300 inline-flex items-center gap-2.5 text-[0.95rem] font-semibold hover:-translate-y-[3px]"
                    >
                      <i className="fa-solid fa-eye" /> Ver Demo
                    </a>
                  )}
                  {project.links.code && project.links.code !== '#' && (
                    <a
                      href={project.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-7 py-3.5 bg-transparent text-white no-underline transition-all duration-300 inline-flex items-center gap-2.5 text-[0.95rem] font-semibold hover:-translate-y-[3px]"
                    >
                      <i className="fa-brands fa-github" /> Código
                    </a>
                  )}
                </div>
              </div>

              {/* Media Showcase */}
              <div className="relative w-full h-[500px] overflow-hidden" style={{ animation: 'fadeInRight 0.6s ease-out' }}>
                {project.media.length > 1 && (
                  <button
                    onClick={() => changeMedia(index, -1)}
                    className="absolute left-[10px] top-1/2 -translate-y-1/2 bg-black/60 text-white border border-gray-500/30 w-[45px] h-[45px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 backdrop-blur-[10px] z-[5] hover:bg-[#9ca3af] hover:border-[#e5e7eb] hover:scale-115"
                  >
                    <i className="fa-solid fa-chevron-left" />
                  </button>
                )}
                <div
                  className="media-wrapper"
                  style={{ transform: `translateX(-${mediaIndexes[index] * 100}%)` }}
                >
                  {project.media.map((item, mediaIndex) => (
                    <div key={mediaIndex} className="min-w-full flex-shrink-0 h-full flex items-center justify-center bg-black">
                      {item.type === 'image' ? (
                        <img src={item.src} alt={project.title} loading="lazy" className="max-w-full max-h-full w-auto h-auto object-contain block" />
                      ) : (
                        <video src={currentProject === index ? item.src : undefined} controls preload="none" className="w-full h-full object-contain" />
                      )}
                    </div>
                  ))}
                </div>
                {project.media.length > 1 && (
                  <button
                    onClick={() => changeMedia(index, 1)}
                    className="absolute right-[10px] top-1/2 -translate-y-1/2 bg-black/60 text-white border border-gray-500/30 w-[45px] h-[45px] rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 backdrop-blur-[10px] z-[5] hover:bg-[#9ca3af] hover:border-[#e5e7eb] hover:scale-115"
                  >
                    <i className="fa-solid fa-chevron-right" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Global Controls / Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-[100] bg-black/95 px-6 py-[15px] rounded-[30px] backdrop-blur-[15px] border-2 border-gray-500/50 shadow-[0_10px_30px_rgba(0,0,0,0.226)]">
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => goToProject(i)}
              className={`h-3.5 rounded-full cursor-pointer transition-all duration-400 border-2 ${
                currentProject === i
                  ? 'bg-gray-200 w-10 border-gray-300 rounded-[7px]'
                  : 'bg-gray-500/60 w-3.5 border-gray-500/80 hover:bg-gray-400/90 hover:scale-120 hover:border-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
