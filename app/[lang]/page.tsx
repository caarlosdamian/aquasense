import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import SectionRenderer from "@/app/components/section-renderer";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return <SectionRenderer dict={dict} lang={lang} />;
}
