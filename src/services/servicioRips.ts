// src/services/servicioRips.ts
// Simula la cola de procesamiento de exportación de RIPS (Registro
// Individual de Prestación de Servicios de Salud), replicando el wireframe
// "Exportación de RIPS JSON" de la Actividad 1: una exportación pasa de
// "en_proceso" a "completado" de forma asíncrona.

export type ExportacionRips = {
  id: string;
  entidad: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "en_proceso" | "completado";
};

let RIPS_DEMO: ExportacionRips[] = [
  { id: "r1", entidad: "EPS Sura - Contributivo", fechaInicio: "2026-07-01", fechaFin: "2026-07-15", estado: "completado" },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerExportacionesRipsAPI(): Promise<ExportacionRips[]> {
  await esperar(300);
  return [...RIPS_DEMO];
}

export async function generarRipsAPI(
  datos: Omit<ExportacionRips, "id" | "estado">
): Promise<ExportacionRips> {
  await esperar(300);
  const nueva: ExportacionRips = { id: `r${RIPS_DEMO.length + 1}`, estado: "en_proceso", ...datos };
  RIPS_DEMO = [...RIPS_DEMO, nueva];
  return nueva;
}

// Simula el procesamiento en segundo plano (cola) que termina marcando la
// exportación como completada, sin bloquear la interacción del usuario.
export async function completarRipsAPI(id: string): Promise<void> {
  await esperar(2000);
  RIPS_DEMO = RIPS_DEMO.map((r) => (r.id === id ? { ...r, estado: "completado" } : r));
}
