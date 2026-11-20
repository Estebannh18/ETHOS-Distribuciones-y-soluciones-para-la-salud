import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteList";
import { WhatsAppFab } from "@/components/WhatsAppFab";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Ethos · Distribución y soluciones para la salud",
    template: "%s · Ethos",
  },
  description:
    "Distribuidora de medicamentos y productos para la salud en Colombia. Portafolio de más de 8.000 referencias de cientos de laboratorios, con manejo de cadena de frío.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${montserrat.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </QuoteProvider>
      </body>
    </html>
  );
}
