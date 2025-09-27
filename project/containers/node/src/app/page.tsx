"use client";

import { useEffect } from "react";
import i18n, { t } from "i18next";
import { useTranslation } from "react-i18next";
import { CardContent, CardProps } from "@mui/material";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Copyright from "@/components/ui/copyright";
import StaticPageTemplate from "@/components/staticPageTemplate";

export default function LandingPage() {
  const { t } = useTranslation();

  return (
    <StaticPageTemplate isBlurBg={true}>
      <main className="grid grid-cols-6 mt-24">
        <div className="col-span-6 xl:col-span-3">
          <div className="flex items-center justify-center">
            <TitleCard
              title={t("TITLE_LANDING")}
              content={t("TITLE_DESC_LANDING")}
              className="border-none shadow-none mx-7"
            />
          </div>

          <div className="ml-7 gap-4 mb-4 flex justify-normal flex-col sm:flex-row">
            <Button variant={"homePageBlue"} size={"roundHomePage"} asChild>
              <Link href="/signup">{t("CREATE_ACCOUNT_BUTTON")}</Link>
            </Button>
            <Button variant={"homePageTransparent"} size={"roundHomePage"} asChild>
              <Link href="/login">{t("LOGIN_BUTTON")}</Link>
            </Button>
          </div>

          <div className="mx-7 my-16 grid grid-cols-2 gap-6">
            <InfoCard
              title={t("CUSTOMIZABLE_TITLE_LANDING")}
              content={t("CUSTOMIZABLE_DESC_LANDING")}
              className="bg-slate-300 w-auto col-span-2 sm:col-span-1"
            />
            <InfoCard
              title={t("ONE_PLACE_TITLE_LANDING")}
              content={t("ONE_PLACE_DESC_LANDING")}
              className="w-auto col-span-2 sm:col-span-1"
            />
            <div className="col-span-2">
              <InfoCard
                title={t("INFO_TITLE_LANDING")}
                content={t("INFO_DESC_LANDING")}
                className="w-auto col-span-2 sm:col-span-1"
              />
            </div>
          </div>
        </div>

        <div className="col-span-6 xl:col-span-3">
          <div className="flex items-center justify-center">
            <img src="/assets/img/landing/graphic.png" alt="graphic" className="w-full" />
          </div>
        </div>
      </main>
      <footer>
        <Copyright />
      </footer>
    </StaticPageTemplate>
  );
}

function TitleCard({ title, content, className, ...props }: CardProps) {
  return (
    <Card className={cn("", className)} {...props}>
      <CardHeader className="p-4">
        <CardTitle className="text-zinc-800 text-4xl font-bold leading-snug ">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-_primary to-_secondary">
            {t("APP_NAME")}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-zinc-800 text-lg font-normal leading-snug">{content}</p>
      </CardContent>
    </Card>
  );
}

function InfoCard({ title, content, className, ...props }: CardProps) {
  return (
    <Card className={cn("rounded-3xl overflow-hidden", className)} {...props}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg sm:text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
