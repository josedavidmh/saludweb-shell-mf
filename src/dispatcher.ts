// src/dispatcher.ts
//
// Punto único de entrada de todas las acciones de la aplicación.
// Ningún store se modifica directamente: todo cambio de estado pasa
// primero por dispatcher.dispatch(accion), que la propaga a los
// stores registrados. Esto garantiza el flujo unidireccional de Flux:
//
//   Vista -> Acción -> Dispatcher -> Store -> Vista actualizada
//
export type Accion = {
  type: string;
  payload?: any;
};

type ManejadorDeStore = (accion: Accion) => void;

class Dispatcher {
  private stores: ManejadorDeStore[] = [];
  private historial: Accion[] = []; // trazabilidad: útil para bitácora/auditoría

  register(manejador: ManejadorDeStore) {
    this.stores.push(manejador);
  }

  dispatch(accion: Accion) {
    this.historial.push({ ...accion, payload: accion.payload });
    // eslint-disable-next-line no-console
    console.log("[Flux] Acción despachada:", accion.type, accion.payload ?? "");
    this.stores.forEach((manejador) => manejador(accion));
  }

  getHistorial() {
    return this.historial;
  }
}

export const dispatcher = new Dispatcher();
