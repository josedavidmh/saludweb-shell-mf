"use client";

import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { RemoteLoader } from "@/components/RemoteLoader";
import { REMOTOS } from "@/remotos.config";

export default function HistoriaClinicaPage() {
  return (
    <RutaProtegida>
      <AppShell>
        <RemoteLoader scriptUrl={REMOTOS.historiaClinica} globalName="SaludWebMFHistoriaClinica" />
      </AppShell>
    </RutaProtegida>
  );
}
