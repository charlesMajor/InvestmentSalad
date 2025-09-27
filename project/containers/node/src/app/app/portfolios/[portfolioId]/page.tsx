"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Asset from "@/components/asset/Asset";
import FormTitle from "@/components/formTitle";
import { useTranslation } from "react-i18next";
import { isMobile } from "mobile-device-detect";
import TagComponent from "@/components/tagComponent";
import { AddPortfolio } from "@/components/addPortfolio";
import { PORTFOLIOS_PATH } from "@/lib/utils/constants/appPath";
import { getCrumbAndCookieFromLocalStorage } from "@/lib/utils/util";
import { AddStockAsset } from "@/components/actionButton/addStockAsset";
import { selectMultipleTagsByIds } from "@/redux/selectors/tagSelectors";
import { AddCryptoAsset } from "@/components/actionButton/addCryptoAsset";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getTotalValueFromAssetList } from "@/lib/models/assets/assetsCalculs";
import { getAssetsInformationFromAssetList } from "@/lib/managers/assetsManager";
import {
  AssetGet,
  AssetType,
  CryptoGet,
  PortfolioGet,
  StockGet,
  TagGet,
} from "@/lib/services/returnTypes";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { assetList } from "@/lib/utils/constants/selectArray";
import { Skeleton } from "@/components/ui/skeleton";

export default function PorfolioId() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const { portfolioArray } = useSelector((state: any) => state.portfolioArray);
  const { assetArray } = useSelector((state: any) => state.assetArray);

  const { isInitialised } = useSelector((state: any) => state.isInitialised);
  const [portfolio, setPortfolio] = useState<PortfolioGet>();
  const [tagComponents, setTagComponents] = useState<any[]>([<></>]);
  const [openDescription, setOpenDescription] = useState(false);
  const [totalBalance, setTotalBalance] = useState<number>();

  const [modifyOpen, setModifyOpen] = useState<boolean>(false);
  const [assetToModify, setAssetToModify] = useState<AssetGet>();

  const { push } = useRouter();

  const tagObjects: TagGet[] = useSelector(
    selectMultipleTagsByIds(portfolio ? portfolio.tags : []),
  );

  useEffect(() => {
    const fetchData = async () => {
      const allAssets = assetArray.filter((asset: AssetGet) => asset.portfolioId === portfolio?.id);
      const allStocksAssets = allAssets.filter(
        (asset: AssetGet) =>
          asset.assetType === AssetType.STOCK || asset.assetType === AssetType.CRYPTO,
      );
      let yahooData = getCrumbAndCookieFromLocalStorage();
      const allAssetsInfo: any = await getAssetsInformationFromAssetList(
        allStocksAssets,
        yahooData.crumb || "",
        yahooData.cookie || "",
      ).then((result) => {
        if (result.success && result.data) return result.data;
        else !result.success;
        return [];
      });
      if (allAssetsInfo != null) {
        const totalBalanceBeforeCash = getTotalValueFromAssetList(allStocksAssets, allAssetsInfo);
        if (portfolio && assetArray.length != 0) {
          setTotalBalance(totalBalanceBeforeCash + portfolio?.cashBalance);
        }
      }
    };

    fetchData();

    const intervalData = setInterval(() => {
      fetchData();
    }, 5000);

    const segments = window.location.pathname.split("/");
    const lastSegment = segments[segments.length - 1];

    const getPortfolioData = () => {
      for (let i = 0; i < portfolioArray.length; i++) {
        if (portfolioArray[i].id == lastSegment) {
          setPortfolio(portfolioArray[i]);
          return;
        }
      }
      if (isInitialised && !portfolio) push("/not-found");
    };

    getPortfolioData();

    setTagComponents(
      tagObjects.map((tag) => (
        <div key={tag.tagId} className="">
          <TagComponent tag={tag} />
        </div>
      )),
    );

    const handleOverflow = () => {
      if (window.location.pathname.includes("/app/portfolios/") && window.innerWidth >= 1024) {
        document.documentElement.scrollTop = 0;
        document.documentElement.style.overflow = "hidden";
      } else document.documentElement.style.overflow = "";
    };

    handleOverflow();
    window.addEventListener("resize", handleOverflow);

    return () => {
      window.removeEventListener("resize", handleOverflow);
      document.documentElement.style.overflow = "";
      clearInterval(intervalData);
    };
  }, [portfolio, isInitialised, portfolioArray]);

  return (
    <>
      <Dialog open={modifyOpen} onOpenChange={setModifyOpen}>
        <DialogContent className="sm:max-w-[700px]">
          {assetToModify?.assetType === AssetType.STOCK && (
            <>
              <FormTitle title={t("MODIFY_STOCK_ASSET")} description={t("ADD_ASSET_DESCRIPTION")} />
              <AddStockAsset setOpen={setModifyOpen} modifyView={true} assetId={assetToModify.id} />
            </>
          )}
          {assetToModify?.assetType === AssetType.CRYPTO && (
            <>
              <FormTitle
                title={t("MODIFY_CRYPTO_ASSET")}
                description={t("ADD_ASSET_DESCRIPTION")}
              />
              <AddCryptoAsset
                setOpen={setModifyOpen}
                modifyView={true}
                assetId={assetToModify.id}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
      <div className="flex flex-col sm:mx-12 h-screen">
        <div
          className={`flex flex-row relative bg-_background1 dark:bg-_darkBackground1 rounded-lg mb-6 px-6 py-2 ${
            openDescription && "pb-4"
          }`}
        >
          <Link className="mr-2" href={PORTFOLIOS_PATH}>
            <span className={`material-symbols-outlined text-_blackText dark:text-_whiteText`}>
              arrow_back_ios
            </span>
          </Link>
          <div className="flex flex-row justify-between w-full">
            <div>
              <h2 className="text-lg">{portfolio?.name}</h2>
              <div className="flex flex-wrap">{tagComponents}</div>
              {openDescription && <p>{portfolio?.description}</p>}
            </div>
            <span
              onClick={() => setOpenDescription(!openDescription)}
              className={`absolute left-1/2 transform -translate-x-1/2 material-symbols-outlined hover:cursor-pointer bottom-1 ${
                openDescription && "rotate-180"
              }`}
            >
              expand_more
            </span>
            <div className="">
              <h2 className={`text-lg flex flex-row items-center justify-end`}>
                {totalBalance ? (
                  totalBalance
                    .toFixed(2)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                    .replace(".", t("DECIMAL"))
                ) : (
                  <Skeleton className="w-32 h-6 me-2" />
                )}{" "}
                {portfolio?.currency}
                {openDescription && (
                  <>
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span
                                className="ml-2 material-symbols-outlined hover:cursor-pointer"
                                onClick={() => setOpen(true)}
                              >
                                edit_square
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{t("PORTFOLIO_ID_EDIT_PORTFOLIO")}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <FormTitle
                          title={t("MODIFY_PORTFOLIO")}
                          description={t("ADD_PORTFOLIO_DESCRIPTION")}
                        />
                        <AddPortfolio
                          setOpen={setOpen}
                          modifyView={true}
                          portfolioId={portfolio?.id}
                        />
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </h2>
              <p>
                {t("PORTFOLIO_LIST_CASHBALANCE_LABEL")} :{" "}
                {portfolio?.cashBalance
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
                  .replace(".", t("DECIMAL"))}
              </p>
              {openDescription && (
                <>
                  <p>
                    {t("PORTFOLIO_LIST_CASHINTERESTRATE_LABEL")} : {portfolio?.cashInterestRate}
                  </p>
                  <p>
                    {t("PORTFOLIO_LIST_INTERESTPAYMENTFREQUENCYPERYEAR_LABEL")} :{" "}
                    {portfolio?.interestPaymentFrequencyPerYear}
                  </p>
                  <p>
                    {t("PORTFOLIO_ID_FIRST_INTEREST_PAYOUT_DATE")} :{" "}
                    {portfolio?.initialInterestPaymentDate}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col lg:flex-row gap-4 w-full h-96 ${
            openDescription ? "lg:h-[calc(100%-290px)]" : "lg:h-[calc(100%-210px)]"
          } `}
        >
          <div className="pl-4 pr-2 px-6 flex-1 bg-_background1 dark:bg-_darkBackground1 rounded-lg">
            <h2 className="text-center text-lg mb-2 mt-2">{t("PORTFOLIO_ID_ASSETS")}</h2>
            <div className="w-full flex flex-row justify-between px-6 py-1">
              {[
                t("PORTFOLIO_ID_NAME"),
                "",
                t("PORTFOLIO_ID_TODAYS_PRICE"),
                t("PORTFOLIO_ID_TOTAL_VALUE"),
                t("PORTFOLIO_ID_ALL_TIME_RETURN"),
              ].map((el) => (
                <>
                  {el !== "" ? (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="text-start">
                          <p
                            className={`w-16 overflow-hidden text-ellipsis text-sm ${
                              isMobile ? "text-wrap" : "text-nowrap"
                            }`}
                          >
                            {el}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{el}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <p
                      className={`w-16 overflow-hidden text-ellipsis text-sm ${
                        isMobile ? "text-wrap" : "text-nowrap"
                      }`}
                    >
                      {el}
                    </p>
                  )}
                </>
              ))}
            </div>
            <div className="flex flex-col gap-2 h-96 lg:h-[calc(100%-80px)] overflow-y-scroll overflow-x-hidden">
              {assetArray
                .filter((asset: AssetGet) => asset.portfolioId == portfolio?.id)
                .sort(function (a: AssetGet, b: AssetGet) {
                  let nameA: string = a.name.toUpperCase();
                  let nameB: string = b.name.toUpperCase();
                  if (a.assetType === AssetType.CRYPTO || b.assetType === AssetType.STOCK) {
                    const newA = a as StockGet | CryptoGet;
                    const newB = b as StockGet | CryptoGet;
                    nameA = newA.symbol;
                    nameB = newB.symbol;
                  }
                  return nameA.localeCompare(nameB);
                })
                .map((el: any) => (
                  <Asset
                    objectAsset={el}
                    setModifyOpen={setModifyOpen}
                    setAssetToModify={setAssetToModify}
                  />
                ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col h-full gap-4">
            <div className="p-2 flex-1 bg-_background1 dark:bg-_darkBackground1 rounded-lg">
              <h2 className="text-center text-lg">{t("PORTFOLIO_ID_RULES")}</h2>
            </div>
            <div className="p-2 flex-1 bg-_background1 dark:bg-_darkBackground1 rounded-lg">
              <h2 className="text-center text-lg">{t("PORTFOLIO_ID_TRANSACTIONS")}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
