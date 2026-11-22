import type {ReactNode} from "react";
import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale,site} from "@/lib/site";
import "../globals.css";
export function generateStaticParams(){return [{lang:"en"},{lang:"fa"}];}
export async function generateMetadata({params}:{params:Promise<{lang:string}>}):Promise<Metadata>{
 const {lang}=await params;if(!isLocale(lang))return {};
 const title=lang==="en"?"Parviz Bahrami — Senior Front-end Developer":"پرویز بهرامی | توسعه‌دهنده ارشد فرانت‌اند";
 const description=lang==="en"?"Angular-focused senior front-end developer. Engineering scalable interfaces, exploring AI and useful products.":"توسعه‌دهنده ارشد فرانت‌اند با تمرکز بر Angular، رابط‌های مقیاس‌پذیر و علاقه‌مند به هوش مصنوعی و محصول.";
 return {metadataBase:new URL("https://parvizbahramib73.github.io"),title,description,alternates:{canonical:site.url+"/"+lang+"/",languages:{en:site.url+"/en/",fa:site.url+"/fa/"}},openGraph:{title,description,type:"website",locale:lang==="fa"?"fa_IR":"en_US",url:site.url+"/"+lang+"/",images:[site.url+"/"+lang+"/opengraph-image.png"]},twitter:{card:"summary_large_image",title,description},robots:{index:true,follow:true}};
}
export default async function LocaleLayout({children,params}:{children:ReactNode;params:Promise<{lang:string}>}){
 const {lang}=await params;if(!isLocale(lang))notFound();
 return <div className="locale-root" lang={lang} dir={lang==="fa"?"rtl":"ltr"}>{children}</div>;
}
