import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, ClipboardCheck, Handshake, Clock, BadgeCheck, HeartHandshake, Warehouse, ScanLine, Thermometer, FileCheck2 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Isotipo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Quiénes somos, cómo trabajamos y nuestro compromiso con la calidad.",
};

// Misión, visión y valores corporativos: texto oficial entregado por Ethos.
const values = [
  { icon: Eye, title: "Honestidad", text: "Actuamos con transparencia en cada relación comercial." },
  { icon: ClipboardCheck, title: "Responsabilidad", text: "Cumplimos nuestros compromisos y asumimos las consecuencias de nuestras decisiones." },
  { icon: Handshake, title: "Confianza", text: "Construimos relaciones duraderas con clientes y proveedores." },
  { icon: Clock, title: "Compromiso", text: "Trabajamos para responder oportunamente a las necesidades de nuestros clientes." },
  { icon: BadgeCheck, title: "Calidad", text: "Procuramos ofrecer productos y servicios que cumplan los estándares requeridos." },
  { icon: HeartHandshake, title: "Servicio", text: "Ponemos las necesidades de nuestros clientes en el centro de nuestras acciones." },
];

const quality = [
  { icon: FileCheck2, title: "Origen verificado", text: "Compramos a laboratorios titulares, distribuidores autorizados." },
  { icon: Warehouse, title: "Almacenamiento", text: "Bodegas con control de temperatura, humedad, bajo buenas prácticas." },
  { icon: Thermometer, title: "Cadena de frío", text: "Protocolos validados, registro de temperatura para productos termolábiles." },
  { icon: ScanLine, title: "Trazabilidad", text: "Seguimiento por lote, fecha de vencimiento: de la recepción a la entrega." },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-aurora absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div className="relative mx-auto grid max-w-7xl items-end gap-10 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8 lg:pt-24">
          <Reveal>
            <p className="eyebrow text-teal">Nosotros</p>
            <h1 className="mt-4 text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-ethos sm:text-7xl">
              Hacemos que la salud <span className="text-ring">llegue.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-ethos-ink/70">
              Ethos nace para conectar a los laboratorios farmacéuticos con droguerías, clínicas, instituciones de
              salud: una operación confiable, un servicio atento.
            </p>
            <p className="text-ring mt-5 text-2xl font-bold tracking-tight">La confianza que cuida la vida.</p>
          </Reveal>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative overflow-hidden rounded-3xl bg-ethos p-10 text-white sm:p-14">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-52 w-52 opacity-[0.07]">
              <Isotipo mono className="h-full w-full" />
            </div>
            <p className="eyebrow text-leaf-light">Misión</p>
            <p className="relative mt-5 text-xl leading-snug font-semibold sm:text-2xl">
              En ETHOS trabajamos bajo el compromiso de ser un aliado confiable en la distribución y comercialización
              de medicamentos e insumos para la salud, ofreciendo soluciones oportunas, productos de calidad y un
              servicio responsable que responda a las necesidades de nuestros clientes.
            </p>
            <p className="relative mt-5 leading-relaxed text-white/75">
              Nos guiamos por principios de honestidad, transparencia, responsabilidad y compromiso, construyendo
              relaciones de confianza con nuestros clientes y proveedores, porque creemos que cada entrega representa
              una oportunidad para contribuir al bienestar y al cuidado de la vida.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl border border-line bg-mist/60 p-10 sm:p-14">
            <p className="eyebrow text-teal">Visión</p>
            <p className="mt-5 text-xl leading-snug font-semibold text-ethos sm:text-2xl">
              Para el año 2030, ETHOS será reconocida como una empresa referente en la distribución y comercialización
              de medicamentos e insumos para la salud en Santander, destacándose por la calidad de sus productos, la
              eficiencia de sus procesos, la confiabilidad de su servicio y la construcción de relaciones sólidas con
              clientes y proveedores.
            </p>
            <p className="mt-5 leading-relaxed text-ethos-ink/70">
              Aspiramos a consolidar una organización sostenible, competitiva e innovadora, con capacidad de ampliar su
              cobertura y aportar al fortalecimiento del sector salud, manteniendo siempre nuestros principios y el
              compromiso con el bienestar de las personas.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="border-y border-line py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="eyebrow text-teal">Lo que nos mueve</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ethos sm:text-5xl">Nuestros valores corporativos</h2>
          </Reveal>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <v.icon className="h-7 w-7 text-teal" />
                <h3 className="mt-5 text-xl font-bold text-ethos">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-ethos-ink/70">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Calidad y cumplimiento */}
      <section id="calidad" className="scroll-mt-24 bg-mist/60 py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-teal">Calidad y cumplimiento</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ethos sm:text-5xl">
              Cada caja, con su historia completa.
            </h2>
            <p className="mt-5 text-lg text-ethos-ink/70">
              Operamos bajo la normativa sanitaria colombiana para almacenar, distribuir medicamentos.
              Así es como cuidamos cada producto antes de que llegue a ti.
            </p>
          </Reveal>
          <ol className="relative space-y-4 before:absolute before:top-4 before:bottom-4 before:left-6 before:w-px before:bg-gradient-to-b before:from-sky before:via-teal before:to-leaf">
            {quality.map((q, i) => (
              <Reveal key={q.title} delay={i * 0.07}>
                <li className="relative flex gap-6 rounded-2xl bg-white p-6 shadow-sm">
                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ethos text-white">
                    <q.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs text-ethos-ink/40">Paso 0{i + 1}</p>
                    <h3 className="mt-1 text-lg font-bold text-ethos">{q.title}</h3>
                    <p className="mt-1 text-ethos-ink/70">{q.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24">
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ethos sm:text-4xl">¿Trabajamos juntos?</h2>
          <p className="mt-4 text-lg text-ethos-ink/70">Conoce los requisitos para abrir tu cuenta con Ethos.</p>
          <Link
            href="/contacto#hazte-cliente"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3.5 font-semibold text-white transition hover:bg-teal-dark"
          >
            Hazte cliente <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
