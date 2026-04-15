import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import JoinStep2 from "@/app/components/join/step2";

export default async function JoinPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <JoinStep2 dict={dict as any} lang={lang} />;
}
