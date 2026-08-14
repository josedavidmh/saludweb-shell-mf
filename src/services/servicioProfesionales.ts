// src/services/servicioProfesionales.ts
// Simula el CRUD de profesionales de salud, usados luego en Agenda e
// Historia Clínica (selección del profesional que atiende).

export type Profesional = {
  id: string;
  nombre: string;
  documento: string;
  especialidad: string;
  registroMedico: string;
};

let PROFESIONALES_DEMO: Profesional[] = [
  { id: "pr1", nombre: "Dr. Gómez", documento: "79.456.123", especialidad: "Medicina general", registroMedico: "RM-10234" },
  { id: "pr2", nombre: "Dra. Ruiz", documento: "52.789.456", especialidad: "Psicología", registroMedico: "RM-10891" },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerProfesionalesAPI(): Promise<Profesional[]> {
  await esperar(300);
  return [...PROFESIONALES_DEMO];
}

export async function registrarProfesionalAPI(datos: Omit<Profesional, "id">): Promise<Profesional> {
  await esperar(400);
  const nuevo: Profesional = { id: `pr${PROFESIONALES_DEMO.length + 1}`, ...datos };
  PROFESIONALES_DEMO = [...PROFESIONALES_DEMO, nuevo];
  return nuevo;
}
