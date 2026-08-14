"use client";

// src/components/RemoteLoader.tsx
//
// Pieza central del Shell como "coordinador estructural" (Actividad 3,
// sección 3.3): carga dinámicamente el script UMD de un microfrontend
// remoto y lo monta en un <div> usando el contrato mount(contenedor, props)
// / unmount(contenedor) que expone cada remoto en `window`.
//
// El Shell nunca importa código fuente de mf-agenda / mf-historia-clinica /
// mf-admisiones: solo conoce su URL pública y su nombre global. Esto es lo
// que permite que cada microfrontend se compile, versione y despliegue
// de forma independiente (composición en cliente, Actividad 3 sección 4.2).
import { useEffect, useRef } from "react";

type Props = {
  scriptUrl: string;
  globalName: string;
  mountProps?: Record<string, unknown>;
};

export function RemoteLoader({ scriptUrl, globalName, mountProps }: Props) {
  const contenedorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelado = false;

    function montar() {
      const remoto = (window as any)[globalName];
      if (!cancelado && remoto && contenedorRef.current) {
        remoto.mount(contenedorRef.current, mountProps ?? {});
      }
    }

    const scriptExistente = document.querySelector(`script[data-mf="${globalName}"]`) as HTMLScriptElement | null;

    if ((window as any)[globalName]) {
      montar();
    } else if (scriptExistente) {
      scriptExistente.addEventListener("load", montar);
    } else {
      const script = document.createElement("script");
      script.src = scriptUrl;
      script.async = true;
      script.dataset.mf = globalName;
      script.onload = montar;
      script.onerror = () => {
        // eslint-disable-next-line no-console
        console.error(`[Shell] No se pudo cargar el microfrontend "${globalName}" desde ${scriptUrl}`);
      };
      document.body.appendChild(script);
    }

    return () => {
      cancelado = true;
      const remoto = (window as any)[globalName];
      if (remoto && contenedorRef.current) {
        remoto.unmount(contenedorRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptUrl, globalName]);

  return (
    <div>
      <div ref={contenedorRef} data-remoto={globalName} />
    </div>
  );
}
