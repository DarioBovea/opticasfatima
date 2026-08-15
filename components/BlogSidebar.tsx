import Link from "next/link";

const enlaces = [
  { slug: "vision-del-futuro", label: "Visión Del Futuro" },
  { slug: "lentes-progresivos", label: "Lentes Progresivos" },
  { slug: "lentes-formulados", label: "Lentes Formulados" },
  { slug: "gafas-progresivas", label: "Gafas Progresivas" },
  { slug: "gafas-para-ninos", label: "Gafas Para Niños" },
];

export default function BlogSidebar() {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {enlaces.map((item) => (
        <li key={item.slug}>
          <Link
            href={`/blog/${item.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-line bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:border-light hover:shadow-md"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-light transition group-hover:bg-primary" />
            <span className="font-semibold text-primary transition group-hover:text-light">
              {item.label}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
