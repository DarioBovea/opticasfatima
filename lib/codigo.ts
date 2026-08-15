// Genera un código alfanumérico corto y fácil de leer/dictar.
// Evita caracteres ambiguos (0/O, 1/I/L) para que no haya confusión
// cuando el cliente lo escriba a mano en WhatsApp.
const ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generarCodigo(longitud = 8) {
  let codigo = "";
  for (let i = 0; i < longitud; i++) {
    codigo += ALFABETO[Math.floor(Math.random() * ALFABETO.length)];
  }
  return codigo;
}
