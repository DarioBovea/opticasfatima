import Link from "next/link";

export const metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
};

export default function AdminIndexPage() {
  return (
    <div className="mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem] px-6 pb-24">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-bold text-primary dark:text-darktext">Administración</h1>
        <Link
          href="/admin/bonos"
          className="block rounded-lg border border-primary p-4 text-primary transition hover:bg-light/10 dark:border-light/40 dark:text-darktext dark:hover:bg-light/10"
        >
          <span className="font-semibold">Bonos Regalo</span>
          <p className="text-sm text-primary/70 dark:text-darktext/70">
            Ver registros y confirmar códigos canjeados
          </p>
        </Link>
      </div>
    </div>
  );
}
