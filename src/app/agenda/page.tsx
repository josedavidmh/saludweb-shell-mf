"use client";

import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { RemoteLoader } from "@/components/RemoteLoader";
import { REMOTOS } from "@/remotos.config";

export default function AgendaPage() {
  return (
    <RutaProtegida>
      <AppShell>
        <RemoteLoader scriptUrl={REMOTOS.agenda} globalName="SaludWebMFAgenda" />
      </AppShell>
    </RutaProtegida>
  );
}
