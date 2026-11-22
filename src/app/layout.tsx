import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parviz Bahrami — Senior Front-end Developer",
  description: "Personal website of Parviz Bahrami, senior front-end developer specializing in Angular.",
  metadataBase: new URL("https://parvizbahramib73.github.io"),
  alternates: { canonical: "https://parvizbahramib73.github.io/personal-brand-website/" },
  openGraph: {
    title: "Parviz Bahrami — Senior Front-end Developer",
    description: "Software engineer building useful digital experiences.",
    url: "https://parvizbahramib73.github.io/personal-brand-website/",
    type: "website",
  },
};
export default function RootLayout({children}:{children:ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
