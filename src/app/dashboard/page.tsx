"use client";

import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { useStore } from "@/useStore";
import { sesionStore } from "@/stores/sesionStore";

export default function DashboardPage() {
  const sesion = useStore(
    (l) => sesionStore.subscribe(l),
    () => sesionStore.getEstado()
  );

  return (
    <RutaProtegida>
      <AppShell>
        <h1>Panel general</h1>
        <p>
          Bienvenido(a), {sesion.usuario?.nombre}. Este panel demuestra el patrón <b>Flux</b>: cada
          módulo del menú (Agenda, Historia Clínica, Servicios CUPS, Contratación, Profesionales,
          Admisiones) tiene su propio store, pero todos comparten el mismo <code>dispatcher</code>{" "}
          central y consumen el estado global de sesión definido aquí.
        </p>
      </AppShell>
    </RutaProtegida>
  );
}
