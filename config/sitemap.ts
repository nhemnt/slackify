import { docsConfig } from "./docs"

export function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the URLs we know already-->
     <url>
       <loc>${process.env.NEXT_PUBLIC_APP_URL}</loc>
     </url>
     ${Object.values(docsConfig)
       .flatMap((x: any) => x)
       .flatMap((x) => (x.items ? x.items : x))
       .map(({ href }) => {
         return `
       <url>
           <loc>${`${process.env.NEXT_PUBLIC_APP_URL}${href}`}</loc>
       </url>
     `
       })
       .join("")}
   </urlset>
 `
}
