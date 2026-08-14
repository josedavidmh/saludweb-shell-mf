// src/actions/sesionActions.ts
import { dispatcher } from "@/dispatcher";
import { iniciarSesionAPI } from "@/services/servicioSesion";

export async function iniciarSesion(empresa: string, usuario: string, password: string) {
  dispatcher.dispatch({ type: "SESION_INICIANDO" });
  try {
    const usuarioAutenticado = await iniciarSesionAPI(empresa, usuario, password);
    dispatcher.dispatch({ type: "SESION_INICIADA", payload: usuarioAutenticado });
  } catch (err: any) {
    dispatcher.dispatch({ type: "SESION_ERROR", payload: err.message });
  }
}

export function cerrarSesion() {
  dispatcher.dispatch({ type: "SESION_CERRADA" });
}
