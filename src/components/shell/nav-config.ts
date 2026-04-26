import type { IconName } from "@/components/Icon";

export interface NavItem {
  id: string;
  label: string;
  icon: IconName;
  href: string;
  count?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Descobrir",
    items: [
      { id: "home", label: "Início", icon: "home", href: "/" },
      { id: "trending", label: "Em alta", icon: "flame", href: "/trending", count: "12" },
      { id: "new", label: "Recém-criados", icon: "bolt", href: "/?sort=new" }
    ]
  },
  {
    label: "Categorias",
    items: [
      { id: "politica", label: "Política", icon: "flag", href: "/category/politica" },
      { id: "economia", label: "Economia", icon: "chart", href: "/category/economia" },
      { id: "esportes", label: "Esportes", icon: "trophy", href: "/category/esportes" },
      { id: "cultura", label: "Cultura Pop", icon: "star", href: "/category/cultura" },
      { id: "tech", label: "Tech", icon: "bolt", href: "/category/tech" },
      { id: "mundo", label: "Mundo", icon: "globe", href: "/category/mundo" }
    ]
  },
  {
    label: "Você",
    items: [
      { id: "watchlist", label: "Acompanhando", icon: "bookmark", href: "/watchlist", count: "3" },
      { id: "wallet", label: "Carteira", icon: "wallet", href: "/wallet" },
      { id: "activity", label: "Atividade", icon: "activity", href: "/wallet?tab=activity" }
    ]
  }
];
