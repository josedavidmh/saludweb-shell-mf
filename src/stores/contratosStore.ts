// src/stores/contratosStore.ts
// Estado del módulo Configuración > Contratos (contratación con EAPB).

import { dispatcher, Accion } from "@/dispatcher";
import { Contrato } from "@/services/servicioContratos";

type Listener = () => void;

class ContratosStore {
  private contratos: Contrato[] = [];
  private listeners: Listener[] = [];

  getContratos(): Contrato[] {
    return this.contratos;
  }

  subscribe(l: Listener) {
    this.listeners.push(l);
    return () => {
      this.listeners = this.listeners.filter((x) => x !== l);
    };
  }

  private notificar() {
    this.listeners.forEach((l) => l());
  }

  handleAction(accion: Accion) {
    switch (accion.type) {
      case "CONTRATOS_CARGADOS":
        this.contratos = accion.payload;
        this.notificar();
        break;
      case "CONTRATOS_CONTRATO_CREADO":
        this.contratos = [...this.contratos, accion.payload];
        this.notificar();
        break;
    }
  }
}

export const contratosStore = new ContratosStore();
dispatcher.register((accion) => contratosStore.handleAction(accion));
