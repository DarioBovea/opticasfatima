import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mt-36 px-6 text-center text-primary">Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
