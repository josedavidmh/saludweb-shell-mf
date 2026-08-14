// src/actions/agendaActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerCitasAPI, confirmarCitaAPI } from "@/services/servicioCitas";

export async function cargarAgenda() {
  const citas = await obtenerCitasAPI();
  dispatcher.dispatch({ type: "AGENDA_CARGADA", payload: citas });
}

export async function confirmarCita(id: string) {
  await confirmarCitaAPI(id);
  dispatcher.dispatch({ type: "AGENDA_CITA_CONFIRMADA", payload: { id } });
}
