"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import StaticPageTemplate from "@/components/staticPageTemplate";
import SaladImg from "@/../public/assets/img/page404/saladOnFire.png";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <StaticPageTemplate isBlurBg={false}>
      <div className="hidden lg:block">
        <svg
          className="-z-10 absolute w-[100vw] h-[125vh] min-h-[800px] right-0 bottom-0 fill-_primary"
          viewBox="0 0 1203 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M923.385 1300.77L958.424 1129.37C993.463 957.974 1063.06 614.305 909.403 395.322C755.263 175.465 377.874 80.2951 188.695 31.8353L-1.54376e-05 -15.7496L894.936 -511L959.334 -394.63C1024.22 -277.386 1153.01 -44.6464 1282.29 188.968C1411.09 421.707 1540.37 655.321 1604.77 771.691L1669.17 888.061L923.385 1300.77Z"
          />
        </svg>
        <div className="bg-_primary -z-10 absolute h-screen w-[15vw] right-0"></div>
      </div>
      <div className="flex items-center flex-col-reverse md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center gap-4 md:gap-6 w-full h-screen">
          <div className="text-_blackText text-4xl font-extrabold">{t("PAGE_NOT_FOUND")}</div>
          <div className="text-center text-neutral-500 text-base">
            {t("SORRY_NOT_FOUND_TEXT")}
            <br />
            {t("FUNNY_NOT_FOUND_TEXT")}
            <br />
            {t("RETURN_NOT_FOUND_TEXT")}
          </div>
          <Link href="/app">
            <Button variant={"page404"} size={"roundPage404"}>
              {t("BUTTON_NOT_FOUND")}
            </Button>
          </Link>
        </div>
        <div className="flex-1 w-full flex items-center justify-center h-screenh-full mt-16 md:mt-0 md:h-screen">
          <Image
            className="object-contain float-end w-[28rem] h-[28rem] md:w-[32rem] md:h-[32rem] 2xl:w-[38rem] 2xl:h-[38rem] "
            src={SaladImg}
            alt={"SaladImg"}
          />
        </div>
      </div>
    </StaticPageTemplate>
  );
}
