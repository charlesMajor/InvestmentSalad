import FormTitle from "../formTitle";
import React from "react";
import { t } from "i18next";

export function AddLiability() {
  return (
    <>
      <FormTitle title={t("LIABILITY")} description={t("LIABILITY_DESCRIPTION")} />
    </>
  );
}
