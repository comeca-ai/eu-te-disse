import Link from "next/link";
import { Icon } from "./Icon";

export interface Crumb {
  label: string;
  href?: string;
}

export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="crumbs">
      {items.map((it, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && (
            <span className="sep">
              <Icon name="chevron" size={12} />
            </span>
          )}
          {it.href ? (
            <Link href={it.href}>{it.label}</Link>
          ) : (
            <span className="current">{it.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
