// src/remotos.config.ts
// Punto único de configuración de las URLs de los microfrontends remotos.
// En local, apunta a los puertos de "npm run preview" de cada repo remoto
// (ver README de cada uno). En producción, se sobrescribe con variables
// de entorno NEXT_PUBLIC_* en tiempo de build (Next.js las inlina en el
// bundle estático, compatible con output: "export").
export const REMOTOS = {
  agenda: process.env.NEXT_PUBLIC_MF_AGENDA_URL || "https://josedavidmh.github.io/saludweb-mf-agenda/mf-agenda.umd.js",
  historiaClinica:
    process.env.NEXT_PUBLIC_MF_HISTORIA_URL || "http://localhost:5175/mf-historia-clinica.umd.js",
  admisiones:
    process.env.NEXT_PUBLIC_MF_ADMISIONES_URL || "http://localhost:5176/mf-admisiones.umd.js",
} as const;
