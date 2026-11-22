import type {ReactNode} from "react";
import type {Metadata} from "next";
import "./globals.css";
import {origin} from "@/lib/seo";
export const metadata:Metadata={
 metadataBase:new URL(origin),
 title:{default:"Parviz Bahrami | Senior Front-end Developer",template:"%s"},
 description:"Personal website of Parviz Bahrami, a senior front-end developer focused on Angular and thoughtful web experiences.",
};
export default function RootLayout({children}:{children:ReactNode}){
 return <html lang="en"><body>{children}</body></html>;
}
