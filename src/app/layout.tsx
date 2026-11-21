import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteProvider } from "@/components/QuoteList";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { MobileCtaBar } from "@/components/MobileCtaBar";

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
    default: "Ethos · La confianza que cuida la vida",
    template: "%s · Ethos",
  },
  description:
    "Distribuidora de medicamentos, productos para la salud en Colombia. Más de 8.000 referencias de cientos de laboratorios, con manejo de cadena de frío.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${montserrat.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col pb-20 md:pb-0">
        <QuoteProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
          <MobileCtaBar />
        </QuoteProvider>
      </body>
    </html>
  );
}
