"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Icon } from "@/components/Icon";

interface Toast {
  id: number;
  msg: string;
}

interface ToastCtx {
  show: (msg: string) => void;
}

const Ctx = createContext<ToastCtx>({ show: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2400);
  }, []);

  return (
    <Ctx.Provider value={{ show }}>
      {children}
      {toasts.map((t) => (
        <div className="toast" key={t.id}>
          <span className="ico">
            <Icon name="check" size={16} stroke={2.4} />
          </span>
          {t.msg}
        </div>
      ))}
    </Ctx.Provider>
  );
}

export function useToast() {
  return useContext(Ctx);
}
