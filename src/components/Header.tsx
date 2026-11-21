"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { QuoteButton } from "./QuoteList";
import { nav, site, whatsappLink } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-line/80 bg-white/85 backdrop-blur-md" : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Ethos, inicio">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active ? "text-ethos" : "text-ethos-ink/60 hover:text-ethos"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-mist"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <QuoteButton />
          <a
            href={whatsappLink("Hola Ethos, quiero más información.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-ethos px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-md shadow-ethos/25 transition hover:-translate-y-0.5 hover:bg-ethos-deep lg:flex"
          >
            <MessageCircle className="h-4 w-4" /> <span className="xl:hidden">Asesor</span>
            <span className="hidden xl:inline">Hablar con un asesor</span>
          </a>
          <button
            className="rounded-full p-2 text-ethos md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line bg-white md:hidden"
          >
            <ul className="px-4 py-4">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-4 text-2xl font-bold text-ethos"
                  >
                    <span className="font-mono text-xs font-normal text-teal">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="px-4 pb-6 text-sm text-ethos-ink/60">{site.phone} · {site.email}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
