// src/stores/agendaStore.ts
// Estado del módulo Agenda (dominio propio, independiente de los demás).

import { dispatcher, Accion } from "@/dispatcher";
import { Cita } from "@/services/servicioCitas";

type Listener = () => void;

class AgendaStore {
  private citas: Cita[] = [];
  private listeners: Listener[] = [];

  getCitas(): Cita[] {
    return this.citas;
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
      case "AGENDA_CARGADA":
        this.citas = accion.payload;
        this.notificar();
        break;
      case "AGENDA_CITA_CONFIRMADA":
        this.citas = this.citas.map((c) =>
          c.id === accion.payload.id ? { ...c, estado: "confirmada" } : c
        );
        this.notificar();
        break;
    }
  }
}

export const agendaStore = new AgendaStore();
dispatcher.register((accion) => agendaStore.handleAction(accion));
