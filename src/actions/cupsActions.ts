// src/actions/cupsActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerServiciosCUPSAPI, crearServicioCUPSAPI, ServicioCUPS } from "@/services/servicioCUPS";

export async function cargarServiciosCUPS() {
  const servicios = await obtenerServiciosCUPSAPI();
  dispatcher.dispatch({ type: "CUPS_CARGADOS", payload: servicios });
}

export async function crearServicioCUPS(datos: Omit<ServicioCUPS, "id">) {
  const nuevo = await crearServicioCUPSAPI(datos);
  dispatcher.dispatch({ type: "CUPS_SERVICIO_CREADO", payload: nuevo });
}
