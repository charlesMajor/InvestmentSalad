import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ActionButtonNav from "./actionButtonNav";
import { RemoveAsset } from "./removeAsset";
import { AddLiability } from "./addLiability";
import AddAsset from "./addAsset";

export enum AssetsPages {
  Add,
  Remove,
  Liabilities,
}

export default function ActionButton() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<AssetsPages>(AssetsPages.Add);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {!isMobile ? (
            <Button variant={"new"} size={"smFull"}>
              <span className="material-symbols-outlined mr-1 text-[1.3rem]">add</span>
              {t("new")}
            </Button>
          ) : (
            <div className="z-10 fixed bg-_primary h-16 w-16 rounded-full bottom-4 right-4">
              <span className="flex items-center justify-center material-symbols-outlined text-6xl text-_whiteText h-full hover:cursor-pointer">
                add
              </span>
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px]">
          {/* <ActionButtonNav setActiveTab={setActiveTab} activeTab={activeTab} /> */}
          {activeTab === AssetsPages.Add && <AddAsset setOpen={setOpen} />}
          {activeTab === AssetsPages.Remove && <RemoveAsset />}
          {activeTab === AssetsPages.Liabilities && <AddLiability />}
        </DialogContent>
      </Dialog>
    </div>
  );
}
