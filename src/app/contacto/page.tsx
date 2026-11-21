import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos, cotiza o hazte cliente de Ethos.",
};

const steps = [
  { title: "Escríbenos", text: "Déjanos tus datos o contáctanos por WhatsApp. Un asesor te llama en menos de 24 horas." },
  { title: "Envía documentos", text: "RUT, Cámara de Comercio, resolución o permiso de funcionamiento vigente del establecimiento." },
  { title: "Activamos tu cuenta", text: "Validamos la información, definimos condiciones comerciales, te asignamos un asesor." },
  { title: "Haz tu primer pedido", text: "Arma tu lista desde el catálogo, envíala. Te confirmamos precios, fecha de entrega." },
];

const clients = ["Droguerías", "Cadenas de farmacias", "Clínicas, hospitales", "IPS, EPS", "Consultorios", "Instituciones"];

export default function ContactoPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="bg-aurora absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pt-16 pb-24 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8 lg:pt-24">
          <div>
            <Reveal>
              <p className="eyebrow text-teal">Contacto</p>
              <h1 className="mt-4 text-5xl leading-[1.02] font-bold tracking-[-0.035em] text-ethos sm:text-6xl">
                Hablemos de <span className="text-ring">tu pedido.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg text-ethos-ink/70">
                Cotizaciones, disponibilidad, nuevos clientes o cualquier pregunta. Te respondemos rápido.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-5">
                {[
                  { icon: Phone, label: "Teléfono · WhatsApp", value: site.phone },
                  { icon: Mail, label: "Correo", value: site.email },
                  { icon: MapPin, label: "Dirección", value: site.address },
                  { icon: Clock, label: "Horario", value: site.hours },
                ].map((c) => (
                  <li key={c.label} className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist text-teal">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="eyebrow block text-ethos-ink/45">{c.label}</span>
                      <span className="font-semibold text-ethos">{c.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* Hazte cliente: bloque independiente, se puede mover a su propia página */}
      <section id="hazte-cliente" className="scroll-mt-20 bg-ethos-deep py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className="eyebrow text-leaf-light">Hazte cliente</p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Abre tu cuenta en cuatro pasos.</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white/60">Atendemos a:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {clients.map((c) => (
                  <span key={c} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80">
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="h-full">
                <li className="flex h-full flex-col bg-ethos-deep p-8">
                  <span className="text-ring text-6xl font-bold">{i + 1}</span>
                  <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-white/60">{s.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
