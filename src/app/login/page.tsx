"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/useStore";
import { sesionStore } from "@/stores/sesionStore";
import { iniciarSesion } from "@/actions/sesionActions";

export default function LoginPage() {
  const sesion = useStore(
    (l) => sesionStore.subscribe(l),
    () => sesionStore.getEstado()
  );
  const router = useRouter();

  const [empresa, setEmpresa] = useState("IPS Demo");
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (sesion.usuario) router.replace("/dashboard");
  }, [sesion.usuario, router]);

  function manejarSubmit(e: FormEvent) {
    e.preventDefault();
    iniciarSesion(empresa, usuario, password); // dispara la acción -> dispatcher -> sesionStore
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <form
        onSubmit={manejarSubmit}
        style={{ background: "white", padding: 32, borderRadius: 8, width: 320, boxShadow: "0 1px 4px rgba(0,0,0,0.1)" }}
      >
        <h2 style={{ marginTop: 0 }}>SaludWeb SaaS</h2>
        <p style={{ color: "#6B7280", fontSize: 14 }}>Ingreso al sistema</p>

        <label style={{ display: "block", fontSize: 13, marginTop: 12 }}>Empresa / IPS</label>
        <select value={empresa} onChange={(e) => setEmpresa(e.target.value)} style={campoEstilo}>
          <option>IPS Demo</option>
        </select>

        <label style={{ display: "block", fontSize: 13, marginTop: 12 }}>Usuario</label>
        <input
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="admin o facturador"
          style={campoEstilo}
        />

        <label style={{ display: "block", fontSize: 13, marginTop: 12 }}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="admin123 / factura123"
          style={campoEstilo}
        />

        {sesion.error && (
          <p style={{ color: "#DC2626", fontSize: 13, marginTop: 8 }}>{sesion.error}</p>
        )}

        <button
          type="submit"
          disabled={sesion.cargando}
          style={{ marginTop: 16, width: "100%", padding: 10, background: "#2563EB", color: "white", border: "none", borderRadius: 6, cursor: "pointer" }}
        >
          {sesion.cargando ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <p style={{ fontSize: 12, color: "#6B7280", marginTop: 12 }}>
          Usuarios de prueba: <b>admin / admin123</b> o <b>facturador / factura123</b>
        </p>
      </form>
    </div>
  );
}

const campoEstilo: CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 4,
  borderRadius: 6,
  border: "1px solid #D1D5DB",
  boxSizing: "border-box",
};
