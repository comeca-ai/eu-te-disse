"use client";

import { useState } from "react";
import type { MarketDetail } from "@/lib/types";

const ACTIVITY = [
  { who: "M.S.", act: "comprou", side: "yes", val: "150 cotas a 38¢", t: "2m" },
  { who: "J.P.", act: "comprou", side: "no", val: "80 cotas a 62¢", t: "4m" },
  { who: "A.R.", act: "vendeu", side: "yes", val: "200 cotas a 39¢", t: "8m" },
  { who: "L.M.", act: "comprou", side: "yes", val: "1.000 cotas a 38¢", t: "12m" },
  { who: "D.C.", act: "comprou", side: "no", val: "50 cotas a 61¢", t: "18m" },
  { who: "F.B.", act: "comprou", side: "yes", val: "300 cotas a 37¢", t: "25m" }
];

const DEFAULT_RULES = [
  "Resolução baseada em fonte oficial.",
  "Em caso de empate ou ambiguidade, o mercado pode ser estendido.",
  "Disputas são resolvidas pelo comitê de oráculos."
];

export function MarketTabs({ detail }: { detail?: MarketDetail }) {
  const [tab, setTab] = useState<"about" | "activity" | "comments" | "rules">("about");

  return (
    <div className="detail-card">
      <div className="subtabs">
        {(["about", "activity", "comments", "rules"] as const).map((t) => (
          <div
            key={t}
            className="subtab"
            data-active={tab === t}
            onClick={() => setTab(t)}
          >
            {t === "about" && "Sobre"}
            {t === "activity" && (
              <>
                Atividade <span className="count">147</span>
              </>
            )}
            {t === "comments" && (
              <>
                Comentários <span className="count">38</span>
              </>
            )}
            {t === "rules" && "Regras"}
          </div>
        ))}
      </div>

      {tab === "about" && (
        <div style={{ color: "var(--text-1)", fontSize: 14, lineHeight: 1.6 }}>
          {detail?.description ||
            "Esse mercado resolve com base no resultado oficial divulgado pela autoridade competente. Sim resolve em 100¢ caso o evento ocorra; Não resolve em 0¢ caso contrário."}
        </div>
      )}
      {tab === "activity" && (
        <div className="activity-list">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="activity-row">
              <div className="activity-avatar">{a.who.split(".")[0]}</div>
              <div className="activity-text">
                <strong>{a.who}</strong> {a.act}{" "}
                <span className={a.side}>{a.side === "yes" ? "Sim" : "Não"}</span> · {a.val}
              </div>
              <div className="activity-time">{a.t}</div>
            </div>
          ))}
        </div>
      )}
      {tab === "comments" && (
        <div className="empty">
          <div className="em">💬</div>
          <h3>Comentários em breve</h3>
          <div>Discussão entre apostadores chegando em breve.</div>
        </div>
      )}
      {tab === "rules" && (
        <ul
          style={{ color: "var(--text-1)", fontSize: 14, lineHeight: 1.7, paddingLeft: 18, margin: 0 }}
        >
          {(detail?.rules || DEFAULT_RULES).map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
