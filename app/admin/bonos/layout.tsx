import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bonos Regalo",
  robots: { index: false, follow: false },
};

export default function BonosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
