// src/stores/facturacionStore.ts
import { dispatcher, Accion } from "@/dispatcher";
import { Factura } from "@/services/servicioFacturacion";

type Listener = () => void;

class FacturacionStore {
  private facturas: Factura[] = [];
  private listeners: Listener[] = [];

  getFacturas(): Factura[] {
    return this.facturas;
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
      case "FACTURACION_CARGADAS":
        this.facturas = accion.payload;
        this.notificar();
        break;
      case "FACTURACION_FACTURA_CREADA":
        this.facturas = [...this.facturas, accion.payload];
        this.notificar();
        break;
      case "FACTURACION_ENVIADA_DIAN":
        this.facturas = this.facturas.map((f) =>
          f.id === accion.payload.facturaId ? { ...f, estadoDian: "enviada" } : f
        );
        this.notificar();
        break;
    }
  }
}

export const facturacionStore = new FacturacionStore();
dispatcher.register((accion) => facturacionStore.handleAction(accion));
