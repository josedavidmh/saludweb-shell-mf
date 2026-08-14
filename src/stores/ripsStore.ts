// src/stores/ripsStore.ts
import { dispatcher, Accion } from "@/dispatcher";
import { ExportacionRips } from "@/services/servicioRips";

type Listener = () => void;

class RipsStore {
  private exportaciones: ExportacionRips[] = [];
  private listeners: Listener[] = [];

  getExportaciones(): ExportacionRips[] {
    return this.exportaciones;
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
      case "RIPS_CARGADAS":
        this.exportaciones = accion.payload;
        this.notificar();
        break;
      case "RIPS_GENERANDO":
        this.exportaciones = [...this.exportaciones, accion.payload];
        this.notificar();
        break;
      case "RIPS_COMPLETADO":
        this.exportaciones = this.exportaciones.map((r) =>
          r.id === accion.payload.id ? { ...r, estado: "completado" } : r
        );
        this.notificar();
        break;
    }
  }
}

export const ripsStore = new RipsStore();
dispatcher.register((accion) => ripsStore.handleAction(accion));
