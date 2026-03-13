import React, { useState, useEffect } from 'react';
import { Target, Clock } from 'lucide-react';
import MissionCard from '@/components/gamification/MissionCard';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface MissionData {
  id: string;
  title: string;
  description: string;
  xp: number;
  total: number;
  type: 'daily' | 'weekly' | 'special';
  icon: string;
  status: string;
  expires_at: string;
  progress: number;
  completed: boolean;
}

const Missions = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState<'daily' | 'weekly' | 'special'>('daily');
  const [missions, setMissions] = useState<MissionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchMissions = async () => {
      setLoading(true);
      // Fetch active missions
      const { data: missionRows } = await supabase
        .from('missions')
        .select('*')
        .eq('status', 'active')
        .order('expires_at', { ascending: true });

      // Fetch user progress
      const { data: progressRows } = await supabase
        .from('user_missions')
        .select('*')
        .eq('user_id', user.id);

      const progressMap = new Map(
        (progressRows || []).map((p: any) => [p.mission_id, p])
      );

      const merged: MissionData[] = (missionRows || []).map((m: any) => {
        const p = progressMap.get(m.id);
        return {
          ...m,
          progress: p?.progress ?? 0,
          completed: p?.completed ?? false,
        };
      });

      setMissions(merged);
      setLoading(false);
    };
    fetchMissions();
  }, [user]);

  const filtered = missions.filter(m => m.type === tab);
  const totalXP = missions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);
  const completedCount = missions.filter(m => m.completed).length;
  const dailyTotal = missions.filter(m => m.type === 'daily').length;

  const formatTimeLeft = (expiresAt: string) => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return 'Expirado';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ${hours % 24}h`;
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-3xl mx-auto">
          <h1 className="font-heading font-bold text-lg text-foreground">🎯 Desafios</h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 border border-gold/20">
            <span className="text-xs font-bold text-gold">+{totalXP} XP ganhos</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Summary */}
        <div className="rounded-xl gradient-hero border border-border p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
              <Target size={24} className="text-gold-foreground" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-foreground">Progresso do dia</h2>
              <p className="text-sm text-muted-foreground">
                {completedCount}/{dailyTotal || 0} desafios diários
              </p>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full bg-surface overflow-hidden">
            <div
              className="h-full rounded-full gradient-gold transition-all"
              style={{ width: `${dailyTotal ? (completedCount / dailyTotal) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface rounded-lg p-0.5 mb-6">
          {(['daily', 'weekly', 'special'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all",
                tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'daily' ? '📅 Diários' : t === 'weekly' ? '📆 Semanais' : '⭐ Especiais'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground">Carregando desafios...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(mission => (
              <div key={mission.id}>
                <MissionCard mission={mission} />
                <div className="flex items-center gap-1 mt-1 ml-13 px-1">
                  <Clock size={10} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">
                    {formatTimeLeft(mission.expires_at)}
                  </span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-4xl mb-3">🎉</p>
                <p className="text-sm text-muted-foreground">Nenhum desafio nesta categoria por enquanto!</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Missions;
