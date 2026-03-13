import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, TrendingUp, TrendingDown, Clock, Users } from 'lucide-react';
import MiniSparkline from './MiniSparkline';
import type { Market } from '@/data/mockData';
import { formatVolume } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface MarketCardProps {
  market: Market;
  compact?: boolean;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, compact }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isPositive = market.change24h >= 0;

  const handleClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/mercado/${market.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:bg-card-hover hover:border-primary/20 group",
        compact ? "min-w-[280px]" : ""
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-sm">{market.categoryIcon}</span>
            <span className="text-xs font-medium text-muted-foreground capitalize">{market.category}</span>
            {market.hot && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-destructive/15 text-destructive">
                🔥 HOT
              </span>
            )}
            {market.resolvingToday && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-warning/15 text-warning">
                ⏰ HOJE
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {market.question}
          </h3>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold font-heading text-foreground">{market.probability}%</div>
          <div className={cn(
            "flex items-center gap-0.5 text-xs font-semibold justify-end",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? '+' : ''}{market.change24h}%
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {formatVolume(market.volume)}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={12} />
            {market.comments}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {market.deadline}
          </span>
        </div>
        <MiniSparkline data={market.sparkline} positive={isPositive} />
      </div>

      {market.source && (
        <div className="mt-2 pt-2 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            Fonte: {market.source}
          </span>
        </div>
      )}
    </button>
  );
};

export default MarketCard;
