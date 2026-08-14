// src/services/servicioProfesionales.ts
// Simula el CRUD de profesionales de salud, usados luego en Agenda e
// Historia Clínica (selección del profesional que atiende).
//
// "Profesionales" es, conceptualmente, un dato de referencia de mf-configuracion
// (diseño target, sin microfrontend propio todavía - ver Actividad 3, 3.2).
// Mientras tanto, el Shell actúa como su fuente de verdad y la comparte con
// mf-agenda y mf-historia-clinica a través de localStorage, bajo una clave
// con contrato explícito (saludweb:profesionales). Esto reemplaza a un
// backend REST real: cualquier microfrontend que lea esa clave ve los mismos
// datos, incluida la sincronización entre pestañas ya montadas.

export type Profesional = {
  id: string;
  nombre: string;
  documento: string;
  especialidad: string;
  registroMedico: string;
};

const CLAVE_STORAGE = "saludweb:profesionales";

const PROFESIONALES_SEED: Profesional[] = [
  { id: "pr1", nombre: "Dr. Gómez", documento: "79.456.123", especialidad: "Medicina general", registroMedico: "RM-10234" },
  { id: "pr2", nombre: "Dra. Ruiz", documento: "52.789.456", especialidad: "Psicología", registroMedico: "RM-10891" },
];

function leer(): Profesional[] {
  if (typeof window === "undefined") return PROFESIONALES_SEED;
  try {
    const guardado = window.localStorage.getItem(CLAVE_STORAGE);
    if (guardado) return JSON.parse(guardado);
    window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(PROFESIONALES_SEED));
    return PROFESIONALES_SEED;
  } catch {
    return PROFESIONALES_SEED;
  }
}

function guardar(lista: Profesional[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLAVE_STORAGE, JSON.stringify(lista));
    // El evento nativo "storage" no dispara en la misma pestaña que escribe;
    // este CustomEvent es para microfrontends ya montados en la misma vista.
    window.dispatchEvent(new CustomEvent("saludweb:profesionales-actualizados", { detail: lista }));
  } catch {
    // localStorage puede fallar en modo privado/incógnito; el registro
    // sigue funcionando en memoria para la sesión actual.
  }
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerProfesionalesAPI(): Promise<Profesional[]> {
  await esperar(300);
  return [...leer()];
}

export async function registrarProfesionalAPI(datos: Omit<Profesional, "id">): Promise<Profesional> {
  await esperar(400);
  const nuevo: Profesional = { id: `pr${Date.now()}`, ...datos };
  const actualizados = [...leer(), nuevo];
  guardar(actualizados);
  return nuevo;
}
