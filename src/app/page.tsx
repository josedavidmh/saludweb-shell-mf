"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/useStore";
import { sesionStore } from "@/stores/sesionStore";

export default function Home() {
  const sesion = useStore(
    (l) => sesionStore.subscribe(l),
    () => sesionStore.getEstado()
  );
  const router = useRouter();

  useEffect(() => {
    router.replace(sesion.usuario ? "/dashboard" : "/login");
  }, [sesion.usuario, router]);

  return null;
}
