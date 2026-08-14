"use client";

import { useStore } from "@/useStore";
import { sesionStore } from "@/stores/sesionStore";
import { cerrarSesion } from "@/actions/sesionActions";

export function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const sesion = useStore(
    (l) => sesionStore.subscribe(l),
    () => sesionStore.getEstado()
  );

  if (!sesion.usuario) return null;

  const iniciales = sesion.usuario.nombre
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#1F4E78",
        color: "white",
        height: 56,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={onToggleSidebar}
          title="Mostrar/ocultar menú"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.4)",
            color: "white",
            borderRadius: 6,
            width: 30,
            height: 30,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ☰
        </button>
        <span style={{ fontWeight: "bold", fontSize: 16 }}>🩺 SaludWeb SaaS</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13 }}>
        <span>IPS: {sesion.usuario.empresa}</span>
        <span>{sesion.usuario.nombre} · {sesion.usuario.rol}</span>
        <div
          title={sesion.usuario.nombre}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "#2563EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {iniciales}
        </div>
        <button onClick={() => cerrarSesion()} style={{ fontSize: 12 }}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
