// src/services/servicioContratos.ts
// Simula el CRUD de contratos con entidades contratantes (EAPB).

export type Contrato = {
  id: string;
  entidadContratante: string;
  serviciosCubiertos: string; // nombres de servicios CUPS asociados (texto simple para el prototipo)
  vigenciaDesde: string;
  vigenciaHasta: string;
};

let CONTRATOS_DEMO: Contrato[] = [
  {
    id: "ct1",
    entidadContratante: "EPS Sura - Contributivo",
    serviciosCubiertos: "Consulta general, Consulta especializada",
    vigenciaDesde: "2026-01-01",
    vigenciaHasta: "2026-12-31",
  },
];

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function obtenerContratosAPI(): Promise<Contrato[]> {
  await esperar(300);
  return [...CONTRATOS_DEMO];
}

export async function crearContratoAPI(datos: Omit<Contrato, "id">): Promise<Contrato> {
  await esperar(400);
  const nuevo: Contrato = { id: `ct${CONTRATOS_DEMO.length + 1}`, ...datos };
  CONTRATOS_DEMO = [...CONTRATOS_DEMO, nuevo];
  return nuevo;
}
