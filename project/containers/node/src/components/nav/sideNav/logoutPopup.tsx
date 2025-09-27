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
import { useTranslation } from "react-i18next";
import { logout } from "@/lib/services/authService";
import { useDispatch } from "react-redux";
import { clearStore } from "@/lib/managers/storeManager";

export default function logoutPopup() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  async function onSubmit() {
    await logout();
    clearStore(dispatch);

    toast(t("LOG_OUT_API_SUCCESS"));
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="relative h-6 w-6 rounded-full p-4 bg-transparent hover:bg-red-200 hover:dark:bg-red-700">
            <span className="absolute inset-0 hover:cursor-pointer material-symbols-outlined text-_blackText dark:text-white mt-1">
              logout
            </span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("LOG_OUT_DIALOG_TITLE")}</AlertDialogTitle>
            <AlertDialogDescription>{t("LOG_OUT_DIALOG_DESCRIPTION")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("LOG_OUT_DIALOG_CANCEL")}</AlertDialogCancel>
            <AlertDialogAction onClick={onSubmit}>{t("LOG_OUT_DIALOG_CONTINUE")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
