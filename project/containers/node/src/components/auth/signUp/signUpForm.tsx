"use client";

import { z } from "zod";
import {
  MAX_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_CHAR_TYPES,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
  countCharacterTypes,
  isUsernameValid,
} from "../authValidator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { signUp } from "@/lib/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUpForm() {
  const { t } = useTranslation();

  const SIGN_UP_USERNAME_LENGTH = t("SIGN_UP_USERNAME_LENGTH", {
    minLength: MIN_USERNAME_LENGTH,
    maxLength: MAX_USERNAME_LENGTH,
  });
  const SIGN_UP_PASSWORD_LENGTH = t("SIGN_UP_PASSWORD_LENGTH", {
    minLength: MIN_PASSWORD_LENGTH,
    maxLength: MAX_PASSWORD_LENGTH,
  });
  const SIGN_UP_PASSWORD_CHAR_TYPES = t("SIGN_UP_PASSWORD_CHAR_TYPES", {
    minCharType: MIN_PASSWORD_CHAR_TYPES,
  });

  const formSchema = z
    .object({
      username: z
        .string({ required_error: t("SIGN_UP_USERNAME_EMPTY") })
        .min(MIN_USERNAME_LENGTH, { message: SIGN_UP_USERNAME_LENGTH })
        .max(MAX_USERNAME_LENGTH, { message: SIGN_UP_USERNAME_LENGTH })
        .refine((value) => isUsernameValid(value), { message: t("SIGN_UP_USERNAME_FORMAT") }),
      email: z
        .string({ required_error: t("SIGN_UP_EMAIL_EMPTY") })
        .email({ message: t("SIGN_UP_EMAIL_FORMAT") }),
      password: z
        .string({ required_error: t("SIGN_UP_PASSWORD_EMPTY") })
        .min(MIN_PASSWORD_LENGTH, { message: SIGN_UP_PASSWORD_LENGTH })
        .max(MAX_PASSWORD_LENGTH, { message: SIGN_UP_PASSWORD_LENGTH })
        .refine((value) => countCharacterTypes(value) >= MIN_PASSWORD_CHAR_TYPES, {
          message: SIGN_UP_PASSWORD_CHAR_TYPES,
        }),
      passwordConfirmation: z.string({ required_error: t("SIGN_UP_PASSWORD_EMPTY") }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t("SIGN_UP_PASSWORD_MISMATCH"),
      path: ["passwordConfirmation"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit({ passwordConfirmation, email, ...values }: z.infer<typeof formSchema>) {
    const modifiedValues = { ...values, emailAddress: email };

    await signUp(modifiedValues).then((result) => {
      if (!result.success && result.message)
        toast(t(result.message.message, result.message.options));
      if (result.success) {
        toast(t("SIGN_UP_API_SUCCESS"));
        window.location.assign("/app");
      }
    });
  }

  return (
    <div className="mt-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SIGN_UP_USERNAME_LABEL")}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder={t("SIGN_UP_USERNAME_LABEL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SIGN_UP_EMAIL_LABEL")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("SIGN_UP_EMAIL_PLACEHOLDER")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SIGN_UP_PASSWORD_LABEL")}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t("SIGN_UP_PASSWORD_LABEL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("SIGN_UP_PASSWORD_CONFIRM_LABEL")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("SIGN_UP_PASSWORD_CONFIRM_LABEL")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-sm mt-10">
            {t("SIGN_UP_PAGE_TERMS_AND_CONDITIONS1")}
            <u>{t("SIGN_UP_PAGE_TERMS_AND_CONDITIONS2")}</u>
            {t("SIGN_UP_PAGE_TERMS_AND_CONDITIONS3")}
            <u>{t("SIGN_UP_PAGE_TERMS_AND_CONDITIONS4")}</u>
            {"."}
          </p>
          <Button type="submit" className="w-full py-[calc(0.65vw+15px)] text-lg" variant={"blue"}>
            {t("SIGN_UP_SUBMIT_BUTTON")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
