import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import JoinStep3 from "@/app/components/join/step3";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return <JoinStep3 dict={dict as any} lang={lang} />;
}
