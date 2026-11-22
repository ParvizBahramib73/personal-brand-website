import {notFound} from "next/navigation";
import {MinimalLanding} from "@/components/minimal-landing";
import {isLocale} from "@/lib/site";
import {pageMetadata,structuredProfile,jsonLd} from "@/lib/seo";
import type {Metadata} from "next";
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;return isLocale(lang)?pageMetadata(lang,"home"):{};
}
export default async function Home({params}:{params:Promise<{lang:string}>}) {
 const {lang}=await params;if(!isLocale(lang))notFound();
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structuredProfile(lang,"home"))}}/><MinimalLanding lang={lang}/></>;
}
