import type {Metadata} from "next";
import {MinimalLanding} from "@/components/minimal-landing";
import {pageMetadata,structuredProfile,jsonLd} from "@/lib/seo";
import {site} from "@/lib/site";
export const metadata:Metadata={
 ...pageMetadata("en","home"),
 alternates:{canonical:site.url+"/",languages:{en:site.url+"/en/",fa:site.url+"/fa/","x-default":site.url+"/"}},
};
export default function Home(){
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(structuredProfile("en","home"))}}/><MinimalLanding lang="en"/></>;
}
