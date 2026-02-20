export interface MediaItem {
  type: "image" | "video";
  src: string;
}

export interface Project {
  title: string;
  category: string;
  desc: string;
  techs: string[];
  links: {
    demo?: string;
    code?: string;
  };
  media: MediaItem[];
}

export const projects: Project[] = [
  {
    title: "CRM Full Stack",
    category: "SaaS Platform",
    desc: "Ainda em desenvolvimento. Sistema CRM completo para gestão de clientes, empresas e leads. Plataforma full stack focada em escalabilidade, organização e boas práticas de arquitetura, com autenticação robusta, controle de acesso por roles e dashboard gerencial.",
    techs: [
      "NestJS",
      "TypeScript",
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeORM",
      "PostgreSQL",
      "Docker",
      "JWT",
    ],
    links: {
      
      code: "https://github.com/Felipe-Fernandes97/CRM",
    },
    media: [{ type: "video", src: "/crm/crm.mp4" }],
  },
  {
    title: "DashBoard Empresarial",
    category: "Utilizado na empresa onde atuo",
    desc: "Sistema de gerenciamento de empresas e atendimentos, atualmente utilizado na empresa onde atuo, com visualização de dados em tempo real, métricas de performance e relatórios automatizados.",
    techs: ["JavaScript", "Python", "Supabase", "Chart.js"],
    links: {
      demo: "https://copydesh.vercel.app",
      code: "https://github.com/Felipe-Fernandes97/CopyPlanilhas",
    },
    media: [{ type: "video", src: "/DashBoard/dashboard.mp4" }],
  },
  {
    title: "Talents-MultiOne",
    category: "SaaS Platform",
    desc: "Plataforma completa de recrutamento e seleção com automação de processos, análise de candidatos e dashboard gerencial. Sistema escalável construído com as melhores práticas de arquitetura.",
    techs: ["NestJS", "TypeScript", "React", "Next.js", "Prisma", "PostgreSQL"],
    links: {
      demo: "https://talents-multi-one.vercel.app/dashboard",
      code: "https://github.com/wallaceluis/Talents-MultiOne",
    },
    media: [{ type: "video", src: "/TalentsMulti/talents.mp4" }],
  },

  {
    title: "Central Aviso",
    category: "Communication Platform",
    desc: "Aplicativo comunicação integrada com efeitos 3D e interface moderna, atualmente utilizado na empresa onde atuo. Desenvolvido para facilitar a troca de informações em tempo real.",
    techs: ["JavaScript", "HTML/CSS", "3D Effects"],
    links: {
      demo: "https://numero-grupomulti.netlify.app/",
      code: "https://github.com/Felipe-Fernandes97/Central-de-Aviso",
    },
    media: [
      { type: "video", src: "/centralDeAviso/Gravando 2026-01-20 154709.mp4" },
    ],
  },
  {
    title: "Software-House",
    category: "Institutional Website",
    desc: "Site institucional focado em serviços B2B para software house. Design clean e profissional com foco em conversão.",
    techs: ["HTML/CSS", "JavaScript"],
    links: {
      demo: "https://software-house-flax.vercel.app",
      code: "https://github.com/Felipe-Fernandes97/Software-House",
    },
    media: [{ type: "video", src: "/soft/software-house.mp4" }],
  },
  {
    title: "Pacman Web",
    category: "Web Game",
    desc: "Jogo clássico Pacman reescrito para web usando Canvas API. Mecânicas fiéis ao original com performance otimizada.",
    techs: ["JavaScript", "Canvas API", "Game Logic"],
    links: {
      demo: "https://pacman-three-iota.vercel.app",
      code: "https://github.com/Felipe-Fernandes97/Pacman",
    },
    media: [{ type: "video", src: "/pacmen/pacmen.mp4" }],
  },
];
