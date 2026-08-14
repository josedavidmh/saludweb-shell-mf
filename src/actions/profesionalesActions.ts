// src/actions/profesionalesActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerProfesionalesAPI, registrarProfesionalAPI, Profesional } from "@/services/servicioProfesionales";

export async function cargarProfesionales() {
  const profesionales = await obtenerProfesionalesAPI();
  dispatcher.dispatch({ type: "PROFESIONALES_CARGADOS", payload: profesionales });
}

export async function registrarProfesional(datos: Omit<Profesional, "id">) {
  const nuevo = await registrarProfesionalAPI(datos);
  dispatcher.dispatch({ type: "PROFESIONALES_PROFESIONAL_REGISTRADO", payload: nuevo });
}
