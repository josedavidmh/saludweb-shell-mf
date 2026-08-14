"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { Modal } from "@/components/Modal";
import { useStore } from "@/useStore";
import { facturacionStore } from "@/stores/facturacionStore";
import { cargarFacturas, crearFactura, enviarFacturaDian } from "@/actions/facturacionActions";
import { cupsStore } from "@/stores/cupsStore";
import { cargarServiciosCUPS } from "@/actions/cupsActions";
import { generarRips } from "@/actions/ripsActions";
import type { ServicioCUPS } from "@/services/servicioCUPS";

export default function FacturacionPage() {
  const facturas = useStore(
    (l) => facturacionStore.subscribe(l),
    () => facturacionStore.getFacturas()
  );
  const serviciosCUPS = useStore(
    (l) => cupsStore.subscribe(l),
    () => cupsStore.getServicios()
  );

  const [paciente, setPaciente] = useState("");
  const [descuentos, setDescuentos] = useState("0");
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<ServicioCUPS[]>([]);
  const [modalServiciosAbierto, setModalServiciosAbierto] = useState(false);

  useEffect(() => {
    cargarFacturas();
    cargarServiciosCUPS();
  }, []);

  const subtotal = serviciosSeleccionados.reduce((acc, s) => acc + s.tarifa, 0);
  const total = Math.max(0, subtotal - Number(descuentos || 0));

  function alternarServicio(servicio: ServicioCUPS) {
    setServiciosSeleccionados((actual) =>
      actual.some((s) => s.id === servicio.id) ? actual.filter((s) => s.id !== servicio.id) : [...actual, servicio]
    );
  }

  async function manejarCrear(e: FormEvent) {
    e.preventDefault();
    if (!paciente || serviciosSeleccionados.length === 0) return;
    await crearFactura({
      paciente,
      servicios: serviciosSeleccionados.map((s) => s.nombre).join(", "),
      subtotal,
      descuentos: Number(descuentos || 0),
      total,
    });
    setPaciente("");
    setServiciosSeleccionados([]);
    setDescuentos("0");
  }

  return (
    <RutaProtegida>
      <AppShell>
        <h1>Gestión administrativa — Facturación</h1>

        <form onSubmit={manejarCrear} style={formEstilo}>
          <input placeholder="Paciente" value={paciente} onChange={(e) => setPaciente(e.target.value)} style={campoEstilo} />
          <button type="button" onClick={() => setModalServiciosAbierto(true)}>
            Agregar servicios prestados
          </button>
          <label style={{ fontSize: 13, color: "#6B7280" }}>Descuentos</label>
          <input
            type="number"
            value={descuentos}
            onChange={(e) => setDescuentos(e.target.value)}
            style={{ ...campoEstilo, width: 100 }}
          />
          <button type="submit">Registrar factura</button>
        </form>

        {serviciosSeleccionados.length > 0 && (
          <div style={resumenEstilo}>
            <div>
              Servicios: {serviciosSeleccionados.map((s) => s.nombre).join(", ")}
            </div>
            <div>Subtotal: ${subtotal.toLocaleString("es-CO")}</div>
            <div>Descuentos: ${Number(descuentos || 0).toLocaleString("es-CO")}</div>
            <div>
              <b>Total: ${total.toLocaleString("es-CO")}</b>
            </div>
          </div>
        )}

        <div style={contenedorTablaEstilo}>
          <table style={tablaEstilo}>
            <thead>
              <tr>
                <th style={celdaEstilo}>Paciente</th>
                <th style={celdaEstilo}>Servicios</th>
                <th style={celdaEstilo}>Subtotal</th>
                <th style={celdaEstilo}>Descuentos</th>
                <th style={celdaEstilo}>Total</th>
                <th style={celdaEstilo}>Estado DIAN</th>
                <th style={celdaEstilo}></th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((f) => (
                <tr key={f.id}>
                  <td style={celdaEstilo}>{f.paciente}</td>
                  <td style={celdaEstilo}>{f.servicios}</td>
                  <td style={celdaEstilo}>${f.subtotal.toLocaleString("es-CO")}</td>
                  <td style={celdaEstilo}>${f.descuentos.toLocaleString("es-CO")}</td>
                  <td style={celdaEstilo}>${f.total.toLocaleString("es-CO")}</td>
                  <td style={celdaEstilo}>
                    <span
                      style={{
                        color: f.estadoDian === "enviada" ? "#16A34A" : f.estadoDian === "rechazada" ? "#DC2626" : "#F59E0B",
                      }}
                    >
                      {f.estadoDian}
                    </span>
                  </td>
                  <td style={{ ...celdaEstilo, display: "flex", gap: 6 }}>
                    {f.estadoDian === "pendiente" && (
                      <button onClick={() => enviarFacturaDian(f.id)}>Facturar (enviar a DIAN)</button>
                    )}
                    <button
                      onClick={() => {
                        const hoy = new Date().toISOString().slice(0, 10);
                        generarRips(f.paciente, hoy, hoy);
                      }}
                    >
                      Generar RIPS
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal
          titulo="Agregar servicios prestados"
          abierto={modalServiciosAbierto}
          onCerrar={() => setModalServiciosAbierto(false)}
        >
          {serviciosCUPS.length === 0 && <p>No hay servicios CUPS registrados.</p>}
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
const resumenEstilo: CSSProperties = {
  background: "#EFF6FF",
  border: "1px solid #BFDBFE",
  borderRadius: 6,
  padding: "10px 14px",
  fontSize: 13,
  color: "#1E3A8A",
  marginBottom: 16,
  lineHeight: 1.6,
};
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
