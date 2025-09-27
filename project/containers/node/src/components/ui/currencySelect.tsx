"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useState } from "react";

export default function CurrencySelect() {
  const handleCurrencyChange = (event: string) => {
    localStorage.setItem("currency", event);
    setCurrency(event);
  };

  const getCurrency = () => {
    const currentCurrency = localStorage.getItem("currency");
    if (currentCurrency != null) {
      return currentCurrency;
    }
  };

  const [currency, setCurrency] = useState(getCurrency());

  return (
    <>
      <Select onValueChange={handleCurrencyChange} value={currency} defaultValue={getCurrency()}>
        <SelectTrigger className="px-4 relative flex items-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900">
          <div className="flex items-center px-2 pointer-events-none">
            {" "}
            <i className="shaduicn shaduicn-globe text-_blackText"></i>
          </div>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="CAD">CAD</SelectItem>
          <SelectItem value="USD">USD</SelectItem>
          <SelectItem value="EUR">EUR</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
