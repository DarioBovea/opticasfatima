import { redirect } from "next/navigation";

// El formulario de Registro se unificó con el de Bono Regalo (ambos
// pedían prácticamente los mismos datos). Esta página se deja como
// redirección por si alguien tenía guardado el enlace viejo.
export default function RegistroPage() {
  redirect("/bono-regalo");
}
