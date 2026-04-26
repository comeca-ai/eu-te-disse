"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return <Ctx.Provider value={{ user, session, loading, signOut }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
