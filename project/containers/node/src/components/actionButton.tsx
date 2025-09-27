import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import FormTitle from "./formTitle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import TagList from "./tagList";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

export default function ActionButton() {
  const { t } = useTranslation();
  // const [showRecurrenceFields, setShowRecurrenceFields] = useState(false);

  // const handleShowRecurrenceCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
  //   setShowRecurrenceFields(event.target.checked);
  // };

  const formSchema = z.object({
    tags: z.array(z.string()),
    name: z.string(),
    description: z.string(),
    symbol: z.string(),
    quantity: z.string(),
    commissionFee: z.string(),
    assetType: z.string(),
    buyFromAccount: z.boolean(),
    unitPrice: z.string(),
    transactionDate: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tags: [],
      name: "",
      description: "",
      symbol: "",
      quantity: "0",
      commissionFee: "0",
      assetType: "CRYPTO",
      buyFromAccount: true,
      unitPrice: "0",
      transactionDate: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedDefaultValues = {
      ...values,
    };
  }

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Dialog>
        {!isMobile ? (
          <DialogTrigger>
            <div className="h-full m-auto uhover:cursor-pointer text-_whiteText text-sm bg-_primary hover:bg-_secondary dark:bg-_darkPrimary hover:dark:bg-_darkSecondary rounded-md px-4 py-2 font-medium">
              {t("new")}
            </div>
          </DialogTrigger>
        ) : (
          <DialogTrigger>
            <div className="z-10 fixed bg-_primary h-16 w-16 rounded-full bottom-4 right-4">
              <span className="flex items-center justify-center material-symbols-outlined text-6xl text-_whiteText h-full hover:cursor-pointer">
                add
              </span>
            </div>
          </DialogTrigger>
        )}
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <FormTitle title={t("ADD_ASSET")} description={t("ADD_ASSET_DESCRIPTION")} />
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="overflow-y-scroll">
                <div className="flex flex-col md:flex-row gap-0 md:gap-8 space-y-5">
                  <div className="flex-1 overflow-hidden">
                    <TagList form={form} />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("NAME_LABEL")}</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder={t("NAME_LABEL")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
