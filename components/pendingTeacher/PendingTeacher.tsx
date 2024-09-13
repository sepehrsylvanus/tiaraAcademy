import { getMessages, getTranslations } from "next-intl/server";

export default async function PendingTeacher() {
  const translations = (await getMessages()) as any;
  const t = translations.PendingTeacher;

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
          {t.approvalPending}
        </div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t.title}
        </h1>
        <p className="mt-4 text-muted-foreground">{t.description}</p>
      </div>
    </div>
  );
}
