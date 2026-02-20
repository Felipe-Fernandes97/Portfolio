export interface Skill {
  name: string
  icon: string
  isImage?: boolean
  /** 1 = domínio principal, 0.5 = secundário */
  level?: number
}

export const skills: Skill[] = [
  { name: "JavaScript", icon: "fa-brands fa-js", level: 1 },
  { name: "TypeScript", icon: "fa-solid fa-code", level: 1 },
  { name: "React", icon: "fa-brands fa-react", level: 1 },
  { name: "Next.js", icon: "fa-solid fa-n", level: 1 },
  { name: "Node.js", icon: "fa-brands fa-node-js", level: 1 },
  { name: "Python", icon: "fa-brands fa-python", level: 0.85 },
  { name: "Supabase", icon: "/iconSupa/icons8-supabase-48.png", isImage: true, level: 0.85 },
  { name: "PostgreSQL", icon: "fa-solid fa-database", level: 0.85 },
  { name: "HTML", icon: "fa-brands fa-html5", level: 1 },
  { name: "CSS", icon: "fa-brands fa-css3-alt", level: 1 },
  { name: "TailwindCSS", icon: "fa-solid fa-wind", level: 1 },
  { name: "Git/GitHub", icon: "fa-brands fa-github", level: 0.85 },
  { name: "Eng. Prompt", icon: "fa-solid fa-brain", level: 1 },
  { name: "Docker", icon: "fa-brands fa-docker", level: 1 },
  { name: "Linux", icon: "fa-brands fa-linux", level: 1 },
]
