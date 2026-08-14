// src/services/servicioCitas.ts
// Simula GET /api/citas del backend Flask.

export type Cita = {
  id: string;
  paciente: string;
  profesional: string;
  fecha: string;
  estado: "pendiente" | "confirmada";
};

let CITAS_DEMO: Cita[] = [
  { id: "c1", paciente: "Ana Restrepo", profesional: "Dr. Gómez", fecha: "2026-08-03", estado: "confirmada" },
  { id: "c2", paciente: "Luis Pérez", profesional: "Dra. Ruiz", fecha: "2026-08-03", estado: "pendiente" },
  { id: "c3", paciente: "Marta Ríos", profesional: "Dr. Gómez", fecha: "2026-08-04", estado: "pendiente" },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerCitasAPI(): Promise<Cita[]> {
  await esperar(300);
  return [...CITAS_DEMO];
}

export async function confirmarCitaAPI(id: string): Promise<void> {
  await esperar(300);
  CITAS_DEMO = CITAS_DEMO.map((c) => (c.id === id ? { ...c, estado: "confirmada" } : c));
}
