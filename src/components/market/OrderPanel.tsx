"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/components/ui/ToastProvider";
import type { Market } from "@/lib/types";

interface OrderPanelProps {
  market: Market;
  initialSide?: "yes" | "no";
  prob: number;
}

export function OrderPanel({ market, initialSide = "yes", prob }: OrderPanelProps) {
  const [side, setSide] = useState<"yes" | "no">(initialSide);
  const [amount, setAmount] = useState(0);
  const { user } = useAuth();
  const { show } = useToast();

  const price = side === "yes" ? prob : 100 - prob;
  const shares = price > 0 ? amount / (price / 100) : 0;
  const payout = shares * 1;
  const profit = payout - amount;

  const submit = () => {
    if (amount <= 0) return;
    if (!user) {
      show("Entre na sua conta para apostar");
      return;
    }
    show(`Aposta de R$ ${amount.toFixed(2)} em ${side === "yes" ? "Sim" : "Não"} confirmada`);
    setAmount(0);
  };

  return (
    <div className="detail-card order-card">
      <div className="spread" style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>Apostar</div>
        <div
          className="muted"
          style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}
        >
          <Icon name="info" size={12} /> Mercado
        </div>
      </div>
      <div className="order-toggle">
        <button data-active={side === "yes"} data-side="yes" onClick={() => setSide("yes")}>
          Sim {prob}¢
        </button>
        <button data-active={side === "no"} data-side="no" onClick={() => setSide("no")}>
          Não {100 - prob}¢
        </button>
      </div>

      <div className="order-field" style={{ marginBottom: 12 }}>
        <label>Valor</label>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-2)",
              fontWeight: 600
            }}
          >
            R$
          </span>
          <input
            className="order-input"
            type="number"
            min={0}
            value={amount || ""}
            onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
            placeholder="0"
          />
        </div>
      </div>
      <div className="order-quick">
        {[10, 50, 100, 500].map((v) => (
          <button key={v} type="button" onClick={() => setAmount((a) => a + v)}>
            +{v}
          </button>
        ))}
      </div>

      <div className="order-summary">
        <div className="order-summary-row">
          <span className="k">Preço médio</span>
          <span className="v">{price}¢</span>
        </div>
        <div className="order-summary-row">
          <span className="k">Cotas</span>
          <span className="v">{shares.toFixed(2)}</span>
        </div>
        <div className="order-summary-row total">
          <span className="k">Retorno potencial</span>
          <span className="v payout">
            R$ {payout.toFixed(2)}{" "}
            <span style={{ color: "var(--text-2)", fontSize: 11 }}>
              (+R$ {profit.toFixed(2)})
            </span>
          </span>
        </div>
      </div>

      <button
        className={`btn btn-lg btn-block ${side === "yes" ? "btn-yes" : "btn-no"}`}
        onClick={submit}
        disabled={amount <= 0}
        style={amount <= 0 ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
      >
        {amount > 0
          ? `Apostar R$ ${amount.toFixed(2)} em ${side === "yes" ? "Sim" : "Não"}`
          : "Digite um valor"}
      </button>
      <div className="order-disclaimer">
        Ao apostar, você concorda com os <a style={{ textDecoration: "underline" }}>Termos de Uso</a>.
        Mercados de previsão envolvem risco.
      </div>
    </div>
  );
}
