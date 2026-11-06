// Central place for brand data. Swap these values to re-skin the whole site.
export const site = {
  name: "ACLF Empreendimentos",
  shortName: "ACLF",
  legalName: "ACLF Desenvolvimento Imobiliário e Participação Ltda.",
  cnpj: "27.702.723/0001-99",
  tagline: "Morar bem é o começo de tudo",
  phone: "(81) 3221-1000",
  phoneHref: "tel:+558132211000",
  whatsappHref: "https://wa.me/5581973474240",
  whatsappLabel: "(81) 97347-4240",
  dpoEmail: "dpo@aclf.com.br",
  clientAreaUrl: "http://clientesaclf.megaerp.online/Login.aspx",
  jobsUrl: "https://atracaodetalentos.totvs.app/vagasgrupoaclf/extended",
  ouvidoriaUrl: "https://forms.gle/AaemXfk8H5h2aMmJA",
  email: "contato@aclf.com.br",
  instagram: "https://www.instagram.com/aclfempreendimentos",
  youtube: "https://www.youtube.com/@aclfempreendimentos",
  address: "Rodovia 15, km 16,5, nº 242, Centro, Paulista/PE · CEP 53401-445",
  hours: ["Segunda a quinta, 8h às 18h", "Sexta, 8h às 17h"],
  logo: "/images/brand/logo.png",
  logoWhite: "/images/brand/logo-white.png",
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; hint?: string }[];
};

export const nav: NavItem[] = [
  {
    label: "Empresa",
    href: "/empresa",
    children: [
      { label: "Nossa história", href: "/empresa", hint: "Desde 1999" },
      { label: "Premiações", href: "/premiacoes", hint: "Troféu ADEMI-PE" },
      { label: "Certificações", href: "/certificacoes", hint: "Selo Casa Azul + Caixa" },
      { label: "Pode+", href: "/pode-mais" },
    ],
  },
  {
    label: "Empreendimentos",
    href: "/empreendimentos",
    children: [
      { label: "Lançamentos", href: "/empreendimentos/lancamento" },
      { label: "Em construção", href: "/empreendimentos/em-construcao" },
      { label: "Pronto para morar", href: "/empreendimentos/pronto-para-morar" },
      { label: "Portfólio", href: "/empreendimentos/portfolio", hint: "Obras entregues" },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "Portal do cliente",
    href: "/portal-do-cliente",
    children: [
      { label: "Área do cliente", href: "/portal-do-cliente" },
      { label: "Assistência técnica", href: "/assistencia-tecnica" },
      { label: "Atendimento", href: "/contato" },
    ],
  },
  {
    label: "Políticas",
    href: "/politicas",
    children: [
      { label: "Política de qualidade", href: "/politicas#qualidade" },
      { label: "Política de privacidade", href: "/politica-de-privacidade" },
      { label: "Ouvidoria", href: "/ouvidoria" },
    ],
  },
  { label: "Trabalhe conosco", href: "/trabalhe-conosco" },
];
