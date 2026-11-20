# Ethos · Sitio web

Next.js 16 + React 19 + Tailwind CSS 4 + Motion.

## Correr en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Actualizar el catálogo

El catálogo se genera desde el Excel interno (hojas `CATALOGO_1` y `PRODUCTOS`; el Excel no se sube al repositorio). El script **descarta** precios, IVA, CUM, INVIMA, ATC, NIT,
disponibilidad y códigos de proveedor; solo publica código Ethos, descripción, laboratorio, línea, vía y cadena de frío.

```bash
node scripts/build-catalog.mjs "<ruta>/ListasdePreciosYCosto_DEFINITIVO.xlsx"
```

Los nombres de laboratorio se formatean automáticamente; las excepciones y variantes que se unifican están en `LAB_OVERRIDE` del script.

## Seguridad

- Encabezados de seguridad (CSP, HSTS, X-Frame-Options, etc.) en `next.config.ts`.
- No hay backend ni variables secretas: el formulario solo arma un mensaje de WhatsApp. No subir archivos `.env*` ni los Excel con precios.
- Revisar `npm audit` antes de cada publicación.

## Pendientes de contenido

- Logo oficial en SVG (hoy hay uno provisional en `src/components/Logo.tsx`)
- WhatsApp, teléfono, correo, dirección y horario reales en `src/lib/site.ts`
- Historia, misión y visión oficiales en `src/app/nosotros/page.tsx`
- Revisión legal de `src/app/legal/[doc]/page.tsx`
