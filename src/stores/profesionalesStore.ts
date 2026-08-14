// src/stores/profesionalesStore.ts
import { dispatcher, Accion } from "@/dispatcher";
import { Profesional } from "@/services/servicioProfesionales";

type Listener = () => void;

class ProfesionalesStore {
  private profesionales: Profesional[] = [];
  private listeners: Listener[] = [];

  getProfesionales(): Profesional[] {
    return this.profesionales;
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
      case "PROFESIONALES_CARGADOS":
        this.profesionales = accion.payload;
        this.notificar();
        break;
      case "PROFESIONALES_PROFESIONAL_REGISTRADO":
        this.profesionales = [...this.profesionales, accion.payload];
        this.notificar();
        break;
    }
  }
}

export const profesionalesStore = new ProfesionalesStore();
dispatcher.register((accion) => profesionalesStore.handleAction(accion));
