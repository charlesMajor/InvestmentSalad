import FormTitle from "../formTitle";
import React from "react";
import { t } from "i18next";

export function RemoveAsset() {
  return (
    <>
      <FormTitle title={t("REMOVE_ASSET")} description={t("REMOVE_ASSET_DESCRIPTION")} />
    </>
  );
}
