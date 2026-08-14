"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { Modal } from "@/components/Modal";
import { useStore } from "@/useStore";
import { contratosStore } from "@/stores/contratosStore";
import { cargarContratos, crearContrato } from "@/actions/contratosActions";
import { cupsStore } from "@/stores/cupsStore";
import { cargarServiciosCUPS } from "@/actions/cupsActions";
import type { ServicioCUPS } from "@/services/servicioCUPS";

export default function ContratosPage() {
  const contratos = useStore(
    (l) => contratosStore.subscribe(l),
    () => contratosStore.getContratos()
  );
  const serviciosCUPS = useStore(
    (l) => cupsStore.subscribe(l),
    () => cupsStore.getServicios()
  );

  const [entidad, setEntidad] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<ServicioCUPS[]>([]);
  const [modalServiciosAbierto, setModalServiciosAbierto] = useState(false);

  useEffect(() => {
    cargarContratos();
    cargarServiciosCUPS();
  }, []);

  function alternarServicio(servicio: ServicioCUPS) {
    setServiciosSeleccionados((actual) =>
      actual.some((s) => s.id === servicio.id)
        ? actual.filter((s) => s.id !== servicio.id)
        : [...actual, servicio]
    );
  }

  function quitarServicio(id: string) {
    setServiciosSeleccionados((actual) => actual.filter((s) => s.id !== id));
  }

  async function manejarCrear(e: FormEvent) {
    e.preventDefault();
    if (!entidad || !desde || !hasta || serviciosSeleccionados.length === 0) return;
    await crearContrato({
      entidadContratante: entidad,
      serviciosCubiertos: serviciosSeleccionados.map((s) => s.nombre).join(", "),
      vigenciaDesde: desde,
      vigenciaHasta: hasta,
    });
    setEntidad("");
    setServiciosSeleccionados([]);
    setDesde("");
    setHasta("");
  }

  return (
    <RutaProtegida>
      <AppShell>
        <h1>Configuración — Contratación</h1>

        <form onSubmit={manejarCrear} style={formEstilo}>
          <input
            placeholder="Entidad contratante (EAPB)"
            value={entidad}
            onChange={(e) => setEntidad(e.target.value)}
            style={campoEstilo}
          />
          <button type="button" onClick={() => setModalServiciosAbierto(true)}>
            Agregar servicios al contrato
          </button>
          <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} style={campoEstilo} />
          <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} style={campoEstilo} />
          <button type="submit">Crear contrato</button>
        </form>

        {serviciosSeleccionados.length > 0 && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
            {serviciosSeleccionados.map((s) => (
              <span key={s.id} style={chipEstilo}>
                {s.nombre}
                <button
                  type="button"
                  onClick={() => quitarServicio(s.id)}
                  style={{ border: "none", background: "transparent", cursor: "pointer", marginLeft: 6 }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        <div style={contenedorTablaEstilo}>
          <table style={tablaEstilo}>
            <thead>
              <tr>
                <th style={celdaEstilo}>Entidad contratante</th>
                <th style={celdaEstilo}>Servicios cubiertos</th>
                <th style={celdaEstilo}>Vigencia</th>
              </tr>
            </thead>
            <tbody>
              {contratos.map((c) => (
                <tr key={c.id}>
                  <td style={celdaEstilo}>{c.entidadContratante}</td>
                  <td style={celdaEstilo}>{c.serviciosCubiertos}</td>
                  <td style={celdaEstilo}>
                    {c.vigenciaDesde} — {c.vigenciaHasta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          titulo="Agregar servicios al contrato"
          abierto={modalServiciosAbierto}
          onCerrar={() => setModalServiciosAbierto(false)}
        >
          {serviciosCUPS.length === 0 && (
            <p>No hay servicios CUPS registrados. Créalos primero en el módulo de Servicios CUPS.</p>
          )}
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {serviciosCUPS.map((s) => {
              const seleccionado = serviciosSeleccionados.some((sel) => sel.id === s.id);
              return (
                <li
                  key={s.id}
                  onClick={() => alternarServicio(s)}
                  style={{
                    ...itemModalEstilo,
                    background: seleccionado ? "#DCE6F1" : "white",
                    borderColor: seleccionado ? "#2563EB" : "#E5E7EB",
                  }}
                >
                  <input type="checkbox" checked={seleccionado} readOnly style={{ marginRight: 8 }} />
                  <strong>{s.nombre}</strong>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>
                    Código {s.codigo} · ${s.tarifa.toLocaleString("es-CO")}
                  </div>
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
            <button type="button" onClick={() => setModalServiciosAbierto(false)}>
              Listo ({serviciosSeleccionados.length} seleccionados)
            </button>
          </div>
        </Modal>
      </AppShell>
    </RutaProtegida>
  );
}

const formEstilo: CSSProperties = { display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap", alignItems: "center" };
const campoEstilo: CSSProperties = { padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 };
const contenedorTablaEstilo: CSSProperties = { maxHeight: 420, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 6 };
const tablaEstilo: CSSProperties = { width: "100%", borderCollapse: "collapse", background: "white" };
const celdaEstilo: CSSProperties = { border: "1px solid #E5E7EB", padding: 8, textAlign: "left" };
const chipEstilo: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  background: "#DCE6F1",
  color: "#1F4E78",
  borderRadius: 14,
  padding: "4px 10px",
  fontSize: 13,
};
const itemModalEstilo: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  padding: 10,
  borderRadius: 6,
  border: "1px solid #E5E7EB",
  marginBottom: 8,
  cursor: "pointer",
};
