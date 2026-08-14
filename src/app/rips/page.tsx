"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { Modal } from "@/components/Modal";
import { useStore } from "@/useStore";
import { ripsStore } from "@/stores/ripsStore";
import { cargarExportacionesRips, generarRips } from "@/actions/ripsActions";
import { contratosStore } from "@/stores/contratosStore";
import { cargarContratos } from "@/actions/contratosActions";
import type { Contrato } from "@/services/servicioContratos";

export default function RipsPage() {
  const exportaciones = useStore(
    (l) => ripsStore.subscribe(l),
    () => ripsStore.getExportaciones()
  );
  const contratos = useStore(
    (l) => contratosStore.subscribe(l),
    () => contratosStore.getContratos()
  );

  const [entidad, setEntidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [modalEntidadAbierto, setModalEntidadAbierto] = useState(false);

  useEffect(() => {
    cargarExportacionesRips();
    cargarContratos();
  }, []);

  function seleccionarEntidad(contrato: Contrato) {
    setEntidad(contrato.entidadContratante);
    setModalEntidadAbierto(false);
  }

  async function manejarGenerar(e: FormEvent) {
    e.preventDefault();
    if (!entidad || !fechaInicio || !fechaFin) return;
    await generarRips(entidad, fechaInicio, fechaFin);
    setEntidad("");
    setFechaInicio("");
    setFechaFin("");
  }

  return (
    <RutaProtegida>
      <AppShell>
        <h1>Cumplimiento normativo — Exportación de RIPS</h1>
        <p style={{ color: "#6B7280", fontSize: 14, marginTop: -8 }}>
          Generación de archivos RIPS bajo la Resolución 2275 de 2023 / Resolución 1888 de 2025 (interoperabilidad).
        </p>

        <form onSubmit={manejarGenerar} style={formEstilo}>
          <input placeholder="EAPB / pagador" value={entidad} readOnly style={{ ...campoEstilo, background: "#F3F4F6" }} />
          <button type="button" onClick={() => setModalEntidadAbierto(true)}>
            Buscar EAPB
          </button>
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} style={campoEstilo} />
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} style={campoEstilo} />
          <button type="submit">Generar RIPS</button>
        </form>

        <h2>Cola de procesamiento</h2>
        <div style={contenedorTablaEstilo}>
          <table style={tablaEstilo}>
            <thead>
              <tr>
                <th style={celdaEstilo}>Entidad / pagador</th>
                <th style={celdaEstilo}>Rango de fechas</th>
                <th style={celdaEstilo}>Estado</th>
                <th style={celdaEstilo}></th>
              </tr>
            </thead>
            <tbody>
              {exportaciones.map((r) => (
                <tr key={r.id}>
                  <td style={celdaEstilo}>{r.entidad}</td>
                  <td style={celdaEstilo}>
                    {r.fechaInicio} — {r.fechaFin}
                  </td>
                  <td style={celdaEstilo}>
                    <span style={{ color: r.estado === "completado" ? "#16A34A" : "#F59E0B" }}>
                      {r.estado === "completado" ? "Completado" : "En proceso"}
                    </span>
                  </td>
                  <td style={celdaEstilo}>
                    <button disabled={r.estado !== "completado"}>Descargar JSON</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal titulo="Buscar EAPB" abierto={modalEntidadAbierto} onCerrar={() => setModalEntidadAbierto(false)}>
          {contratos.length === 0 && <p>No hay contratos registrados.</p>}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {contratos.map((c) => (
              <li key={c.id} style={itemModalEstilo} onClick={() => seleccionarEntidad(c)}>
                <strong>{c.entidadContratante}</strong>
                <div style={{ fontSize: 12, color: "#6B7280" }}>
                  Vigencia: {c.vigenciaDesde} a {c.vigenciaHasta}
                </div>
              </li>
            ))}
          </ul>
        </Modal>
      </AppShell>
    </RutaProtegida>
  );
}

const formEstilo: CSSProperties = { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" };
const campoEstilo: CSSProperties = { padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 };
const contenedorTablaEstilo: CSSProperties = { maxHeight: 420, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 6 };
const tablaEstilo: CSSProperties = { width: "100%", borderCollapse: "collapse", background: "white" };
const celdaEstilo: CSSProperties = { border: "1px solid #E5E7EB", padding: 8, textAlign: "left" };
const itemModalEstilo: CSSProperties = {
  padding: 10,
  borderRadius: 6,
  border: "1px solid #E5E7EB",
  marginBottom: 8,
  cursor: "pointer",
};
