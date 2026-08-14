# SaludWeb SaaS — Prototipo funcional (Patrón Flux)

Prototipo del Front-End de SaludWeb SaaS que implementa el patrón **Flux**
Incluye los módulos: **Inicio de sesión**, **Agenda**, **Historia clínica**, **Servicios CUPS**, **Contratación** , **Profesionales**, **Admisión de usuarios** , **Facturación** y **RIPS**.

## Cómo ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`. Usuarios de prueba:

| Usuario     | Contraseña   | Rol            |
|-------------|--------------|----------------|
| admin       | admin123     | administrador  |
| facturador  | factura123   | facturador     |

## Mapeo con la arquitectura del documento

| Capa (documento Entrega 2) | Carpeta en el código                     |
|-----------------------------|-------------------------------------------|
| Dispatcher                  | `src/dispatcher.ts`                       |
| Acciones                    | `src/actions/*.ts`                        |
| Store (por dominio)         | `src/stores/*.ts`                         |
| Servicios (API/REST)        | `src/services/*.ts`                       |
| Vista                       | `src/app/**/page.tsx` + `src/components/` |

Cada módulo replica el mismo flujo unidireccional:

```
Vista → Acción → Dispatcher → Store → Vista actualizada
```

Por ejemplo, en Servicios CUPS: el formulario dispara `crearServicioCUPS()`
(acción) → la acción llama a `crearServicioCUPSAPI()` (servicio simulado) →
al recibir la respuesta, despacha `{ type: "CUPS_SERVICIO_CREADO" }` a través
del `dispatcher` → el `cupsStore` actualiza su lista → la vista se
re-renderiza automáticamente porque está suscrita al store con `useStore`.

## Estructura

```
src/
  dispatcher.ts            # punto único de despacho de acciones
  useStore.ts               # hook de conveniencia (React <-> store)
  services/                 # capa de datos simulada (reemplazable por fetch a Flask)
  stores/                   # un store por dominio funcional
  actions/                  # creadores de acciones (llaman al servicio y despachan)
  components/                # NavBar y RutaProtegida (guard de sesión)
  app/
    login/                  # Inicio de sesión
    dashboard/              # Panel general
    agenda/                 # Agenda de citas
    historia-clinica/       # Historia clínica (wizard: antecedentes -> consulta -> procedimientos)
    cups/                   # Configuración > Servicios CUPS
    contratos/              # Configuración > Contratación
    profesionales/          # Configuración > Profesionales
    admisiones/             # Gestión administrativa > Admisión de usuarios
    facturacion/            # Gestión administrativa > Facturación
    rips/                   # Cumplimiento normativo > Exportación de RIPS
```
## Nota sobre la sesión
El estado de sesión vive en memoria (`sesionStore`), por lo que se reinicia
al recargar la página.
