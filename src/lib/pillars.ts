export type Pillar = {
  id: string;
  title: string;
  shortTitle: string;
  icon:
    | "shield"
    | "graduation"
    | "landmark"
    | "chart"
    | "sparkles";
  description: string;
  bullets: string[];
};

export const PILLARS: Pillar[] = [
  {
    id: "protecao-e-acolhimento",
    title: "Proteção e acolhimento",
    shortTitle: "Proteção",
    icon: "shield",
    description:
      "Promover ambientes seguros para mulheres e meninas no jiu-jitsu, atuando na prevenção, acolhimento, orientação e encaminhamento de situações de violência, assédio, discriminação e outras violações de direitos.",
    bullets: [
      "Canal de Denúncias e Ouvidoria da CDMJJ, com funcionamento 24 horas por dia, sete dias por semana.",
      "Acolhimento e escuta qualificada.",
      "Orientação e encaminhamento para redes e serviços especializados.",
      "Acompanhamento e monitoramento de denúncias.",
      "Protocolos de proteção e segurança.",
      "Política de Prevenção e Enfrentamento à Violência contra as Mulheres no Jiu-Jitsu.",
    ],
  },
  {
    id: "educacao-e-transformacao-cultural",
    title: "Educação e transformação cultural",
    shortTitle: "Educação",
    icon: "graduation",
    description:
      "Transformar a cultura do jiu-jitsu por meio da educação, formação e mobilização, promovendo relações baseadas em respeito, equidade de gênero, ética e direitos humanos.",
    bullets: [
      "Protocolo Women Friendly e Selo Women Friendly.",
      "Cursos, capacitações e workshops.",
      "Formação de professores, gestores, atletas, equipes e organizadores de eventos.",
      "Campanhas educativas e materiais pedagógicos.",
      "Códigos de conduta e diretrizes de boas práticas.",
      "Ações de conscientização sobre assédio, violência, discriminação e desigualdade de gênero.",
    ],
  },
  {
    id: "articulacao-e-incidencia-politica",
    title: "Articulação e incidência política",
    shortTitle: "Articulação",
    icon: "landmark",
    description:
      "Transformar as demandas das mulheres do jiu-jitsu em políticas, normas e compromissos institucionais, por meio do diálogo e da incidência junto ao poder público, entidades esportivas e sociedade civil.",
    bullets: [
      "Elaboração e proposição de projetos de lei.",
      "Participação em audiências públicas, fóruns, conselhos, coalizões e grupos de trabalho.",
      "Diálogo com os Poderes Legislativo e Executivo e demais órgãos públicos.",
      "Articulação com federações, confederações, academias e entidades esportivas.",
      "Construção de políticas públicas, notas técnicas e recomendações institucionais.",
      "Parcerias com universidades, organizações da sociedade civil e organismos nacionais e internacionais.",
    ],
  },
  {
    id: "monitoramento-pesquisa-e-advocacy",
    title: "Monitoramento, pesquisa e advocacy",
    shortTitle: "Monitoramento",
    icon: "chart",
    description:
      "Produzir dados, conhecimento e evidências capazes de orientar políticas, responsabilização e mudanças estruturais no jiu-jitsu, dando visibilidade às experiências e às condições de participação das mulheres no esporte.",
    bullets: [
      "Monitoramento de casos e denúncias.",
      "Levantamento de dados sobre mulheres no jiu-jitsu.",
      "Pesquisas sobre violência, assédio, participação, oportunidades e desigualdade de gênero.",
      "Produção de relatórios, indicadores e recomendações.",
      "Acompanhamento de políticas públicas, projetos de lei e normas esportivas.",
      "Avaliação e monitoramento do Protocolo Women Friendly.",
      "Advocacy baseado em dados e evidências.",
    ],
  },
  {
    id: "valorizacao-autonomia-e-oportunidades",
    title: "Valorização, autonomia e oportunidades",
    shortTitle: "Valorização",
    icon: "sparkles",
    description:
      "Ampliar a participação, a autonomia econômica, a visibilidade e o protagonismo das mulheres em toda a cadeia profissional do jiu-jitsu, criando caminhos concretos para trabalho, liderança e reconhecimento.",
    bullets: [
      "Criação de Banco de Talentos e canal de empregabilidade da CDMJJ.",
      "Divulgação de oportunidades profissionais.",
      "Cadastro e valorização de professoras, árbitras, treinadoras e demais profissionais do ecossistema do jiu-jitsu.",
      "Incentivo à contratação de mulheres e à presença feminina em cargos de gestão e liderança.",
      "Mentorias, networking e desenvolvimento de lideranças femininas.",
      "Reconhecimento de boas práticas, trajetórias e iniciativas.",
      "Parcerias para geração de oportunidades profissionais e promoção da autonomia econômica.",
    ],
  },
];

export const PILLAR_FLOW = [
  {
    verb: "Proteger",
    text: "Acolher mulheres e meninas diante de qualquer violação de direitos.",
  },
  {
    verb: "Educar",
    text: "Formar pessoas e transformar a cultura do jiu-jitsu.",
  },
  {
    verb: "Articular",
    text: "Incidir sobre estruturas, políticas e compromissos institucionais.",
  },
  {
    verb: "Monitorar",
    text: "Produzir evidências para orientar mudanças e responsabilização.",
  },
  {
    verb: "Valorizar",
    text: "Ampliar oportunidades, autonomia e protagonismo feminino.",
  },
] as const;

export const PILLAR_WORDS = [
  "Acolher",
  "Proteger",
  "Orientar",
  "Encaminhar",
  "Prevenir",
  "Educar",
  "Articular",
  "Monitorar",
  "Valorizar",
] as const;
