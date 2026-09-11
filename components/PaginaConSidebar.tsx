import type { ReactNode } from "react";

export default function PaginaConSidebar({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <section
      className={[
        "mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem]",
        "flex flex-col lg:flex-row",
        "px-6 w-full mx-auto md:w-4/5 2xl:w-[70%]",
        "min-h-[calc(100vh-640px)]",
      ].join(" ")}
    >
      <aside
        className={[
          "shrink-0 bg-light/10 p-6",
          "lg:relative",
          "dark:bg-darkcard/40",
        ].join(" ")}
        data-aos="fade-down"
      >
        {sidebar}
      </aside>
      <div className="flex-1 space-y-4 p-6 text-primary dark:text-darktext lg:p-[60px_20px_60px_60px]" data-aos="fade-up">
        {children}
      </div>
    </section>
  );
}
