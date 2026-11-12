import Image from "next/image";
import Link from "next/link";

import { HeaderNav } from "@/components/header-nav";

export function SiteHeader() {
  return (
    <header className="relative z-40">
      <div className="relative overflow-hidden border-b-[5px] border-ink bg-red text-paper">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute -top-40 left-[8%] size-[30rem] rounded-full border border-ink/15" />
          <span className="absolute -right-32 top-1/2 size-[26rem] -translate-y-1/2 rounded-full border border-paper/15" />
          <span className="absolute -bottom-20 left-1/2 h-px w-[150%] -translate-x-1/2 -rotate-6 bg-paper/10" />
        </div>

        <div className="shell relative flex flex-col items-center pt-6 md:pt-7">
          <Link
            href="/"
            aria-label="Ir para a página inicial da CDMJJ"
            className="group inline-flex shrink-0"
          >
            <Image
              src="/logo-cdmjj-white.png"
              alt="Logo da Comissão de Direitos das Mulheres no Jiu-Jitsu"
              width={1064}
              height={1011}
              priority
              className="h-[102px] w-auto transition-transform duration-300 group-hover:scale-[1.02] md:h-[128px]"
            />
          </Link>

          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
