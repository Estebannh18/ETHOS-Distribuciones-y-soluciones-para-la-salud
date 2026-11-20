import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "./CatalogBrowser";
import { stats } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Portafolio de medicamentos y productos para la salud distribuidos por Ethos.",
};

export default function CatalogoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <div className="relative mx-auto max-w-7xl px-4 pt-14 pb-10 sm:px-6 lg:px-8">
          <p className="eyebrow text-teal">Portafolio 2026</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ethos sm:text-6xl">Catálogo de productos</h1>
          <p className="mt-4 max-w-2xl text-lg text-ethos-ink/70">
            {stats.products.toLocaleString("es-CO")} referencias de {stats.labs} laboratorios. Agrega lo que necesitas a
            tu cotización y te respondemos con precios y disponibilidad.
          </p>
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto h-[60vh] max-w-7xl" />}>
        <CatalogBrowser />
      </Suspense>
    </>
  );
}
