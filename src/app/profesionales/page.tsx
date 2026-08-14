"use client";

import { useEffect, useState, type FormEvent, type CSSProperties } from "react";
import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { useStore } from "@/useStore";
import { profesionalesStore } from "@/stores/profesionalesStore";
import { cargarProfesionales, registrarProfesional } from "@/actions/profesionalesActions";

export default function ProfesionalesPage() {
  const profesionales = useStore(
    (l) => profesionalesStore.subscribe(l),
    () => profesionalesStore.getProfesionales()
  );

  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [registroMedico, setRegistroMedico] = useState("");

  useEffect(() => {
    cargarProfesionales();
  }, []);

  async function manejarCrear(e: FormEvent) {
    e.preventDefault();
    if (!nombre || !documento || !especialidad) return;
    await registrarProfesional({ nombre, documento, especialidad, registroMedico });
    setNombre("");
    setDocumento("");
    setEspecialidad("");
    setRegistroMedico("");
  }

  return (
    <RutaProtegida>
      <AppShell>
        <h1>Configuración — Profesionales</h1>

        <form onSubmit={manejarCrear} style={formEstilo}>
          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} style={campoEstilo} />
          <input placeholder="Documento" value={documento} onChange={(e) => setDocumento(e.target.value)} style={campoEstilo} />
          <input placeholder="Especialidad" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)} style={campoEstilo} />
          <input placeholder="Registro médico" value={registroMedico} onChange={(e) => setRegistroMedico(e.target.value)} style={campoEstilo} />
          <button type="submit">Registrar profesional</button>
        </form>

        <div style={contenedorTablaEstilo}>
          <table style={tablaEstilo}>
            <thead>
              <tr>
                <th style={celdaEstilo}>Nombre</th>
                <th style={celdaEstilo}>Documento</th>
                <th style={celdaEstilo}>Especialidad</th>
                <th style={celdaEstilo}>Registro médico</th>
              </tr>
            </thead>
            <tbody>
              {profesionales.map((p) => (
                <tr key={p.id}>
                  <td style={celdaEstilo}>{p.nombre}</td>
                  <td style={celdaEstilo}>{p.documento}</td>
                  <td style={celdaEstilo}>{p.especialidad}</td>
                  <td style={celdaEstilo}>{p.registroMedico}</td>
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
