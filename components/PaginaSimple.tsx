import type { ReactNode } from "react";

export default function PaginaSimple({ children }: { children: ReactNode }) {
  return (
    <section
      className={[
        "mt-36 max-[820px]:mt-[7.5em] min-[1920px]:mt-[11.25rem]",
        "px-2 md:px-6 py-12 w-full mx-auto md:w-4/5 2xl:w-[70%]",
      ].join(" ")}
    >
      <div className="text-primary dark:text-darktext" data-aos="fade-up">{children}</div>
    </section>
  );
}
