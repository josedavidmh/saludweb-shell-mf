// src/actions/admisionesActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerAdmisionesAPI, registrarAdmisionAPI, Admision } from "@/services/servicioAdmisiones";

export async function cargarAdmisiones() {
  const admisiones = await obtenerAdmisionesAPI();
  dispatcher.dispatch({ type: "ADMISIONES_CARGADAS", payload: admisiones });
}

export async function registrarAdmision(datos: Omit<Admision, "id">) {
  const nueva = await registrarAdmisionAPI(datos);
  dispatcher.dispatch({ type: "ADMISIONES_REGISTRADA", payload: nueva });
}
