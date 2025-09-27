"use client";

import { toast } from "sonner";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Widget from "@/components/widgets/widget";
import { removeWidget } from "@/redux/widgetArray";
import { useDispatch, useSelector } from "react-redux";
import { WidgetGet } from "@/lib/services/returnTypes";
import { deleteWidget } from "@/lib/services/widgetService";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AddWidget } from "../../../components/widgets/addWidget";

export default function DashBoard() {
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const widgetCreateRef = useRef<null | HTMLDivElement>(null);
  const [widgetComponents, setWidgetComponents] = useState<React.ComponentType<any>[]>([]);

  let nextId = 0;

  const onWidgetDelete = (idToDelete: number, objectToDelete?: WidgetGet) => {
    if (objectToDelete) {
      deleteWidget(objectToDelete).then((result) => {
        if (!result.success && result.message)
          toast(t(result.message.message, result.message.options));
        if (result.success) {
          dispatch(removeWidget(objectToDelete.id));
          toast(t("DELETE_WIDGET_API_SUCCESS"));
        }
      });
    } else {
      setWidgetComponents(widgetArray.filter((widget: any) => widget.id !== idToDelete));
    }
  };

  const addWidgetComponent = (component: React.ComponentType<any>) => {
    setWidgetComponents((prevComponents: React.ComponentType<any>[]) => [
      ...prevComponents,
      component,
    ]);

    if (widgetCreateRef.current) {
      widgetCreateRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const removeWidgetFromDisplay = (index: number) => {
    setWidgetComponents((prevWidgets) => {
      const newWidgets = [...prevWidgets];
      newWidgets.splice(index, 1);
      return newWidgets;
    });
  };

  const { dashboardArray } = useSelector((state: any) => state.dashboardArray);
  const dashboard = dashboardArray[0];
  const { widgetArray } = useSelector((state: any) => state.widgetArray);

  return (
    <div className="w-full">
      <div className="relative sm:mx-12 mt-4 p-3 h-full">
        <div className="mb-2 flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm text-_grayText -mb-1">{t("DASHBOARD_LABEL")}</p>
            <p className="text-2xl">{t("DASHBOARD_WELCOME")}</p>
          </div>
          <div className="flex gap-2">
            {/* <Button variant={"blueOutline"} size={"sm"}>
              {t("DASHBOARD_EDIT_VIEW_BUTTON")}
            </Button> */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"blue"} size={"sm"}>
                  {t("DASHBOARD_ADD_WIDGET_BUTTON")}
                </Button>
              </DialogTrigger>
              <AddWidget addComponent={addWidgetComponent} setOpen={setOpen} />
            </Dialog>
          </div>
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 md:gap-4 2xl:gap-6">
          {widgetArray.map((widget: WidgetGet) => (
            <Widget
              key={nextId++}
              objectWidget={widget}
              id={nextId++}
              onDeleteRequested={onWidgetDelete}
            />
          ))}
          {widgetComponents.map((Component, index) => (
            <div key={index}>
              <Component
                isCreation={true}
                dashboard={dashboard}
                onDelete={() => removeWidgetFromDisplay(index)}
              />
            </div>
          ))}
          <div
            ref={widgetCreateRef}
            id="widget-placement"
            className="h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)]"
          ></div>
          <div className="h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)]"></div>
          <div className="h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)] hidden xl:block"></div>
          <div className="h-[calc(15vw+110px)] xl:h-[calc(19vw-25px)] hidden xl:block"></div>
        </div>
      </div>
    </div>
  );
}
