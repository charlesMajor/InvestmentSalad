"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { object, z } from "zod";
import { toast } from "sonner";
import TagList from "../tagList";
import {
  APIResult,
  Dashboard,
  WidgetGet,
  WidgetType,
  WidgetNetworthGet,
  TagGet,
  AssetGet,
  intervalForRangeType,
  WidgetNetworthDimensions,
  RangeType,
} from "@/lib/services/returnTypes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Checkbox } from "@mui/material";
import { shallowEqual, useSelector } from "react-redux";
import { currencyList } from "@/lib/utils/constants/selectArray";
import { selectAssetsByTags } from "@/redux/selectors/assetSelectors";
import { selectMultipleTagsByIds } from "@/redux/selectors/tagSelectors";
import {
  getAllArraysOfUniqueAssetsInRecord,
  getTotalValueOfUniqueAssetsInRecord,
} from "@/lib/utils/util";
import _debounce from "lodash/debounce";
import { Skeleton } from "../ui/skeleton";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  WIDGET_NETWORTH_MIN_TAG,
  timeMap,
} from "@/lib/utils/constants/formValidation";
import { useTranslation } from "react-i18next";
import { addWidget, modifyWidget } from "@/redux/widgetArray";
import { useEffect, useRef, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import TagComponent from "@/components/tagComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWidget, updateWidget } from "@/lib/services/widgetService";
import { rangeList } from "@/lib/utils/constants/selectArray";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface NetworthWidgetProps {
  isCreation: boolean;
  dashboard?: Dashboard;
  objectWidget?: WidgetNetworthGet;
  onDelete: (deleteFromDb: boolean) => void;
}

export default function NetworthWidget({
  isCreation,
  dashboard,
  objectWidget,
  onDelete,
}: NetworthWidgetProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [onWidget, setOnWidget] = useState(false);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const numberContainerRef = useRef<HTMLDivElement>(null);
  const rootElementRef = useRef<HTMLDivElement>(null);
  const [totalWidgetValue, setTotalWidgetValue] = useState<number>(0);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [chartData, setChartData] = useState<{ values: number[]; timestamps: number[] }>();
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const lightAjustmentForColor = 20;
  const tagsListFromStore: TagGet[] = useSelector(
    selectMultipleTagsByIds(objectWidget ? objectWidget.tags : []),
    shallowEqual,
  );
  const tagsAssetsMap: Record<string, AssetGet[]> = useSelector(
    selectAssetsByTags(objectWidget ? objectWidget.tags : []),
  );
  //getUniqueAssetsFromRecord
  const WIDGET_NAME_LENGTH = t("WIDGET_NAME_LENGTH", {
    minLength: MIN_NAME_LENGTH,
    maxLength: MAX_NAME_LENGTH,
  });
  const WIDGET_TAG_LENGTH = t("WIDGET_TAG_LENGTH", {
    minLength: WIDGET_NETWORTH_MIN_TAG,
  });

  useEffect(() => {
    if (isCreation) setOnEdit(true);
    const getDataChart = async () => {
      if (objectWidget) {
        setTotalWidgetValue(await getTotalValueOfUniqueAssetsInRecord(tagsAssetsMap));
        const chartDataFetch = await getAllArraysOfUniqueAssetsInRecord(
          tagsAssetsMap,
          objectWidget.period,
          intervalForRangeType[objectWidget.period],
        );
        setChartData(chartDataFetch);

        setIsChartLoading(false);
      }
    };

    getDataChart();

    const intervalDataChart = setInterval(() => {
      getDataChart();
    }, 100000);

    return () => {
      clearInterval(intervalDataChart);
    };
  }, []);

  const updateChartDimensions = () => {
    const rootElement = rootElementRef.current;
    const numberContainer = nameContainerRef.current;
    const nameContainer = numberContainerRef.current;
    if (rootElement && numberContainer && nameContainer) {
      setChartDimensions({
        width: rootElement.offsetWidth,
        height:
          rootElement.offsetHeight - numberContainer.offsetHeight - nameContainer.offsetHeight - 35,
      });
    }
    setIsChartLoading(true);
  };

  useEffect(() => {
    const debouncedHandleResize = _debounce(() => setIsChartLoading(false), 200);

    updateChartDimensions();

    window.addEventListener("resize", updateChartDimensions);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", updateChartDimensions);
      window.addEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const getMarginChart = () => {
    if (objectWidget) {
      const leftMargin = objectWidget.detailChart ? totalWidgetValue.toFixed(0).length * 9 + 10 : 0;
      const bottomTopMargin = objectWidget.detailChart ? 5 : 0;
      return {
        left: leftMargin,
        right: 0,
        top: bottomTopMargin,
        bottom: bottomTopMargin,
      };
    }
  };

  const fullDayFormatter = (index: number) => {
    if (objectWidget?.period === RangeType.FIVEDAYS || objectWidget?.period === RangeType.ONEDAY) {
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };

      return chartData
        ? new Intl.DateTimeFormat(
            localStorage.getItem("language") == "fr" ? "fr-FR" : "en-US" || "fr-FR",
            options,
          ).format(chartData.timestamps[index] * 1000)
        : t("NO_DATE");
    } else {
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return chartData
        ? new Intl.DateTimeFormat(
            localStorage.getItem("language") == "fr" ? "fr-FR" : "en-US" || "fr-FR",
            options,
          ).format(chartData.timestamps[index] * 1000)
        : t("NO_DATE");
    }
  };
  const currencyFormatter = (value: number) => {
    const newValue = value
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
      .replace(".", t("DECIMAL"));

    return newValue + " " + localStorage.getItem("currency") || currencyList[0];
  };

  const periodList: [string, ...string[]] = [
    "1d",
    "5d",
    "1mo",
    "3mo",
    "6mo",
    "1y",
    "2y",
    "5y",
    "10y",
    "ytd",
    "max",
  ];
  const sizeList: [string, ...string[]] = ["1x1", "2x1"];

  const formSchema = z.object({
    tags: z.array(z.string()).refine((value) => value.length >= WIDGET_NETWORTH_MIN_TAG, {
      message: WIDGET_TAG_LENGTH,
    }),
    name: z
      .string({ required_error: t("NAME_EMPTY") })
      .min(MIN_NAME_LENGTH, { message: WIDGET_NAME_LENGTH })
      .max(MAX_NAME_LENGTH, { message: WIDGET_NAME_LENGTH }),
    dimensions: z.enum(sizeList, {
      required_error: t("DIMENSIONS_EMPTY"),
    }),
    isDetailChart: z.boolean(),
    period: z.enum(periodList, {
      required_error: t("PERIOD_EMPTY"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      !isCreation && objectWidget
        ? {
            tags: objectWidget.tags,
            name: objectWidget.name,
            dimensions: objectWidget.width + "x" + objectWidget.height,
            isDetailChart: objectWidget.detailChart,
            period: objectWidget.period,
          }
        : { tags: [], name: "", dimensions: "1x1", isDetailChart: false, period: "3mo" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const width = values.dimensions.split("x")[0];
    const height = values.dimensions.split("x")[1];

    const updatedDefaultValues = {
      tags: values.tags,
      name: values.name,
      width: parseInt(width),
      height: parseInt(height),
      isDetailChart: values.isDetailChart,
      period: values.period,
      widgetType: WidgetType.NETWORTH,
      posX: 0,
      posY: 0,
    };

    if (onEdit && objectWidget) {
      const updateValues = {
        ...updatedDefaultValues,
        id: objectWidget.id,
        dashboardId: objectWidget.dashboardId,
      };
      await updateWidget(updateValues).then((result: APIResult<WidgetGet>) => {
        if (!result.success && result.message)
          toast(t(result.message.message, result.message.options));
        if (result.success && result.data) {
          dispatch(modifyWidget(result.data));
          updateChartDimensions();
          setIsChartLoading(false);
          toast(t("CREATE_API_SUCCESS"));
        }
      });
    } else if (isCreation && dashboard) {
      await createWidget(dashboard.id, WidgetType.NETWORTH, updatedDefaultValues).then(
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
    setOnEdit(false);
  }

  const onCancel = () => {
    onDelete(true);
    setOnEdit(false);
  };

  function getRootElementWidth() {
    if (rootElementRef.current) {
      const elementWidth = rootElementRef.current.offsetWidth;
      return elementWidth;
    }
    return 1000;
  }

  function getTotalPercentage() {
    if (chartData) {
      return (totalWidgetValue / chartData.values[0]) * 100 - 100;
    } else {
      return 0;
    }
  }

  return (
    <div
      className={`relative bg-_background1 dark:bg-_darkBackground1 rounded-2xl drop-shadow-md ${
        onEdit && "border-2 border-_primary px-4 py-3 pt-3"
      } ${
        objectWidget && objectWidget.height === 2
          ? "row-span-2"
          : "h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)]"
      } ${objectWidget && objectWidget.width === 2 && "col-span-2"}`}
      onMouseEnter={() => setOnWidget(true)}
      onMouseLeave={() => setOnWidget(false)}
      ref={rootElementRef}
    >
      {!onEdit && objectWidget ? (
        <>
          <div className={`${isChartLoading && "invisible"}`}>
            <div className={`flex gap-2 items-center mx-4 my-3`} ref={nameContainerRef}>
              {/* <h2 className="text-lg text-_grayText">{t("WIDGET_NETWORTH_LABEL")}</h2> */}
              <HoverCard>
                <HoverCardTrigger>
                  <h2
                    className="text-lg text-_grayText text-nowrap text-ellipsis overflow-hidden"
                    style={{ width: getRootElementWidth() - 55 }}
                  >
                    {objectWidget.name}
                  </h2>
                </HoverCardTrigger>
                <HoverCardContent className="overflow-clip">
                  <p className="underline">{t("WIDGET_INFORMATION_LABEL")}</p>
                  <p className="text-sm">
                    {t("WIDGET_NAME_LABEL")} : {objectWidget.name}
                  </p>
                  <p className="text-sm">{t("WIDGET_TAG_LABEL")} : </p>
                  <div>
                    {tagsListFromStore.map((el: TagGet) => (
                      <TagComponent tag={el} />
                    ))}
                  </div>
                  <p className="text-sm">
                    {t("WIDGET_WIDGET_TYPE_LABEL")} : {objectWidget.widgetType}
                  </p>
                  <p className="text-sm">
                    {t("WIDGET_DIMENSIONS_LABEL")} : {objectWidget.width} X {objectWidget.height}
                  </p>
                  <p className="text-sm">
                    {t("WIDGET_PERIOD_LABEL")} : {t(timeMap[objectWidget.period])}
                  </p>
                  <p className="text-sm">
                    {t("WIDGET_IS_DETAIL_CHART_LABEL")} :{" "}
                    {objectWidget.detailChart ? "true" : "false"}
                  </p>
                </HoverCardContent>
              </HoverCard>
              <span
                className={`material-symbols-outlined hover:cursor-pointer absolute top-4 right-4 ${
                  onWidget ? "text-_grayText" : "text-_background1 dark:text-_darkBackground1"
                }`}
                onClick={() => {
                  setOnEdit(true);
                }}
              >
                edit_square
              </span>
            </div>
            <div className={`overflow-hidden h-40 w-full`} ref={chartContainerRef}>
              <div className="mx-4 -m-1" ref={numberContainerRef}>
                <p className="text-xl md:text-2xl 2xl:text-3xl font-semibold overflow-hidden text-ellipsis text-nowrap">
                  {totalWidgetValue
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                    .replace(".", t("DECIMAL"))}{" "}
                  {localStorage.getItem("currency")
                    ? localStorage.getItem("currency")
                    : currencyList[0]}
                </p>
                {totalWidgetValue === 0 || chartData?.values[chartData?.values.length - 1] === 0 ? (
                  <p className="text-_grayText">0{t("DECIMAL")}00%</p>
                ) : (
                  <>
                    {getTotalPercentage().toFixed(2).includes("-") ? (
                      <p className="text-_redText">
                        {getTotalPercentage().toFixed(2).replace(".", t("DECIMAL"))}%
                      </p>
                    ) : (
                      <p className="text-_greenText">
                        {getTotalPercentage().toFixed(2).replace(".", t("DECIMAL"))}%
                      </p>
                    )}
                  </>
                )}
                <p className="absolute bottom-2 right-2 z-10">{t(timeMap[objectWidget.period])}</p>
              </div>
              <div className="absolute bottom-4">
                {chartData && (
                  <LineChart
                    sx={{
                      ".MuiLineElement-root": {
                        stroke: "#00000",
                        strokeWidth: 3,
                      },
                      "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                        strokeWidth: "0.5",
                        fill: "#0000FF",
                      },
                      "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                        fill: "#7F8EA3",
                      },
                      "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                        stroke: "#0000FF",
                        strokeWidth: 0,
                      },
                      "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                        stroke: "#00000FF",
                        strokeWidth: 0,
                      },
                    }}
                    yAxis={[
                      { min: Math.min(...chartData.values), max: Math.max(...chartData.values) },
                    ]}
                    xAxis={[
                      {
                        data: chartData.timestamps.map((_, index) => index),
                        valueFormatter: fullDayFormatter,
                      },
                    ]}
                    series={[
                      {
                        data: chartData.values,
                        showMark: false,
                        color: "#1F93DB",
                        valueFormatter: currencyFormatter,
                      },
                    ]}
                    margin={getMarginChart()}
                    width={chartDimensions.width}
                    height={chartDimensions.height}
                    bottomAxis={null}
                    leftAxis={objectWidget.detailChart ? undefined : null}
                  />
                )}
              </div>
            </div>
          </div>
          <Skeleton
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-_blueBackground dark:bg-_darkBlueBackground ${
              !isChartLoading && "hidden"
            }`}
            style={{
              width: rootElementRef.current?.offsetWidth ? rootElementRef.current?.offsetWidth : 50,
              height: rootElementRef.current?.offsetHeight
                ? rootElementRef.current?.offsetHeight
                : 50,
            }}
          />
        </>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-scroll space-y-4 pb-3">
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
                name="isDetailChart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("IS_DETAIL_CHART")}</FormLabel>
                    <FormControl>
                      <Checkbox {...field} checked={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="period"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("PERIOD_LABEL")}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {rangeList.map((el) => (
                              <>
                                {el !== "max" && (
                                  <SelectItem value={el}>{t(timeMap[el])}</SelectItem>
                                )}
                              </>
                            ))}
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
                name="dimensions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("DIMENSIONS_LABEL")}</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder={t("DIMENSIONS_LABEL")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1x1">1 x 1</SelectItem>
                            <SelectItem value="2x1">2 x 1</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
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
