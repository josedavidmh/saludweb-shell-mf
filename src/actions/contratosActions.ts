// src/actions/contratosActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerContratosAPI, crearContratoAPI, Contrato } from "@/services/servicioContratos";

export async function cargarContratos() {
  const contratos = await obtenerContratosAPI();
  dispatcher.dispatch({ type: "CONTRATOS_CARGADOS", payload: contratos });
}

export async function crearContrato(datos: Omit<Contrato, "id">) {
  const nuevo = await crearContratoAPI(datos);
  dispatcher.dispatch({ type: "CONTRATOS_CONTRATO_CREADO", payload: nuevo });
}
