// src/useStore.ts
//
// Hook de conveniencia: conecta cualquier store de Flux con React usando
// useSyncExternalStore. No es una capa arquitectónica nueva (no reemplaza
// al store ni al dispatcher); es solo el "cableado" para que la Vista se
// re-renderice cuando el store notifica un cambio.

import { useSyncExternalStore } from "react";

export function useStore<T>(
  subscribe: (listener: () => void) => () => void,
  getSnapshot: () => T
): T {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
