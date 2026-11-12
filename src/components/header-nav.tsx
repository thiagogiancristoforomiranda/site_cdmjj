"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { InstagramIcon } from "@/components/instagram-icon";
import { siteConfig, siteNav } from "@/lib/site";

export function HeaderNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isDenuncia = pathname === "/denuncia";

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="hidden w-full items-center justify-center gap-7 border-t border-paper/25 py-1 md:flex"
      >
        {siteNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="link-line py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper/85 transition-colors hover:text-paper"
          >
            {item.label}
          </Link>
        ))}

        <Link
          href="/denuncia"
          aria-current={isDenuncia ? "page" : undefined}
          className="group ml-2 inline-flex items-center gap-2 bg-ink px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Fazer denúncia
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>

        <a
          href={siteConfig.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram da CDMJJ"
          className="ml-1 text-paper/70 transition-colors hover:text-paper"
        >
          <InstagramIcon className="size-4" />
        </a>
      </nav>

      <div className="mt-4 grid w-full grid-cols-2 border-t border-paper/25 md:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((current) => !current)}
          className="flex min-h-12 items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-black/10"
        >
          {open ? (
            <X aria-hidden="true" className="size-4" />
          ) : (
            <Menu aria-hidden="true" className="size-4" />
          )}
          {open ? "Fechar" : "Menu"}
        </button>

        <Link
          href="/denuncia"
          aria-current={isDenuncia ? "page" : undefined}
          onClick={() => setOpen(false)}
          className="flex min-h-12 items-center justify-center gap-2 bg-ink text-[11px] font-bold uppercase tracking-[0.16em] text-paper transition-colors hover:bg-ink-soft"
        >
          Denunciar
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="w-full border-t border-paper/15 bg-ink text-paper md:hidden"
      >
        <nav aria-label="Navegação móvel" className="px-1 py-3">
          {siteNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-4 border-b border-paper/10 px-4 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-paper/85 transition-colors last:border-0 hover:text-paper"
            >
              <span className="font-display text-xs text-red" aria-hidden="true">
                0{index + 1}
              </span>
              {item.label}
            </Link>
          ))}
          <Link
            href="/denuncia"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-between bg-red px-4 py-4 text-sm font-bold uppercase tracking-[0.12em] text-paper"
          >
            Fazer uma denúncia
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center gap-3 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-paper/70 transition-colors hover:text-paper"
          >
            <InstagramIcon className="size-4 text-red" />
            @cdmjj no Instagram
          </a>
        </nav>
      </div>
    </>
  );
}
