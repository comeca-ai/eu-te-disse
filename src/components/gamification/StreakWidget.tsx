import React from 'react';
import { Flame } from 'lucide-react';

interface StreakWidgetProps {
  streak: number;
  compact?: boolean;
}

const StreakWidget: React.FC<StreakWidgetProps> = ({ streak, compact }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 border border-warning/20">
        <Flame size={14} className="text-warning" />
        <span className="text-xs font-bold text-warning">{streak}</span>
      </div>
    );
  }

  const days = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-gold flex items-center justify-center">
            <Flame size={18} className="text-gold-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Sua sequência</p>
            <p className="text-lg font-bold font-heading text-foreground">{streak} dias 🔥</p>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5">
        {days.map((day, i) => (
          <div
            key={i}
            className={`flex-1 flex flex-col items-center gap-1 py-1.5 rounded-lg text-[10px] font-medium ${
              i < streak % 7
                ? 'bg-warning/15 text-warning'
                : i === streak % 7
                ? 'bg-warning/5 text-warning/50 border border-dashed border-warning/30'
                : 'bg-surface text-muted-foreground'
            }`}
          >
            <span>{day}</span>
            {i < streak % 7 && <span>✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreakWidget;
