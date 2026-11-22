import Link from "next/link";
export default function RootPage() {
 return <main style={{minHeight:"100vh",display:"grid",placeContent:"center",fontFamily:"Arial,sans-serif",padding:"2rem",background:"#fafaf8",color:"#222b2b"}}>
  <meta httpEquiv="refresh" content="0;url=en/" />
  <h1>Parviz Bahrami</h1>
  <p>Choose a language / زبان موردنظر را انتخاب کنید</p>
  <p><Link href="/en">English</Link> · <Link href="/fa">فارسی</Link></p>
 </main>;
}
