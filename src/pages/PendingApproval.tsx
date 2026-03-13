import React from 'react';
import { Clock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import logoEuTeDisse from '@/assets/logo-eu-te-disse.png';

const PendingApproval = () => {
  const { signOut, profile } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <img src={logoEuTeDisse} alt="Eu te disse" className="h-20 mx-auto mb-6" />
        
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-8 mb-6">
          <Clock size={48} className="text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Aguardando aprovação
          </h1>
          <p className="text-muted-foreground text-sm">
            Seu cadastro foi recebido e está sendo analisado. Você será notificado assim que sua conta for aprovada.
          </p>
          {profile?.status === 'rejected' && (
            <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-destructive text-sm font-medium">
                Seu cadastro foi recusado. Entre em contato com o suporte.
              </p>
            </div>
          )}
        </div>

        <Button variant="ghost" onClick={signOut} className="gap-2">
          <LogOut size={16} />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default PendingApproval;
