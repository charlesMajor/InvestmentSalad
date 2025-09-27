import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CurrencySwitcher() {
  const changeCurrency = (cur: string) => {
    localStorage.setItem("currency", cur);
    window.location.reload();
  };

  return (
    <div>
      <button
        className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-600 py-1 px-2 rounded-md"
        onClick={() => changeCurrency("USD")}
      >
        USD
      </button>
      <button
        className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-600 py-1 px-2 rounded-md"
        onClick={() => changeCurrency("CAD")}
      >
        CAD
      </button>
      <button
        className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-900 dark:hover:bg-slate-600 py-1 px-2 rounded-md"
        onClick={() => changeCurrency("EUR")}
      >
        EUR
      </button>
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Currency</SelectLabel>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="CAD">CAD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
    </div>
  );
}
