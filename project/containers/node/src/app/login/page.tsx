"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import LoginForm from "@/components/auth/logIn/loginForm";
import { AuthPageTemplate } from "@/components/authPageTemplate";

//style into tailwind
export default function LoginView() {
  const { t } = useTranslation();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleForgotPasswordClick = () => {
    toast(t("LOGIN_PAGE_FORGOT_PASSWORD_MESSAGE"));
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1024);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <AuthPageTemplate isBlurBg={false} isArrowBlack={isSmallScreen}>
      <div className="grid grid-cols-1 lg:grid-cols-2 box-border h-screen">
        <div
          className="m-2 rounded-r-xl relative overflow-hidden hidden lg:block box-border"
          style={{ background: "linear-gradient(169deg, #0A0D59 0%, #430A66 100%)" }}
        >
          <div
            className="rounded-full absolute"
            style={{
              background:
                "linear-gradient(163deg, #17478A 0%, #17478A 0%, rgba(94.63, 70.52, 191.04, 0.80) 100%)",
              width: "calc(12.5vw + 100px)",
              height: "calc(12.5vw + 100px)",
              transform: "translate(-5vw, -40%)",
            }}
          ></div>
          <div
            className="rounded-full absolute"
            style={{
              background:
                "linear-gradient(128deg, #477DC8 24%, rgba(33.84, 31.70, 138.34, 0.81) 100%)",
              width: "calc(20.5vw + 100px)",
              height: "calc(20.5vw + 100px)",
              transform: "translate(8vw, -25%) rotate(92.99deg)",
            }}
          ></div>
          <div
            className="rounded-full absolute"
            style={{
              background:
                "linear-gradient(128deg, rgba(71, 125.08, 199.54, 0.65) 24%, rgba(33.84, 31.70, 138.34, 0.53) 100%)",
              width: "calc(7.5vw + 30px)",
              height: "calc(7.5vw + 30px)",
              transform: "translate(35vw, calc(32.5vh + 200px))",
            }}
          ></div>
          <div
            className="rounded-full absolute"
            style={{
              background:
                "linear-gradient(128deg, rgba(71, 125.08, 199.54, 0.45) 24%, rgba(33.84, 31.70, 138.34, 0.36) 100%)",
              width: "calc(4vw + 25px)",
              height: "calc(4vw + 25px)",
              transform: "translate(5vw, calc(32vh + 300px))",
            }}
          ></div>
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
                {t("LOGIN_PAGE_WELCOME")}
              </p>
              <p className="text-center font-light text-white break-words text-[calc(0.60vw+10px)]">
                <Link href="/signup">{t("LOGIN_PAGE_SIGN_UP_QUESTION")}</Link>
              </p>
            </div>
            <div className="w-full flex flex-col items-center">
              <Link href="/signup">
                <Button
                  className="mt-8 w-[calc(10.5vw+50px)] py-[calc(0.8vw+15px)] text-[calc(0.65vw+10px)]"
                  variant={"blueGradient"}
                >
                  {t("LOGIN_PAGE_SIGN_UP_BUTTON")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="m-2 px-[8vw] self-center">
          <p className="font-medium break-words text-2xl">{t("LOGIN_PAGE_TITLE")}</p>
          <LoginForm />
          <p className="lg:hidden text-[calc(0.25vw+12px)] text-center underline">
            <Link href="/signup">{t("LOGIN_PAGE_SIGN_UP_QUESTION")}</Link>
          </p>
          <p
            className="text-[calc(0.25vw+12px)] text-center underline"
            onClick={handleForgotPasswordClick}
            style={{ cursor: "pointer" }}
          >
            {t("LOGIN_PAGE_FORGOT_PASSWORD")}
          </p>
        </div>
      </div>
    </AuthPageTemplate>
  );
}
