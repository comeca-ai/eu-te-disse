"use client";

import Link from "next/link";
import { Crumbs } from "@/components/Crumbs";
import { Icon } from "@/components/Icon";
import { MARKETS } from "@/lib/markets-data";
import { useAuth } from "@/components/auth/AuthProvider";

interface Position {
  m: string;
  side: "Sim" | "Não";
  shares: number;
  avg: number;
  current: number;
  pl: number;
}

const POSITIONS: Position[] = [
  { m: "selic-set", side: "Sim", shares: 320, avg: 64, current: 68, pl: 12.8 },
  { m: "fla-bra", side: "Sim", shares: 150, avg: 44, current: 41, pl: -4.5 },
  { m: "petrobras-div", side: "Sim", shares: 200, avg: 62, current: 73, pl: 22.0 },
  { m: "dolar-fim", side: "Não", shares: 500, avg: 70, current: 69, pl: -5.0 },
  { m: "copa-26", side: "Sim", shares: 75, avg: 22, current: 18, pl: -3.0 }
];

export default function WalletPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="page empty">
        <div className="em">⏳</div>
        <h3>Carregando...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page empty">
        <div className="em">🔐</div>
        <h3>Faça login para ver sua carteira</h3>
        <div>Suas posições, depósitos e P/L ficam disponíveis depois que você entra.</div>
      </div>
    );
  }

  return (
    <div className="page">
      <Crumbs items={[{ label: "Início", href: "/" }, { label: "Carteira" }]} />
      <h1 style={{ fontSize: 24, fontWeight: 700, margin: "8px 0 20px", letterSpacing: "-0.01em" }}>
        Sua carteira
      </h1>

      <div className="wallet-grid">
        <div className="stat-card">
          <div className="stat-label">Saldo disponível</div>
          <div className="stat-value">R$ 1.247,50</div>
          <div className="stat-delta up">+R$ 124,80 (+2,4%) hoje</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Em posições abertas</div>
          <div className="stat-value">R$ 3.420,00</div>
          <div className="stat-delta up">+R$ 312,40 não realizado</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Lucro total (90d)</div>
          <div className="stat-value">+R$ 892,30</div>
          <div className="stat-delta up">Taxa de acerto 64%</div>
        </div>
      </div>

      <div className="section">
        <div className="section-head">
          <div className="section-title">
            Posições abertas <span className="section-sub">{POSITIONS.length} mercados</span>
          </div>
          <div className="tabs">
            <div className="tab" data-active>
              Abertas
            </div>
            <div className="tab">Histórico</div>
            <div className="tab">Pendentes</div>
          </div>
        </div>
        <div className="position-list">
          <div className="position-row head">
            <div />
            <div>Mercado</div>
            <div>Cotas</div>
            <div>Preço médio</div>
            <div>P/L</div>
            <div />
          </div>
          {POSITIONS.map((p, i) => {
            const mk = MARKETS.find((m) => m.id === p.m);
            return (
              <Link href={`/market/${p.m}`} key={i} className="position-row">
                <div className="position-thumb">{mk?.emoji}</div>
                <div className="position-name">
                  {mk?.title}
                  <div className="ans">
                    Posição: <span className={p.side === "Sim" ? "up" : "down"}>{p.side}</span>
                  </div>
                </div>
                <div className="position-num">{p.shares}</div>
                <div className="position-num">
                  {p.avg}¢ → {p.current}¢
                </div>
                <div className={`position-num ${p.pl >= 0 ? "up" : "down"}`}>
                  {p.pl >= 0 ? "+" : ""}R$ {p.pl.toFixed(2)}
                </div>
                <div>
                  <Icon name="chevron" size={14} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
