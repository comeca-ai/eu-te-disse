import React, { useState } from 'react';
import { Target } from 'lucide-react';
import MissionCard from '@/components/gamification/MissionCard';
import { missions } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Missions = () => {
  const [tab, setTab] = useState<'daily' | 'weekly' | 'special'>('daily');

  const filtered = missions.filter(m => m.type === tab);
  const totalXP = missions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);
  const completedCount = missions.filter(m => m.completed).length;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-lg text-foreground">🎯 Desafios</h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20">
            <span className="text-xs font-bold text-gold">+{totalXP} XP ganhos</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Summary */}
        <div className="rounded-xl gradient-hero border border-border p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
              <Target size={24} className="text-gold-foreground" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-foreground">Progresso do dia</h2>
              <p className="text-sm text-muted-foreground">{completedCount}/{missions.filter(m => m.type === 'daily').length} desafios diários</p>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface overflow-hidden">
            <div
              className="h-full rounded-full gradient-gold transition-all"
              style={{ width: `${(completedCount / missions.filter(m => m.type === 'daily').length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface rounded-lg p-0.5 mb-6">
          {(['daily', 'weekly', 'special'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'daily' ? '📅 Diários' : t === 'weekly' ? '📆 Semanais' : '⭐ Especiais'}
            </button>
          ))}
        </div>

        {/* Mission list */}
        <div className="space-y-3">
          {filtered.map(mission => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">🎉</p>
              <p className="text-sm text-muted-foreground">Nenhum desafio nesta categoria por enquanto!</p>
            </div>
          )}
        </div>

        {/* Special event teaser */}
        <div className="rounded-xl border border-secondary/30 bg-secondary/5 p-5 mt-8">
          <h3 className="font-heading font-bold text-foreground mb-1">⚽ Evento: Brasileirão</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Complete 5 palpites sobre futebol e conquiste o badge "Oráculo do Futebol" + 500 XP!
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 rounded-full bg-surface overflow-hidden">
              <div className="h-full rounded-full gradient-gold w-2/5" />
            </div>
            <span className="text-xs text-muted-foreground">2/5</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Missions;