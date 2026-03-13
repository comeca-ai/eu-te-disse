import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import { useTheme } from '@/hooks/use-theme';
import { Sun, Moon, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';

const AppLayout: React.FC = () => {
  const { mode, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <div className="pb-20">
        <Outlet />
      </div>

      {/* Theme toggle - floating */}
      <div className="fixed top-3 right-3 z-50 flex items-center gap-0.5 p-0.5 rounded-full bg-card border border-border shadow-lg">
        <button
          onClick={() => setTheme('light')}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all",
            mode === 'light' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
          title="Tema claro"
        >
          <Sun size={14} />
        </button>
        <button
          onClick={() => setTheme('auto')}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all",
            mode === 'auto' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
          title="Automático (dia/noite)"
        >
          <Monitor size={14} />
        </button>
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            "w-7 h-7 rounded-full flex items-center justify-center transition-all",
            mode === 'dark' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
          title="Tema escuro"
        >
          <Moon size={14} />
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default AppLayout;