import Link from "next/link";
import { Icon } from "./Icon";

export function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="hero-eyebrow">Mercado em destaque</div>
        <h1>Quem será o próximo presidente do Brasil?</h1>
        <p>
          Eleição 2026 — 47,2 milhões em volume e contando. Lula segue à frente, mas Tarcísio
          fechou o gap em 4 pontos esta semana.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="v">R$ 47,2M</div>
            <div className="l">Volume total</div>
          </div>
          <div className="hero-stat">
            <div className="v">12.4k</div>
            <div className="l">Apostadores</div>
          </div>
          <div className="hero-stat">
            <div className="v">163d</div>
            <div className="l">Para resolução</div>
          </div>
        </div>
      </div>
      <div className="hero-cta">
        <Link href="/market/eleicao-pres" className="btn btn-primary btn-lg btn-block">
          Ver mercado <Icon name="arrow" size={14} />
        </Link>
        <button className="btn btn-outline btn-block">
          <Icon name="bookmark" size={14} /> Acompanhar
        </button>
      </div>
    </div>
  );
}
