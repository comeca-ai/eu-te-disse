"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Icon } from "@/components/Icon";
import { useToast } from "@/components/ui/ToastProvider";

const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(6, "Mínimo 6 caracteres")
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Informe seu nome")
});

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [serverError, setServerError] = useState<string | null>(null);
  const [supabase] = useState(() => createClient());
  const { show } = useToast();

  const loginForm = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const signupForm = useForm<SignupValues>({ resolver: zodResolver(signupSchema) });

  if (!open) return null;

  const onLogin = async (values: LoginValues) => {
    setServerError(null);
    const { error } = await supabase.auth.signInWithPassword(values);
    if (error) return setServerError(error.message);
    show("Bem-vindo de volta!");
    onClose();
  };

  const onSignup = async (values: SignupValues) => {
    setServerError(null);
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { name: values.name } }
    });
    if (error) return setServerError(error.message);
    show("Conta criada — verifique seu e-mail");
    onClose();
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-head">
          <div className="brand">
            <div className="brand-mark">é</div>
            <span>eutedisse</span>
          </div>
          <button className="iconbtn" onClick={onClose} aria-label="Fechar">
            <Icon name="close" size={18} />
          </button>
        </div>

        <div className="auth-tabs">
          <button
            className="auth-tab"
            data-active={mode === "login"}
            onClick={() => setMode("login")}
          >
            Entrar
          </button>
          <button
            className="auth-tab"
            data-active={mode === "signup"}
            onClick={() => setMode("signup")}
          >
            Criar conta
          </button>
        </div>

        {mode === "login" ? (
          <form className="auth-body" onSubmit={loginForm.handleSubmit(onLogin)} noValidate>
            <label className="field">
              <span>E-mail</span>
              <input type="email" autoComplete="email" {...loginForm.register("email")} />
              {loginForm.formState.errors.email && (
                <small className="field-err">{loginForm.formState.errors.email.message}</small>
              )}
            </label>
            <label className="field">
              <span>Senha</span>
              <input type="password" autoComplete="current-password" {...loginForm.register("password")} />
              {loginForm.formState.errors.password && (
                <small className="field-err">{loginForm.formState.errors.password.message}</small>
              )}
            </label>
            {serverError && <div className="auth-error">{serverError}</div>}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loginForm.formState.isSubmitting}
            >
              {loginForm.formState.isSubmitting ? "Entrando..." : "Entrar"}
            </button>
            <div className="auth-foot">
              Não tem conta?{" "}
              <a onClick={() => setMode("signup")}>Criar uma agora</a>
            </div>
          </form>
        ) : (
          <form className="auth-body" onSubmit={signupForm.handleSubmit(onSignup)} noValidate>
            <label className="field">
              <span>Nome</span>
              <input type="text" autoComplete="name" {...signupForm.register("name")} />
              {signupForm.formState.errors.name && (
                <small className="field-err">{signupForm.formState.errors.name.message}</small>
              )}
            </label>
            <label className="field">
              <span>E-mail</span>
              <input type="email" autoComplete="email" {...signupForm.register("email")} />
              {signupForm.formState.errors.email && (
                <small className="field-err">{signupForm.formState.errors.email.message}</small>
              )}
            </label>
            <label className="field">
              <span>Senha</span>
              <input type="password" autoComplete="new-password" {...signupForm.register("password")} />
              {signupForm.formState.errors.password && (
                <small className="field-err">{signupForm.formState.errors.password.message}</small>
              )}
            </label>
            {serverError && <div className="auth-error">{serverError}</div>}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={signupForm.formState.isSubmitting}
            >
              {signupForm.formState.isSubmitting ? "Criando..." : "Criar conta"}
            </button>
            <div className="auth-foot">
              Já tem conta?{" "}
              <a onClick={() => setMode("login")}>Entrar</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
