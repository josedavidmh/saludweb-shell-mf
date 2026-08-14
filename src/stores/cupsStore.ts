// src/stores/cupsStore.ts
// Estado del módulo Configuración > Servicios (catálogo CUPS).

import { dispatcher, Accion } from "@/dispatcher";
import { ServicioCUPS } from "@/services/servicioCUPS";

type Listener = () => void;

class CUPSStore {
  private servicios: ServicioCUPS[] = [];
  private listeners: Listener[] = [];

  getServicios(): ServicioCUPS[] {
    return this.servicios;
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
      case "CUPS_CARGADOS":
        this.servicios = accion.payload;
        this.notificar();
        break;
      case "CUPS_SERVICIO_CREADO":
        this.servicios = [...this.servicios, accion.payload];
        this.notificar();
        break;
    }
  }
}

export const cupsStore = new CUPSStore();
dispatcher.register((accion) => cupsStore.handleAction(accion));
