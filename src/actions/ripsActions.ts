// src/actions/ripsActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerExportacionesRipsAPI, generarRipsAPI, completarRipsAPI } from "@/services/servicioRips";

export async function cargarExportacionesRips() {
  const exportaciones = await obtenerExportacionesRipsAPI();
  dispatcher.dispatch({ type: "RIPS_CARGADAS", payload: exportaciones });
}

export async function generarRips(entidad: string, fechaInicio: string, fechaFin: string) {
  const nueva = await generarRipsAPI({ entidad, fechaInicio, fechaFin });
  dispatcher.dispatch({ type: "RIPS_GENERANDO", payload: nueva });

  // Procesamiento en segundo plano: cuando termina, despacha la actualización
  // de estado sin bloquear al usuario (misma cola que se ve en el wireframe).
  completarRipsAPI(nueva.id).then(() => {
    dispatcher.dispatch({ type: "RIPS_COMPLETADO", payload: { id: nueva.id } });
  });
}
