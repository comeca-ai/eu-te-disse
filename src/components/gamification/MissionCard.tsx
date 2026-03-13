import React from 'react';
import type { Mission } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const progress = (mission.progress / mission.total) * 100;

  return (
    <div className={cn(
      "rounded-xl border p-4 transition-all",
      mission.completed
        ? "border-success/30 bg-success/5"
        : "border-border bg-card"
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0",
          mission.completed ? "bg-success/15" : "bg-surface"
        )}>
          {mission.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <h4 className={cn(
              "text-sm font-semibold",
              mission.completed ? "text-success" : "text-foreground"
            )}>
              {mission.title}
            </h4>
            <span className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              mission.completed ? "bg-success/15 text-success" : "bg-gold/10 text-gold"
            )}>
              +{mission.xp} XP
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{mission.description}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full transition-all duration-500",
                  mission.completed ? "bg-success" : "gradient-primary"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">
              {mission.progress}/{mission.total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionCard;
