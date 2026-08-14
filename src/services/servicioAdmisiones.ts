// src/services/servicioAdmisiones.ts
// Simula el registro de admisión de un paciente (identificación + EAPB)
// como paso previo a la atención (agenda / historia clínica).

export type Admision = {
  id: string;
  paciente: string;
  documento: string;
  eapb: string;
  fechaAdmision: string;
};

let ADMISIONES_DEMO: Admision[] = [
  { id: "a1", paciente: "Sofía León", documento: "1023456789", eapb: "Nueva EPS", fechaAdmision: "2026-08-01" },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerAdmisionesAPI(): Promise<Admision[]> {
  await esperar(300);
  return [...ADMISIONES_DEMO];
}

export async function registrarAdmisionAPI(datos: Omit<Admision, "id">): Promise<Admision> {
  await esperar(400);
  const nueva: Admision = { id: `a${ADMISIONES_DEMO.length + 1}`, ...datos };
  ADMISIONES_DEMO = [...ADMISIONES_DEMO, nueva];
  return nueva;
}
