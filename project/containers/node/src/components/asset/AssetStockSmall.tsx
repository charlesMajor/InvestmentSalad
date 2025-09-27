import { useEffect, useState } from "react";
import StockSmallChart from "../charts/stockSmallChart";
import {
  getCrumb,
  getYahooFinanceFromCrumb,
  setYahooFinanceCookie,
} from "@/lib/services/yahooFinanceService";
import { HttpStatusCode } from "axios";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { StockGet, TagGet } from "@/lib/services/returnTypes";
import { useSelector } from "react-redux";
import { selectMultipleTagsByIds } from "@/redux/selectors/tagSelectors";
import TagComponent from "../tagComponent";

interface AssetProps {
  symbol: string;
}

type AssetInformation = {
  price: string;
  currency: string;
  purcentage: string;
  longName: string;
};

export default function AssetStockSmall({ symbol }: AssetProps) {
  const { t } = useTranslation();
  const [assetInformation, setAssetInformation] = useState<AssetInformation | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const crumb = localStorage.getItem("crumb");
        const yahooFinanceCookie = localStorage.getItem("yahooFinanceCookie");
        if (crumb && yahooFinanceCookie) {
          return await getYahooFinanceFromCrumb(
            symbol,
            "modules=price",
            crumb,
            yahooFinanceCookie,
          ).then((result) => {
            if (!result.success && result.message) {
              if (result.message.options?.statusCode == HttpStatusCode.InternalServerError) {
                verifyCrumb();
              }
            }
            if (result.success && result.data) {
              const priceObj = result.data.key.quoteSummary.result[0].price;
              const obj: AssetInformation = {
                price: priceObj.regularMarketPrice.raw,
                currency: priceObj.currency,
                purcentage: priceObj.regularMarketChangePercent.raw,
                longName: priceObj.longName,
              };
              setAssetInformation(obj);
            }
          });
        } else {
          verifyCrumb();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const verifyCrumb = async () => {
      getCrumb().then(async (result: any) => {
        if (result.data) {
          if (result.data.key == "") {
            setYahooFinanceCookie().then((result: any) => {
              localStorage.setItem("yahooFinanceCookie", result.data.key);
            });
            getCrumb().then((result: any) => {
              localStorage.setItem("crumb", result.data.key);
            });
          }
        }
      });
    };

    if (assetInformation === null) {
      fetchData();
    }
  }, [assetInformation]);

  return (
    <>
      {assetInformation !== null ? (
        <div
          className="bg-_blueBackground dark:bg-_darkBlueBackground px-2 py-0 rounded-md ms-2"
          onClick={() => setOpen(!open)}
        >
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col w-16 flex-1 flex-wrap">
              <p className="overflow-hidden text-nowrap text-ellipsis w-16">{symbol}</p>{" "}
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="text-sm text-_grayText overflow-hidden text-nowrap text-ellipsis w-16">
                      {assetInformation?.longName}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{assetInformation?.longName}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mx-1 flex-none w-[30%]">
              <StockSmallChart symbol={symbol} />
            </div>
            <div className="flex flex-col items-end flex-1">
              <p className="text-nowrap">
                {Number(assetInformation?.price)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                  .replace(".", t("DECIMAL"))}
              </p>
              <div className="float-right text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
                {assetInformation?.purcentage.toString().includes("-") ? (
                  <p className="text-_redText text-sm">
                    {(Number(assetInformation?.purcentage) * 100)
                      .toFixed(2)
                      .replace(".", t("DECIMAL"))}
                    %
                  </p>
                ) : (
                  <p className="text-_greenText text-sm">
                    {(Number(assetInformation?.purcentage) * 100)
                      .toFixed(2)
                      .replace(".", t("DECIMAL"))}
                    %
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className="ms-2 w-full h-12 rounded-md bg-_blueBackground dark:bg-_darkBlueBackground" />
      )}
    </>
  );
}
