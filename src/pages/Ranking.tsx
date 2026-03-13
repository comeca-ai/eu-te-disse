import React, { useState } from 'react';
import { Trophy, Medal, TrendingUp, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { rankingUsers } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Ranking = () => {
  const [period, setPeriod] = useState<'weekly' | 'monthly'>('weekly');
  const top3 = rankingUsers.slice(0, 3);
  const rest = rankingUsers.slice(3);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-lg text-foreground">🏆 Ranking</h1>
          <div className="flex gap-1 bg-surface rounded-lg p-0.5">
            <button
              onClick={() => setPeriod('weekly')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                period === 'weekly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              Semanal
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              className={cn(
                "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                period === 'monthly' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              )}
            >
              Mensal
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Podium */}
        <div className="flex items-end justify-center gap-3 mb-8">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{top3[1].avatar}</div>
            <div className="w-20 bg-card border border-border rounded-t-xl pt-4 pb-3 text-center" style={{ height: 100 }}>
              <p className="text-xs font-bold text-foreground truncate px-1">{top3[1].name.split(' ')[0]}</p>
              <p className="text-[10px] text-muted-foreground">{top3[1].accuracy}%</p>
              <Medal size={16} className="mx-auto mt-1 text-muted-foreground" />
            </div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center">
            <div className="text-4xl mb-2 animate-float">{top3[0].avatar}</div>
            <div className="w-24 bg-card border border-gold/30 rounded-t-xl pt-4 pb-3 text-center shadow-glow-gold" style={{ height: 130 }}>
              <p className="text-sm font-bold text-foreground truncate px-1">{top3[0].name.split(' ')[0]}</p>
              <p className="text-xs text-gold font-semibold">{top3[0].accuracy}%</p>
              <Trophy size={20} className="mx-auto mt-1 text-gold" />
            </div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center">
            <div className="text-3xl mb-2">{top3[2].avatar}</div>
            <div className="w-20 bg-card border border-border rounded-t-xl pt-4 pb-3 text-center" style={{ height: 80 }}>
              <p className="text-xs font-bold text-foreground truncate px-1">{top3[2].name.split(' ')[0]}</p>
              <p className="text-[10px] text-muted-foreground">{top3[2].accuracy}%</p>
              <Medal size={16} className="mx-auto mt-1 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Your position */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-primary">#47</span>
            <div>
              <p className="text-sm font-semibold text-foreground">Sua posição</p>
              <p className="text-xs text-muted-foreground">67.3% de precisão</p>
            </div>
          </div>
          <Button variant="market" size="sm">Subir no ranking</Button>
        </div>

        {/* Leaderboard */}
        <div className="space-y-2">
          {rest.map(user => (
            <div key={user.rank} className="flex items-center gap-3 rounded-xl bg-card border border-border p-3 hover:bg-card-hover transition-colors">
              <span className="text-sm font-bold text-muted-foreground w-6 text-center">{user.rank}</span>
              <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-lg">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary font-medium">Lv.{user.level}</span>
                  <span className="flex items-center gap-0.5"><MapPin size={10} />{user.region}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{user.accuracy}%</p>
                <p className="text-[10px] text-success flex items-center gap-0.5 justify-end">
                  <TrendingUp size={10} />+{user.profit.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Ranking;
