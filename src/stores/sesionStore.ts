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

const CLAVE_STORAGE = "saludweb:sesion";

// El estado vivía únicamente en memoria: cualquier recarga completa de la
// página (F5, o cualquier navegación que el navegador resuelva como carga
// dura en vez de enrutamiento de Next.js) reiniciaba el módulo y con eso
// se perdía "usuario", así que RutaProtegida mandaba de vuelta a /login
// aunque la sesión siguiera siendo válida. Se persiste en sessionStorage
// (se limpia solo al cerrar la pestaña) para que sobreviva a una recarga.
function leerUsuarioPersistido(): Usuario | null {
  if (typeof window === "undefined") return null;
  try {
    const guardado = window.sessionStorage.getItem(CLAVE_STORAGE);
    return guardado ? (JSON.parse(guardado) as Usuario) : null;
  } catch {
    return null;
  }
}

function persistirUsuario(usuario: Usuario | null) {
  if (typeof window === "undefined") return;
  try {
    if (usuario) {
      window.sessionStorage.setItem(CLAVE_STORAGE, JSON.stringify(usuario));
    } else {
      window.sessionStorage.removeItem(CLAVE_STORAGE);
    }
  } catch {
    // sessionStorage puede fallar en modo privado/incógnito; la sesión
    // simplemente no sobrevive a un refresh en ese caso, sin romper el login.
  }
}

class SesionStore {
  private estado: EstadoSesion = { usuario: leerUsuarioPersistido(), cargando: false, error: null };
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
        persistirUsuario(accion.payload);
        this.notificar();
        break;
      case "SESION_ERROR":
        this.estado = { ...this.estado, cargando: false, error: accion.payload };
        this.notificar();
        break;
      case "SESION_CERRADA":
        this.estado = { usuario: null, cargando: false, error: null };
        persistirUsuario(null);
        this.notificar();
        break;
    }
  }
}

export const sesionStore = new SesionStore();
dispatcher.register((accion) => sesionStore.handleAction(accion));
