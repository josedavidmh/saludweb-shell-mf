"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/useStore";
import { sesionStore } from "@/stores/sesionStore";

export function RutaProtegida({ children }: { children: ReactNode }) {
  const sesion = useStore(
    (l) => sesionStore.subscribe(l),
    () => sesionStore.getEstado()
  );
  const router = useRouter();

  useEffect(() => {
    if (!sesion.usuario) {
      router.replace("/login");
    }
  }, [sesion.usuario, router]);

  if (!sesion.usuario) return null;

  return <>{children}</>;
}
