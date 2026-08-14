// src/stores/sesionStore.ts
// Estado GLOBAL: usuario y empresa (IPS) autenticados, compartido por
// toda la aplicación (encabezado, menú lateral, guards de ruta).

import { dispatcher, Accion } from "@/dispatcher";
import { Usuario } from "@/services/servicioSesion";

type EstadoSesion = {
  usuario: Usuario | null;
  cargando: boolean;
  error: string | null;
};

type Listener = () => void;

class SesionStore {
  private estado: EstadoSesion = { usuario: null, cargando: false, error: null };
  private listeners: Listener[] = [];

  getEstado(): EstadoSesion {
    return this.estado;
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
      case "SESION_INICIANDO":
        this.estado = { ...this.estado, cargando: true, error: null };
        this.notificar();
        break;
      case "SESION_INICIADA":
        this.estado = { usuario: accion.payload, cargando: false, error: null };
        this.notificar();
        break;
      case "SESION_ERROR":
        this.estado = { ...this.estado, cargando: false, error: accion.payload };
        this.notificar();
        break;
      case "SESION_CERRADA":
        this.estado = { usuario: null, cargando: false, error: null };
        this.notificar();
        break;
    }
  }
}

export const sesionStore = new SesionStore();
dispatcher.register((accion) => sesionStore.handleAction(accion));
