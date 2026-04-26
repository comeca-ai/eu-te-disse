"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/Icon";
import { useToast } from "@/components/ui/ToastProvider";

const schema = z
  .object({
    password: z.string().min(8, "Mínimo 8 caracteres"),
    confirm: z.string()
  })
  .refine((d) => d.password === d.confirm, {
    message: "As senhas não conferem",
    path: ["confirm"]
  });

type Values = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { show } = useToast();
  const [supabase] = useState(() => createClient());
  const [showPwd, setShowPwd] = useState(false);
  const [ready, setReady] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<Values>({ resolver: zodResolver(schema), mode: "onBlur" });

  // Garante que o usuário chegou aqui via link de recovery (Supabase já trocou o code por session)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setReady(Boolean(data.session));
    });
  }, [supabase]);

  const onSubmit = async ({ password }: Values) => {
    setServerError(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setServerError(error.message);
    show("Senha atualizada");
    router.push("/");
  };

  return (
    <div className="page reset-page">
      <div className="reset-card">
        <div className="brand" style={{ marginBottom: 20 }}>
          <div className="brand-mark">é</div>
          <span>eutedisse</span>
        </div>

        {!ready ? (
          <div className="auth-success">
            <div className="auth-success-ico" data-warn>
              <Icon name="info" size={26} stroke={2.2} />
            </div>
            <h2>Link inválido ou expirado</h2>
            <p>
              Esse link de recuperação não está ativo. Volte para a tela de entrada e peça
              um novo link.
            </p>
            <button className="btn btn-primary btn-block btn-lg" onClick={() => router.push("/")}>
              Voltar para o início
            </button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="auth-title">
              <h2>Defina uma nova senha</h2>
              <p>Use pelo menos 8 caracteres. Combinar letras e números deixa mais seguro.</p>
            </div>

            <label className="field">
              <div className="field-label-row">
                <span>Nova senha</span>
              </div>
              <div className="pwd-wrap">
                <input
                  type={showPwd ? "text" : "password"}
                  className="field-input"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  autoFocus
                  {...form.register("password")}
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  onClick={() => setShowPwd((v) => !v)}
                  aria-label={showPwd ? "Ocultar senha" : "Mostrar senha"}
                  tabIndex={-1}
                >
                  <Icon name="eye" size={16} />
                </button>
              </div>
              {form.formState.errors.password && (
                <small className="field-error">
                  <Icon name="info" size={11} stroke={2} />{" "}
                  {form.formState.errors.password.message}
                </small>
              )}
            </label>

            <label className="field">
              <div className="field-label-row">
                <span>Confirme a nova senha</span>
              </div>
              <input
                type={showPwd ? "text" : "password"}
                className="field-input"
                placeholder="••••••••"
                {...form.register("confirm")}
              />
              {form.formState.errors.confirm && (
                <small className="field-error">
                  <Icon name="info" size={11} stroke={2} />{" "}
                  {form.formState.errors.confirm.message}
                </small>
              )}
            </label>

            {serverError && (
              <div className="auth-error" role="alert">
                <Icon name="info" size={13} stroke={2.2} />
                {serverError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg btn-press"
              disabled={form.formState.isSubmitting}
              aria-busy={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <span className="spinner" aria-hidden /> : "Salvar nova senha"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
