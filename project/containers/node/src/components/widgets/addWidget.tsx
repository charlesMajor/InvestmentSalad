import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import React from "react";
import FormTitle from "../formTitle";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { DialogContent } from "../ui/dialog";
import NetworthWidget from "./networthWidget";
import { useTranslation } from "react-i18next";
import WatchlistWidget from "./watchlistWidget";
import DistributionWidget from "./distributionWidget";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface AddWidgetProps {
  addComponent: (component: React.ComponentType<any>) => void;
  setOpen: (open: boolean) => void;
}

export function AddWidget({ addComponent, setOpen }: AddWidgetProps) {
  const { t } = useTranslation();
  const formSchema = z.object({
    type: z.enum(["DISTRIBUTION", "NETWORTH", "WATCHLIST"], {
      required_error: t("WIDGET_ADD_WIDGET_EMPTY"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "DISTRIBUTION",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let widgetComponent;

    switch (values.type) {
      case "DISTRIBUTION":
        widgetComponent = DistributionWidget;
        break;

      case "NETWORTH":
        widgetComponent = NetworthWidget;
        break;

      case "WATCHLIST":
        widgetComponent = WatchlistWidget;
        break;
    }

    if (widgetComponent) addComponent(widgetComponent);
    setOpen(false);
  }

  return (
    <DialogContent className="sm:max-w-[700px]">
      <FormTitle title={t("WIDGET_TITLE")} description={t("WIDGET_DESCRIPTION")} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-96 overflow-y-scroll">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{t("WIDGET_ADD_LABEL")}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <FormItem className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="DISTRIBUTION" />
                        </FormControl>
                        <FormLabel className="font-semibold">
                          {t("WIDGET_DISTRIBUTION_LABEL")}
                        </FormLabel>
                      </div>
                      <FormDescription className="ml-7 text-justify">
                        {t("WIDGET_DISTRIBUTION_DESCRIPTION")}
                      </FormDescription>
                    </FormItem>
                    <FormItem className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="NETWORTH" />
                        </FormControl>
                        <FormLabel className="font-semibold">
                          {t("WIDGET_NETWORTH_LABEL")}
                        </FormLabel>
                      </div>
                      <FormDescription className="ml-7 text-justify">
                        {t("WIDGET_NETWORTH_DESCRIPTION")}
                      </FormDescription>
                    </FormItem>
                    <FormItem className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="WATCHLIST" />
                        </FormControl>
                        <FormLabel className="font-semibold">
                          {t("WIDGET_WATCHLIST_LABEL")}
                        </FormLabel>
                      </div>
                      <FormDescription className="ml-7 text-justify">
                        {t("WIDGET_WATCHLIST_DESCRIPTION")}
                      </FormDescription>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div>
        <Button variant={"blue"} className="float-end mt-2" onClick={form.handleSubmit(onSubmit)}>
          {t("WIDGET_ADD_BUTTON")}
        </Button>
      </div>
    </DialogContent>
  );
}
