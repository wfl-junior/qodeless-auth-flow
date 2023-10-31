"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "~/components/Button";
import { FormControl } from "~/components/FormControl";
import { Input } from "~/components/Input";
import { OAuthButton } from "~/components/OAuthButton";
import { PasswordInput } from "~/components/PasswordInput";
import { GitHubIcon } from "~/components/icons/GitHubIcon";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { api } from "~/lib/axios";
import { GOOGLE_AUTH_REDIRECT_URL } from "~/utils/constants";
import { LoginFormInput, loginValidationSchema } from "~/validation/login";

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps): JSX.Element | null {
  const router = useRouter();
  const [isRedirecting, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = handleSubmit(async values => {
    try {
      await api.post("/auth/login", values);
      startTransition(() => {
        router.refresh();
        router.push("/");
      });
    } catch (error) {
      let errorMessage = "Não foi possível entrar";

      if (error instanceof AxiosError && error.response?.status === 400) {
        errorMessage = "Credenciais inválidas";
      }

      toast.error(errorMessage);
    }
  });

  return (
    <form onSubmit={handleLogin} className="flex flex-col w-full max-w-[400px]">
      <div className="flex flex-col gap-5">
        <FormControl errorMessage={errors.email?.message}>
          <Input placeholder="E-mail" {...register("email")} />
        </FormControl>

        <FormControl errorMessage={errors.password?.message}>
          <PasswordInput placeholder="Senha" {...register("password")} />
        </FormControl>
      </div>

      <a
        href="#"
        className="text-app-gray-300 text-sm font-normal self-end mt-6 hover:text-app-gray-400 transition-colors dark:hover:text-app-gray-200"
      >
        Esqueci a senha
      </a>

      <Button
        type="submit"
        className="mt-16"
        isLoading={isSubmitting || isRedirecting}
      >
        Entrar
      </Button>

      <div className="flex items-center justify-center relative before:absolute before:h-px before:inset-x-0 before:top-1/2 before:-z-10 before:bg-app-gray-300 my-16">
        <span className="px-4.5 bg-app-gray-50 dark:bg-app-blue-900 transition-colors">
          Ou continue com
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <OAuthButton
          href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}`}
        >
          <GoogleIcon />
          <span>Google</span>
        </OAuthButton>

        <OAuthButton
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
        >
          <GitHubIcon />
          <span>GitHub</span>
        </OAuthButton>
      </div>
    </form>
  );
}
