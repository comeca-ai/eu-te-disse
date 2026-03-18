import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Crown, Rocket, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'free',
    name: 'Grátis',
    price: 'R$ 0',
    period: '/mês',
    description: 'Comece a palpitar agora mesmo',
    icon: <Zap size={24} />,
    color: 'text-muted-foreground',
    borderColor: 'border-border',
    bgCard: 'bg-card',
    features: [
      'Até 5 palpites por dia',
      'Acesso a mercados públicos',
      'Ranking geral',
      'Missões diárias básicas',
      'Perfil público',
    ],
    cta: 'Plano atual',
    ctaVariant: 'outline' as const,
    disabled: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 19,90',
    period: '/mês',
    description: 'Para quem leva palpite a sério',
    icon: <Crown size={24} />,
    color: 'text-primary',
    borderColor: 'border-primary/50',
    bgCard: 'bg-primary/5',
    popular: true,
    features: [
      'Palpites ilimitados',
      'Mercados exclusivos antecipados',
      'Análises detalhadas com gráficos',
      'Missões premium com XP dobrado',
      'Badge Pro no perfil',
      'Ranking exclusivo Pro',
      'Sem anúncios',
    ],
    cta: 'Assinar Pro',
    ctaVariant: 'market' as const,
    disabled: false,
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 'R$ 49,90',
    period: '/mês',
    description: 'O máximo da experiência',
    icon: <Rocket size={24} />,
    color: 'text-gold',
    borderColor: 'border-gold/50',
    bgCard: 'bg-gold/5',
    features: [
      'Tudo do plano Pro',
      'Acesso a mercados VIP fechados',
      'Crie seus próprios mercados',
      'Suporte prioritário',
      'Badge VIP exclusivo animado',
      'Grupo VIP no Telegram',
      'Convites para eventos ao vivo',
      'Cashback em palpites',
    ],
    cta: 'Assinar VIP',
    ctaVariant: 'gold' as const,
    disabled: false,
  },
];

const Planos = () => {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3 max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading font-bold text-lg text-foreground">Planos</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Leve seus palpites<br /><span className="text-gradient-primary">pro próximo nível</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Escolha o plano ideal e desbloqueie o máximo da plataforma. Cancele quando quiser.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setBilling('monthly')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all",
              billing === 'monthly' ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground hover:text-foreground'
            )}
          >
            Mensal
          </button>
          <button
            onClick={() => setBilling('yearly')}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all relative",
              billing === 'yearly' ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground hover:text-foreground'
            )}
          >
            Anual
            <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-success text-white px-1.5 py-0.5 rounded-full">
              -20%
            </span>
          </button>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {plans.map((plan) => {
            const price = billing === 'yearly' && plan.id !== 'free'
              ? `R$ ${(parseFloat(plan.price.replace('R$ ', '').replace(',', '.')) * 0.8 * 12).toFixed(2).replace('.', ',')}`
              : plan.price;
            const period = billing === 'yearly' && plan.id !== 'free' ? '/ano' : plan.period;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:scale-[1.02]",
                  plan.borderColor,
                  plan.bgCard
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gradient-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} /> Mais popular
                    </span>
                  </div>
                )}

                <div className={cn("mb-4", plan.color)}>
                  {plan.icon}
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-heading font-bold text-foreground">{price}</span>
                  <span className="text-sm text-muted-foreground">{period}</span>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check size={16} className={cn("flex-shrink-0 mt-0.5", plan.color)} />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.ctaVariant}
                  size="lg"
                  className="w-full"
                  disabled={plan.disabled}
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Trust section */}
        <div className="text-center rounded-xl border border-border bg-card p-6 mb-8">
          <h3 className="font-heading font-bold text-foreground mb-2">Sem pegadinha</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Cancele a qualquer momento, sem multa e sem burocracia. Seu plano continua ativo até o fim do período pago.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Planos;
