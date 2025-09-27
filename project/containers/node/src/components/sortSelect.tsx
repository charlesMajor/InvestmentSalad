"use client";

import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

enum SortType {
  ASC,
  DESC,
}

export default function SortSelect() {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState("ASC");

  const sortChange = (value: string) => {
    setSortType(value);
  };

  return (
    <>
      <Select onValueChange={sortChange} value={sortType} defaultValue={sortType}>
        <SelectTrigger className="w-24 px-4 relative flex items-center rounded-full hover:bg-zinc-100">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ASC">ASC</SelectItem>
          <SelectItem value="DESC">DESC</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
