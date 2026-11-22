import type {MetadataRoute} from "next";
import {site} from "@/lib/site";
export default function sitemap():MetadataRoute.Sitemap{return ["en","fa"].map(lang=>({url:site.url+"/"+lang,lastModified:new Date(),changeFrequency:"monthly",priority:1,alternates:{languages:{en:site.url+"/en",fa:site.url+"/fa"}}}));}
