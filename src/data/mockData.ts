export interface Market {
  id: string;
  question: string;
  category: string;
  categoryIcon: string;
  probability: number;
  change24h: number;
  volume: number;
  comments: number;
  deadline: string;
  source?: string;
  sparkline: number[];
  options?: { label: string; probability: number }[];
  hot?: boolean;
  resolvingToday?: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  progress: number;
  total: number;
  type: 'daily' | 'weekly' | 'special';
  icon: string;
  completed: boolean;
}

export interface RankingUser {
  rank: number;
  name: string;
  username: string;
  accuracy: number;
  profit: number;
  level: number;
  avatar: string;
  region?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  earned: boolean;
}

export interface Position {
  marketId: string;
  question: string;
  position: 'Sim' | 'Não';
  probability: number;
  invested: number;
  currentValue: number;
  category: string;
}

export const categories = [
  { id: 'all', label: 'Todos', icon: '🔥' },
  { id: 'futebol', label: 'Futebol', icon: '⚽' },
  { id: 'politica', label: 'Política', icon: '🏛️' },
  { id: 'economia', label: 'Economia', icon: '📈' },
  { id: 'bbb', label: 'BBB / TV', icon: '📺' },
  { id: 'tech', label: 'Tecnologia', icon: '💻' },
  { id: 'clima', label: 'Clima', icon: '🌦️' },
  { id: 'cultura', label: 'Cultura Pop', icon: '🎬' },
  { id: 'esportes', label: 'Esportes', icon: '🏅' },
];

export const markets: Market[] = [
  {
    id: '1',
    question: 'O Flamengo termina o Brasileirão 2026 no G4?',
    category: 'futebol',
    categoryIcon: '⚽',
    probability: 72,
    change24h: 3.5,
    volume: 284500,
    comments: 342,
    deadline: '15 Dez 2026',
    source: 'CBF / Brasileirão',
    sparkline: [65, 68, 64, 70, 72, 69, 73, 72],
    hot: true,
  },
  {
    id: '2',
    question: 'A Selic cai na próxima reunião do Copom?',
    category: 'economia',
    categoryIcon: '📈',
    probability: 58,
    change24h: -2.1,
    volume: 412000,
    comments: 189,
    deadline: '18 Jun 2026',
    source: 'Banco Central',
    sparkline: [62, 60, 55, 58, 61, 57, 58, 58],
  },
  {
    id: '3',
    question: 'BBB 27: Participante do Grupo Camarote chega à final?',
    category: 'bbb',
    categoryIcon: '📺',
    probability: 45,
    change24h: 8.2,
    volume: 198000,
    comments: 567,
    deadline: '22 Abr 2027',
    sparkline: [30, 35, 40, 38, 42, 48, 45, 45],
    hot: true,
  },
  {
    id: '4',
    question: 'O próximo técnico da Seleção Brasileira será brasileiro?',
    category: 'futebol',
    categoryIcon: '⚽',
    probability: 64,
    change24h: 1.2,
    volume: 356000,
    comments: 421,
    deadline: '30 Jun 2026',
    source: 'CBF',
    sparkline: [58, 60, 62, 61, 65, 63, 64, 64],
  },
  {
    id: '5',
    question: 'Vai ter frente fria forte em São Paulo neste mês?',
    category: 'clima',
    categoryIcon: '🌦️',
    probability: 38,
    change24h: -5.3,
    volume: 45000,
    comments: 78,
    deadline: '31 Mar 2026',
    sparkline: [50, 48, 42, 45, 40, 38, 35, 38],
    resolvingToday: true,
  },
  {
    id: '6',
    question: 'Filme brasileiro concorre ao Oscar 2027?',
    category: 'cultura',
    categoryIcon: '🎬',
    probability: 22,
    change24h: 0.8,
    volume: 89000,
    comments: 134,
    deadline: '10 Jan 2027',
    sparkline: [18, 20, 19, 22, 21, 23, 22, 22],
  },
  {
    id: '7',
    question: 'O dólar fecha abaixo de R$ 5,50 este mês?',
    category: 'economia',
    categoryIcon: '📈',
    probability: 41,
    change24h: -1.8,
    volume: 520000,
    comments: 256,
    deadline: '31 Mar 2026',
    source: 'BCB / Reuters',
    sparkline: [45, 43, 44, 42, 40, 41, 39, 41],
    resolvingToday: true,
  },
  {
    id: '8',
    question: 'Brasil terá mais de 1 milhão de carros elétricos até 2027?',
    category: 'tech',
    categoryIcon: '💻',
    probability: 33,
    change24h: 2.4,
    volume: 67000,
    comments: 91,
    deadline: '31 Dez 2027',
    sparkline: [25, 28, 30, 29, 32, 31, 33, 33],
  },
  {
    id: '9',
    question: 'Palmeiras conquista a Libertadores 2026?',
    category: 'futebol',
    categoryIcon: '⚽',
    probability: 18,
    change24h: 0.5,
    volume: 310000,
    comments: 478,
    deadline: '29 Nov 2026',
    sparkline: [15, 16, 18, 17, 19, 18, 17, 18],
    hot: true,
  },
  {
    id: '10',
    question: 'PIB do Brasil cresce mais de 3% em 2026?',
    category: 'economia',
    categoryIcon: '📈',
    probability: 29,
    change24h: -0.7,
    volume: 230000,
    comments: 145,
    deadline: '1 Mar 2027',
    source: 'IBGE / Focus',
    sparkline: [32, 30, 28, 31, 29, 28, 30, 29],
  },
  {
    id: '11',
    question: 'Atleta brasileiro ganha ouro nos Jogos de LA 2028?',
    category: 'esportes',
    categoryIcon: '🏅',
    probability: 85,
    change24h: 0.3,
    volume: 178000,
    comments: 203,
    deadline: '11 Ago 2028',
    sparkline: [80, 82, 83, 84, 85, 84, 85, 85],
  },
  {
    id: '12',
    question: 'Novo reality show da Globo bate recorde de audiência?',
    category: 'bbb',
    categoryIcon: '📺',
    probability: 31,
    change24h: 4.1,
    volume: 92000,
    comments: 312,
    deadline: '30 Jun 2026',
    sparkline: [22, 25, 28, 27, 30, 29, 31, 31],
  },
];

export const missions: Mission[] = [
  { id: '1', title: 'Primeiro palpite do dia', description: 'Participe de pelo menos 1 mercado hoje', xp: 50, progress: 0, total: 1, type: 'daily', icon: '🎯', completed: false },
  { id: '2', title: 'Explorador', description: 'Visite 3 categorias diferentes', xp: 30, progress: 2, total: 3, type: 'daily', icon: '🧭', completed: false },
  { id: '3', title: 'Comentarista', description: 'Deixe um comentário em qualquer mercado', xp: 20, progress: 0, total: 1, type: 'daily', icon: '💬', completed: false },
  { id: '4', title: 'Sequência de fogo', description: 'Mantenha seu streak por 7 dias', xp: 200, progress: 5, total: 7, type: 'weekly', icon: '🔥', completed: false },
  { id: '5', title: 'Diversificado', description: 'Participe de mercados em 5 categorias diferentes', xp: 150, progress: 3, total: 5, type: 'weekly', icon: '🌈', completed: false },
  { id: '6', title: 'Oráculo da rodada', description: 'Acerte 3 mercados seguidos', xp: 300, progress: 1, total: 3, type: 'weekly', icon: '🔮', completed: false },
  { id: '7', title: 'Copa do Mundo Especial', description: 'Participe de 5 mercados sobre futebol', xp: 500, progress: 2, total: 5, type: 'special', icon: '⚽', completed: false },
  { id: '8', title: 'Missão concluída!', description: 'Complete todas as missões diárias', xp: 100, progress: 3, total: 3, type: 'daily', icon: '✅', completed: true },
];

export const rankingUsers: RankingUser[] = [
  { rank: 1, name: 'Ana Silva', username: '@anasilva', accuracy: 78.5, profit: 12450, level: 42, avatar: '👩‍💼', region: 'SP' },
  { rank: 2, name: 'Carlos Mendes', username: '@carlosm', accuracy: 76.2, profit: 10890, level: 38, avatar: '👨‍💻', region: 'RJ' },
  { rank: 3, name: 'Juliana Costa', username: '@jucosta', accuracy: 74.8, profit: 9750, level: 35, avatar: '👩‍🎓', region: 'MG' },
  { rank: 4, name: 'Rafael Oliveira', username: '@rafoliv', accuracy: 73.1, profit: 8920, level: 33, avatar: '🧑‍💼', region: 'BA' },
  { rank: 5, name: 'Fernanda Lima', username: '@ferlima', accuracy: 71.9, profit: 7650, level: 31, avatar: '👩‍🔬', region: 'RS' },
  { rank: 6, name: 'Lucas Santos', username: '@lucass', accuracy: 70.5, profit: 6430, level: 29, avatar: '👨‍🎨', region: 'PR' },
  { rank: 7, name: 'Mariana Rocha', username: '@marirocha', accuracy: 69.8, profit: 5890, level: 27, avatar: '👩‍🏫', region: 'PE' },
  { rank: 8, name: 'Pedro Alves', username: '@pedroalv', accuracy: 68.4, profit: 5210, level: 25, avatar: '🧑‍🚀', region: 'CE' },
  { rank: 9, name: 'Beatriz Souza', username: '@beasouza', accuracy: 67.2, profit: 4780, level: 24, avatar: '👩‍⚕️', region: 'SC' },
  { rank: 10, name: 'Thiago Ferreira', username: '@thiagofer', accuracy: 66.8, profit: 4320, level: 22, avatar: '👨‍🍳', region: 'GO' },
];

export const badges: Badge[] = [
  { id: '1', name: 'Oráculo do Futebol', description: 'Acertou 10 mercados de futebol', icon: '⚽', category: 'futebol', earned: true },
  { id: '2', name: 'Radar Político', description: 'Participou de 20 mercados políticos', icon: '🏛️', category: 'politica', earned: true },
  { id: '3', name: 'Mestre do BBB', description: 'Acertou o vencedor do BBB', icon: '📺', category: 'bbb', earned: false },
  { id: '4', name: 'Macro Guru', description: 'Acertou 5 previsões econômicas seguidas', icon: '📈', category: 'economia', earned: true },
  { id: '5', name: 'Meteorologista', description: 'Acertou 10 previsões de clima', icon: '🌦️', category: 'clima', earned: false },
  { id: '6', name: 'Crítico de Cinema', description: 'Participou de 15 mercados culturais', icon: '🎬', category: 'cultura', earned: false },
  { id: '7', name: 'Streak Master', description: 'Manteve um streak de 30 dias', icon: '🔥', category: 'geral', earned: true },
  { id: '8', name: 'Primeiro Palpite', description: 'Participou do primeiro mercado', icon: '🎯', category: 'geral', earned: true },
  { id: '9', name: 'Top 10 Semanal', description: 'Ficou no Top 10 do ranking semanal', icon: '🏆', category: 'geral', earned: false },
  { id: '10', name: 'Tech Visionary', description: 'Acertou 5 previsões de tecnologia', icon: '💻', category: 'tech', earned: false },
  { id: '11', name: 'Atleta Digital', description: 'Participou de mercados em todas categorias', icon: '🏅', category: 'esportes', earned: false },
  { id: '12', name: 'Comunidade Ativa', description: '100 comentários em mercados', icon: '💬', category: 'geral', earned: true },
];

export const userProfile = {
  name: 'João Pedro',
  username: '@joaopedro',
  level: 14,
  xp: 2340,
  xpToNext: 3000,
  streak: 5,
  accuracy: 67.3,
  totalMarkets: 48,
  totalProfit: 1250,
  joinedDate: 'Jan 2026',
  region: 'São Paulo, SP',
};

export const positions: Position[] = [
  { marketId: '1', question: 'O Flamengo termina o Brasileirão 2026 no G4?', position: 'Sim', probability: 72, invested: 250, currentValue: 310, category: 'futebol' },
  { marketId: '2', question: 'A Selic cai na próxima reunião do Copom?', position: 'Não', probability: 42, invested: 180, currentValue: 155, category: 'economia' },
  { marketId: '7', question: 'O dólar fecha abaixo de R$ 5,50 este mês?', position: 'Sim', probability: 41, invested: 120, currentValue: 98, category: 'economia' },
  { marketId: '4', question: 'O próximo técnico da Seleção será brasileiro?', position: 'Sim', probability: 64, invested: 200, currentValue: 245, category: 'futebol' },
  { marketId: '3', question: 'BBB 27: Participante do Camarote chega à final?', position: 'Sim', probability: 45, invested: 100, currentValue: 112, category: 'bbb' },
];

export function formatVolume(v: number): string {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v.toString();
}
