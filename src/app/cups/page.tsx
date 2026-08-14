"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { useStore } from "@/useStore";
import { cupsStore } from "@/stores/cupsStore";
import { cargarServiciosCUPS, crearServicioCUPS } from "@/actions/cupsActions";

export default function CUPSPage() {
  const servicios = useStore(
    (l) => cupsStore.subscribe(l),
    () => cupsStore.getServicios()
  );

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [tarifa, setTarifa] = useState("");

  useEffect(() => {
    cargarServiciosCUPS();
  }, []);

  async function manejarCrear(e: FormEvent) {
    e.preventDefault();
    if (!codigo || !nombre || !tarifa) return;
    await crearServicioCUPS({ codigo, nombre, tarifa: Number(tarifa) });
    setCodigo("");
    setNombre("");
    setTarifa("");
  }

  return (
    <RutaProtegida>
      <AppShell>
        <h1>Configuración — Servicios CUPS</h1>

        <form onSubmit={manejarCrear} style={formEstilo}>
          <input placeholder="Código CUPS" value={codigo} onChange={(e) => setCodigo(e.target.value)} style={campoEstilo} />
          <input placeholder="Nombre del servicio" value={nombre} onChange={(e) => setNombre(e.target.value)} style={campoEstilo} />
          <input placeholder="Tarifa" type="number" value={tarifa} onChange={(e) => setTarifa(e.target.value)} style={campoEstilo} />
          <button type="submit">Crear servicio</button>
        </form>

        <div style={contenedorTablaEstilo}>
          <table style={tablaEstilo}>
            <thead>
              <tr>
                <th style={celdaEstilo}>Código</th>
                <th style={celdaEstilo}>Nombre</th>
                <th style={celdaEstilo}>Tarifa</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s) => (
                <tr key={s.id}>
                  <td style={celdaEstilo}>{s.codigo}</td>
                  <td style={celdaEstilo}>{s.nombre}</td>
                  <td style={celdaEstilo}>${s.tarifa.toLocaleString("es-CO")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AppShell>
    </RutaProtegida>
  );
}

const formEstilo: CSSProperties = { display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" };
const campoEstilo: CSSProperties = { padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 };
const contenedorTablaEstilo: CSSProperties = { maxHeight: 420, overflowY: "auto", border: "1px solid #E5E7EB", borderRadius: 6 };
const tablaEstilo: CSSProperties = { width: "100%", borderCollapse: "collapse", background: "white" };
const celdaEstilo: CSSProperties = { border: "1px solid #E5E7EB", padding: 8, textAlign: "left" };
