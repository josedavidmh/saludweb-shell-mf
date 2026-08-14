// src/actions/facturacionActions.ts
import { dispatcher } from "@/dispatcher";
import { obtenerFacturasAPI, crearFacturaAPI, enviarFacturaDianAPI, Factura } from "@/services/servicioFacturacion";

export async function cargarFacturas() {
  const facturas = await obtenerFacturasAPI();
  dispatcher.dispatch({ type: "FACTURACION_CARGADAS", payload: facturas });
}

export async function crearFactura(datos: Omit<Factura, "id" | "estadoDian">) {
  const nueva = await crearFacturaAPI(datos);
  dispatcher.dispatch({ type: "FACTURACION_FACTURA_CREADA", payload: nueva });
}

export async function enviarFacturaDian(facturaId: string) {
  await enviarFacturaDianAPI(facturaId);
  dispatcher.dispatch({ type: "FACTURACION_ENVIADA_DIAN", payload: { facturaId } });
}
