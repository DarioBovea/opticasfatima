import { redirect } from "next/navigation";
// redirección por si alguien tenía guardado el enlace viejo.
export default function RegistroPage() {
  redirect("/bono-regalo");
}
