"use client";

import { z } from "zod";
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
import { login } from "@/lib/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH } from "@/components/auth/authValidator";

export default function LoginForm() {
  const { t } = useTranslation();

  const LOGIN_PASSWORD_LENGTH = t("LOGIN_PASSWORD_LENGTH", {
    minLength: MIN_PASSWORD_LENGTH,
    maxLength: MAX_PASSWORD_LENGTH,
  });

  const formSchema = z.object({
    email: z
      .string({ required_error: t("LOGIN_EMAIL_EMPTY") })
      .email({ message: t("LOGIN_EMAIL_FORMAT") }),
    password: z
      .string({ required_error: t("LOGIN_PASSWORD_EMPTY") })
      .min(MIN_PASSWORD_LENGTH, { message: LOGIN_PASSWORD_LENGTH })
      .max(MAX_PASSWORD_LENGTH, { message: LOGIN_PASSWORD_LENGTH }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit({ email, ...values }: z.infer<typeof formSchema>) {
    const modifiedValues = { ...values, emailAddress: email };

    await login(modifiedValues).then((result) => {
      if (!result.success && result.message)
        toast(t(result.message.message, result.message.options));
      if (result.success) {
        toast(t("LOGIN_API_SUCCESS"));
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("LOGIN_EMAIL_LABEL")}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder={t("LOGIN_EMAIL_PLACEHOLDER")} {...field} />
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
                  <FormLabel>{t("LOGIN_PASSWORD_LABEL")}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder={t("LOGIN_PASSWORD_LABEL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full mt-10 py-[calc(0.65vw+15px)] text-lg"
            variant={"blue"}
          >
            {t("LOGIN_SUBMIT_BUTTON")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
