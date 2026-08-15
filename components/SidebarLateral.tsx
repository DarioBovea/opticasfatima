import Link from "next/link";

export type EnlaceSidebar = { href: string; label: string };

export default function SidebarLateral({ enlaces }: { enlaces: EnlaceSidebar[] }) {
  return (
    <ul className="m-0 list-none p-0">
      {enlaces.map((item) => (
        <li key={item.href} className="relative mb-6 pl-[18px]">
          <span className="absolute left-0 top-1/2 -translate-y-1/2 border-y-[5px] border-l-[12px] border-y-transparent border-l-primary" />
          <Link href={item.href} className="font-semibold text-primary hover:text-light">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
