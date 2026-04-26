"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/Icon";
import { useToast } from "@/components/ui/ToastProvider";

type Mode = "login" | "signup" | "forgot" | "forgot-sent";

const emailSchema = z.string().email("Informe um e-mail válido");

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, "Mínimo 6 caracteres")
});
const signupSchema = z.object({
  name: z.string().min(2, "Informe seu nome"),
  email: emailSchema,
  password: z.string().min(6, "Mínimo 6 caracteres")
});
const forgotSchema = z.object({ email: emailSchema });

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;
type ForgotValues = z.infer<typeof forgotSchema>;

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<Mode>("login");
  const [showPwd, setShowPwd] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState("");
  const [supabase] = useState(() => createClient());
  const { show } = useToast();

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema), mode: "onBlur" });
  const signupForm = useForm<SignupValues>({ resolver: zodResolver(signupSchema), mode: "onBlur" });
  const forgotForm = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema), mode: "onBlur" });

  // Reset state quando o modal abre/fecha
  useEffect(() => {
    if (!open) return;
    setMode("login");
    setShowPwd(false);
    setServerError(null);
    loginForm.reset();
    signupForm.reset();
    forgotForm.reset();
  }, [open, loginForm, signupForm, forgotForm]);

  // Esc fecha
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const goMode = (m: Mode) => {
    setMode(m);
    setServerError(null);
    setShowPwd(false);
  };

  const onLogin = async (v: LoginValues) => {
    setServerError(null);
    const { error } = await supabase.auth.signInWithPassword(v);
    if (error) return setServerError(translateError(error.message));
    show("Bem-vindo de volta!");
    onClose();
  };

  const onSignup = async (v: SignupValues) => {
    setServerError(null);
    const { error } = await supabase.auth.signUp({
      email: v.email,
      password: v.password,
      options: { data: { name: v.name } }
    });
    if (error) return setServerError(translateError(error.message));
    show("Conta criada — confira seu e-mail");
    onClose();
  };

  const onForgot = async (v: ForgotValues) => {
    setServerError(null);
    const redirectTo = `${typeof window !== "undefined" ? window.location.origin : ""}/auth/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(v.email, { redirectTo });
    if (error) return setServerError(translateError(error.message));
    setSentEmail(v.email);
    setMode("forgot-sent");
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="auth-head">
          <div className="brand">
            <div className="brand-mark">é</div>
            <span>eutedisse</span>
          </div>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={18} />
          </button>
        </div>

        {(mode === "login" || mode === "signup") && (
          <div className="auth-tabs" role="tablist">
            <button
              className="auth-tab"
              role="tab"
              data-active={mode === "login"}
              onClick={() => goMode("login")}
            >
              Entrar
            </button>
            <button
              className="auth-tab"
              role="tab"
              data-active={mode === "signup"}
              onClick={() => goMode("signup")}
            >
              Criar conta
            </button>
          </div>
        )}

        {mode === "login" && (
          <form className="auth-body" onSubmit={loginForm.handleSubmit(onLogin)} noValidate>
            <div className="auth-title">
              <h2>Bem-vindo de volta</h2>
              <p>Entre para apostar nos mercados que você acompanha.</p>
            </div>

            <Field
              label="E-mail"
              error={loginForm.formState.errors.email?.message}
            >
              <input
                type="email"
                autoComplete="email"
                className="field-input"
                placeholder="voce@email.com"
                {...loginForm.register("email")}
              />
            </Field>

            <Field
              label="Senha"
              error={loginForm.formState.errors.password?.message}
              right={
                <button
                  type="button"
                  className="auth-link"
                  onClick={() => goMode("forgot")}
                  tabIndex={-1}
                >
                  Esqueci a senha
                </button>
              }
            >
              <PasswordInput
                show={showPwd}
                onToggle={() => setShowPwd((v) => !v)}
                autoComplete="current-password"
                {...loginForm.register("password")}
              />
            </Field>

            {serverError && <ServerError msg={serverError} />}

            <SubmitButton loading={loginForm.formState.isSubmitting} label="Entrar" />

            <div className="auth-foot">
              Primeira vez? <a onClick={() => goMode("signup")}>Criar uma conta</a>
            </div>
          </form>
        )}

        {mode === "signup" && (
          <form className="auth-body" onSubmit={signupForm.handleSubmit(onSignup)} noValidate>
            <div className="auth-title">
              <h2>Crie sua conta</h2>
              <p>R$ 1.000 de créditos de boas-vindas para você apostar.</p>
            </div>

            <Field label="Nome" error={signupForm.formState.errors.name?.message}>
              <input
                type="text"
                autoComplete="name"
                className="field-input"
                placeholder="Como você quer ser chamado"
                {...signupForm.register("name")}
              />
            </Field>

            <Field label="E-mail" error={signupForm.formState.errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                className="field-input"
                placeholder="voce@email.com"
                {...signupForm.register("email")}
              />
            </Field>

            <Field label="Senha" error={signupForm.formState.errors.password?.message}>
              <PasswordInput
                show={showPwd}
                onToggle={() => setShowPwd((v) => !v)}
                autoComplete="new-password"
                {...signupForm.register("password")}
              />
            </Field>

            {serverError && <ServerError msg={serverError} />}

            <SubmitButton loading={signupForm.formState.isSubmitting} label="Criar conta" />

            <div className="auth-foot">
              Já tem conta? <a onClick={() => goMode("login")}>Entrar</a>
            </div>
            <div className="auth-fineprint">
              Ao continuar, você concorda com os <a>Termos</a> e a <a>Política de Privacidade</a>.
            </div>
          </form>
        )}

        {mode === "forgot" && (
          <form className="auth-body" onSubmit={forgotForm.handleSubmit(onForgot)} noValidate>
            <button
              type="button"
              className="auth-back"
              onClick={() => goMode("login")}
              aria-label="Voltar"
            >
              <Icon name="chevron" size={14} className="rot-180" /> Voltar
            </button>

            <div className="auth-title">
              <h2>Recuperar senha</h2>
              <p>Vamos te enviar um link para redefinir sua senha.</p>
            </div>

            <Field label="E-mail da conta" error={forgotForm.formState.errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                className="field-input"
                placeholder="voce@email.com"
                autoFocus
                {...forgotForm.register("email")}
              />
            </Field>

            {serverError && <ServerError msg={serverError} />}

            <SubmitButton
              loading={forgotForm.formState.isSubmitting}
              label="Enviar link de recuperação"
            />
          </form>
        )}

        {mode === "forgot-sent" && (
          <div className="auth-body">
            <div className="auth-success">
              <div className="auth-success-ico">
                <Icon name="check" size={26} stroke={2.4} />
              </div>
              <h2>Verifique seu e-mail</h2>
              <p>
                Enviamos um link para <strong>{sentEmail}</strong>. Clique no link para
                criar uma nova senha. Pode levar alguns minutos.
              </p>
              <button
                type="button"
                className="btn btn-primary btn-block btn-lg"
                onClick={() => goMode("login")}
              >
                Voltar para entrar
              </button>
              <button
                type="button"
                className="auth-link auth-link-block"
                onClick={() => goMode("forgot")}
              >
                Não recebeu? Tentar outro e-mail
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Helper components ---------------- */

function Field({
  label,
  error,
  right,
  children
}: {
  label: string;
  error?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <div className="field-label-row">
        <span>{label}</span>
        {right}
      </div>
      {children}
      {error && (
        <small className="field-error">
          <Icon name="info" size={11} stroke={2} /> {error}
        </small>
      )}
    </label>
  );
}

const PasswordInput = ({
  show,
  onToggle,
  ...rest
}: { show: boolean; onToggle: () => void } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div className="pwd-wrap">
    <input
      type={show ? "text" : "password"}
      className="field-input"
      placeholder="••••••••"
      {...rest}
    />
    <button
      type="button"
      className="pwd-toggle"
      onClick={onToggle}
      aria-label={show ? "Ocultar senha" : "Mostrar senha"}
      tabIndex={-1}
    >
      <Icon name="eye" size={16} />
    </button>
  </div>
);

function ServerError({ msg }: { msg: string }) {
  return (
    <div className="auth-error" role="alert">
      <Icon name="info" size={13} stroke={2.2} />
      {msg}
    </div>
  );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block btn-lg btn-press"
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? <span className="spinner" aria-hidden /> : label}
    </button>
  );
}

function translateError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
  if (m.includes("user already registered")) return "Esse e-mail já tem conta. Tenta entrar.";
  if (m.includes("password should be at least")) return "Senha precisa ter pelo menos 6 caracteres.";
  if (m.includes("rate limit")) return "Muitas tentativas. Espera um minuto e tenta de novo.";
  return msg;
}
