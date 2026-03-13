import React from 'react';
import { Zap } from 'lucide-react';

interface XPWidgetProps {
  level: number;
  xp: number;
  xpToNext: number;
  compact?: boolean;
}

const XPWidget: React.FC<XPWidgetProps> = ({ level, xp, xpToNext, compact }) => {
  const progress = (xp / xpToNext) * 100;

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
        <Zap size={14} className="text-primary" />
        <span className="text-xs font-bold text-primary">Lv.{level}</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Zap size={18} className="text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nível</p>
            <p className="text-lg font-bold font-heading text-foreground">Nível {level}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">{xp}/{xpToNext} XP</span>
      </div>
      <div className="w-full h-2 rounded-full bg-surface overflow-hidden">
        <div
          className="h-full rounded-full gradient-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default XPWidget;
