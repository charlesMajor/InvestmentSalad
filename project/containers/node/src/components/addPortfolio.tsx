import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MIN_NAME_LENGTH,
  MAX_NAME_LENGTH,
  MAX_DESCRIPTION_LENGTH,
  isInEnum,
  MIN_PAYOUT_FREQUENCY_VALUE_LENGTH,
  MAX_PAYOUT_FREQUENCY_VALUE_LENGTH,
  payoutFrequencyVerify,
  isOneZero,
  MIN_PAYOUT_INTEREST_RATE_LENGTH,
  MAX_PAYOUT_INTEREST_RATE_LENGTH,
  NB_OF_WEEKS_IN_YEAR,
  NB_OF_MONTHS_IN_YEAR,
} from "@/lib/utils/constants/formValidation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import React, { useEffect } from "react";
import { toast } from "sonner";
import TagList from "./tagList";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { Portfolio } from "@/lib/models/portfolioModel";
import { DATE_OFFSET } from "@/lib/utils/constants/utils";
import { APIResult, PortfolioGet } from "@/lib/services/returnTypes";
import { addPortfolio, modifyPortfolio } from "@/redux/portfolioArray";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { selectPortfolioById } from "@/redux/selectors/portfolioSelectors";
import { currencyList, timeList } from "@/lib/utils/constants/selectArray";
import { createPortfolio, updatePortfolio } from "@/lib/services/portfolioService";

interface AddPortfolioProps {
  setOpen: (open: boolean) => void;
  modifyView: boolean;
  portfolioId?: string;
}

export function AddPortfolio({ setOpen, modifyView, portfolioId }: AddPortfolioProps) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showInterestFields, setShowInterestFields] = useState(false);

  const selectedPortfolio: Portfolio = useSelector(
    selectPortfolioById(portfolioId ? portfolioId : ""),
  );

  const handleShowInterestCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setShowInterestFields(event.target.checked);
  };

  const ADD_PORTFOLIO_NAME_LENGTH = t("ADD_PORTFOLIO_NAME_LENGTH", {
    minLength: MIN_NAME_LENGTH,
    maxLength: MAX_NAME_LENGTH,
  });
  const ADD_PORTFOLIO_INTEREST_RATE_LENGTH = t("ADD_PORTFOLIO_INTEREST_RATE_LENGTH", {
    minLength: MIN_PAYOUT_INTEREST_RATE_LENGTH,
    maxLength: MAX_PAYOUT_INTEREST_RATE_LENGTH,
  });
  const ADD_PORTFOLIO_DESCRIPTION_LENGTH = t("ADD_PORTFOLIO_DESCRIPTION_LENGTH", {
    maxLength: MAX_DESCRIPTION_LENGTH,
  });
  const ADD_PORTFOLIO_PAYOUT_FREQUENCY_VALUE_LENGTH = t(
    "ADD_PORTFOLIO_PAYOUT_FREQUENCY_VALUE_LENGTH",
    {
      minLength: MIN_PAYOUT_FREQUENCY_VALUE_LENGTH,
      maxLength: MAX_PAYOUT_FREQUENCY_VALUE_LENGTH,
    },
  );

  const formSchema = z
    .object({
      tags: z.array(z.string()),
      name: z
        .string({ required_error: t("NAME_EMPTY") })
        .min(MIN_NAME_LENGTH, { message: ADD_PORTFOLIO_NAME_LENGTH })
        .max(MAX_NAME_LENGTH, { message: ADD_PORTFOLIO_NAME_LENGTH }),
      description: z
        .string({ required_error: t("DESCRIPTION_EMPTY") })
        .max(MAX_DESCRIPTION_LENGTH, { message: ADD_PORTFOLIO_DESCRIPTION_LENGTH }),
      cashBalance: z.coerce
        .number({ required_error: t("CASH_BALANCE_EMPTY") })
        .min(0, { message: t("ADD_PORTFOLIO_BALANCE_MIN") }),
      currency: z
        .string({ required_error: t("CURRENCY_EMPTY") })
        .refine((value) => isInEnum(currencyList, value), {
          message: t("INVALID_SELECT_OPTION"),
        }),
      interestRate: z.coerce
        .number({ required_error: t("INTEREST_RATE_EMPTY") })
        .gte(MIN_PAYOUT_INTEREST_RATE_LENGTH, { message: ADD_PORTFOLIO_INTEREST_RATE_LENGTH })
        .lte(MAX_PAYOUT_INTEREST_RATE_LENGTH, { message: ADD_PORTFOLIO_INTEREST_RATE_LENGTH }),
      payoutFrequencyTime: z.string({ required_error: t("PAYOUT_FREQUENCY_TIME_EMPTY") }),
      payoutFrequencyValue: z.coerce
        .number({ required_error: t("PAYOUT_FREQUENCY_VALUE_EMPTY") })
        .int()
        .gte(MIN_PAYOUT_FREQUENCY_VALUE_LENGTH, {
          message: ADD_PORTFOLIO_PAYOUT_FREQUENCY_VALUE_LENGTH,
        })
        .lte(MAX_PAYOUT_FREQUENCY_VALUE_LENGTH, {
          message: ADD_PORTFOLIO_PAYOUT_FREQUENCY_VALUE_LENGTH,
        }),
      firstInterestPayoutDate: z.date({ required_error: t("FIRST_INTEREST_PAYOUT_DATE_EMPTY") }),
    })
    .refine(
      (data) =>
        payoutFrequencyVerify(data.payoutFrequencyValue, data.payoutFrequencyTime, timeList),
      {
        message: ADD_PORTFOLIO_PAYOUT_FREQUENCY_VALUE_LENGTH,
        path: ["payoutFrequencyValue"],
      },
    )
    .refine((data) => isOneZero(data.interestRate, data.payoutFrequencyValue), {
      message: t("PAYOUT_FREQUENCY_VALUE_AND_INTEREST_RATE_NOT_ZERO"),
      path: ["interestRate"],
    })
    .refine(
      (data) =>
        (data.interestRate == 0 && data.payoutFrequencyValue == 0) ||
        isInEnum(timeList, data.payoutFrequencyTime),
      {
        message: t("INVALID_SELECT_OPTION"),
        path: ["payoutFrequencyValue"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: modifyView
      ? {
          tags: selectedPortfolio.tags,
          name: selectedPortfolio.name,
          description: selectedPortfolio.description,
          cashBalance: selectedPortfolio.cashBalance,
          currency: selectedPortfolio.currency,
          interestRate: selectedPortfolio.cashInterestRate * 100,
          payoutFrequencyTime: timeList[0],
          payoutFrequencyValue: selectedPortfolio.interestPaymentFrequencyPerYear,
          firstInterestPayoutDate: selectedPortfolio.initialInterestPaymentDate
            ? new Date(selectedPortfolio.initialInterestPaymentDate + DATE_OFFSET)
            : new Date(),
        }
      : {
          tags: [],
          name: "",
          description: "",
          cashBalance: 0,
          currency: getDefaultCurrency(),
          interestRate: 0,
          payoutFrequencyTime: "",
          payoutFrequencyValue: 0,
          firstInterestPayoutDate: new Date(),
        },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const interestRate = values.interestRate / 100;
    const cashBalance = parseFloat(values.cashBalance.toString().replace(",", "."));
    let payoutFrequencyValue: number = values.payoutFrequencyValue;

    if (values.payoutFrequencyTime == timeList[2]) {
      payoutFrequencyValue *= NB_OF_WEEKS_IN_YEAR;
    } else if (values.payoutFrequencyTime == timeList[1]) {
      payoutFrequencyValue *= NB_OF_MONTHS_IN_YEAR;
    }
    let firstInterestPayoutDate: string | null = null;
    if (showInterestFields) {
      firstInterestPayoutDate = values.firstInterestPayoutDate.toISOString().split("T")[0];
    }

    let updatedDefaultValues = {
      id: "",
      tags: values.tags,
      name: values.name,
      description: values.description,
      currency: values.currency,
      cashBalance: cashBalance,
      cashInterestRate: interestRate,
      interestPaymentFrequencyPerYear: payoutFrequencyValue,
      initialInterestPaymentDate: firstInterestPayoutDate,
    };
    //console.log(updatedDefaultValues);

    if (modifyView) {
      updatedDefaultValues.id = selectedPortfolio.id;

      await updatePortfolio(updatedDefaultValues).then((result: APIResult<PortfolioGet>) => {
        if (!result.success && result.message)
          toast(t(result.message.message, result.message.options));
        if (result.success && result.data) {
          dispatch(modifyPortfolio(result.data));
          toast(t("UPDATE_PORTFOLIO_API_SUCCESS"));
          setOpen(false);
        }
      });
    } else {
      await createPortfolio(updatedDefaultValues).then((result: APIResult<PortfolioGet>) => {
        if (!result.success && result.message)
          toast(t(result.message.message, result.message.options));
        if (result.success && result.data) {
          dispatch(addPortfolio(result.data));
          toast(t("CREATE_API_SUCCESS"));
          setOpen(false);
        }
      });
    }
  }

  function getDefaultCurrency(): string {
    if (localStorage.getItem("currency") !== null)
      return localStorage.getItem("currency") as string;
    return currencyList[0];
  }

  useEffect(() => {
    setShowInterestFields(modifyView && selectedPortfolio.cashInterestRate != 0);
  }, []);

  return (
    <>
      <Form {...form}>
        <form key={2} className="h-96 overflow-y-scroll">
          <div className="flex flex-col md:flex-row gap-0 md:gap-8 space-y-5">
            <div className="flex-1 overflow-hidden flex flex-col gap-6">
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("DESCRIPTION_LABEL")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("DESCRIPTION_LABEL")}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cashBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("CASH_BALANCE_LABEL")}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t("CASH_BALANCE_LABEL")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("CURRENCY_LABEL")}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={
                          modifyView ? selectedPortfolio.currency : getDefaultCurrency()
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={t("CURRENCY_LABEL")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value={currencyList[0]}>{currencyList[0]}</SelectItem>
                            <SelectItem value={currencyList[1]}>{currencyList[1]}</SelectItem>
                            <SelectItem value={currencyList[2]}>{currencyList[2]}</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-1 overflow-hidden  flex flex-col gap-6">
              <div className="flex flex-row items-center gap-2">
                <input
                  className="appearance-none w-5 h-4 border border-_grayText rounded-sm bg-white dark:bg-black checked:dark:bg-_darkPrimary checked:bg-_primary checked:border-transparent"
                  type="checkbox"
                  onChange={handleShowInterestCheckbox}
                  defaultChecked={showInterestFields}
                />
                <FormLabel>{t("IS_INTEREST")}</FormLabel>
              </div>
              {showInterestFields && (
                <>
                  <FormField
                    control={form.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("INTEREST_RATE_LABEL")}</FormLabel>
                        <FormControl>
                          <Input
                            min={MIN_PAYOUT_INTEREST_RATE_LENGTH}
                            max={MAX_PAYOUT_INTEREST_RATE_LENGTH}
                            type="number"
                            placeholder={t("INTEREST_RATE_LABEL")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <FormLabel>{t("PAYOUT_FREQUENCY_VALUE_LABEL")}</FormLabel>
                    <div className="flex flex-row gap-x-2">
                      <FormField
                        control={form.control}
                        name="payoutFrequencyValue"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center">
                                <Input
                                  className="w-[70px] me-2"
                                  type="number"
                                  maxLength={3}
                                  placeholder={t("PAYOUT_FREQUENCY_VALUE_LABEL")}
                                  {...field}
                                />
                                <p className="text-lg"> / </p>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="payoutFrequencyTime"
                        render={({ field }) => (
                          <FormItem className="flex items-start">
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder={t("SELECT_A_TIME")} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="year">{t("YEAR")}</SelectItem>
                                    <SelectItem value="month">{t("MONTH")}</SelectItem>
                                    <SelectItem value="week">{t("WEEK")}</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="firstInterestPayoutDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="my-1">
                          {t("FIRST_INTEREST_PAYOUT_DATE_LABEL")}
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  <>
                                    {localStorage.getItem("language") === "fr" ? (
                                      <span>
                                        {field.value.toLocaleDateString("fr-FR", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </span>
                                    ) : (
                                      <span>{format(field.value, "PPP")}</span>
                                    )}
                                  </>
                                ) : (
                                  <span>{t("PICK_A_DATE")}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </Form>
      <div>
        <Button variant={"blue"} className="float-end mt-2" onClick={form.handleSubmit(onSubmit)}>
          {t("CONFIRM_BUTTON_TEXT")}
        </Button>
      </div>
    </>
  );
}
