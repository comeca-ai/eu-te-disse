"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/components/auth/AuthProvider";
import { SearchBox } from "./SearchBox";

interface TopbarProps {
  onMenuClick: () => void;
  onSignIn: () => void;
}

export function Topbar({ onMenuClick, onSignIn }: TopbarProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="topbar">
      <button className="iconbtn show-mobile" onClick={onMenuClick} aria-label="Menu">
        <Icon name="menu" size={20} />
      </button>
      <Link href="/" className="brand">
        <div className="brand-mark">é</div>
        <span className="hide-mobile">eutedisse</span>
        <span className="brand-flag hide-mobile">BR</span>
      </Link>
      <SearchBox />
      <div className="topbar-right">
        {user ? (
          <>
            <button className="iconbtn hide-mobile" aria-label="Notificações">
              <Icon name="bell" size={18} />
              <span className="dot" />
            </button>
            <button
              className="btn btn-outline hide-mobile"
              onClick={() => router.push("/wallet")}
            >
              <Icon name="wallet" size={14} /> R$ 1.247,50
            </button>
            <div className="profile-wrap">
              <button className="iconbtn" onClick={() => setMenuOpen((v) => !v)} aria-label="Conta">
                <span className="avatar">
                  {(user.user_metadata?.name || user.email || "?").slice(0, 1).toUpperCase()}
                </span>
              </button>
              {menuOpen && (
                <div className="profile-menu" onClick={() => setMenuOpen(false)}>
                  <div className="pm-head">
                    <div className="pm-name">{user.user_metadata?.name || "Você"}</div>
                    <div className="pm-email">{user.email}</div>
                  </div>
                  <Link href="/wallet" className="pm-item">
                    <Icon name="wallet" size={14} /> Carteira
                  </Link>
                  <Link href="/watchlist" className="pm-item">
                    <Icon name="bookmark" size={14} /> Acompanhando
                  </Link>
                  <button className="pm-item" onClick={() => signOut()}>
                    <Icon name="close" size={14} /> Sair
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-ghost hide-mobile" onClick={onSignIn}>
              Entrar
            </button>
            <button className="btn btn-primary" onClick={onSignIn}>
              Criar conta
            </button>
          </>
        )}
      </div>
    </header>
  );
}
