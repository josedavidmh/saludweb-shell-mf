// src/services/servicioFacturacion.ts
// Simula el ciclo de facturación: se registra la factura con los servicios
// prestados y luego se envía a la DIAN, replicando el wireframe "Factura en
// proceso" de la Actividad 1 (resumen con subtotal, descuentos, total y
// estado DIAN).

export type Factura = {
  id: string;
  paciente: string;
  servicios: string; // nombres de servicios CUPS facturados (texto simple para el prototipo)
  subtotal: number;
  descuentos: number;
  total: number;
  estadoDian: "pendiente" | "enviada" | "rechazada";
};

let FACTURAS_DEMO: Factura[] = [
  {
    id: "f1",
    paciente: "Ana Restrepo Gómez",
    servicios: "Consulta general, Laboratorio - Hemograma",
    subtotal: 103500,
    descuentos: 0,
    total: 103500,
    estadoDian: "pendiente",
  },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerFacturasAPI(): Promise<Factura[]> {
  await esperar(300);
  return [...FACTURAS_DEMO];
}

export async function crearFacturaAPI(
  datos: Omit<Factura, "id" | "estadoDian">
): Promise<Factura> {
  await esperar(400);
  const nueva: Factura = { id: `f${FACTURAS_DEMO.length + 1}`, estadoDian: "pendiente", ...datos };
  FACTURAS_DEMO = [...FACTURAS_DEMO, nueva];
  return nueva;
}

export async function enviarFacturaDianAPI(facturaId: string): Promise<void> {
  await esperar(500); // simula la respuesta de la DIAN
  FACTURAS_DEMO = FACTURAS_DEMO.map((f) => (f.id === facturaId ? { ...f, estadoDian: "enviada" } : f));
}
