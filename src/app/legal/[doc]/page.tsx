import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";

// Textos BASE: deben ser revisados por el área legal de Ethos antes de publicar.
const docs = {
  privacidad: {
    title: "Política de tratamiento de datos personales",
    body: [
      `En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013, ${site.name} informa que los datos personales suministrados a través de este sitio serán tratados para gestionar solicitudes de contacto, cotizaciones, vinculación de clientes y comunicaciones comerciales.`,
      "Como titular puedes conocer, actualizar, rectificar y solicitar la supresión de tus datos, así como revocar la autorización otorgada.",
      `Para ejercer tus derechos escribe a ${site.email}.`,
    ],
  },
  terminos: {
    title: "Términos de uso",
    body: [
      "La información publicada en este sitio tiene fines informativos y comerciales. El portafolio está sujeto a disponibilidad y puede cambiar sin previo aviso.",
      "La información de productos no reemplaza la consulta con un profesional de la salud ni constituye recomendación de uso.",
      "Las marcas y nombres de laboratorios mencionados pertenecen a sus respectivos titulares.",
    ],
  },
} as const;

type Doc = keyof typeof docs;

export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[doc]">): Promise<Metadata> {
  const { doc } = await params;
  return { title: docs[doc as Doc]?.title };
}

export default async function LegalPage({ params }: PageProps<"/legal/[doc]">) {
  const { doc } = await params;
  const d = docs[doc as Doc];
  if (!d) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="eyebrow text-teal">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ethos">{d.title}</h1>
      <div className="mt-10 space-y-5 text-lg leading-relaxed text-ethos-ink/75">
        {d.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
