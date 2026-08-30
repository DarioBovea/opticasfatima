// Antes había dos booleanos independientes (confirmado, usado), lo que
// permitía combinaciones que no deberían existir (usado=true con
// confirmado=false). Un solo campo "estado" con estos 3 valores fijos
// elimina esa posibilidad de raíz — siempre hay exactamente un estado.
export type EstadoBono = "pendiente" | "confirmado" | "utilizado";

// Valor fijo del descuento del Bono Regalo. Vive aquí (y no dentro de un
// archivo route.ts) porque Next.js solo permite exportar funciones como
// GET/POST desde esos archivos — cualquier otra constante ahí rompe el build.
export const VALOR_BONO_PESOS = 50000;
