import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronRight, Sparkles, Shield, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarketCard from '@/components/market/MarketCard';
import CategoryBadge from '@/components/market/CategoryBadge';
import StreakWidget from '@/components/gamification/StreakWidget';
import XPWidget from '@/components/gamification/XPWidget';
import { markets, categories, userProfile } from '@/data/mockData';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

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
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm font-heading">M</span>
            </div>
            <span className="font-heading font-bold text-lg text-foreground">Mercado<span className="text-gradient-primary">BR</span></span>
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
              Entenda o que move<br />
              <span className="text-gradient-primary">o Brasil</span>, em tempo real.
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mb-6 max-w-md">
              Participe de mercados de previsão sobre futebol, economia, política, entretenimento e muito mais. Teste sua visão e ganhe recompensas.
            </p>
            <div className="flex gap-3">
              <Button variant="market" size="lg" onClick={() => navigate('/como-funciona')}>
                Como funciona
              </Button>
              <Button variant="glass" size="lg">
                Explorar mercados
              </Button>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 relative">
            {[
              { icon: <Sparkles size={16} />, label: 'Inteligência coletiva' },
              { icon: <Shield size={16} />, label: 'Transparência' },
              { icon: <Users size={16} />, label: 'Comunidade' },
              { icon: <Award size={16} />, label: 'Recompensas' },
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

        {/* Bombando no Brasil */}
        {hotMarkets.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="text-lg font-heading font-bold text-foreground">🔥 Bombando no Brasil</h2>
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
              <h2 className="text-lg font-heading font-bold text-foreground">⏰ Resolvendo hoje</h2>
            </div>
            <div className="px-4 space-y-3">
              {resolvingToday.map(market => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </section>
        )}

        {/* Mercados do dia */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="text-lg font-heading font-bold text-foreground">📊 Mercados do dia</h2>
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
            <h3 className="font-heading font-bold text-foreground mb-1">🎯 Novato? Comece aqui!</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Aprenda como funcionam os mercados de previsão em 3 passos simples e ganhe 100 XP de bônus.
            </p>
            <Button variant="market" size="sm" onClick={() => navigate('/como-funciona')}>
              Começar agora
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
