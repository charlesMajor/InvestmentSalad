import { toast } from "sonner";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDispatch } from "react-redux";
import { Row } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import { APIResult } from "@/lib/services/returnTypes";
import { Portfolio } from "@/lib/models/portfolioModel";
import { removePortfolio } from "@/redux/portfolioArray";
import { deletePortfolio } from "@/lib/services/portfolioService";
import { removeAssetsFromOnePortfolio } from "@/redux/assetArray";

interface deletePopupProps {
  row: Row<Portfolio> | undefined;
  setOpenDeletePopup: (open: boolean) => void;
}

export default function deletePopup({ row, setOpenDeletePopup }: deletePopupProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  async function onSubmit() {
    if (row) {
      await deletePortfolio(row.getValue("id")).then((result: APIResult<void>) => {
        if (!result.success && result.message)
          toast(t(result.message.message, result.message.options));
        if (result.success) {
          dispatch(removePortfolio(row.getValue("id")));
          dispatch(removeAssetsFromOnePortfolio(row.getValue("id")));
          toast(t("DELETE_PORTFOLIO_API_SUCCESS"));
        }
      });
    }
    setOpenDeletePopup(false);
  }

  function getName() {
    if (row) return row.getValue("name");
    return "";
  }

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("DELETE_PORTFOLIO_DIALOG_TITLE")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("DELETE_PORTFOLIO_DIALOG_DESCRIPTION", { portfolioName: getName() })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("DELETE_PORTFOLIO_DIALOG_CANCEL")}</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>
            {t("DELETE_PORTFOLIO_DIALOG_CONTINUE")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
