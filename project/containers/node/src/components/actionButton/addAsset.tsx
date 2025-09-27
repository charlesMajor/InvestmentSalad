import { useTranslation } from "react-i18next";
import { AddStockAsset } from "./addStockAsset";
import { AddCryptoAsset } from "./addCryptoAsset";
import React, { useEffect, useState } from "react";
import { AssetType } from "@/lib/services/returnTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import FormTitle from "../formTitle";

interface AddAssetProps {
  setOpen: (open: boolean) => void;
}

export default function AddAsset({ setOpen }: AddAssetProps) {
  const { t } = useTranslation();

  const [activeForm, setActiveForm] = useState<AssetType>(AssetType.STOCK);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  const handleFormChange = (event: string) => {
    setActiveForm(event as AssetType);
  };

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
    <>
      <div className="flex items-center justify-end -mb-16">
        <p className="text-nowrap me-1">{t("CREATE_TYPE_OF_ASSET_LABEL")} :</p>
        <Select onValueChange={handleFormChange} value={activeForm} defaultValue={AssetType.STOCK}>
          <SelectTrigger className="px-4 relative flex items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 w-40">
            <div className="flex items-center px-2 pointer-events-none">
              <i className="shaduicn shaduicn-globe text-_blackText"></i>
            </div>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AssetType.STOCK}>{t("STOCK_OPTION")}</SelectItem>
            <SelectItem value={AssetType.CRYPTO}>{t("CRYPTO_OPTION")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {activeForm === AssetType.STOCK && (
        <>
          <FormTitle title={t("ADD_STOCK_ASSET")} description={t("ADD_ASSET_DESCRIPTION")} />
          <AddStockAsset setOpen={setOpen} modifyView={false} />
        </>
      )}
      {activeForm === AssetType.CRYPTO && (
        <>
          <FormTitle title={t("ADD_CRYPTO_ASSET")} description={t("ADD_ASSET_DESCRIPTION")} />
          <AddCryptoAsset setOpen={setOpen} modifyView={false} />
        </>
      )}
    </>
  );
}
