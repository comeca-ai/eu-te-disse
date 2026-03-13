import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Bookmark, MessageCircle, TrendingUp, TrendingDown, Users, Clock, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarketCard from '@/components/market/MarketCard';
import CategoryBadge from '@/components/market/CategoryBadge';
import { markets } from '@/data/mockData';
import { formatVolume } from '@/data/mockData';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const market = markets.find(m => m.id === id);

  if (!market) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Mercado não encontrado</p>
      </div>
    );
  }

  const isPositive = market.change24h >= 0;
  const chartData = market.sparkline.map((v, i) => ({ name: `${i + 1}d`, value: v }));
  const relatedMarkets = markets.filter(m => m.category === market.category && m.id !== market.id).slice(0, 3);

  const comments = [
    { user: 'Marina S.', text: 'Difícil prever, mas os dados recentes apontam pra cima!', time: '2h', likes: 12 },
    { user: 'Ricardo M.', text: 'Concordo com a maioria aqui, chance real.', time: '5h', likes: 8 },
    { user: 'Camila F.', text: 'Mudei minha posição depois de ver os últimos números.', time: '8h', likes: 15 },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Bookmark size={18} />
            </button>
            <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Category */}
        <CategoryBadge icon={market.categoryIcon} label={market.category} size="sm" />

        {/* Question */}
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mt-3 mb-4 leading-tight">
          {market.question}
        </h1>

        {/* Probability + Change */}
        <div className="flex items-center gap-4 mb-6">
          <div className="text-5xl font-heading font-bold text-foreground">{market.probability}%</div>
          <div>
            <div className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? 'text-success' : 'text-destructive'}`}>
              {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {isPositive ? '+' : ''}{market.change24h}% (24h)
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">probabilidade atual</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="sim" size="lg" className="text-lg">
            Sim · {market.probability}¢
          </Button>
          <Button variant="nao" size="lg" className="text-lg">
            Não · {100 - market.probability}¢
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Users size={16} className="mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-bold text-foreground">{formatVolume(market.volume)}</p>
            <p className="text-[10px] text-muted-foreground">Volume</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <MessageCircle size={16} className="mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-bold text-foreground">{market.comments}</p>
            <p className="text-[10px] text-muted-foreground">Comentários</p>
          </div>
          <div className="rounded-xl bg-card border border-border p-3 text-center">
            <Clock size={16} className="mx-auto mb-1 text-muted-foreground" />
            <p className="text-sm font-bold text-foreground">{market.deadline}</p>
            <p className="text-[10px] text-muted-foreground">Prazo</p>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-card border border-border p-4 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Histórico de probabilidade</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(155, 75%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(155, 75%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(220, 10%, 55%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(220, 10%, 55%)' }} axisLine={false} tickLine={false} domain={['auto', 'auto']} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(225, 20%, 10%)',
                  border: '1px solid hsl(225, 15%, 16%)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'hsl(210, 20%, 95%)',
                }}
              />
              <Area type="monotone" dataKey="value" stroke="hsl(155, 75%, 42%)" fill="url(#colorValue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment */}
        <div className="rounded-xl bg-card border border-border p-4 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">🗣️ Sentimento da comunidade</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-success font-medium">Sim ({market.probability}%)</span>
                <span className="text-destructive font-medium">Não ({100 - market.probability}%)</span>
              </div>
              <div className="h-3 rounded-full bg-surface overflow-hidden flex">
                <div className="h-full bg-success rounded-l-full" style={{ width: `${market.probability}%` }} />
                <div className="h-full bg-destructive rounded-r-full" style={{ width: `${100 - market.probability}%` }} />
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">O que está mexendo:</span> Últimas declarações e dados oficiais movimentam as probabilidades.
          </p>
        </div>

        {/* Source & Resolution */}
        {market.source && (
          <div className="rounded-xl bg-card border border-border p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Critérios de resolução</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Este mercado será resolvido com base em dados oficiais publicados por <span className="text-foreground font-medium">{market.source}</span>.
            </p>
            <button className="text-xs text-primary font-medium flex items-center gap-1">
              Ver detalhes completos <ExternalLink size={12} />
            </button>
          </div>
        )}

        {/* Beginner box */}
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-1">💡 Como funciona?</h4>
          <p className="text-xs text-muted-foreground">
            Você escolhe "Sim" ou "Não" pagando um valor entre 1¢ e 99¢. Se acertar, recebe R$ 1,00 por cota. O preço reflete a probabilidade estimada pela comunidade.
          </p>
        </div>

        {/* Comments */}
        <div className="rounded-xl bg-card border border-border p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">💬 Discussão ({market.comments})</h3>
            <Button variant="glass" size="sm">Comentar</Button>
          </div>
          <div className="space-y-3">
            {comments.map((c, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-surface flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                  {c.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-foreground">{c.user}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{c.text}</p>
                  <button className="text-[10px] text-muted-foreground mt-1 hover:text-foreground">❤️ {c.likes}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {relatedMarkets.length > 0 && (
          <section className="mb-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">Mercados relacionados</h3>
            <div className="space-y-3">
              {relatedMarkets.map(m => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MarketDetail;
