// src/services/servicioSesion.ts
//
// Capa de Servicios (REST) — versión simulada.
// En producción, este archivo haría fetch(`${API_URL}/api/auth/login`, ...)
// contra el backend Flask. Por ahora simula la latencia de red y valida
// contra un usuario de prueba, para que el prototipo sea 100% ejecutable
// sin backend.

export type Usuario = {
  id: string;
  nombre: string;
  rol: "administrador" | "coordinador" | "profesional" | "facturador" | "auxiliar";
  empresa: string;
};

const USUARIOS_DEMO: Record<string, { password: string; usuario: Usuario }> = {
  admin: {
    password: "admin123",
    usuario: { id: "u1", nombre: "Jose David", rol: "administrador", empresa: "IPS Demo" },
  },
  facturador: {
    password: "factura123",
    usuario: { id: "u2", nombre: "Ana Restrepo", rol: "facturador", empresa: "IPS Demo" },
  },
};

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function iniciarSesionAPI(
  empresa: string,
  usuario: string,
  password: string
): Promise<Usuario> {
  await esperar(500); // simula latencia de red
  const registro = USUARIOS_DEMO[usuario];
  if (!registro || registro.password !== password) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  return { ...registro.usuario, empresa };
}
