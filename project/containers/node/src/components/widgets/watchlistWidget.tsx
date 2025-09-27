"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  WIDGET_MIN_SELECT_SYMBOLS,
} from "@/lib/utils/constants/formValidation";
import { useTranslation } from "react-i18next";
import { addWidget, modifyWidget } from "@/redux/widgetArray";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import AssetStockSmall from "../asset/AssetStockSmall";
import { createWidget, updateWidget } from "@/lib/services/widgetService";
import { TypeDisp } from "@/lib/utils/constants/selectArray";
import { getSearchYahooFinance } from "@/lib/services/yahooFinanceService";
import { SearchStocks, createObjSearch } from "@/lib/models/searchStocksModel";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import {
  APIResult,
  Dashboard,
  WidgetGet,
  WidgetType,
  WidgetWatchlistCreate,
  WidgetWatchlistGet,
} from "@/lib/services/returnTypes";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Command, CommandInput, CommandList } from "../ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface WatchlistWidgetProps {
  isCreation: boolean;
  dashboard?: Dashboard;
  objectWidget?: WidgetWatchlistGet;
  onDelete: (deleteFromDb: boolean) => void;
}

export default function WatchlistWidget({
  isCreation,
  dashboard,
  objectWidget,
  onDelete,
}: WatchlistWidgetProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [onEdit, setOnEdit] = useState(false);
  const [onWidget, setOnWidget] = useState(false);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const rootElementRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [widthRootElement, setWidthRootElement] = useState(0);
  const [searchResult, setSearchResult] = useState<SearchStocks[]>([]);
  const [showSearchPreview, setShowSearchPreview] = useState(false);
  const excludedDivRef = useRef<HTMLDivElement>(null);
  const [selectedStocks, setSelectedStocks] = useState<string[]>(
    objectWidget ? objectWidget.symbols : [],
  );

  const WIDGET_NAME_LENGTH = t("WIDGET_NAME_LENGTH", {
    minLength: MIN_NAME_LENGTH,
    maxLength: MAX_NAME_LENGTH,
  });
  const WIDGET_SELECT_SYMBOLS = t("WIDGET_SELECT_SYMBOLS", {
    minLength: WIDGET_MIN_SELECT_SYMBOLS,
  });

  useEffect(() => {
    if (isCreation) setOnEdit(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (excludedDivRef.current && !excludedDivRef.current.contains(event.target as Node)) {
        setShowSearchPreview(false);
      }
    };

    const calculateRootElement = () => {
      if (rootElementRef.current) {
        const elementWidth = rootElementRef.current.offsetWidth;
        setWidthRootElement(elementWidth);
      }
    };

    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", calculateRootElement);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", calculateRootElement);
    };
  }, []);

  const sizeList: [string, ...string[]] = ["1x1", "1x2"];

  const formSchema = z.object({
    name: z
      .string({ required_error: t("NAME_EMPTY") })
      .min(MIN_NAME_LENGTH, { message: WIDGET_NAME_LENGTH })
      .max(MAX_NAME_LENGTH, { message: WIDGET_NAME_LENGTH }),
    symbols: z.string().refine((value) => selectedStocks.length >= WIDGET_MIN_SELECT_SYMBOLS, {
      message: WIDGET_SELECT_SYMBOLS,
    }),
    dimensions: z.enum(sizeList, {
      required_error: t("DIMENSIONS_EMPTY"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      !isCreation && objectWidget
        ? {
            symbols: "",
            name: objectWidget.name,
            dimensions: objectWidget.width + "x" + objectWidget.height,
          }
        : {
            symbols: "",
            name: "",
            dimensions: "1x1",
          },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const width = values.dimensions.split("x")[0];
    const height = values.dimensions.split("x")[1];

    const updatedDefaultValues: WidgetWatchlistCreate = {
      tags: [],
      symbols: selectedStocks.filter((value, index, self) => {
        return self.indexOf(value) === index;
      }),
      name: values.name,
      width: parseInt(width),
      height: parseInt(height),
      widgetType: WidgetType.WATCHLIST,
      posX: 0,
      posY: 0,
    };

    if (isCreation && dashboard) {
      await createWidget(dashboard.id, WidgetType.WATCHLIST, updatedDefaultValues).then(
        (result: APIResult<WidgetGet>) => {
          if (!result.success && result.message)
            toast(t(result.message.message, result.message.options));
          if (result.success && result.data) {
            dispatch(addWidget(result.data));
            toast(t("CREATE_API_SUCCESS"));
            if (onDelete) onDelete(false);
          }
        },
      );
    }

    if (!isCreation && objectWidget) {
      const width = values.dimensions.split("x")[0];
      const height = values.dimensions.split("x")[1];
      const updatedDefaultValues: WidgetWatchlistGet = {
        tags: [],
        symbols: selectedStocks.filter((value, index, self) => {
          return self.indexOf(value) === index;
        }),
        name: values.name,
        width: parseInt(width),
        height: parseInt(height),
        widgetType: WidgetType.WATCHLIST,
        posX: 0,
        posY: 0,
        dashboardId: objectWidget?.dashboardId,
        id: objectWidget?.id,
      };
      await updateWidget(updatedDefaultValues).then((result: APIResult<WidgetGet>) => {
        if (!result.success && result.message)
          toast(t(result.message.message, result.message.options));
        if (result.success && result.data) {
          dispatch(modifyWidget(result.data));
          toast(t("UPDATE_WIDGET_API_SUCCESS"));
        }
      });
    }

    setOnEdit(false);
  }

  const onCancel = () => {
    onDelete(true);
    setOnEdit(false);
  };

  const fetchSearchYahooFinance = async (value: string) => {
    setSearchTerm(value);

    await getSearchYahooFinance(value).then((result) => {
      if (result.data) {
        const createdObjects = result.data.key.quotes.map((quote: any) => {
          if (quote.typeDisp !== TypeDisp.CRYPTO) {
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
        return setSearchResult(createdObjects);
      }
      return setSearchResult([]);
    });
  };

  const { setValue } = form;

  return (
    <div
      className={`relative bg-_background1 dark:bg-_darkBackground1 rounded-2xl drop-shadow-md px-4 py-3 ${
        onEdit && "border-2 border-_primary px-4 pt-3"
      } ${
        objectWidget && objectWidget.height === 2
          ? "row-span-2"
          : "h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)]"
      } ${objectWidget && objectWidget.width === 2 && "col-span-2"}`}
      onMouseEnter={() => setOnWidget(true)}
      onMouseLeave={() => setOnWidget(false)}
      ref={rootElementRef}
    >
      {!onEdit ? (
        <>
          <div className="flex gap-2 items-center mx-4 my-3 overflow-hidden" ref={nameContainerRef}>
            <HoverCard>
              <HoverCardTrigger>
                <h2
                  className="text-lg text-_grayText text-nowrap text-ellipsis overflow-hidden"
                  style={{ width: widthRootElement - 55 }}
                >
                  {objectWidget?.name}
                </h2>
              </HoverCardTrigger>
              <HoverCardContent className="overflow-clip">
                <p className="underline">{t("WIDGET_INFORMATION_LABEL")}</p>
                <p className="text-sm">
                  {t("WIDGET_NAME_LABEL")} : {objectWidget?.name}
                </p>
                <p className="text-sm">
                  {t("WIDGET_WIDGET_TYPE_LABEL")} : {objectWidget?.widgetType}
                </p>
                <p className="text-sm">
                  {t("WIDGET_DIMENSIONS_LABEL")} : {objectWidget?.width} X {objectWidget?.height}
                </p>
                <p className="text-sm">
                  {t("NEED_TITLE_PLZ")} : {objectWidget?.symbols.map((str) => str).join(", ")}
                </p>
              </HoverCardContent>
            </HoverCard>
            <span
              className={`material-symbols-outlined hover:cursor-pointer absolute top-4 right-4 ${
                onWidget ? "text-_grayText" : "text-_background1 dark:text-_darkBackground1"
              }`}
              onClick={() => setOnEdit(true)}
            >
              edit_square
            </span>
          </div>
          <div
            className={`z-50 overflow-y-scroll overflow-x-hidden w-full ${
              objectWidget && objectWidget.height === 2
                ? " h-[calc(15vw*2+110px*2-45px)] xl:h-[calc(19vw*2-25px*2-45px)]"
                : "h-[calc(100%-60px)]"
            } space-y-2`}
          >
            {objectWidget &&
              objectWidget.symbols.map((symbol: string) => (
                <AssetStockSmall key={symbol} symbol={symbol} />
              ))}
          </div>
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-scroll space-y-4 pb-3">
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
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("DIMENSIONS_LABEL")}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder={t("DIMENSIONS_LABEL")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1x1">1 x 1</SelectItem>
                            <SelectItem value="1x2">1 x 2</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symbols"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("SELECT_SYMBOLS_LABEL")}</FormLabel>
                    <div className="flex flex-row flex-wrap">
                      {selectedStocks.map((stock, index) => (
                        <p
                          key={index}
                          className="text-sm text-gray-500 hover:text-_redText hover:cursor-pointer me-1"
                          onClick={() => {
                            const updatedStocks = [...selectedStocks];
                            updatedStocks.splice(index, 1);
                            setSelectedStocks(updatedStocks);
                          }}
                        >
                          {stock}
                          {index !== selectedStocks.length - 1 && ", "}
                        </p>
                      ))}
                    </div>
                    {/* <p className="text-sm text-_grayText text-wrap">{selectedStocks.join(", ")}</p> */}
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
                              className="absolute top-full left-0 mt-3 bg-background shadow-xl py-2 px-2 rounded-md w-64 overflow-y-scroll overflow-x-hidden"
                              style={{ width: widthRootElement - 55 }}
                            >
                              {searchResult.length === 0 ||
                              searchResult.every((result) => result === null) ? (
                                <p className="flex justify-center text-_grayText">
                                  {t("SEARCH_NO_RESULT")}
                                </p>
                              ) : (
                                <div className="pb-1">
                                  {searchResult.map((result, index) => (
                                    <>
                                      {result !== null && (
                                        <div
                                          key={index}
                                          onClick={() => {
                                            setValue("symbols", "");
                                            if (!selectedStocks.includes(result.symbol)) {
                                              setSelectedStocks((selectedStocks) => [
                                                ...selectedStocks,
                                                result.symbol,
                                              ]);
                                            }
                                            setShowSearchPreview(false);
                                          }}
                                          className={`hover:cursor-pointer flex flex-row items-center gap-2 py-1 px-2 hover:bg-_blueBackground rounded-md`}
                                        >
                                          <button className="flex flex-col w-[60%]">
                                            <p className="text-sm">{result.symbol}</p>
                                            <p className="text-sm text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
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
            </div>
            <div className="flex flex-row gap-4">
              <Button
                className="mt-auto flex-1"
                onClick={onCancel}
                variant={isCreation ? "gray" : "red"}
                size={"sm"}
                type="reset"
              >
                {isCreation ? t("WIDGET_CANCEL_LABEL") : t("WIDGET_DELETE_LABEL")}
              </Button>
              <Button className="mt-auto flex-1" type="submit" variant={"blue"} size={"sm"}>
                {t("WIDGET_DONE_LABEL")}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
