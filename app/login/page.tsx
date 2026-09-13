import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem] px-6 text-center text-primary dark:text-darktext">Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
