import type { Metadata } from "next";
import Image from "next/image";
import illustration from "~/assets/illustration.png";
import { BlurBackground } from "~/components/BlurBackground";

export const metadata: Metadata = {
  title: "Home",
};

interface HomeProps {}

function Home({}: HomeProps): JSX.Element | null {
  return (
    <main className="flex gap-5 justify-between flex-1 items-center mx-auto w-full max-w-[1522px]">
      <div className="relative isolate min-h-[281px] flex items-center">
        <BlurBackground />
        <h1 className="font-semibold text-6xl">Não vou parar de cair</h1>
      </div>

      <Image
        alt=""
        priority
        width={545}
        height={449}
        quality={100}
        src={illustration}
      />
    </main>
  );
}

export default Home;
