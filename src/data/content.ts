export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt: string;
  categories: string[];
  image: string;
};

const b = (f: string) => `/images/blog/${f}`;

export const posts: Post[] = [
  { slug: "apartamento-para-familia-longo-prazo", title: "Como escolher um apartamento para permanecer mais tempo com a família", date: "2026-07-24", excerpt: "Escolha o imóvel pensando nos próximos anos, e não só no momento atual: estabilidade e qualidade de vida pesam mais que o preço do metro quadrado.", categories: ["Apartamento próprio", "Morar em condomínio", "Qualidade de vida"], image: b("familia-apartamento.jpg") },
  { slug: "imovel-para-morar-ou-investir", title: "Imóvel para morar ou investir: como famílias avaliam valorização, liquidez e uso futuro", date: "2026-07-17", excerpt: "Um apartamento é moradia e, ao mesmo tempo, patrimônio e segurança financeira. Veja o que observar nas duas leituras.", categories: ["Apartamento próprio", "Investimento", "Primeiro imóvel"], image: b("morar-ou-investir.png") },
  { slug: "planta-de-apartamento-bem-distribuida", title: "Apartamento bem distribuído: por que a planta influencia mais do que a metragem", date: "2026-07-10", excerpt: "A organização do layout muda a experiência de morar mais do que alguns metros a mais.", categories: ["Imóvel na planta", "Primeiro imóvel", "Qualidade de vida"], image: b("planta-bem-distribuida.jpg") },
  { slug: "comprar-apartamento-para-familia", title: "O que famílias de renda média-alta analisam antes de comprar um apartamento", date: "2026-07-03", excerpt: "Segurança, conforto e localização entram na conta junto com preço e metragem para quem tem renda familiar a partir de R$ 15 mil.", categories: ["Apartamento próprio", "Imóvel na planta"], image: b("renda-media-alta.jpg") },
  { slug: "condominio-com-lazer-completo-familias", title: "Condomínio com lazer completo melhora a rotina de famílias que buscam mais tempo e qualidade de vida", date: "2026-06-25", excerpt: "A infraestrutura de lazer dentro do condomínio resolve a rotina prática e traz conforto às famílias.", categories: ["Morar em condomínio", "Qualidade de vida"], image: b("lazer-completo.png") },
  { slug: "condominio-com-comercio-integrado", title: "Condomínios com comércio integrado aproximam moradia, serviços e conveniência no mesmo endereço", date: "2026-06-17", excerpt: "Mercado, serviços e moradia no mesmo lugar: como o comércio interno poupa tempo no dia a dia.", categories: ["Morar em condomínio", "Qualidade de vida"], image: b("comercio-integrado.png") },
  { slug: "localizacao-estrategica-imovel", title: "Morar em regiões conectadas transforma a rotina de famílias urbanas", date: "2026-06-11", excerpt: "Trabalho, escola, saúde e lazer perto de casa: a localização como fator decisivo.", categories: ["Apartamento próprio", "Qualidade de vida"], image: b("regioes-conectadas.jpg") },
  { slug: "apartamento-de-3-quartos-70-a-80m2", title: "Apartamentos de 3 quartos entre 70 e 80 m² se consolidam como escolha estratégica para famílias urbanas", date: "2026-06-04", excerpt: "Por que a faixa de 70 a 80 m² com três quartos virou o ponto de equilíbrio para quem mora na cidade.", categories: ["Apartamento próprio", "Imóvel na planta", "Morar em condomínio"], image: b("tres-quartos.jpg") },
  { slug: "condominios-modernos-familias", title: "Condomínios modernos acompanham o novo estilo de vida das famílias urbanas", date: "2026-05-28", excerpt: "A nova geração de condomínios residenciais foi pensada para praticidade, conforto e rotinas modernas.", categories: ["Morar em condomínio", "Qualidade de vida"], image: b("condominios-modernos.jpg") },
  { slug: "plantas-inteligentes-apartamentos", title: "Plantas inteligentes valorizam apartamentos compactos e melhoram a rotina das famílias", date: "2026-05-20", excerpt: "Planejamento bem feito entrega conforto em imóveis compactos e desfaz a ideia de que tamanho é igual a qualidade.", categories: ["Imóvel na planta", "Qualidade de vida"], image: b("plantas-inteligentes.jpeg") },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const awards = [
  { name: "Troféu Master", edition: "30º Troféu ADEMI-PE", text: "Principal prêmio da noite, concedido pelo impacto do Mirante do Frio Residence.", image: "/images/company/award-master.jpg" },
  { name: "Troféu Residencial MCMV", edition: "Master I", text: "Habitações acessíveis com qualidade, conforto e inovação, no Mirante do Frio Residence.", image: "/images/company/award-mcmv.jpg" },
  { name: "Troféu ESG", edition: "30º Troféu ADEMI-PE", text: "Boas práticas em sustentabilidade ambiental, responsabilidade social e governança ética.", image: "/images/company/award-esg.jpg" },
  { name: "Troféu Cooperada do Ano", edition: "30º Troféu ADEMI-PE", text: "Trabalho colaborativo e iniciativas coletivas que impulsionam o desenvolvimento do setor.", image: "/images/company/award-coop.jpg" },
  { name: "Troféu Incontec", edition: "30º Troféu ADEMI-PE", text: "Uso de tecnologias e processos inovadores na construção civil.", image: "/images/company/award-incontec.jpg" },
];

export const numbers = [
  { value: "1999", label: "ano de fundação" },
  { value: "18+", label: "grandes empreendimentos" },
  { value: "8 mil", label: "unidades habitacionais" },
  { value: "800 mil m²", label: "de área construída" },
];

export const timeline = [
  { year: "1999", text: "Fundação, para conduzir a requalificação urbana de Paulista e do litoral norte de Pernambuco." },
  { year: "Grupo", text: "A empresa passa a integrar um grupo com a fazenda Camarave e o Paulista North Way Shopping." },
  { year: "NDT 1", text: "Primeira empresa do estado com a certificação NDT 1, além de ISO 9001:2015, PBQP-H nível A e Selo Casa Azul + Caixa." },
  { year: "ADEMI", text: "Troféu Master no 30º Troféu ADEMI-PE pelo Mirante do Frio Residence, e mais quatro prêmios." },
  { year: "2026", text: "Lançamento do Paineiras Bairro-Parque, o primeiro bairro-parque de Pernambuco." },
];

export const certifications = [
  "ISO 9001:2015",
  "PBQP-H SIAC Nível A",
  "NDT-I Caixa",
  "Selo Casa Azul + Caixa",
  "Troféu Master ADEMI-PE",
];

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
