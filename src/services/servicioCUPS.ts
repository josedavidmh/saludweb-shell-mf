// src/services/servicioCUPS.ts
// Simula el CRUD de la tabla de servicios CUPS (Clasificación Única de
// Procedimientos en Salud) que se usa luego en Contratación y Facturación.

export type ServicioCUPS = {
  id: string;
  codigo: string;
  nombre: string;
  tarifa: number;
};

let CUPS_DEMO: ServicioCUPS[] = [
  { id: "s1", codigo: "890201", nombre: "Consulta general", tarifa: 65000 },
  { id: "s2", codigo: "890301", nombre: "Consulta especializada", tarifa: 95000 },
  { id: "s3", codigo: "902210", nombre: "Laboratorio - Hemograma", tarifa: 38500 },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerServiciosCUPSAPI(): Promise<ServicioCUPS[]> {
  await esperar(300);
  return [...CUPS_DEMO];
}

export async function crearServicioCUPSAPI(
  datos: Omit<ServicioCUPS, "id">
): Promise<ServicioCUPS> {
  await esperar(400);
  const nuevo: ServicioCUPS = { id: `s${CUPS_DEMO.length + 1}`, ...datos };
  CUPS_DEMO = [...CUPS_DEMO, nuevo];
  return nuevo;
}
