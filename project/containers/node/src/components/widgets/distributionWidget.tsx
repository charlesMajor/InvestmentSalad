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
import TagList from "../tagList";
import {
  APIResult,
  Dashboard,
  TagGet,
  WidgetGet,
  WidgetType,
  AssetGet,
  WidgetDistributionGet,
  WidgetCreate,
  WidgetDistributionCreate,
} from "@/lib/services/returnTypes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import _debounce from "lodash/debounce";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { PieValueType } from "@mui/x-charts";
import {
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
  WIDGET_DISTRIBUTION_MIN_TAG,
} from "@/lib/utils/constants/formValidation";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { addWidget, modifyWidget } from "@/redux/widgetArray";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useRef, useState } from "react";
import TagComponent from "@/components/tagComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { shallowEqual, useSelector } from "react-redux";
import { getTextColor } from "@/lib/managers/colorManager";
import { createWidget, updateWidget } from "@/lib/services/widgetService";
import { currencyList } from "@/lib/utils/constants/selectArray";
import { selectAssetsByTags } from "@/redux/selectors/assetSelectors";
import { selectMultipleTagsByIds } from "@/redux/selectors/tagSelectors";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { getTotalValueOfUniqueAssetsInRecord, getValueFromAssets } from "@/lib/utils/util";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface DistributionWidgetProps {
  isCreation: boolean;
  dashboard?: Dashboard;
  objectWidget?: WidgetDistributionGet;
  onDelete: (deleteFromDb: boolean) => void;
}

interface TagDisplayData {
  id: string;
  name: string;
  value: number;
  color: string;
}

export default function DistributionWidget({
  isCreation,
  dashboard,
  objectWidget,
  onDelete,
}: DistributionWidgetProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [onEdit, setOnEdit] = useState(false);
  const [onWidget, setOnWidget] = useState(false);
  const rootElementRef = useRef<HTMLDivElement>(null);
  const [nameWidth, setNameWidth] = useState(1000);
  const [chartLeftMargin, setChartLeftMargin] = useState(1000);
  const [tagInfoHeight, setTagInfoHeight] = useState(1000);
  const [chartDimensions, setChartDimensions] = useState({ width: 0, height: 0 });
  const [chartData, setChartData] = useState<PieValueType[]>([]);
  const [isChartLoading, setIsChartLoading] = useState<boolean>(true);
  const [tagsDisplayData, setTagsDisplayData] = useState<TagDisplayData[]>([]);
  const [totalWidgetValue, setTotalWidgetValue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const nameContainerRef = useRef<HTMLDivElement>(null);

  const tagsListFromStore: TagGet[] = useSelector(
    selectMultipleTagsByIds(objectWidget ? objectWidget.tags : []),
    shallowEqual,
  );
  const tagsAssetsMap: Record<string, AssetGet[]> = useSelector(
    selectAssetsByTags(objectWidget ? objectWidget.tags : []),
  );

  useEffect(() => {
    const getDataChart = async () => {
      let dataForChart: PieValueType[] = [];
      let dataForDisplay: TagDisplayData[] = [];
      for (let i = 0; i < tagsListFromStore.length; i++) {
        let color = getTextColor("#" + tagsListFromStore[i].hexColor, lightAjustmentForColor);
        let value = await getValueFromAssets(tagsAssetsMap[tagsListFromStore[i].tagId]);
        if (value != 0) {
          dataForChart.push({
            id: tagsListFromStore[i].tagId,
            value: value,
            label: tagsListFromStore[i].name,
            color: color,
          });
        }
        dataForDisplay.push({
          id: tagsListFromStore[i].tagId,
          value: value,
          name: tagsListFromStore[i].name,
          color: color,
        });
      }

      setChartData(dataForChart);
      setTagsDisplayData(dataForDisplay);
      setIsChartLoading(false);
      setTotalWidgetValue(await getTotalValueOfUniqueAssetsInRecord(tagsAssetsMap));
    };
    getDataChart();
  }, [tagsListFromStore]);

  const lightAjustmentForColor = 20;

  const WIDGET_NAME_LENGTH = t("WIDGET_NAME_LENGTH", {
    minLength: MIN_NAME_LENGTH,
    maxLength: MAX_NAME_LENGTH,
  });
  const WIDGET_TAG_LENGTH = t("WIDGET_TAG_LENGTH", {
    minLength: WIDGET_DISTRIBUTION_MIN_TAG,
  });

  useEffect(() => {
    if (isCreation) setOnEdit(true);

    const handleResize = () => {
      setIsChartLoading(true);
      if (rootElementRef.current) {
        const elementWidth1 = rootElementRef.current.offsetWidth - 55;
        setNameWidth(elementWidth1);
        const elementWidth2 = rootElementRef.current.offsetWidth / 5;
        setChartLeftMargin(elementWidth2);
        setTagInfoHeight(rootElementRef.current.offsetHeight - 45);
      }
    };

    const debouncedHandleResize = _debounce(() => setIsChartLoading(false), 1000);

    handleResize();

    const updateChartDimensions = () => {
      const rootElement = rootElementRef.current;
      if (rootElement) {
        setChartDimensions({
          width: rootElement.offsetWidth,
          height: rootElement.offsetHeight,
        });
      }
    };

    updateChartDimensions();

    window.addEventListener("resize", updateChartDimensions);
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.addEventListener("resize", updateChartDimensions);
      window.removeEventListener("resize", handleResize);
      window.addEventListener("resize", debouncedHandleResize);
    };
  }, []);

  const size = {
    width: 235,
    height: 130,
  };

  const StyledText = styled("text")(({ theme }) => ({
    fill: localStorage.getItem("darkMode") === "true" ? "#ffffff" : "#000000",
    textAnchor: "middle",
    dominantBaseline: "central",
    fontSize: 20,
  }));

  // À garder
  // function PieCenterLabel({ children }: { children: React.ReactNode }) {
  //   const { width, height, left, top } = useDrawingArea();
  //   return (
  //     <StyledText x={left + width / 2} y={top + height / 2}>
  //       {children}
  //     </StyledText>
  //   );
  // }

  const formSchema = z.object({
    tags: z.array(z.string()).refine((value) => value.length >= WIDGET_DISTRIBUTION_MIN_TAG, {
      message: WIDGET_TAG_LENGTH,
    }),
    name: z
      .string({ required_error: t("NAME_EMPTY") })
      .min(MIN_NAME_LENGTH, { message: WIDGET_NAME_LENGTH })
      .max(MAX_NAME_LENGTH, { message: WIDGET_NAME_LENGTH }),
    dimensions: z.enum(["1x1"], {
      required_error: t("DIMENSIONS_EMPTY"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      !isCreation && objectWidget
        ? {
            tags: objectWidget.tags,
            name: objectWidget.name,
            dimensions: "1x1",
          }
        : {
            tags: [],
            name: "",
            dimensions: "1x1",
          },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const width = values.dimensions.split("x")[0];
    const height = values.dimensions.split("x")[1];

    if (isCreation && dashboard) {
      const updatedDefaultValues: WidgetDistributionCreate = {
        tags: values.tags,
        name: values.name,
        width: parseInt(width),
        height: parseInt(height),
        widgetType: WidgetType.DISTRIBUTION,
        posX: 0,
        posY: 0,
      };
      await createWidget(dashboard.id, WidgetType.DISTRIBUTION, updatedDefaultValues).then(
        (result: APIResult<WidgetGet>) => {
          if (!result.success && result.message)
            toast(t(result.message.message, result.message.options));
          if (result.success && result.data) {
            dispatch(addWidget(result.data));
            toast(t("CREATE_API_SUCCESS"));
            onDelete(false);
          }
        },
      );
    }
    if (!isCreation && objectWidget) {
      const updatedDefaultValues: WidgetDistributionGet = {
        tags: values.tags,
        name: values.name,
        width: parseInt(width),
        height: parseInt(height),
        widgetType: WidgetType.DISTRIBUTION,
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

  return isCreation && !isVisible ? null : (
    <div
      className={`relative bg-_background1 dark:bg-_darkBackground1 rounded-2xl px-4 py-3 drop-shadow-md ${
        onEdit && "border-2 border-_primary px-4 pt-3"
      } ${
        (objectWidget?.height ?? 1) === 2
          ? "row-span-2"
          : "h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)]"
      } ${(objectWidget?.width ?? 1) === 2 && "col-span-2"}`}
      onMouseEnter={() => setOnWidget(true)}
      onMouseLeave={() => setOnWidget(false)}
      ref={rootElementRef}
    >
      {!onEdit && objectWidget && objectWidget.tags.length >= 2 ? (
        <>
          {!isChartLoading == true ? (
            <>
              <div className="flex gap-2 items-center mb-3" ref={nameContainerRef}>
                <HoverCard>
                  <HoverCardTrigger>
                    <h2
                      className="text-lg text-_grayText text-nowrap text-ellipsis overflow-hidden"
                      style={{ width: nameWidth }}
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
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div
                        className="flex flex-col space-y-0 w-32 hover:cursor-default"
                        style={{
                          height: tagInfoHeight,
                        }}
                      >
                        <div className="overflow-hidden flex-grow">
                          {tagsDisplayData.length > 0 &&
                            tagsDisplayData.map((el: TagDisplayData) => (
                              <div className="flex flex-col -space-y-1">
                                <div className="flex flex-row gap-2 items-center">
                                  <div
                                    className={`h-3 w-3 rounded-full flex-shrink-0`}
                                    style={{
                                      background: el.color,
                                    }}
                                  ></div>
                                  <p className="overflow-hidden text-nowrap text-ellipsis">
                                    {el.name}
                                  </p>
                                </div>
                                <p className="text-_grayText text-sm text-start ml-5 text-nowrap overflow-hidden text-ellipsis">
                                  {el.value
                                    .toFixed(2)
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                                    .replace(".", t("DECIMAL"))}{" "}
                                  {localStorage.getItem("currency")
                                    ? localStorage.getItem("currency")
                                    : currencyList[0]}
                                </p>
                              </div>
                            ))}
                        </div>
                        {/* {widget.tags.length > 3 && <p className="text-start ml-5">...</p>} */}
                        <Separator />
                        <div className="flex flex-col -space-y-1 mt-2 h-10">
                          <div className="flex flex-row gap-2 items-center ml-3">
                            {tagsListFromStore.slice(0, 3).map((el: TagGet) => (
                              <div
                                className={`h-3 w-3 rounded-full -ml-4`}
                                style={{
                                  background: getTextColor(
                                    "#" + el.hexColor,
                                    lightAjustmentForColor,
                                  ),
                                }}
                              ></div>
                            ))}
                            <p className="text-nowrap overflow-hidden text-ellipsis flex-1">
                              {totalWidgetValue
                                .toFixed(2)
                                .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                                .replace(".", t("DECIMAL"))}{" "}
                              {localStorage.getItem("currency")
                                ? localStorage.getItem("currency")
                                : currencyList[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="-ml-36 -mt-4">
                      {tagsDisplayData.map((el: TagDisplayData) => (
                        <div className="flex flex-col -space-y-1">
                          <div className="flex flex-row gap-2 items-center">
                            <div
                              className={`h-3 w-3 rounded-full`}
                              style={{
                                background: el.color,
                              }}
                            ></div>
                            <p>{el.name}</p>
                          </div>
                          <p className="text-_grayText text-sm">
                            {el.value
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                              .replace(".", t("DECIMAL"))}{" "}
                            {localStorage.getItem("currency")
                              ? localStorage.getItem("currency")
                              : currencyList[0]}
                          </p>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex flex-row gap-2 items-center ml-3">
                        {tagsListFromStore.slice(0, 3).map((el: TagGet) => (
                          <div
                            className={`h-3 w-3 rounded-full -ml-4`}
                            style={{
                              background: getTextColor("#" + el.hexColor, lightAjustmentForColor),
                            }}
                          ></div>
                        ))}
                        <p className="text-nowrap overflow-hidden text-ellipsis flex-1">
                          {totalWidgetValue
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                            .replace(".", t("DECIMAL"))}{" "}
                          {localStorage.getItem("currency")
                            ? localStorage.getItem("currency")
                            : currencyList[0]}
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="absolute bottom-2 ml-[calc(15%+60px)]">
                  <PieChart
                    series={[
                      {
                        paddingAngle: 2,
                        innerRadius: chartLeftMargin - chartLeftMargin / 6,
                        outerRadius: chartLeftMargin,
                        data: chartData,
                      },
                    ]}
                    {...size}
                    slotProps={{
                      legend: { hidden: true },
                    }}
                    width={chartDimensions.width}
                    height={chartDimensions.height - 40}
                  >
                    {/* À garder */}
                    {/* <PieCenterLabel>25%</PieCenterLabel> */}
                  </PieChart>
                </div>
              </div>
            </>
          ) : (
            <Skeleton
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-_blueBackground dark:bg-_darkBlueBackground"
              style={{
                width: rootElementRef.current?.offsetWidth
                  ? rootElementRef.current?.offsetWidth
                  : 50,
                height: rootElementRef.current?.offsetHeight
                  ? rootElementRef.current?.offsetHeight
                  : 50,
              }}
            />
          )}
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
