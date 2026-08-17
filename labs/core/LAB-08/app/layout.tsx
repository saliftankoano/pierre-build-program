import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "LAB-08 · Pierre Build Program", description: "Interactive build-and-incident lab" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
