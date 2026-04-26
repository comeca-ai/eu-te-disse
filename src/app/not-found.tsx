import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page empty">
      <div className="em">🔍</div>
      <h3>Página não encontrada</h3>
      <div style={{ marginBottom: 16 }}>O mercado ou recurso que você procura não existe.</div>
      <Link href="/" className="btn btn-primary">
        Voltar para o início
      </Link>
    </div>
  );
}
