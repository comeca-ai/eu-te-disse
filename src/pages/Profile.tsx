import React from 'react';
import { Settings, MapPin, Calendar, TrendingUp, Target, Award, Flame, Zap } from 'lucide-react';
import XPWidget from '@/components/gamification/XPWidget';
import { badges } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const Profile = () => {
  const { profile } = useAuth();
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  const displayName = profile?.full_name || 'Usuário';

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-lg text-foreground">👤 Meu perfil</h1>
          <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground font-heading">
            {displayName.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">{displayName}</h2>
            <p className="text-sm text-muted-foreground">@{displayName.toLowerCase().replace(/\s/g, '')}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin size={12} />Brasil</span>
              <span className="flex items-center gap-1"><Calendar size={12} />Membro</span>
            </div>
          </div>
        </div>

        {/* XP */}
        <XPWidget level={1} xp={0} xpToNext={1000} />

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <TrendingUp size={18} className="text-success" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">0%</p>
              <p className="text-xs text-muted-foreground">Acerto</p>
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Target size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Palpites</p>
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Flame size={18} className="text-warning" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{userProfile.streak} dias</p>
              <p className="text-xs text-muted-foreground">Sequência</p>
            </div>
          </div>
          <div className="rounded-xl bg-card border border-border p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Zap size={18} className="text-gold" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">+R$ {userProfile.totalProfit}</p>
              <p className="text-xs text-muted-foreground">Rendimento</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <h3 className="font-heading font-bold text-foreground mb-3">🏅 Conquistas ({earnedBadges.length}/{badges.length})</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {earnedBadges.map(badge => (
            <div key={badge.id} className="rounded-xl bg-card border border-gold/20 p-3 text-center shadow-glow-gold/5">
              <div className="text-2xl mb-1">{badge.icon}</div>
              <p className="text-xs font-semibold text-foreground truncate">{badge.name}</p>
              <p className="text-[10px] text-muted-foreground truncate">{badge.description}</p>
            </div>
          ))}
        </div>

        {lockedBadges.length > 0 && (
          <>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">🔒 Por conquistar</h4>
            <div className="grid grid-cols-3 gap-3 mb-8">
              {lockedBadges.map(badge => (
                <div key={badge.id} className="rounded-xl bg-card border border-border p-3 text-center opacity-50">
                  <div className="text-2xl mb-1 grayscale">{badge.icon}</div>
                  <p className="text-xs font-semibold text-foreground truncate">{badge.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{badge.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;