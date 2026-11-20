// Genera src/data/catalogo.json desde el Excel interno (hoja CATALOGO_1 + PRODUCTOS).
// Solo se publican datos estables: código Ethos, descripción, laboratorio,
// categoría, vía y cadena de frío. Precios, IVA, CUM, INVIMA, ATC, NIT,
// disponibilidad y códigos de proveedor NO salen del Excel.
//
// Uso: node scripts/build-catalog.mjs "<ruta>/ListasdePreciosYCosto_DEFINITIVO.xlsx"
import XLSX from "xlsx";
import * as fs from "node:fs";
import { writeFileSync, mkdirSync } from "node:fs";

XLSX.set_fs(fs); // xlsx 0.20 en ESM necesita que se le entregue fs

const src = process.argv[2];
if (!src) throw new Error("Falta la ruta del Excel");

const wb = XLSX.readFile(src);
const catalogo = XLSX.utils.sheet_to_json(wb.Sheets["CATALOGO_1"]);
const productos = new Map(XLSX.utils.sheet_to_json(wb.Sheets["PRODUCTOS"]).map((r) => [r.CODIGO, r]));

// Nombres de laboratorio: casos especiales y variantes que se unifican.
const LAB_OVERRIDE = {
  ABBVIE: "AbbVie",
  ASTRAZENECA: "AstraZeneca",
  "CSL BEHRING": "CSL Behring",
  TECNOQUIMICAS: "Tecnoquímicas",
  "TECNOFAR TQ": "Tecnoquímicas",
  GLAXOSMITHKLINE: "GSK",
  "GSK COLOMBIA": "GSK",
  GRUNENTHAL: "Grünenthal",
  LOREAL: "L'Oréal",
  NESTLE: "Nestlé",
  BOEHRINGER: "Boehringer Ingelheim",
  "HETERO LABS LIMITED": "Hetero",
  "MSN LABORATORIES": "MSN",
  NEVOXFARMA: "Nevox Farma",
  "ASPEN COLOMBIA": "Aspen",
  "MEAD JHONSON": "Mead Johnson",
  "NATURAL FHRESLY": "Natural Freshly",
  "EURODRUG LABORATORIES": "Eurodrug",
  "IPCA LABORATORIES": "IPCA",
  "GPC PHARMA S.A.S": "GPC Pharma",
  "GALENICUM HEALTH": "Galenicum",
  "SANOFI AVENTIS": "Sanofi",
  "SANOFI WINTHROP": "Sanofi",
  "MERCK SHARP & DOHME": "MSD",
};
const KEEP_UPPER = new Set(["MSD", "BSN", "GSK", "MSN", "LKM", "HCP", "HCC", "CYH", "SRS", "RPG", "GMD", "IQM", "UCB", "KCI", "ETX", "OSA", "BDF", "BD", "MK", "JGB", "FCV", "EPM", "CIM", "NCPC", "NEO", "SAS", "LTDA", "ECAR", "TQ", "IPCA", "SA"]);
const labName = (raw) => {
  const k = String(raw ?? "").trim().toUpperCase();
  if (LAB_OVERRIDE[k]) return LAB_OVERRIDE[k];
  return k
    .split(/(\s+)/)
    .map((t) => {
      if (!t.trim()) return t;
      if (t === "DR.") return "Dr.";
      if (KEEP_UPPER.has(t) || /[.&\d]/.test(t) || t.length <= 1) return t;
      return t[0] + t.slice(1).toLowerCase();
    })
    .join("");
};

const CATEGORIES = {
  MEDICAMENTO: "Medicamentos",
  "MEDICAMENTO VITAL NO DISPONIBLE": "Medicamentos",
  "MEDICAMENTO FORMULA MAGISTRAL": "Medicamentos",
  BIOLOGICOS: "Biológicos",
  ALIMENTOS: "Nutrición",
  "SUPLEMENTO DIETARIO": "Nutrición",
  COSMETICO: "Dermocosmética",
  "MEDICO QUIRURGICO": "Médico-quirúrgico",
  "REACTIVO DIAGNOSTICO": "Médico-quirúrgico",
  FITOTERAPEUTICO: "Fitoterapéuticos",
  HOMEOPATICO: "Fitoterapéuticos",
  "ASEO Y LIMPIEZA": "Aseo y limpieza",
  "DROGA BLANCA": "Otros productos",
  VARIOS: "Otros productos",
};

function route(forma = "") {
  const f = ` ${forma} `;
  if (/ INY | INTRAV /.test(f)) return "Inyectable";
  if (/ OFT /.test(f)) return "Oftálmica";
  if (/ INH /.test(f)) return "Inhalada";
  if (/ NAS /.test(f)) return "Nasal";
  if (/ OTIC /.test(f)) return "Ótica";
  if (/ VAG | OVUL /.test(f)) return "Vaginal";
  if (/ REC /.test(f)) return "Rectal";
  if (/ TOP | CREM | UNG | JABON | SHAMP | LOC /.test(f)) return "Tópica";
  if (/ TAB | CAP | ORL | JBE | ELIXIR | GRAN | EFERV | BUC | ENTER /.test(f)) return "Oral";
  return "Otra";
}

const clean = (v) => {
  const s = String(v ?? "").trim();
  return s && s !== "NA" && s !== "null" ? s : "";
};

const products = catalogo.map((d) => {
  const p = productos.get(d.CODIGO);
  if (!p) throw new Error(`Código ${d.CODIGO} no está en la hoja PRODUCTOS`);
  // La descripción termina en " - FABRICANTE"; se separa para mostrarlo aparte.
  const desc = String(d.DESCRIPCION).trim();
  const cut = desc.lastIndexOf(" - ");
  return {
    c: d.CODIGO_ETHOS,
    n: clean(p.MOLECULA) || (cut > 0 ? desc.slice(0, cut) : desc),
    d: cut > 0 ? desc.slice(0, cut) : desc,
    m: cut > 0 ? desc.slice(cut + 3) : "",
    b: clean(p["NOMBRE COMERCIAL"]),
    l: labName(p.LABORATORIO),
    k: CATEGORIES[p["TIPO PRODUCTO"]] ?? "Otros productos",
    v: route(clean(p["FORMA FARMACEUTICA"])),
    f: String(d["CADENA FRIO"]) === "1" ? 1 : 0,
  };
});

if (new Set(products.map((p) => p.c)).size !== products.length) throw new Error("Hay códigos ETH repetidos");
products.sort((a, b) => a.d.localeCompare(b.d, "es"));

mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/catalogo.json", JSON.stringify(products));
console.log(`${products.length} productos · ${new Set(products.map((p) => p.l)).size} laboratorios · ${products.filter((p) => p.f).length} cadena de frío`);
