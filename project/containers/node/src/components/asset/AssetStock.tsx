import { Button } from "../ui/button";
import { HttpStatusCode } from "axios";
import { useSelector } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import TagComponent from "../tagComponent";
import { useEffect, useState } from "react";
import {
  getCrumb,
  getYahooFinanceFromCrumb,
  setYahooFinanceCookie,
} from "@/lib/services/yahooFinanceService";
import { useTranslation } from "react-i18next";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AssetGet, AssetType, StockGet, TagGet } from "@/lib/services/returnTypes";
import { selectMultipleTagsByIds } from "@/redux/selectors/tagSelectors";
import { el } from "date-fns/locale";
import DeletePopup from "../forms/asset/deletePopup";
import StockSmallChart from "../charts/stockSmallChart";
import { getCrumbAndCookieFromLocalStorage } from "@/lib/utils/util";

interface AssetProps {
  objectAsset: StockGet;
  setModifyOpen: (modifyOpen: boolean) => void;
  setAssetToModify: (assetToModify: AssetGet) => void;
}

type AssetInformation = {
  price: string;
  currency: string;
  purcentage: string;
  longName: string;
};

export default function AssetStock({ objectAsset, setModifyOpen, setAssetToModify }: AssetProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [assetInformation, setAssetInformation] = useState<AssetInformation | null>(null);
  const tags: TagGet[] = useSelector(selectMultipleTagsByIds(objectAsset ? objectAsset.tags : []));

  const fetchData = async () => {
    try {
      const yahooData = getCrumbAndCookieFromLocalStorage();
      if (yahooData.crumb && yahooData.cookie) {
        return await getYahooFinanceFromCrumb(
          objectAsset.symbol,
          "modules=price",
          yahooData.crumb,
          yahooData.cookie,
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

  useEffect(() => {
    const intervalData = setInterval(() => {
      fetchData();
    }, 5000);

    if (assetInformation === null) {
      fetchData();
    }

    return () => {
      clearInterval(intervalData);
    };
  }, [assetInformation]);

  useEffect(() => {
    fetchData();
  }, [objectAsset]);

  function getAllTimeReturn() {
    return (
      objectAsset.quantity * Number(assetInformation?.price) -
      objectAsset.quantity * Number(objectAsset.unitPrice)
    );
  }

  function getAllTimeReturnPercentage() {
    return (getAllTimeReturn() / (objectAsset.quantity * Number(objectAsset.unitPrice))) * 100;
  }

  return (
    <>
      {assetInformation !== null ? (
        <div
          className="bg-_blueBackground dark:bg-_darkBlueBackground px-6 py-1 hover:cursor-pointer rounded-md"
          onClick={() => setOpen(!open)}
        >
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-col w-16">
              <p className="overflow-hidden text-nowrap text-ellipsis w-16">{objectAsset.symbol}</p>{" "}
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
            <div className="w-20">
              <StockSmallChart symbol={objectAsset.symbol} />
            </div>
            <div className="flex flex-col w-16">
              <p>{Number(assetInformation?.price).toFixed(2).replace(".", t("DECIMAL"))}</p>
              <p className="float-right text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
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
              </p>
            </div>
            <div className="flex flex-col w-16">
              <p className="">
                {(Number(objectAsset.quantity) * Number(assetInformation?.price))
                  .toFixed(2)
                  .replace(".", t("DECIMAL"))}
              </p>
              <p className="text-_grayText text-sm flex items-center">
                {objectAsset.quantity.toFixed(2).replace(".", t("DECIMAL"))}
                <span className="material-symbols-outlined text-sm">request_page</span>
              </p>
            </div>
            <div className="flex flex-col w-16">
              <p className="">{getAllTimeReturn().toFixed(2).replace(".", t("DECIMAL"))}</p>
              <p className="float-right text-_grayText txt-xs overflow-hidden text-ellipsis text-nowrap">
                {getAllTimeReturnPercentage().toLocaleString().includes("-") ? (
                  <p className="text-_redText text-sm">
                    {getAllTimeReturnPercentage().toFixed(2).replace(".", t("DECIMAL"))}%
                  </p>
                ) : (
                  <p className="text-_greenText text-sm">
                    {getAllTimeReturnPercentage().toFixed(2).replace(".", t("DECIMAL"))}%
                  </p>
                )}
              </p>
            </div>
          </div>
          {open && (
            <div className="mt-2">
              <div className="flex flex-row gap-1">
                {tags.map((tag) => (
                  <TagComponent tag={tag} />
                ))}
              </div>
              <p>{objectAsset.name}</p>
              <p>{objectAsset.description}</p>
              <p>
                {t("PORTFOLIO_ID_BUY_PRICE")} :{" "}
                {objectAsset.unitPrice
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                  .replace(".", t("DECIMAL"))}{" "}
                {assetInformation.currency}
              </p>
              <p>
                {t("PORTFOLIO_ID_BUY_DATE")} : {objectAsset.buyDate}
              </p>
              <div className="my-2 flex flex-row justify-between items-center">
                <div className="flex flex-row gap-2" onClick={(e) => e.stopPropagation()}>
                  <DeletePopup asset={objectAsset} />
                  {/* <Button variant={"blue"} size={"sm"}>
                    {t("PORTFOLIO_ID_SELL_ASSET")}
                  </Button> */}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <button
                        onClick={() => {
                          setAssetToModify(objectAsset);
                          setModifyOpen(true);
                        }}
                      >
                        <span className="material-symbols-outlined hover:cursor-pointer">
                          edit_square
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("PORTFOLIO_ID_EDIT_PORTFOLIO")}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Skeleton className="w-full h-14 rounded-md bg-_blueBackground dark:bg-_darkBlueBackground" />
      )}
    </>
  );
}
