import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/shell/AppShell";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "eutedisse — Mercados de previsão do Brasil",
  description:
    "O primeiro site brasileiro de mercados de previsão. Aposte no que vai acontecer na economia, política, esportes e cultura pop.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000")
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" data-theme="dark" data-density="compact">
      <body>
        <AuthProvider>
          <ToastProvider>
            <AppShell>{children}</AppShell>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
