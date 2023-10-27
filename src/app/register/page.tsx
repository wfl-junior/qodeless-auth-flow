import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import illustration from "~/assets/illustration.png";
import { BlurBackground } from "~/components/BlurBackground";
import { RegisterForm } from "./RegisterForm";

export const metadata: Metadata = {
  title: "Register",
};

interface RegisterProps {}

function Register({}: RegisterProps): JSX.Element | null {
  return (
    <main className="flex gap-5 justify-between flex-1 items-center mx-auto w-full max-w-[1522px]">
      <div className="flex flex-col 2xl:flex-row items-center gap-6">
        <div className="relative isolate min-h-[281px] flex flex-col gap-[4.5rem]">
          <BlurBackground />
          <h1 className="font-semibold text-6xl">
            Cadastre-se no <br /> Recharge Direct
          </h1>

          <p className="text-2xl font-medium">
            se já tiver uma conta,
            <br /> você pode{" "}
            <Link href="/register" className="font-semibold text-app-blue-500">
              Entrar aqui!
            </Link>
          </p>
        </div>

        <Image
          alt=""
          priority
          width={545}
          height={449}
          quality={100}
          src={illustration}
        />
      </div>

      <RegisterForm />
    </main>
  );
}

export default Register;
