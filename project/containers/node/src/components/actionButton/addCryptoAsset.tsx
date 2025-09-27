import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormTitle from "../formTitle";
import React, { useEffect, useRef, useState } from "react";
import TagList from "../tagList";
import {
  MAX_DESCRIPTION_LENGTH,
  MIN_SYMBOL_LENGTH,
  MAX_SYMBOL_LENGTH,
  MAX_NAME_LENGTH,
  isSymbolInYahooFinance,
  MIN_NUMBER_OF_SHARE_ASSET,
  MIN_BUY_PRICE_ASSET,
  MIN_COMMISSION_FEE_ASSET,
  isSymbolCryptoInYahooFinance,
} from "@/lib/utils/constants/formValidation";
import { Textarea } from "../ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "../ui/calendar";
import { getSearchYahooFinance } from "@/lib/services/yahooFinanceService";
import { SearchStocks, createObjSearch } from "@/lib/models/searchStocksModel";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslation } from "react-i18next";
import { AddPortfolio } from "../addPortfolio";
import { useDispatch, useSelector } from "react-redux";
import { createAsset, updateAsset } from "@/lib/services/assetsService";
import {
  APIResult,
  AssetGet,
  AssetType,
  CryptoCreate,
  CryptoGet,
  PortfolioGet,
} from "@/lib/services/returnTypes";
import { addAsset, modifyAsset } from "@/redux/assetArray";
import { TypeDisp } from "@/lib/utils/constants/selectArray";
import { selectAssetById } from "@/redux/selectors/assetSelectors";
import { DATE_OFFSET } from "@/lib/utils/constants/utils";

interface AddCryptoAssetProps {
  setOpen: (open: boolean) => void;
  modifyView: boolean;
  assetId?: string;
}

export function AddCryptoAsset({ setOpen, modifyView, assetId }: AddCryptoAssetProps) {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchPreview, setShowSearchPreview] = useState(false);
  const excludedDivRef = useRef<HTMLDivElement>(null);
  const [filteredAssets, setFilteredAssets] = useState<(SearchStocks | null)[]>([]);
  const [portfolios, setPortfolios] = useState<PortfolioGet[] | null>(null);
  const [openAddPortfolio, setOpenAddPortfolio] = useState(false);
  const dispatch = useDispatch();

  const selectedAsset: CryptoGet = useSelector(selectAssetById(assetId ? assetId : ""));

  const { portfolioArray } = useSelector((state: any) => state.portfolioArray);

  const ADD_SYMBOL_LENGTH = t("ADD_ASSET_SYMBOL_LENGTH", {
    minLength: MIN_SYMBOL_LENGTH,
    maxLength: MAX_SYMBOL_LENGTH,
  });
  const ADD_DESCRIPTION_LENGTH = t("ADD_ASSET_DESCRIPTION_LENGTH", {
    maxLength: MAX_DESCRIPTION_LENGTH,
  });
  const CREATE_ASSETS_NAME_LENGTH = t("CREATE_ASSETS_NAME_LENGTH", {
    maxLength: MAX_NAME_LENGTH,
  });

  const CREATE_ASSETS_NUMBER_OF_SHARES_LENGTH = t("CREATE_ASSETS_NUMBER_OF_SHARES_LENGTH", {
    minLength: MIN_NUMBER_OF_SHARE_ASSET,
  });
  const CREATE_ASSETS_BUY_PRICE_LENGTH = t("CREATE_ASSETS_BUY_PRICE_LENGTH", {
    minLength: MIN_BUY_PRICE_ASSET,
  });
  const CREATE_ASSETS_COMMISSION_FEE_LENGTH = t("CREATE_ASSETS_COMMISSION_FEE_LENGTH", {
    minLength: MIN_COMMISSION_FEE_ASSET,
  });

  const formSchema = z.object({
    tags: z.array(z.string()),
    symbol: z
      .string({ required_error: t("SYMBOL_EMPTY") })
      .min(MIN_SYMBOL_LENGTH, { message: ADD_SYMBOL_LENGTH })
      .max(MAX_SYMBOL_LENGTH, { message: ADD_SYMBOL_LENGTH })
      .refine((value) => isSymbolCryptoInYahooFinance(value), {
        message: t("SYMBOL_NOT_IN_YAHOO_FINANCE"),
      }),
    description: z
      .string({ required_error: t("DESCRIPTION_EMPTY") })
      .max(MAX_DESCRIPTION_LENGTH, { message: ADD_DESCRIPTION_LENGTH }),
    quantity: z.coerce.number({ required_error: t("SHARES_EMPTY") }).gt(MIN_NUMBER_OF_SHARE_ASSET, {
      message: CREATE_ASSETS_NUMBER_OF_SHARES_LENGTH,
    }),
    unitPrice: z.coerce.number({ required_error: t("BUY_PRICE_EMPTY") }).gt(MIN_BUY_PRICE_ASSET, {
      message: CREATE_ASSETS_BUY_PRICE_LENGTH,
    }),
    commissionFee: z.coerce
      .number({ required_error: t("COMMISSION_FEE_EMPTY") })
      .gte(MIN_COMMISSION_FEE_ASSET, {
        message: CREATE_ASSETS_COMMISSION_FEE_LENGTH,
      }),
    buyDate: z.date({ required_error: t("BUY_DATE_EMPTY") }),
    portfolioId: z
      .string({ required_error: t("PORTFOLIO_EMPTY") })
      .min(1, { message: t("PORTFOLIO_EMPTY") }),
    name: z
      .string({ required_error: t("NAME_EMPTY") })
      .max(MAX_NAME_LENGTH, { message: CREATE_ASSETS_NAME_LENGTH }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: modifyView
      ? {
          tags: selectedAsset.tags,
          symbol: selectedAsset.symbol,
          description: selectedAsset.description,
          quantity: selectedAsset.quantity,
          unitPrice: selectedAsset.unitPrice,
          commissionFee: 0,
          buyDate: new Date(selectedAsset.buyDate + DATE_OFFSET),
          portfolioId: selectedAsset.portfolioId,
          name: selectedAsset.name,
        }
      : {
          tags: [],
          symbol: "",
          description: "",
          quantity: 0,
          unitPrice: 0,
          commissionFee: 0,
          buyDate: new Date(),
          portfolioId: "",
          name: "",
        },
  });

  const { setValue } = form;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (excludedDivRef.current && !excludedDivRef.current.contains(event.target as Node)) {
        setShowSearchPreview(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const setAllPortfolios = async () => {
      setPortfolios(portfolioArray);
    };

    if (portfolios === null) setAllPortfolios();
    return () => {};
  }, [portfolios]);

  const fetchSearchYahooFinance = async (value: string) => {
    setSearchTerm(value);

    await getSearchYahooFinance(value).then((result) => {
      if (result.data) {
        const createdObjects = result.data.key.quotes.map((quote: any) => {
          if (quote.typeDisp === TypeDisp.CRYPTO) {
            return createObjSearch(
              quote.exchDisp,
              quote.shortname,
              quote.symbol,
              quote.typeDisp,
              quote.sector,
            );
          } else {
            return null;
          }
        });
        return setFilteredAssets(createdObjects);
      }
      return setFilteredAssets([]);
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const buyDate = values.buyDate.toISOString().split("T")[0];

    const updatedDefaultValues: CryptoCreate = {
      buyDate: buyDate,
      unitPrice: values.unitPrice,
      buyFromAccount: true,
      assetType: AssetType.CRYPTO,
      commissionFee: values.commissionFee,
      quantity: values.quantity,
      tags: values.tags,
      name: values.name === "" ? values.symbol : values.name,
      description: values.description,
      symbol: values.symbol,
    };

    if (modifyView) {
      const updateValues: CryptoGet = {
        ...updatedDefaultValues,
        portfolioId: values.portfolioId,
        id: selectedAsset.id,
      };

      await updateAsset(updateValues as AssetGet, AssetType.CRYPTO).then(
        (result: APIResult<AssetGet>) => {
          if (!result.success && result.message)
            toast(t(result.message.message, result.message.options));
          if (result.success && result.data) {
            dispatch(modifyAsset(result.data));
            toast(t("UPDATE_ASSET_API_SUCCESS"));
            setOpen(false);
          }
        },
      );
    } else {
      const createResult = await createAsset(
        values.portfolioId,
        AssetType.CRYPTO,
        updatedDefaultValues,
      );
      if (createResult.success) {
        if (createResult.data != null) {
          dispatch(addAsset(createResult.data));
        }
        setOpen(false);
        toast(t("CREATE_API_SUCCESS"));
      } else {
        toast(
          t("CREATE_API_GENERIC_ERROR", { statusCode: createResult.message?.options?.statusCode }),
        );
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="h-96 overflow-y-scroll">
          <div className="flex flex-col md:flex-row gap-0 md:gap-8 space-y-5">
            <div className="flex-1 overflow-hidden flex flex-col gap-6">
              <div className="w-1/2">
                <TagList form={form} />
              </div>
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="portfolioId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("CREATE_ASSETS_PORTFOLIO_LABEL")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t("CREATE_ASSETS_CHOOSE_A_PORTFOLIO")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <>
                            {portfolios !== null ? (
                              <>
                                {portfolios.length != 0 ? (
                                  <>
                                    {portfolios.map((portfolio) => (
                                      <SelectItem value={portfolio.id}>{portfolio.name}</SelectItem>
                                    ))}
                                  </>
                                ) : (
                                  <div className="flex flex-col gap-2 items-center justify-center my-2">
                                    {t("CREATE_ASSETS_PORTFOLIO_NOT_LOGIN")}
                                    <Dialog
                                      open={openAddPortfolio}
                                      onOpenChange={setOpenAddPortfolio}
                                    >
                                      <DialogTrigger asChild>
                                        <Button variant={"blue"} size={"sm"}>
                                          {t("ADD_PORTFOLIO")}
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-[700px]">
                                        <FormTitle
                                          title={t("ADD_PORTFOLIO")}
                                          description={t("ADD_PORTFOLIO_DESCRIPTION")}
                                        />
                                        <AddPortfolio setOpen={setOpen} modifyView={false} />
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                )}
                              </>
                            ) : (
                              <p className="flex items-center justify-center my-2">
                                {t("CREATE_ASSETS_PORTFOLIO_NO_PORTFOLIO")}
                              </p>
                            )}
                          </>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ADD_ASSET_SYMBOL")}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={t("ADD_ASSET_SYMBOL")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SYMBOL_LABEL")}</FormLabel>
                    <fieldset className="w-full space-y-1 dark:text-gray-100">
                      <div className="relative">
                        <Popover open={true}>
                          <PopoverTrigger asChild>
                            <FormControl ref={excludedDivRef}>
                              <input
                                autoComplete="off"
                                type="string"
                                placeholder={t("SYMBOL_LABEL")}
                                onFocus={() => setShowSearchPreview(true)}
                                className="dark:bg-background flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                onChange={(e) => {
                                  fetchSearchYahooFinance(e.target.value);
                                  field.onChange(e);
                                }}
                                value={field.value}
                              />
                            </FormControl>
                          </PopoverTrigger>
                          {showSearchPreview && (
                            <PopoverContent
                              side="bottom"
                              align="start"
                              className="absolute top-full left-0 mt-6 bg-background shadow-xl py-2 px-2 rounded-md w-64 overflow-y-scroll overflow-x-hidden"
                            >
                              {filteredAssets.length === 0 ||
                              filteredAssets.every((result) => result === null) ? (
                                <p className="flex justify-center text-_grayText">
                                  {t("SEARCH_NO_RESULT")}
                                </p>
                              ) : (
                                <div className="pb-2">
                                  {filteredAssets.map((result, index) => (
                                    <>
                                      {result !== null && (
                                        <div
                                          key={index}
                                          onClick={() => {
                                            setValue("symbol", result.symbol);
                                            setShowSearchPreview(false);
                                          }}
                                          className={`hover:cursor-pointer flex flex-row items-center gap-2 py-1 px-2 hover:bg-_blueBackground rounded-md`}
                                        >
                                          <button className="flex flex-col w-[60%]">
                                            <p>{result.symbol}</p>
                                            <p className="text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
                                              {result.shortname}
                                            </p>
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  ))}
                                </div>
                              )}
                            </PopoverContent>
                          )}
                        </Popover>
                      </div>
                    </fieldset>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("NAME_LABEL")}</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder={t("NAME_LABEL")} {...field} />
                    </FormControl>
                    <FormDescription>{t("CREATE_ASSETS_NAME_DESCRIPTION")}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ADD_ASSET_DESC_LABEL")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("ADD_ASSET_DESC_LABEL")}
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ADD_ASSET_SHARES")}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t("ADD_ASSET_SHARES")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unitPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("ADD_ASSET_BUY_PRICE")}</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder={t("ADD_ASSET_BUY_PRICE")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!modifyView && (
                <FormField
                  control={form.control}
                  name="commissionFee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("ADD_ASSET_COMMISSION_FEE")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("ADD_ASSET_COMMISSION_FEE")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="buyDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="my-1">{t("ADD_ASSET_BUY_DATE")}</FormLabel>
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
                          lang="fr"
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
