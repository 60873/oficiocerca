import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OficioCerca | Servicios, empleo, capacitación y oportunidades",
  description: "Ecosistema digital para conectar personas, profesionales, empresas, comercios, productores, artesanos y oportunidades.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}