"use client";

import { AppShell } from "@/components/AppShell";
import { RutaProtegida } from "@/components/RutaProtegida";
import { RemoteLoader } from "@/components/RemoteLoader";
import { REMOTOS } from "@/remotos.config";

export default function AdmisionesPage() {
  return (
    <RutaProtegida>
      <AppShell>
        <RemoteLoader scriptUrl={REMOTOS.admisiones} globalName="SaludWebMFAdmisiones" />
      </AppShell>
    </RutaProtegida>
  );
}
