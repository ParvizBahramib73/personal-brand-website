export const site = {
  name: { en: "Parviz Bahrami", fa: "پرویز بهرامی" },
  title: { en: "Senior Front-end Developer", fa: "توسعه‌دهنده ارشد فرانت‌اند" },
  email: "rozbehb73@gmail.com",
  phone: "+98 9358022618",
  phoneHref: "+989358022618",
  location: { en: "Tehran, Iran", fa: "تهران، ایران" },
  linkedin: "https://www.linkedin.com/in/parviz-bahrami-b9030b123",
  github: "https://github.com/ParvizBahramib73",
  // Vercel URL should be set when it is known. Do not invent a live domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type Locale = "en" | "fa";
export const locales: Locale[] = ["en", "fa"];
export const isLocale = (s:string):s is Locale => locales.includes(s as Locale);

export const jobs = [
  {company:"Jumbula", title:{en:"Front-end Team Lead (Angular)",fa:"سرپرست تیم فرانت‌اند (Angular)"}, period:{en:"Feb 2021 – End date not confirmed",fa:"فوریه ۲۰۲۱ – تاریخ پایان تأیید نشده"}, details:{en:"Led front-end development, coordinated delivery with cross-functional teams, conducted code reviews and supported engineering best practices.",fa:"رهبری توسعه فرانت‌اند، هماهنگی با تیم‌های مختلف، بازبینی کد و ارتقای شیوه‌های مهندسی نرم‌افزار."}, tech:["Angular","TypeScript","NgRx","RxJS","SCSS","PrimeNG","AG Grid"]},
  {company:"Jumbula",title:{en:"Front-end Angular Developer",fa:"توسعه‌دهنده فرانت‌اند Angular"},period:{en:"Nov 2020 – Feb 2021",fa:"نوامبر ۲۰۲۰ – فوریه ۲۰۲۱"},details:{en:"Developed Angular interfaces, worked on legacy code, collaborated with designers, and improved responsiveness and maintainability.",fa:"توسعه رابط‌های Angular، کار با کدهای قدیمی، همکاری با طراحان و بهبود واکنش‌گرایی و نگهداشت‌پذیری."},tech:["Angular","AngularJS","TypeScript","JavaScript","RxJS","Cypress"]},
  {company:"Freelance",title:{en:"Front-end Developer",fa:"توسعه‌دهنده مستقل فرانت‌اند"},period:{en:"Jul 2015 – Jul 2019",fa:"ژوئیه ۲۰۱۵ – ژوئیه ۲۰۱۹"},details:{en:"Built responsive websites and user interfaces while working directly with clients to translate business needs into practical experiences.",fa:"طراحی و توسعه وب‌سایت‌ها و رابط‌های واکنش‌گرا با همکاری مستقیم با مشتریان و تبدیل نیازهای کسب‌وکار به تجربه‌های کاربردی."},tech:["Angular","TypeScript","JavaScript","jQuery","HTML","CSS","Bootstrap"]},
] as const;

export const skills = [
  {en:"Engineering",fa:"مهندسی فرانت‌اند",items:["Angular","AngularJS","TypeScript","JavaScript","ES6+","HTML","CSS","SSR","Lazy Loading","Routing"]},
  {en:"Interface & data",fa:"رابط کاربری و داده",items:["SCSS","Tailwind CSS","Bootstrap","Material Design","PrimeNG","AG Grid","Chart.js","Forms","Templates"]},
  {en:"Architecture & quality",fa:"معماری و کیفیت",items:["NgRx","RxJS","Design Patterns","Cypress","Lighthouse","Git","NPM","CI/CD"]},
  {en:"Tools & processes",fa:"ابزارها و فرایندها",items:["Azure DevOps","Slack","Scrum","Agile","Project Management","Big Data Concepts"]},
] as const;

export const projectNames = [
 "Jumbula Dashboard","Jumbula Marketplace","Jumbula Widget","Jumbula.com","Jumbula Old Dashboard","BeUnison Admin Dashboard",
 "Abshar Online","Abshar Marketplace","Abshar Admin Dashboard","AdminDashboard","Jumbula","Andromeda","FamilyHub"
] as const;
