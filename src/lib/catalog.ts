import data from "@/data/catalogo.json";

// Claves cortas para que el JSON pese menos (ver scripts/build-catalog.mjs)
export type Product = {
  c: string; // código Ethos
  n: string; // principio activo / nombre
  d: string; // descripción completa
  m: string; // fabricante
  b: string; // marca comercial
  l: string; // laboratorio titular
  k: string; // categoría
  v: string; // vía de administración
  f: 0 | 1; // cadena de frío
};

export const products = data as Product[];

export function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function countBy(key: keyof Product) {
  const m = new Map<string, number>();
  for (const p of products) m.set(String(p[key]), (m.get(String(p[key])) ?? 0) + 1);
  return m;
}

export const labs = [...countBy("l").keys()].sort((a, b) => a.localeCompare(b, "es"));
// Laboratorios destacados para el inicio (el catálogo completo tiene cientos; el filtro los incluye todos).
const FEATURED = ["Tecnoquímicas", "Procaps", "Meditec", "Siegfried", "Megalabs", "Genfar", "Novamed", "Lafrancol", "Convatec", "Smith & Nephew", "Hetero", "Legrand", "ECAR", "BSN Medical", "Molnlycke", "Bussie", "Coloplast", "Pfizer", "Bioquifar", "Life Care", "MK", "Baxter", "Vitalis", "Abbott"];
export const featuredLabs = FEATURED.filter((l) => labs.includes(l));
// Laboratorios con su número de productos, de mayor a menor (para el selector del catálogo).
export const labList = [...countBy("l")].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "es"));
export const categoryCounts = [...countBy("k")].sort((a, b) => b[1] - a[1]);
export const routes = [...countBy("v").keys()].sort((a, b) =>
  a === "Otra" ? 1 : b === "Otra" ? -1 : a.localeCompare(b, "es"),
);

export const stats = {
  products: products.length,
  labs: labs.length,
  cold: products.filter((p) => p.f).length,
  categories: categoryCounts.length,
};

// Búsquedas reales para la demo animada del hero (se calculan en el servidor, no viaja el catálogo completo)
export type DemoScene = {
  term: string;
  total: number;
  items: (Pick<Product, "c" | "n" | "b" | "l" | "f"> & { s: string })[];
};

export function demoSearch(term: string, take = 3): DemoScene {
  const t = normalize(term);
  const hits = products.filter((p) => normalize(`${p.c} ${p.d} ${p.b}`).includes(t));
  return {
    term,
    total: hits.length,
    items: hits.slice(0, take).map(({ c, n, b, l, f, d }) => ({
      c,
      n: toTitle(n),
      b: toTitle(b),
      l,
      f,
      // Presentación: la descripción sin el principio activo ni la marca
      s: d.replace(n, "").replace(b ? `(${b})` : "", "").trim(),
    })),
  };
}

export const toTitle =(s: string) =>
  s.toLowerCase().replace(/(^|[\s+(/-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
