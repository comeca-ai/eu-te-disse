import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Shield, Users, Award, Lightbulb, CheckCircle, HelpCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  const navigate = useNavigate();

  const steps = [
    { num: '01', title: 'Escolha um palpite', desc: 'Explore centenas de perguntas sobre futebol, economia, BBB, política e mais. Escolha algo que você manja.', icon: '🔍' },
    { num: '02', title: 'Mete a opinião', desc: 'Compre cotas de "Sim" ou "Não". O preço mostra o que a galera tá achando. Quanto menor o preço, maior o retorno se você acertar.', icon: '🎯' },
    { num: '03', title: 'Acertou? Eu te disse!', desc: 'Se seu palpite tiver certo, você recebe R$ 1,00 por cota. Ganha XP, conquistas e sobe no ranking. Aí é só falar: eu te disse.', icon: '🏆' },
  ];

  const pillars = [
    { icon: <Lightbulb size={24} />, title: 'Sabedoria da galera', desc: 'Os preços refletem o que milhares de pessoas pensam. A galera junta acerta mais que qualquer especialista sozinho.' },
    { icon: <Shield size={24} />, title: 'Tudo às claras', desc: 'Cada palpite tem regras claras, fontes públicas e histórico completo. Zero surpresa na hora da resolução.' },
    { icon: <Users size={24} />, title: 'Desafie seus amigos', desc: 'Discuta, compartilhe análises, desafie a galera e participe de ligas. Mais divertido quando é junto.' },
    { icon: <Award size={24} />, title: 'Mandou bem? Leva prêmio', desc: 'Ganhe XP, conquistas exclusivas e destaque no ranking. Quanto mais você acerta, mais recompensas.' },
  ];

  const faqs = [
    { q: 'Preciso pagar pra participar?', a: 'O protótipo é demonstrativo. Numa versão real, você usaria saldo virtual ou real pra comprar cotas.' },
    { q: 'Como os palpites são resolvidos?', a: 'Cada mercado define critérios claros e fontes oficiais. Quando o prazo expira, a resolução é baseada nos fatos.' },
    { q: 'É seguro?', a: 'Transparência total. Todas as regras são públicas e o histórico é verificável por qualquer pessoa.' },
    { q: 'Posso palpitar em qualquer tema?', a: 'Sim! Tem futebol, economia, BBB, clima, tecnologia e muito mais. Escolhe o que você entende.' },
  ];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-3 max-w-3xl mx-auto">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-muted-foreground hover:text-foreground">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-heading font-bold text-lg text-foreground">Como funciona?</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
            Palpitou, acertou,<br /><span className="text-gradient-primary">eu te disse.</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Entenda como funciona e por que milhares de pessoas confiam nos palpites coletivos.
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
        <h3 className="text-xl font-heading font-bold text-foreground text-center mb-6">Por que funciona</h3>
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
        <h3 className="text-xl font-heading font-bold text-foreground text-center mb-6">Dúvidas frequentes</h3>
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
            Bora palpitar agora
          </Button>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;