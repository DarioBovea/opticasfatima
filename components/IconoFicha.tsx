export default function IconoFicha({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      role="img"
      aria-label={alt}
      className="mb-1 inline-block h-9 w-9 bg-primary dark:bg-darktext"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
