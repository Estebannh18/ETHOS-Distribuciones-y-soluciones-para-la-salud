import Link from "next/link";
import { ArrowRight, ArrowUpRight, Snowflake, ShieldCheck, Truck, Headset, MapPinned } from "lucide-react";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroCtas } from "@/components/home/HeroCtas";
import { MessageCircle } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { Reveal } from "@/components/Reveal";
import { featuredLabs, stats, categoryCounts, demoSearch } from "@/lib/catalog";
import { whatsappLink } from "@/lib/site";

const services = [
  {
    icon: Truck,
    title: "Distribución",
    text: "Despachos programados, urgentes a droguerías, clínicas, IPS, instituciones. Tu pedido sale completo, a tiempo.",
  },
  {
    icon: Snowflake,
    title: "Cadena de frío",
    text: "Biológicos, termolábiles transportados entre 2 °C y 8 °C, con monitoreo de temperatura de bodega a destino.",
  },
  {
    icon: Headset,
    title: "Asesoría comercial",
    text: "Un asesor que conoce tu negocio, te ayuda a armar el pedido, te mantiene al tanto de novedades del portafolio.",
  },
  {
    icon: MapPinned,
    title: "Cobertura",
    text: "Rutas propias, aliados logísticos: llegamos a las principales ciudades, municipios del país.",
  },
];

export default function Home() {
  const half = Math.ceil(featuredLabs.length / 2);
  const rows = [featuredLabs.slice(0, half), featuredLabs.slice(half)];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="bg-aurora absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent_85%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pt-20 lg:pb-28">
          <div>
            <Reveal>
              <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/5 px-3 py-1.5 text-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-leaf" /> Distribuidora farmacéutica · Bucaramanga
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-bold tracking-[-0.035em] text-ethos sm:text-6xl lg:text-[4.4rem]">
                La salud de tu negocio,
                <br />
                <span className="text-ring">bien distribuida.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ethos-ink/70">
                Medicamentos, productos para la salud de los laboratorios que ya conoces, entregados con
                cumplimiento, cadena de frío, un asesor que responde.
              </p>
            </Reveal>
            <Reveal delay={0.22} className="mt-8">
              <HeroCtas />
            </Reveal>
            <Reveal delay={0.28} className="mt-6 max-w-xl">
              <HeroSearch />
            </Reveal>
          </div>
          <Reveal delay={0.2} className="min-w-0">
            <HeroVisual stats={stats} scenes={["losartán", "dolex", "adalimumab"].map((t) => demoSearch(t))} />
          </Reveal>
        </div>
      </section>

      {/* LABORATORIOS */}
      <section className="border-t border-line py-24">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-end lg:px-8">
          <Reveal>
            <p className="eyebrow text-teal">01 — Laboratorios aliados</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ethos sm:text-5xl">
              Las marcas en las que confían tus clientes.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/catalogo" className="group inline-flex items-center gap-2 font-semibold text-ethos">
              Ver todo el portafolio
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          {rows.map((row, r) => (
            <div key={r} className="flex overflow-hidden">
              <ul
                className={`flex shrink-0 gap-4 pr-4 hover:[animation-play-state:paused] ${
                  r === 0 ? "animate-marquee" : "animate-marquee-rev"
                }`}
              >
                {[...row, ...row].map((lab, i) => (
                  <li key={`${lab}-${i}`} aria-hidden={i >= row.length}>
                    <Link
                      href={`/catalogo?lab=${encodeURIComponent(lab)}`}
                      tabIndex={i >= row.length ? -1 : undefined}
                      className="group flex h-20 items-center gap-3 rounded-2xl border border-line bg-white px-8 text-xl font-bold whitespace-nowrap text-ethos/70 transition hover:border-teal hover:text-ethos"
                    >
                      {lab}
                      <ArrowUpRight className="h-4 w-4 text-teal opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="bg-mist/60 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow text-teal">02 — Servicios y logística</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-ethos sm:text-5xl">
                Del laboratorio a tu mostrador, sin vueltas.
              </h2>
              <p className="mt-5 max-w-md text-lg text-ethos-ink/70">
                Nos encargamos de la parte difícil: inventario, almacenamiento, transporte, seguimiento. Tú te
                enfocas en atender.
              </p>
            </Reveal>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <li className="group grid grid-cols-[auto_1fr] gap-6 py-8 sm:grid-cols-[4rem_auto_1fr]">
                  <span className="hidden font-mono text-sm text-ethos-ink/40 sm:block">0{i + 1}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-teal shadow-sm transition group-hover:bg-teal group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-ethos">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-ethos-ink/70">{s.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CADENA DE FRÍO */}
      <section className="relative overflow-hidden bg-ethos-deep py-24 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_20%,rgb(10_114_196/0.45),transparent),radial-gradient(40%_60%_at_10%_90%,rgb(15_163_155/0.35),transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="eyebrow text-leaf-light">03 — Cadena de frío</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Lo que necesita frío, llega frío.
            </h2>
            <p className="mt-5 max-w-lg text-lg text-white/70">
              {stats.cold} referencias de biológicos, vacunas, termolábiles viajan con protocolos de embalaje
              validados, registro de temperatura durante todo el trayecto.
            </p>
            <Link
              href="/catalogo?frio=1"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ethos transition hover:bg-mist"
            >
              <Snowflake className="h-4 w-4" /> Ver productos de cadena de frío
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <ColdGauge />
          </Reveal>
        </div>
      </section>

      {/* LÍNEAS DE PRODUCTO */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-teal">04 — Líneas de producto</p>
            <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-ethos sm:text-5xl">
              Explora el portafolio por línea.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {categoryCounts.map(([name, count], i) => (
              <Link
                key={name}
                href={`/catalogo?cat=${encodeURIComponent(name)}`}
                className={`group relative flex min-h-44 flex-col justify-between bg-white p-7 transition hover:bg-ethos ${
                  i === 0 ? "bg-mist sm:col-span-2" : ""
                }`}
              >
                <span className="font-mono text-xs text-ethos-ink/40 group-hover:text-white/60">
                  {count.toLocaleString("es-CO")} ref.
                </span>
                <span className="flex items-end justify-between gap-4">
                  <span
                    className={`font-bold tracking-tight text-ethos group-hover:text-white ${
                      i === 0 ? "text-4xl sm:text-5xl" : "text-2xl"
                    }`}
                  >
                    {name}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-teal transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-leaf-light" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CALIDAD */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid items-center gap-8 rounded-3xl border border-line p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto]">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-leaf/10 text-leaf">
              <ShieldCheck className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-ethos sm:text-3xl">Calidad que se puede rastrear</h2>
              <p className="mt-2 max-w-2xl text-ethos-ink/70">
                Productos adquiridos directamente a laboratorios titulares, almacenamiento bajo buenas prácticas,
                trazabilidad por lote en cada despacho.
              </p>
            </div>
            <Link href="/nosotros#calidad" className="group inline-flex items-center gap-2 font-semibold text-ethos">
              Cómo trabajamos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ethos px-8 py-16 text-white sm:px-16 sm:py-20">
          <div className="bg-ring pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full opacity-60 [mask:radial-gradient(farthest-side,transparent_calc(100%-60px),#000_calc(100%-59px))]" />
          <div className="relative max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">¿Armamos tu primer pedido?</h2>
            <p className="mt-4 text-lg text-white/75">
              Busca en el catálogo, agrega productos a tu cotización, envíala por WhatsApp. Te respondemos con
              precios, disponibilidad el mismo día.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-teal px-8 py-4 text-lg font-bold shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-teal-dark"
              >
                Solicitar cotización <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href={whatsappLink("Hola Ethos, quiero hablar con un asesor.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-ethos shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-mist"
              >
                <MessageCircle className="h-5 w-5" /> Hablar con un asesor
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ColdGauge() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="eyebrow text-white/50">Temperatura en ruta</span>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-leaf-light">
          <span className="h-2 w-2 animate-pulse rounded-full bg-leaf-light" /> En rango
        </span>
      </div>
      <p className="mt-6 text-7xl font-bold tracking-tighter">
        4.6<span className="text-3xl text-white/50"> °C</span>
      </p>
      <div className="mt-8">
        <div className="relative h-3 rounded-full bg-gradient-to-r from-sky via-teal to-leaf">
          <div className="absolute top-1/2 left-[34%] h-6 w-6 -translate-y-1/2 rounded-full border-4 border-ethos-deep bg-white shadow" />
        </div>
        <div className="mt-3 flex justify-between font-mono text-xs text-white/50">
          <span>2 °C</span>
          <span>Rango seguro</span>
          <span>8 °C</span>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6 text-center">
        {[
          ["Bodega", "Monitoreada"],
          ["Embalaje", "Validado"],
          ["Entrega", "Registrada"],
        ].map(([a, b]) => (
          <div key={a}>
            <p className="text-sm font-semibold">{a}</p>
            <p className="mt-0.5 text-xs text-white/50">{b}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
