"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECCIONES = [
  { href: "/dashboard", texto: "Panel general", icono: "🏠" },
  { href: "/agenda", texto: "Agenda", icono: "📅" },
  { href: "/historia-clinica", texto: "Historia clínica", icono: "📋" },
  { href: "/cups", texto: "Servicios CUPS", icono: "🧾" },
  { href: "/contratos", texto: "Contratación", icono: "📄" },
  { href: "/profesionales", texto: "Profesionales", icono: "🩺" },
  { href: "/admisiones", texto: "Admisiones", icono: "👤➕" },
  { href: "/facturacion", texto: "Facturación", icono: "💳" },
  { href: "/rips", texto: "RIPS", icono: "🗂️" },
];

export function Sidebar({ colapsado }: { colapsado: boolean }) {
  const pathname = usePathname();
  const ancho = colapsado ? 60 : 220;

  return (
    <aside
      style={{
        width: ancho,
        transition: "width 0.15s ease",
        background: "white",
        borderRight: "1px solid #E5E7EB",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", padding: "12px 0" }}>
        {SECCIONES.map((s) => {
          const activo = pathname === s.href;
          return (
            <Link
              key={s.href}
              href={s.href}
              title={colapsado ? s.texto : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: colapsado ? "12px 0" : "10px 18px",
                justifyContent: colapsado ? "center" : "flex-start",
                color: activo ? "#1F4E78" : "#374151",
                background: activo ? "#DCE6F1" : "transparent",
                borderLeft: activo ? "3px solid #1F4E78" : "3px solid transparent",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: activo ? 600 : 400,
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontSize: 16 }}>{s.icono}</span>
              {!colapsado && <span>{s.texto}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
