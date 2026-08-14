import type { ReactNode } from "react";

export const metadata = {
  title: "SaludWeb SaaS — Prototipo Flux",
  description: "Prototipo funcional del patrón Flux para SaludWeb SaaS (Entrega 2, Unidad 3)",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#F8FAFC", color: "#1F2937" }}>
        {children}
      </body>
    </html>
  );
}
