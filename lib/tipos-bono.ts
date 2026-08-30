// Antes había dos booleanos independientes (confirmado, usado), lo que
// permitía combinaciones que no deberían existir (usado=true con
// confirmado=false). Un solo campo "estado" con estos 3 valores fijos
// elimina esa posibilidad de raíz — siempre hay exactamente un estado.
export type EstadoBono = "pendiente" | "confirmado" | "utilizado";
