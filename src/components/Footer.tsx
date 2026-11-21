import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ethos-ink text-white">
      <div className="pointer-events-none absolute -right-40 -bottom-56 h-[34rem] w-[34rem] rounded-full border-[56px] border-white/[0.04]" />
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Llevamos medicamentos, productos para la salud de los laboratorios más reconocidos del país a
              droguerías, clínicas, instituciones, con cumplimiento, calidez.
            </p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-white/40">Navegación</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-white/80 hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contacto#hazte-cliente" className="text-white/80 hover:text-white">
                  Hazte cliente
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-white/40">Contacto</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>{site.phone}</li>
              <li>{site.email}</li>
              <li>{site.address}</li>
              <li className="text-white/50">{site.hours}</li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-white/40">Legal</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/legal/privacidad" className="text-white/80 hover:text-white">
                  Tratamiento de datos
                </Link>
              </li>
              <li>
                <Link href="/legal/terminos" className="text-white/80 hover:text-white">
                  Términos de uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 Ethos. Todos los derechos reservados.</p>
          <p>Portafolio sujeto a disponibilidad. La información no reemplaza la consulta con un profesional de la salud.</p>
        </div>
      </div>
    </footer>
  );
}
