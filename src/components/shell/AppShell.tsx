"use client";

import { useState } from "react";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { TabBar } from "./TabBar";
import { Drawer } from "./Drawer";
import { AuthModal } from "@/components/auth/AuthModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="app" data-nav="sidebar">
      <Topbar onMenuClick={() => setDrawerOpen(true)} onSignIn={() => setAuthOpen(true)} />
      <Sidebar />
      <main className="main">{children}</main>
      <TabBar />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
