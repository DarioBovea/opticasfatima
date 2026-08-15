import Link from "next/link";

export const metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

export default function AdminIndexPage() {
  return (
    <div className="mt-36 px-6 pb-24">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-bold text-primary">Administración</h1>
        <Link
          href="/admin/bonos"
          className="block rounded-lg border border-primary p-4 text-primary transition hover:bg-light/10"
        >
          <span className="font-semibold">Bonos Regalo</span>
          <p className="text-sm text-primary/70">
            Ver registros y confirmar códigos canjeados
          </p>
        </Link>
      </div>
    </div>
  );
}
