"use client";

import type { ReactNode } from "react";

export function Modal({
  titulo,
  abierto,
  onCerrar,
  children,
}: {
  titulo: string;
  abierto: boolean;
  onCerrar: () => void;
  children: ReactNode;
}) {
  if (!abierto) return null;

  return (
    <div
      onClick={onCerrar}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 8,
          width: 480,
          maxWidth: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 16 }}>{titulo}</h3>
          <button onClick={onCerrar} style={{ border: "none", background: "transparent", fontSize: 16, cursor: "pointer" }}>
            ✕
          </button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}
