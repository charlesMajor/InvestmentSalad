import { AssetGet, AssetType, CryptoGet, StockGet } from "@/lib/services/returnTypes";
import AssetStock from "./AssetStock";
import AssetCrypto from "./AssetCrypto";
/*import { Dialog, DialogContent } from "../ui/dialog";
import FormTitle from "../formTitle";
import { AddStockAsset } from "../actionButton/addStockAsset";*/

interface AssetProps {
  objectAsset: AssetGet;
  setModifyOpen: (modifyOpen: boolean) => void;
  setAssetToModify: (assetToModify: AssetGet) => void;
}

export default function Asset({ objectAsset, setModifyOpen, setAssetToModify }: AssetProps) {
  return (
    <>
      {objectAsset.assetType == AssetType.STOCK ? (
        <AssetStock
          objectAsset={objectAsset as StockGet}
          setModifyOpen={setModifyOpen}
          setAssetToModify={setAssetToModify}
        />
      ) : objectAsset.assetType == AssetType.CRYPTO ? (
        <AssetCrypto
          objectAsset={objectAsset as CryptoGet}
          setModifyOpen={setModifyOpen}
          setAssetToModify={setAssetToModify}
        />
      ) : (
        <></>
      )}
    </>
  );
}
