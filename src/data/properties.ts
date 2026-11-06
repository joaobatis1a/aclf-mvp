export type Phase = "lancamento" | "em-construcao" | "pronto-para-morar" | "portfolio";

export const phaseLabel: Record<Phase, string> = {
  lancamento: "Lançamento",
  "em-construcao": "Em construção",
  "pronto-para-morar": "Pronto para morar",
  portfolio: "Entregue",
};

export const phaseOrder: Phase[] = ["lancamento", "em-construcao", "pronto-para-morar", "portfolio"];

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
  },
  {
    slug: "mirante-das-paineiras",
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
  },
  {
    slug: "star-concept",
    name: "Star Concept",
    phase: "em-construcao",
    city: "Caruaru",
    bedrooms: 3,
    suites: 1,
    area: [71],
    areaLabel: "71 m²",
    summary: "Três quartos (1 suíte) em Caruaru, com obras avançadas.",
    cover: img("star-concept-cover.jpg"),
  },
  {
    slug: "belem-boulevard",
    name: "Belém Boulevard",
    phase: "em-construcao",
    bedrooms: 3,
    suites: 1,
    area: [73],
    areaLabel: "73 m²",
    summary: "Três quartos (1 suíte), com obras avançadas e certificado pela Caixa.",
    cover: img("belem-cover.png"),
  },
  {
    slug: "mirante-dos-corais",
    name: "Mirante dos Corais",
    phase: "pronto-para-morar",
    bedrooms: 3,
    suites: 1,
    area: [70],
    areaLabel: "70 m²",
    summary: "Três quartos (1 suíte) em três edifícios, pronto para morar e certificado pela Caixa.",
    cover: img("mirante-corais-cover.jpg"),
  },
  {
    slug: "nova-torre-porto-antilhas",
    name: "Nova Torre Porto Antilhas",
    phase: "pronto-para-morar",
    bedrooms: 3,
    suites: 1,
    area: [64],
    areaLabel: "64 m²",
    summary: "Três quartos (1 suíte), pronto para morar.",
    cover: img("porto-antilhas-cover.png"),
  },
  { slug: "mirante-do-frio-residence", name: "Mirante do Frio Residence", phase: "portfolio", summary: "Obra entregue. Rendeu à empresa o Troféu Master no 30º Troféu ADEMI-PE.", cover: img("mirante-frio-cover.png") },
  { slug: "north-way-residence", name: "North Way Residence", phase: "portfolio", city: "Paulista", summary: "Obra entregue em Paulista.", cover: img("north-way-cover.png") },
  { slug: "alameda-do-frio", name: "Alameda do Frio Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("alameda-frio-cover.png") },
  { slug: "vila-do-frio", name: "Vila do Frio Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("vila-frio-cover.jpg") },
  { slug: "jardins-do-frio", name: "Jardins do Frio Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("jardins-frio-cover.jpg") },
  { slug: "paulista-north-way-shopping", name: "Paulista North Way Shopping", phase: "portfolio", city: "Paulista", summary: "Shopping center com cerca de 55 mil m² de área construída.", cover: img("shopping-cover.jpeg") },
  { slug: "green-village", name: "Green Village", phase: "portfolio", summary: "Obra entregue.", cover: img("green-village-cover.jpg") },
  { slug: "jardins-da-roseira", name: "Jardins da Roseira Condomínio Clube", phase: "portfolio", summary: "Obra entregue.", cover: img("jardins-roseira-cover.jpg") },
  { slug: "park-jardins", name: "Park Jardins", phase: "portfolio", summary: "Obra entregue.", cover: img("park-jardins-cover.jpg") },
  { slug: "porto-bahamas", name: "Porto Bahamas", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-bahamas-cover.jpg") },
  { slug: "porto-athenas", name: "Porto Athenas", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-athenas-cover.jpg") },
  { slug: "porto-nassau", name: "Porto Nassau", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-nassau-cover.jpg") },
  { slug: "porto-caribe", name: "Porto Caribe", phase: "portfolio", summary: "Obra entregue.", cover: img("porto-caribe-cover.jpg") },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
export const byPhase = (phase: Phase) => properties.filter((p) => p.phase === phase);
export const cities = [...new Set(properties.map((p) => p.city).filter(Boolean))] as string[];
