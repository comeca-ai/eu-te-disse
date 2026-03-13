import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Shield, Users, Award, Lightbulb, CheckCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    { num: '01', title: 'Escolha um mercado', desc: 'Explore centenas de perguntas sobre futebol, economia, política, entretenimento e mais. Escolha algo que você entende.', icon: '🔍' },
    { num: '02', title: 'Dê seu palpite', desc: 'Compre cotas de "Sim" ou "Não". O preço reflete a probabilidade estimada pela comunidade. Quanto menor o preço, maior o potencial de retorno.', icon: '🎯' },
    { num: '03', title: 'Acompanhe e ganhe', desc: 'Se sua previsão estiver correta quando o mercado for resolvido, você recebe R$ 1,00 por cota. Ganhe XP, badges e suba no ranking!', icon: '🏆' },
  ];

  const pillars = [
    { icon: <Lightbulb size={24} />, title: 'Inteligência Coletiva', desc: 'Os preços refletem a sabedoria da multidão. Milhares de participantes contribuem para previsões mais precisas que especialistas individuais.' },
    { icon: <Shield size={24} />, title: 'Transparência Total', desc: 'Cada mercado tem critérios de resolução claros, fontes públicas e histórico completo. Você sabe exatamente como e quando será resolvido.' },
    { icon: <Users size={24} />, title: 'Comunidade Ativa', desc: 'Discuta, compartilhe análises, desafie amigos e participe de ligas regionais. Aprender junto é mais divertido.' },
    { icon: <Award size={24} />, title: 'Recompensas por Consistência', desc: 'Ganhe XP, badges exclusivos e destaque no ranking. Quanto mais consistente, mais você é recompensado.' },
  ];

  const faqs = [
    { q: 'Preciso pagar para participar?', a: 'O protótipo é apenas demonstrativo. Em uma versão real, você usaria saldo virtual ou real para comprar cotas.' },
    { q: 'Como os mercados são resolvidos?', a: 'Cada mercado define critérios claros e fontes oficiais. Quando o prazo expira, a resolução é baseada nos fatos verificáveis.' },
    { q: 'É seguro?', a: 'Priorizamos transparência e segurança. Todas as regras são públicas e o histórico é verificável.' },
    { q: 'Posso participar de qualquer mercado?', a: 'Sim! Explore por categoria e encontre mercados que combinam com seus conhecimentos.' },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading font-bold text-lg text-foreground">Como funciona</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Previsões que fazem<br /><span className="text-gradient-primary">sentido</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Entenda como mercados de previsão funcionam e por que milhões de pessoas confiam na inteligência coletiva.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="w-14 h-14 rounded-2xl gradient-card border border-border flex items-center justify-center text-2xl flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary">{step.num}</span>
                  <h3 className="text-base font-heading font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <h3 className="text-xl font-heading font-bold text-foreground text-center mb-6">Nossos pilares</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {pillars.map((p, i) => (
            <div key={i} className="rounded-xl bg-card border border-border p-5">
              <div className="text-primary mb-3">{p.icon}</div>
              <h4 className="font-heading font-bold text-foreground mb-1">{p.title}</h4>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h3 className="text-xl font-heading font-bold text-foreground text-center mb-6">Perguntas frequentes</h3>
        <div className="space-y-3 mb-12">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl bg-card border border-border p-4">
              <div className="flex items-start gap-2 mb-2">
                <HelpCircle size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <h4 className="text-sm font-semibold text-foreground">{faq.q}</h4>
              </div>
              <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="market" size="xl" onClick={() => navigate('/')}>
            Explorar mercados agora
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
