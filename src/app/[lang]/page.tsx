import {notFound} from "next/navigation";
import {MinimalLanding} from "@/components/minimal-landing";
import {isLocale} from "@/lib/site";
export default async function Home({params}:{params:Promise<{lang:string}>}){
const {lang}=await params;
if(!isLocale(lang))notFound();
return <MinimalLanding lang={lang}/>;
}
