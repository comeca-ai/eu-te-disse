"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app:error]", error);
  }, [error]);

  return (
    <div className="page empty">
      <div className="em">⚠️</div>
      <h3>Algo deu errado</h3>
      <div style={{ marginBottom: 16, color: "var(--text-2)", fontSize: 13 }}>
        {error.message || "Erro desconhecido"}
      </div>
      <button className="btn btn-primary" onClick={() => reset()}>
        Tentar novamente
      </button>
    </div>
  );
}
