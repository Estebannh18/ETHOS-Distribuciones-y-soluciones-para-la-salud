// Correo y horario: PENDIENTES de confirmar con Ethos (marcadores de posición).
export const site = {
  name: "Ethos",
  slogan: "La confianza que cuida la vida.",
  whatsapp: "573102620833",
  phone: "+57 310 262 0833",
  email: "comercial@ethos.com.co",
  address: "Bucaramanga - Santander",
  hours: "Lunes a viernes · 7:00 a. m. – 5:00 p. m.",
};

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/contacto", label: "Contacto" },
];

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
