import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronRight, Sparkles, Shield, Users, Award } from 'lucide-react';
import logoEuTeDisse from '@/assets/logo-eu-te-disse.png';
import { Button } from '@/components/ui/button';
import MarketCard from '@/components/market/MarketCard';
import CategoryBadge from '@/components/market/CategoryBadge';
import StreakWidget from '@/components/gamification/StreakWidget';
import XPWidget from '@/components/gamification/XPWidget';
import { markets, categories, userProfile } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const requireAuth = () => {
    if (!user) {
      navigate('/login');
      return true;
    }
    return false;
  };

  const filteredMarkets = activeCategory === 'all'
    ? markets
    : markets.filter(m => m.category === activeCategory);

  const hotMarkets = markets.filter(m => m.hot);
  const resolvingToday = markets.filter(m => m.resolvingToday);

  return (
    <div className="min-h-screen">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <img src={logoEuTeDisse} alt="Eu te disse" className="h-8" />
          </div>
          <div className="flex items-center gap-2">
            <StreakWidget streak={userProfile.streak} compact />
            <XPWidget level={userProfile.level} xp={userProfile.xp} xpToNext={userProfile.xpToNext} compact />
            <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
              <Search size={18} />
            </button>
            <button className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors relative">
              <Bell size={18} />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Hero */}
        <section className="relative px-4 py-8 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-60" />
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full bg-secondary/5 blur-3xl" />
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-3">
              Você já sabia.<br />
              <span className="text-gradient-primary">Agora prove.</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md">
              Dê seus palpites sobre futebol, economia, BBB, política e tudo que move o Brasil. Acertou? Então fala: <span className="text-foreground font-medium">eu te disse.</span>
            </p>
            <div className="flex gap-3">
              <Button variant="market" size="lg" onClick={() => { if (!requireAuth()) navigate('/como-funciona'); }}>
                Como funciona?
              </Button>
              <Button variant="glass" size="lg" onClick={() => requireAuth()}>
                Bora palpitar
              </Button>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 relative">
            {[
              { icon: <Sparkles size={16} />, label: 'Sabedoria da galera' },
              { icon: <Shield size={16} />, label: '100% transparente' },
              { icon: <Users size={16} />, label: 'Desafie os amigos' },
              { icon: <Award size={16} />, label: 'Ganhe recompensas' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border/50 bg-card/50">
                <span className="text-primary">{p.icon}</span>
                <span className="text-xs font-medium text-muted-foreground">{p.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Streak + XP Row */}
        <section className="px-4 grid grid-cols-2 gap-3 mb-6">
          <StreakWidget streak={userProfile.streak} />
          <XPWidget level={userProfile.level} xp={userProfile.xp} xpToNext={userProfile.xpToNext} />
        </section>

        {/* Categories */}
        <section className="px-4 mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {categories.map(cat => (
              <CategoryBadge
                key={cat.id}
                icon={cat.icon}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </section>

        {/* Tá pegando fogo */}
        {hotMarkets.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="text-lg font-heading font-bold text-foreground">🔥 Tá pegando fogo</h2>
              <button className="text-xs text-primary font-medium flex items-center gap-0.5">
                Ver todos <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4">
              {hotMarkets.map(market => (
                <MarketCard key={market.id} market={market} compact />
              ))}
            </div>
          </section>
        )}

        {/* Resolvendo Hoje */}
        {resolvingToday.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="text-lg font-heading font-bold text-foreground">⏰ Fecha hoje!</h2>
            </div>
            <div className="px-4 space-y-3">
              {resolvingToday.map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </section>
        )}

        {/* Palpites do dia */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-lg font-heading font-bold text-foreground">📊 Palpites do dia</h2>
            <button className="text-xs text-primary font-medium flex items-center gap-0.5">
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          <div className="px-4 space-y-3">
            {filteredMarkets.slice(0, 6).map(market => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        </section>

        {/* Comece aqui */}
        <section className="px-4 mb-8">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <h3 className="font-heading font-bold text-foreground mb-1">👋 Primeira vez aqui?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Aprenda como dar seus palpites em 3 passos e ganhe 100 XP de bônus. É rapidinho.
            </p>
            <Button variant="market" size="sm" onClick={() => navigate('/como-funciona')}>
              Bora lá
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;