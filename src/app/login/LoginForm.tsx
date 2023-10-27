"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/Button";
import { ErrorMessage } from "~/components/ErrorMessage";
import { Input } from "~/components/Input";
import { OAuthButton } from "~/components/OAuthButton";
import { PasswordInput } from "~/components/PasswordInput";
import { GitHubIcon } from "~/components/icons/GitHubIcon";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { LoginFormInput, loginValidationSchema } from "~/validation/login";

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps): JSX.Element | null {
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
    console.log(values);
  });

  return (
    <form onSubmit={handleLogin} className="flex flex-col w-full max-w-[400px]">
      <div className="flex flex-col gap-1.5 mb-5">
        <Input placeholder="E-mail" {...register("email")} />
        <ErrorMessage message={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-1.5">
        <PasswordInput placeholder="Senha" {...register("password")} />
        <ErrorMessage message={errors.password?.message} />
      </div>

      <a
        href="#"
        className="text-app-gray-300 text-sm font-normal self-end mt-6 hover:text-app-gray-400 transition-colors dark:hover:text-app-gray-200"
      >
        Esqueci a senha
      </a>

      <Button type="submit" className="mt-16" isLoading={isSubmitting}>
        Entrar
      </Button>

      <div className="flex items-center justify-center relative before:absolute before:h-px before:inset-x-0 before:top-1/2 before:-z-10 before:bg-app-gray-300 my-16">
        <span className="px-4.5 bg-app-gray-50 dark:bg-app-blue-900 transition-colors">
          Ou continue com
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <OAuthButton href="#">
          <GoogleIcon />
          <span>Google</span>
        </OAuthButton>

        <OAuthButton href="#">
          <GitHubIcon />
          <span>GitHub</span>
        </OAuthButton>
      </div>
    </form>
  );
}
