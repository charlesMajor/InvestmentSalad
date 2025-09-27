import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { removeAsset } from "@/redux/assetArray";
import { deleteAsset } from "@/lib/services/assetsService";
import { APIResult, AssetGet } from "@/lib/services/returnTypes";

interface deletePopupProps {
  asset: AssetGet;
}

export default function deletePopup({ asset }: deletePopupProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function onSubmit() {
    await deleteAsset(asset.id, asset.assetType).then((result: APIResult<void>) => {
      if (!result.success && result.message)
        toast(t(result.message.message, result.message.options));
      if (result.success) {
        dispatch(removeAsset(asset.id));
        toast(t("DELETE_ASSET_API_SUCCESS"));
      }
    });
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant={"red"} size={"sm"}>
            {t("PORTFOLIO_ID_DELETE_ASSET")}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("DELETE_ASSET_DIALOG_TITLE")}</AlertDialogTitle>
            <AlertDialogDescription>{t("DELETE_ASSET_DIALOG_DESCRIPTION")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("DELETE_ASSET_DIALOG_CANCEL")}</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>
              {t("DELETE_ASSET_DIALOG_CONTINUE")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
