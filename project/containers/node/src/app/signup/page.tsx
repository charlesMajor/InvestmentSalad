"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import SignUpForm from "@/components/auth/signUp/signUpForm";
import { AuthPageTemplate } from "@/components/authPageTemplate";

//style into tailwind
export default function SignUpView() {
  const { t } = useTranslation();

  return (
    <AuthPageTemplate isBlurBg={false} isArrowBlack={true}>
      <div className="grid grid-cols-1 lg:grid-cols-2 box-border h-screen">
        <div className="m-2 px-[8vw] self-center">
          <p className="font-medium break-words text-2xl">{t("SIGN_UP_PAGE_TITLE")}</p>
          <SignUpForm />
          <p className="lg:hidden text-[calc(0.25vw+12px)] text-center underline">
            <Link href="/login">{t("SIGN_UP_PAGE_LOGIN_QUESTION")}</Link>
          </p>
        </div>
        <div
          className="m-2 rounded-r-xl relative overflow-hidden hidden lg:block box-border"
          style={{ background: "linear-gradient(169deg, #0A0D59 0%, #430A66 100%)" }}
        >
          <div
            className="rounded-full absolute size-[calc(20.5vw+100px)] transform translate-x-[10vw] translate-y-[-25%] rotate-[92.99deg]"
            style={{
              background:
                "linear-gradient(128deg, #477DC8 24%, rgba(33.84, 31.70, 138.34, 0.81) 100%)",
            }}
          ></div>
          <div
            className="rounded-full absolute size-[calc(12.5vw+100px)] transform translate-x-[32.5vw] translate-y-[-45%] bg-[linear-gradient(163deg, #17478A 0%, #17478A 0%, rgba(94.63, 70.52, 191.04, 0.80) 100%)]"
            style={{
              background:
                "linear-gradient(163deg, #17478A 0%, #17478A 0%, rgba(94.63, 70.52, 191.04, 0.80) 100%)",
            }}
          ></div>
          <div className="rounded-full absolute size-[calc(4vw+25px)] transform translate-x-[37.5vw] translate-y-[calc(31vh+250px)] bg-[linear-gradient(128deg,rgba(71,125.08,199.54,0.45)24%,rgba(33.84,31.70,138.34,0.36)100%)]"></div>
          <div className="rounded-full absolute size-[calc(3vw+20px)] transform translate-x-[35vw] translate-y-[calc(37.5vh+250px)] rotate-[89.09deg] bg-[linear-gradient(128deg,rgba(71,125.08,199.54,0.45)24%,rgba(33.84,31.70,138.34,0.36)100%)]"></div>
          <div className="rounded-full absolute size-[calc(3vw+30px)] transform translate-x-[5vw] translate-y-[calc(37.5vh+275px)] rotate-[89.09deg] bg-[linear-gradient(128deg,rgba(71,125.08,199.54,0.45)24%,rgba(33.84,31.70,138.34,0.36)100%)]"></div>
          <div className="rounded-full absolute size-[calc(7.5vw+30px)] transform translate-x-[7.5vw] translate-y-[calc(37.5vh+300px)] rotate-[89.09deg] bg-[linear-gradient(128deg,rgba(71,125.08,199.54,0.65)24%,rgba(33.84,31.70,138.34,0.53)100%)]"></div>
          <div className="absolute inset-0 flex flex-col justify-center">
            <div className="w-full flex flex-col items-center text-white">
              <img
                className="w-32"
                src="/assets/img/Investment_salad_icon_wht.svg"
                alt="Logo Investment Salad ©"
              />
            </div>
            <div className="w-full flex flex-col">
              <p className="text-center font-bold text-white break-words text-[calc(2.25vw+20px)]">
                {t("SIGN_UP_PAGE_WELCOME")}
              </p>
              <p className="text-center font-light text-white break-words text-[calc(0.60vw+10px)]">
                <Link href="/login">{t("SIGN_UP_PAGE_LOGIN_QUESTION")}</Link>
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <Link href="/login">
                <Button
                  className="mt-8 w-[calc(10.5vw+50px)] py-[calc(0.8vw+15px)] text-[calc(0.65vw+10px)]"
                  variant={"blueGradient"}
                >
                  {t("SIGN_UP_PAGE_LOG_IN_BUTTON")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthPageTemplate>
  );
}
