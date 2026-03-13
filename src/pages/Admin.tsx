import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Clock, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import logoEuTeDisse from '@/assets/logo-eu-te-disse.png';

interface ProfileRow {
  id: string;
  user_id: string;
  full_name: string;
  cpf: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/', { replace: true });
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchProfiles();
  }, [isAdmin]);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setProfiles(data as ProfileRow[]);
    setLoading(false);
  };

  const updateStatus = async (profileId: string, status: 'approved' | 'rejected') => {
    setUpdating(profileId);
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', profileId);

    if (error) {
      toast({ title: 'Erro', description: 'Não foi possível atualizar o status.', variant: 'destructive' });
    } else {
      toast({ title: 'Sucesso', description: `Usuário ${status === 'approved' ? 'aprovado' : 'rejeitado'}.` });
      setProfiles(prev => prev.map(p => p.id === profileId ? { ...p, status } : p));
    }
    setUpdating(null);
  };

  const pending = profiles.filter(p => p.status === 'pending');
  const approved = profiles.filter(p => p.status === 'approved');
  const rejected = profiles.filter(p => p.status === 'rejected');

  const formatCpf = (cpf: string) =>
    cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  const statusBadge = (status: string) => {
    const map: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pendente', className: 'bg-warning/15 text-warning border-warning/30' },
      approved: { label: 'Aprovado', className: 'bg-success/15 text-success border-success/30' },
      rejected: { label: 'Rejeitado', className: 'bg-destructive/15 text-destructive border-destructive/30' },
    };
    const s = map[status] || map.pending;
    return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${s.className}`}>{s.label}</span>;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <ArrowLeft size={20} />
            </Button>
            <img src={logoEuTeDisse} alt="Eu te disse" className="h-10" />
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Shield size={18} />
            <span className="text-sm font-semibold">Admin</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-6">Gerenciar Cadastros</h1>

        {/* Pending */}
        {pending.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock size={18} className="text-warning" /> Pendentes ({pending.length})
            </h2>
            <div className="space-y-3">
              {pending.map(p => (
                <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{p.full_name}</p>
                    <p className="text-sm text-muted-foreground">CPF: {formatCpf(p.cpf)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="sim"
                      size="sm"
                      disabled={updating === p.id}
                      onClick={() => updateStatus(p.id, 'approved')}
                    >
                      <CheckCircle size={16} /> Aprovar
                    </Button>
                    <Button
                      variant="nao"
                      size="sm"
                      disabled={updating === p.id}
                      onClick={() => updateStatus(p.id, 'rejected')}
                    >
                      <XCircle size={16} /> Rejeitar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Approved */}
        <section className="mb-8">
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle size={18} className="text-success" /> Aprovados ({approved.length})
          </h2>
          <div className="space-y-2">
            {approved.map(p => (
              <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">{p.full_name}</p>
                  <p className="text-sm text-muted-foreground">CPF: {formatCpf(p.cpf)}</p>
                </div>
                {statusBadge(p.status)}
              </div>
            ))}
            {approved.length === 0 && <p className="text-sm text-muted-foreground">Nenhum usuário aprovado.</p>}
          </div>
        </section>

        {/* Rejected */}
        {rejected.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
              <XCircle size={18} className="text-destructive" /> Rejeitados ({rejected.length})
            </h2>
            <div className="space-y-2">
              {rejected.map(p => (
                <div key={p.id} className="rounded-xl border border-border bg-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-foreground">{p.full_name}</p>
                    <p className="text-sm text-muted-foreground">CPF: {formatCpf(p.cpf)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {statusBadge(p.status)}
                    <Button
                      variant="sim"
                      size="sm"
                      disabled={updating === p.id}
                      onClick={() => updateStatus(p.id, 'approved')}
                    >
                      Aprovar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Admin;
