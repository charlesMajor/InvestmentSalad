"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTranslation } from "react-i18next";
import NavSettings from "@/components/navSettings";

const FormSchema = z.object({
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <div className="bg-_background1 dark:bg-_darkBackground1 drop-shadow-lg space-y-6 p-10 pb-16 md:block m-10 rounded-lg">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{t("SETTING_TITLE")}</h2>
        <p className="text-muted-foreground">{t("SETTING_DESCRIPTION")}</p>
      </div>
      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border h-[1px] w-full my-6"
      ></div>
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <NavSettings />
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
