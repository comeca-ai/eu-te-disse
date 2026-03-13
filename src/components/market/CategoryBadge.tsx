import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ icon, label, active, onClick, size = 'md' }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-all duration-200 whitespace-nowrap font-medium",
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-2 text-sm',
        active
          ? 'bg-primary/15 border-primary/40 text-primary'
          : 'bg-surface border-border text-muted-foreground hover:bg-surface-hover hover:text-foreground'
      )}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default CategoryBadge;
