import React from 'react';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { positions, userProfile } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Portfolio = () => {
  const navigate = useNavigate();
  const totalInvested = positions.reduce((s, p) => s + p.invested, 0);
  const totalCurrent = positions.reduce((s, p) => s + p.currentValue, 0);
  const totalPnl = totalCurrent - totalInvested;
  const pnlPercent = ((totalPnl / totalInvested) * 100).toFixed(1);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="px-4 py-3 max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-lg text-foreground">💼 Minhas previsões</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Balance Card */}
        <div className="rounded-xl gradient-hero border border-border p-6 mb-6">
          <p className="text-xs text-muted-foreground mb-1">Valor total</p>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-3xl font-heading font-bold text-foreground">
              R$ {totalCurrent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
            <span className={cn(
              "text-sm font-semibold flex items-center gap-0.5 mb-1",
              totalPnl >= 0 ? "text-success" : "text-destructive"
            )}>
              {totalPnl >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              {totalPnl >= 0 ? '+' : ''}R$ {totalPnl.toFixed(2)} ({pnlPercent}%)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-background/40 p-3 text-center">
              <p className="text-lg font-bold text-foreground">{positions.length}</p>
              <p className="text-[10px] text-muted-foreground">Previsões ativas</p>
            </div>
            <div className="rounded-lg bg-background/40 p-3 text-center">
              <p className="text-lg font-bold text-foreground">{userProfile.accuracy}%</p>
              <p className="text-[10px] text-muted-foreground">Acerto</p>
            </div>
            <div className="rounded-lg bg-background/40 p-3 text-center">
              <p className="text-lg font-bold text-foreground">{userProfile.totalMarkets}</p>
              <p className="text-[10px] text-muted-foreground">Total previsões</p>
            </div>
          </div>
        </div>

        {/* Positions */}
        <h2 className="text-sm font-heading font-bold text-foreground mb-3">Previsões ativas</h2>
        <div className="space-y-3 mb-8">
          {positions.map((pos, i) => {
            const pnl = pos.currentValue - pos.invested;
            const isUp = pnl >= 0;
            return (
              <button
                key={i}
                onClick={() => navigate(`/mercado/${pos.marketId}`)}
                className="w-full text-left rounded-xl bg-card border border-border p-4 hover:bg-card-hover transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <p className="text-sm font-semibold text-foreground line-clamp-2 flex-1">{pos.question}</p>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-bold flex-shrink-0",
                    pos.position === 'Sim' ? 'bg-success/15 text-success' : 'bg-destructive/15 text-destructive'
                  )}>
                    {pos.position}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-4 text-muted-foreground">
                    <span>Investido: R$ {pos.invested}</span>
                    <span>Chance: {pos.probability}%</span>
                  </div>
                  <span className={cn("font-bold flex items-center gap-0.5", isUp ? "text-success" : "text-destructive")}>
                    {isUp ? '+' : ''}R$ {pnl.toFixed(2)}
                    <ArrowUpRight size={12} className={!isUp ? 'rotate-90' : ''} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <Button variant="market" size="lg" className="w-full" onClick={() => navigate('/')}>
          Ver mais mercados
        </Button>
      </main>
    </div>
  );
};

export default Portfolio;