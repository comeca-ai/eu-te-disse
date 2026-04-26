import type { Category, Market, MarketDetail } from "./types";

export const CATEGORIES: Category[] = [
  { id: "trending", label: "Em alta", emoji: "🔥" },
  { id: "politica", label: "Política", emoji: "🏛️" },
  { id: "economia", label: "Economia", emoji: "📈" },
  { id: "esportes", label: "Esportes", emoji: "⚽" },
  { id: "cultura", label: "Cultura Pop", emoji: "🎬" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "clima", label: "Clima", emoji: "🌎" },
  { id: "mundo", label: "Mundo", emoji: "🌐" }
];

export const MARKETS: Market[] = [
  {
    id: "selic-set",
    cat: "economia",
    catLabel: "Economia",
    emoji: "🏦",
    title: "Copom vai cortar a Selic na reunião de setembro?",
    prob: 68,
    trend: "up",
    delta: "+4",
    vol: "R$ 12,4M",
    end: "17 set 2026",
    type: "binary",
    featured: true
  },
  {
    id: "fla-bra",
    cat: "esportes",
    catLabel: "Esportes",
    emoji: "⚽",
    title: "Flamengo vai ser campeão do Brasileirão 2026?",
    prob: 41,
    trend: "down",
    delta: "-3",
    vol: "R$ 8,9M",
    end: "07 dez 2026",
    type: "binary"
  },
  {
    id: "eleicao-pres",
    cat: "politica",
    catLabel: "Política",
    emoji: "🗳️",
    title: "Quem será o próximo presidente do Brasil em 2026?",
    type: "multi",
    vol: "R$ 47,2M",
    end: "04 out 2026",
    options: [
      { name: "Lula (PT)", initial: "L", color: "#ef4444", pct: 38, trend: "flat" },
      { name: "Tarcísio (Republicanos)", initial: "T", color: "#3b82f6", pct: 27, trend: "up" },
      { name: "Ratinho Jr (PSD)", initial: "R", color: "#10b981", pct: 11, trend: "up" },
      { name: "Zema (Novo)", initial: "Z", color: "#f59e0b", pct: 9, trend: "flat" },
      { name: "Pacheco (PSD)", initial: "P", color: "#8b5cf6", pct: 6, trend: "down" },
      { name: "Outro", initial: "?", color: "#64748b", pct: 9, trend: "flat" }
    ],
    featured: true
  },
  {
    id: "dolar-fim",
    cat: "economia",
    catLabel: "Economia",
    emoji: "💵",
    title: "Dólar vai fechar 2026 acima de R$ 6,00?",
    prob: 31,
    trend: "down",
    delta: "-7",
    vol: "R$ 5,1M",
    end: "31 dez 2026",
    type: "binary"
  },
  {
    id: "bbb-final",
    cat: "cultura",
    catLabel: "Cultura Pop",
    emoji: "📺",
    title: "Quem vai ganhar o BBB 26?",
    type: "multi",
    vol: "R$ 3,2M",
    end: "15 abr 2026",
    options: [
      { name: "Camila", initial: "C", color: "#ec4899", pct: 34, trend: "up" },
      { name: "Diego", initial: "D", color: "#06b6d4", pct: 28, trend: "flat" },
      { name: "Bia", initial: "B", color: "#a855f7", pct: 19, trend: "down" },
      { name: "Rafael", initial: "R", color: "#f97316", pct: 12, trend: "up" },
      { name: "Outros", initial: "+", color: "#64748b", pct: 7, trend: "flat" }
    ]
  },
  {
    id: "ipca-mar",
    cat: "economia",
    catLabel: "Economia",
    emoji: "📊",
    title: "IPCA de março fica abaixo de 0,4%?",
    prob: 54,
    trend: "up",
    delta: "+2",
    vol: "R$ 1,8M",
    end: "11 abr 2026",
    type: "binary"
  },
  {
    id: "pix-internacional",
    cat: "tech",
    catLabel: "Tech",
    emoji: "📱",
    title: "Pix internacional será lançado até dezembro?",
    prob: 22,
    trend: "down",
    delta: "-5",
    vol: "R$ 740K",
    end: "31 dez 2026",
    type: "binary"
  },
  {
    id: "amazonia-queimadas",
    cat: "clima",
    catLabel: "Clima",
    emoji: "🔥",
    title: "Queimadas na Amazônia bater recorde em 2026?",
    prob: 47,
    trend: "up",
    delta: "+9",
    vol: "R$ 920K",
    end: "31 out 2026",
    type: "binary"
  },
  {
    id: "copa-26",
    cat: "esportes",
    catLabel: "Esportes",
    emoji: "🏆",
    title: "Brasil vai ganhar a Copa do Mundo 2026?",
    prob: 18,
    trend: "flat",
    delta: "0",
    vol: "R$ 22,6M",
    end: "19 jul 2026",
    type: "binary",
    featured: true
  },
  {
    id: "petrobras-div",
    cat: "economia",
    catLabel: "Economia",
    emoji: "🛢️",
    title: "Petrobras vai pagar dividendo extraordinário no Q2?",
    prob: 73,
    trend: "up",
    delta: "+11",
    vol: "R$ 4,7M",
    end: "30 jun 2026",
    type: "binary"
  },
  {
    id: "msi-tech",
    cat: "tech",
    catLabel: "Tech",
    emoji: "🤖",
    title: "Algum CEO de Big Tech vai renunciar até dezembro?",
    prob: 39,
    trend: "flat",
    delta: "+1",
    vol: "R$ 2,1M",
    end: "31 dez 2026",
    type: "binary"
  },
  {
    id: "sp-gov",
    cat: "politica",
    catLabel: "Política",
    emoji: "🏛️",
    title: "Tarcísio vai concorrer à reeleição em SP?",
    prob: 12,
    trend: "down",
    delta: "-8",
    vol: "R$ 3,4M",
    end: "10 ago 2026",
    type: "binary"
  }
];

function genSeries(seed: number, base: number, vol: number, drift: number): number[] {
  const points: number[] = [];
  let v = base;
  for (let i = 0; i < 90; i++) {
    const noise = (Math.sin(seed * i * 0.31) + Math.cos(seed * i * 0.17)) * vol;
    v += drift + noise * 0.3;
    v = Math.max(2, Math.min(98, v));
    points.push(Math.round(v * 10) / 10);
  }
  return points;
}

export const MARKET_DETAIL: Record<string, MarketDetail> = {
  "eleicao-pres": {
    series: [
      { name: "Lula", color: "#ef4444", pts: genSeries(1, 42, 4, -0.05) },
      { name: "Tarcísio", color: "#3b82f6", pts: genSeries(2, 18, 3, 0.1) },
      { name: "Ratinho Jr", color: "#10b981", pts: genSeries(3, 8, 2, 0.04) },
      { name: "Zema", color: "#f59e0b", pts: genSeries(4, 12, 2.5, -0.04) }
    ],
    description:
      "Mercado resolve com base no resultado oficial do TSE para o segundo turno (ou primeiro, em caso de vitória direta) da eleição presidencial de 2026. Caso o candidato vença, o Sim resolve em 100¢; caso contrário, 0¢.",
    rules: [
      "Resolução baseada na divulgação oficial do TSE.",
      "Cada candidato é um mercado binário independente.",
      "Em caso de adiamento, prazo é estendido em 30 dias.",
      "Disputa entre dois candidatos no segundo turno conta como vitória do vencedor."
    ]
  },
  "selic-set": {
    series: [
      { name: "Sim (corte)", color: "#2bc48a", pts: genSeries(5, 50, 3, 0.18) },
      { name: "Não", color: "#f04f5f", pts: genSeries(6, 50, 3, -0.18) }
    ],
    description:
      "Resolve em Sim caso o Copom anuncie corte de pelo menos 0,25 p.p. na taxa Selic na reunião de 16-17 de setembro. Manter ou subir resolve em Não.",
    rules: [
      "Resolução pelo comunicado oficial do Copom.",
      "Reunião 251 marcada para 16-17 de setembro de 2026.",
      "Cortes parciais (mesmo 0,01 p.p.) resolvem em Sim."
    ]
  }
};

export function getMarketById(id: string): Market | undefined {
  return MARKETS.find((m) => m.id === id);
}

export function getMarketsByCategory(catId: string): Market[] {
  if (catId === "trending") return MARKETS.filter((m) => m.featured);
  return MARKETS.filter((m) => m.cat === catId);
}

export function formatPct(p: number): string {
  return Math.round(p) + "¢";
}
