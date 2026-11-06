export type Phase = "lancamento" | "em-construcao" | "pronto-para-morar" | "portfolio";

export const phaseLabel: Record<Phase, string> = {
  lancamento: "Lançamento",
  "em-construcao": "Em construção",
  "pronto-para-morar": "Pronto para morar",
  portfolio: "Entregue",
};

export const phaseOrder: Phase[] = ["lancamento", "em-construcao", "pronto-para-morar", "portfolio"];

export type Video = {
  /** YouTube video id from the company's official pages. */
  id: string;
  title: string;
  /** "filme": launch or presentation film. "obra": construction progress update. */
  kind: "filme" | "obra";
}

export type Property = {
  slug: string;
  name: string;
  phase: Phase;
  city?: string;
  neighborhood?: string;
  bedrooms?: number;
  suites?: number;
  area?: number[]; // m²
  areaLabel?: string;
  summary: string;
  cover: string;
  /** High-resolution image for full-bleed use; covers are only ~680px wide. */
  hero?: string;
  /** Optional short muted clip (mp4/webm in /public/videos). Falls back to the hero/cover image. */
  video?: string;
  /** Official YouTube videos linked from the original site. */
  videos?: Video[];
  gallery?: string[];
  floorPlan?: string;
  amenities?: string[];
  highlights?: string[];
  featured?: boolean;
  registry?: string;
};

const img = (f: string) => `/images/properties/${f}`;
const seq = (prefix: string, n: number, ext = "jpg") =>
  Array.from({ length: n }, (_, i) => img(`${prefix}-${String(i + 1).padStart(2, "0")}.${ext}`));

export const properties: Property[] = [
  {
    slug: "solar-das-paineiras",
    name: "Solar das Paineiras",
    phase: "lancamento",
    city: "Paulista",
    neighborhood: "Paineiras Bairro-Parque",
    bedrooms: 2,
    suites: 1,
    area: [44, 54],
    areaLabel: "44 e 54 m²",
    summary:
      "Plantas de 2 ou 3 quartos (1 suíte) em um condomínio clube completo, dentro do primeiro bairro-parque de Pernambuco.",
    cover: img("solar-paineiras-cover.png"),
    hero: img("solar-paineiras-02.jpg"),
    gallery: seq("solar-paineiras", 11),
    floorPlan: img("solar-paineiras-planta.jpg"),
    amenities: [
      "Piscina com hidromassagem",
      "Quadra poliesportiva",
      "Academia",
      "Salão de festas",
      "Pet place com pet wash",
      "Espaço para salão de jogos",
      "Brinquedoteca",
      "Playground",
      "Terraço gourmet",
    ],
    highlights: [
      "Localização no Paineiras Bairro-Parque",
      "Segurança e organização urbana",
      "Acesso rápido à BR-101 e à PE-15",
      "Próximo ao Paulista North Way Shopping",
    ],
    registry: "Memorial de incorporação R-13 da matrícula 12.956, 2º Ofício de Registro de Imóveis de Paulista/PE, em 15/07/2026.",
  },
  {
    slug: "ilha-do-retiro-boulevard",
    name: "Ilha do Retiro Boulevard",
    phase: "lancamento",
    city: "Recife",
    bedrooms: 3,
    suites: 1,
    area: [73],
    areaLabel: "73 m²",
    summary: "Três quartos (1 suíte) entre a Zona Norte e a Zona Sul do Recife.",
    cover: img("ilha-retiro-cover.png"),
    neighborhood: "Ilha do Retiro",
    hero: img("ilha-retiro-01.jpg"),
    gallery: [img("ilha-retiro-01.jpg"), img("ilha-retiro-02.jpg"), img("ilha-retiro-03.jpg"), img("ilha-retiro-04.jpg"), img("ilha-retiro-05.jpg"), img("ilha-retiro-06.jpg"), img("ilha-retiro-07.jpg"), img("ilha-retiro-08.jpg")],
    amenities: ["Piscina adulto e infantil", "Hidromassagem", "Quadra de tênis", "Quadra de beach tennis", "Academia", "Espaço gourmet", "Salão de festas", "Pet place", "Playground", "Espaço para brinquedoteca", "Espaço para salão de jogos", "Espaço para mini market"],
  },
  {
    slug: "mirante-das-paineiras",
    videos: [{ id: "QTZkSYNnvpQ", title: "Descubra o Mirante das Paineiras", kind: "filme" }],
    name: "Mirante das Paineiras",
    phase: "lancamento",
    city: "Paulista",
    neighborhood: "Paineiras Bairro-Parque",
    bedrooms: 3,
    suites: 1,
    area: [71],
    areaLabel: "71 m²",
    featured: true,
    summary:
      "Mais do que um apartamento, um novo jeito de morar: qualidade de vida e valorização em um condomínio clube completo.",
    cover: img("mirante-paineiras-cover.jpg"),
    hero: img("mirante-paineiras-03.jpg"),
    gallery: seq("mirante-paineiras", 14),
    floorPlan: img("mirante-paineiras-planta.png"),
    amenities: [
      "Academia",
      "Churrasqueira",
      "Brinquedoteca",
      "Salão de jogos",
      "Pet place",
      "Playground",
      "Praça de convivência",
      "Salão de festas",
      "Terraço gourmet",
      "Quadra",
    ],
    highlights: [
      "Mall integrado",
      "Segurança e organização urbana",
      "Acesso rápido à BR-101",
      "Próximo ao Paulista North Way Shopping",
    ],
    registry: "Memorial de incorporação R-12 da matrícula 12.948, 2º Serventia Registral do Paulista/PE, em 31/03/2026.",
  },
  {
    slug: "boa-vista-boulevard",
    videos: [{ id: "Fbts-RX5ASo", title: "Viva perto de tudo em Recife", kind: "filme" }, { id: "eQjnQ7N1ygI", title: "Vê como tá a nossa obra · dezembro de 2025", kind: "obra" }],
    name: "Boa Vista Boulevard",
    phase: "em-construcao",
    city: "Recife",
    neighborhood: "Boa Vista",
    bedrooms: 3,
    suites: 1,
    area: [73],
    areaLabel: "73 m²",
    summary: "Três quartos (1 suíte) no centro do Recife, com obras avançadas.",
    cover: img("boa-vista-cover.png"),
    hero: img("boa-vista-01.jpg"),
    gallery: [img("boa-vista-01.jpg"), img("boa-vista-02.jpg"), img("boa-vista-03.jpg"), img("boa-vista-04.jpg"), img("boa-vista-05.jpg"), img("boa-vista-06.jpg"), img("boa-vista-07.jpg"), img("boa-vista-08.jpg")],
    amenities: ["Piscina adulto e infantil", "Prainha", "Hidromassagem", "Deck gourmet", "Quadra poliesportiva", "Academia com mezanino", "Salão de festas", "Bar", "Pet place", "Playground", "Espaço para coworking", "Sala de leitura", "Espaço para mini market", "Terraço"],
  },
  {
    slug: "star-concept",
    videos: [{ id: "GZY6A5gQJgI", title: "Vê como tá a nossa obra · julho de 2026", kind: "obra" }],
    name: "Star Concept",
    phase: "em-construcao",
    city: "Caruaru",
    bedrooms: 3,
    suites: 1,
    area: [71],
    areaLabel: "71 m²",
    summary: "Três quartos (1 suíte) em Caruaru, com obras avançadas.",
    cover: img("star-concept-cover.jpg"),
    hero: img("star-concept-01.jpg"),
    gallery: [img("star-concept-01.jpg"), img("star-concept-02.jpg"), img("star-concept-03.jpg"), img("star-concept-04.jpg"), img("star-concept-05.jpg"), img("star-concept-06.jpg"), img("star-concept-07.jpg"), img("star-concept-08.jpg"), img("star-concept-09.jpg")],
    amenities: ["Piscina adulto e infantil", "Hidromassagem", "Deck piscina", "Quadra de beach tennis", "Quadra poliesportiva", "Espaço gourmet", "Fire place", "Salão de festas", "Espaço kids", "Pet place", "Playground", "Espaço para academia", "Espaço para mini market"],
  },
  {
    slug: "belem-boulevard",
    videos: [{ id: "5q0SlMR3QqM", title: "Belém Boulevard: sucesso de vendas na zona norte do Recife", kind: "filme" }, { id: "Trc_CLWCd-k", title: "Vê como tá a nossa obra · março de 2026", kind: "obra" }],
    city: "Recife",
    name: "Belém Boulevard",
    phase: "em-construcao",
    bedrooms: 3,
    suites: 1,
    area: [73],
    areaLabel: "73 m²",
    summary: "Três quartos (1 suíte), com obras avançadas e certificado pela Caixa.",
    cover: img("belem-cover.png"),
    neighborhood: "Campo Grande",
    hero: img("belem-01.jpg"),
    gallery: [img("belem-01.jpg"), img("belem-02.jpg"), img("belem-03.jpg"), img("belem-04.jpg"), img("belem-05.jpg"), img("belem-06.jpg"), img("belem-07.jpg"), img("belem-08.jpg"), img("belem-09.jpg")],
    amenities: ["Piscina com raia semiolímpica de 25 m", "Piscina infantil", "Quadra de beach tennis", "Quadra poliesportiva", "Campo de futebol", "Academia com cardio e musculação", "Redário", "Rooftop de convivência", "Salão de festas", "Espaço gourmet e grill", "Pet place", "Playground", "Horta coletiva", "Bicicletário com mais de 200 vagas"],
  },
  {
    slug: "mirante-dos-corais",
    videos: [{ id: "LEjNU8UfEkQ", title: "Lançamento Mirante dos Corais", kind: "filme" }, { id: "xgvD-kx6j_4", title: "Vê como tá a nossa obra · agosto de 2025", kind: "obra" }],
    city: "Paulista",
    name: "Mirante dos Corais",
    phase: "pronto-para-morar",
    bedrooms: 3,
    suites: 1,
    area: [70],
    areaLabel: "70 m²",
    summary: "Três quartos (1 suíte) em três edifícios, pronto para morar e certificado pela Caixa.",
    cover: img("mirante-corais-cover.jpg"),
    neighborhood: "Janga",
    hero: img("mirante-corais-06.jpg"),
    gallery: [img("mirante-corais-02.jpg"), img("mirante-corais-03.jpg"), img("mirante-corais-04.jpg"), img("mirante-corais-05.jpg"), img("mirante-corais-06.jpg"), img("mirante-corais-07.jpg")],
    amenities: ["Piscina adulto, infantil, prainha e deck", "Hidromassagem", "Quadra de beach tennis", "Quadra poliesportiva", "Academia", "Sport bar", "Espaço gourmet", "Salão de festas", "Espaço kids", "Pet place", "Playground", "Espaço para coworking"],
  },
  {
    slug: "nova-torre-porto-antilhas",
    videos: [{ id: "fGrua6eZbG4", title: "Vê como tá a nossa obra · abril de 2024", kind: "obra" }],
    city: "Paulista",
    name: "Nova Torre Porto Antilhas",
    phase: "pronto-para-morar",
    bedrooms: 3,
    suites: 1,
    area: [64],
    areaLabel: "64 m²",
    summary: "Três quartos (1 suíte), pronto para morar.",
    cover: img("porto-antilhas-cover.png"),
    neighborhood: "Conceição",
    gallery: [img("porto-antilhas-01.jpg"), img("porto-antilhas-02.jpg"), img("porto-antilhas-03.jpg"), img("porto-antilhas-04.jpg"), img("porto-antilhas-05.jpg")],
    amenities: ["Piscina", "Quadra poliesportiva", "Campo gramado", "Playground", "Salão de festas equipado"],
  },
  { slug: "mirante-do-frio-residence",
    videos: [{ id: "C-SmdWl_6Lg", title: "Vê como tá a nossa obra · abril de 2024", kind: "obra" }], name: "Mirante do Frio Residence", phase: "portfolio", summary: "Obra entregue. Rendeu à empresa o Troféu Master no 30º Troféu ADEMI-PE.", cover: img("mirante-do-frio-residence-photo.jpg") },
  { slug: "north-way-residence",
    videos: [{ id: "_TQ_hxSK4Fs", title: "Vê como tá a nossa obra · abril de 2024", kind: "obra" }], name: "North Way Residence", phase: "portfolio", city: "Paulista", summary: "Obra entregue em Paulista.", cover: img("north-way-cover.png") },
  { slug: "alameda-do-frio",
    videos: [{ id: "rMUuRigW9vY", title: "Vê como tá a nossa obra · dezembro de 2022", kind: "obra" }], name: "Alameda do Frio Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("alameda-frio-cover.png") },
  { slug: "vila-do-frio",
    videos: [{ id: "4PlP4VwKl8s", title: "Apresentação da área de lazer", kind: "filme" }], name: "Vila do Frio Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("vila-frio-cover.jpg") },
  { slug: "jardins-do-frio",
    videos: [{ id: "O7-yiF-O9NU", title: "Jardins do Frio · Nova Paulista", kind: "filme" }], name: "Jardins do Frio Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("jardins-frio-cover.jpg") },
  { slug: "paulista-north-way-shopping",
    videos: [{ id: "FbmaabMT1f0", title: "Paulista North Way Shopping", kind: "filme" }], name: "Paulista North Way Shopping", phase: "portfolio", city: "Paulista", summary: "Shopping center com cerca de 55 mil m² de área construída.", cover: img("paulista-north-way-shopping-photo.jpg") },
  { slug: "green-village", name: "Green Village", phase: "portfolio", summary: "Obra entregue.", cover: img("green-village-photo.jpg") },
  { slug: "jardins-da-roseira", name: "Jardins da Roseira Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("jardins-roseira-cover.jpg") },
  { slug: "park-jardins", name: "Park Jardins", phase: "portfolio", summary: "Obra entregue.", cover: img("park-jardins-photo.jpg") },
  { slug: "porto-bahamas", name: "Porto Bahamas", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-bahamas-photo.jpg") },
  { slug: "porto-athenas", name: "Porto Athenas", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-athenas-photo.jpg") },
  { slug: "porto-nassau", name: "Porto Nassau", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-nassau-photo.jpg") },
  { slug: "porto-caribe", name: "Porto Caribe", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-caribe-photo.jpg") },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const byPhase = (phase: Phase) => properties.filter((p) => p.phase === phase);
export const cities = [...new Set(properties.map((p) => p.city).filter(Boolean))] as string[];

/** Dot colour per phase, shared by every listing. */
export const phaseDot: Record<Phase, string> = {
  lancamento: "bg-paineira",
  "em-construcao": "bg-teal",
  "pronto-para-morar": "bg-leaf",
  portfolio: "bg-ink-soft",
};

export function specList(p: Property) {
  return [
    { k: "Área", v: p.areaLabel },
    { k: "Quartos", v: p.slug === "solar-das-paineiras" ? "2 ou 3" : p.bedrooms?.toString() },
    { k: "Suíte", v: p.suites?.toString() },
    { k: "Cidade", v: p.city },
  ].filter((s): s is { k: string; v: string } => Boolean(s.v));
}

/** Shot list for a project's reel: the hero first, then the gallery, without repeats. */
export function shotsOf(p: Pick<Property, "hero" | "cover" | "gallery">, max = 6) {
  return [...new Set([p.hero ?? p.cover, ...(p.gallery ?? [])])].slice(0, max);
}
