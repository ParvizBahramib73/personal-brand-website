import type { MetadataRoute } from "next";
import {base,pageUrl} from "@/lib/seo";
import type {Locale} from "@/lib/site";
export const dynamic = "force-static";
const languages:Locale[] = ["en","fa"];
export default function sitemap():MetadataRoute.Sitemap {
 const homeAlternates={languages:{en:pageUrl("en","home"),fa:pageUrl("fa","home"),"x-default":base+"/"}};
 const detailAlternates={languages:{en:pageUrl("en","details"),fa:pageUrl("fa","details"),"x-default":pageUrl("en","details")}};
 return [
  {url:base+"/",changeFrequency:"monthly",priority:1,alternates:homeAlternates},
  ...languages.flatMap(lang=>[
   {url:pageUrl(lang,"home"),changeFrequency:"monthly" as const,priority:0.9,alternates:homeAlternates},
   {url:pageUrl(lang,"details"),changeFrequency:"monthly" as const,priority:0.8,alternates:detailAlternates},
  ]),
 ];
}
