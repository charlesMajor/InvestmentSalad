"use client";

import { getAllAssets } from "@/lib/services/assetsService";
import { AssetGet, AssetType, CryptoGet, SearchType, StockGet } from "@/lib/services/returnTypes";
import { selectAssetsByTags } from "@/redux/selectors/assetSelectors";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<AssetGet[]>([]);
  const [searchType, setSearchType] = useState("");
  const searchParams = useSearchParams();
  const [changes, setChanges] = useState(0);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParam1 = urlSearchParams.get("q");
    const queryParam2 = urlSearchParams.get("t");
    if (queryParam1) {
      setSearchTerm(queryParam1);
    }
    if (queryParam2) {
      setSearchType(queryParam2);
    }
  }, []);

  const compareTwoStrings = (str1: string, str2: string) => {
    return str1.toLowerCase().replace(/\s/g, "").includes(str2.toLowerCase().replace(/\s/g, ""));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllAssets();
        let newData: any[] = [];
        if (result.data) {
          newData = result.data.map((item: AssetGet) => ({ ...item }));
          if (searchType == SearchType.ASSET || searchType == SearchType.SEARCH) {
            newData = newData.filter(
              (asset: AssetGet) =>
                asset.assetType == AssetType.CRYPTO || asset.assetType == AssetType.STOCK,
            );
          }
          if (searchType == SearchType.SEARCH) {
            newData = newData.filter(
              (asset: StockGet | CryptoGet) =>
                compareTwoStrings(asset.symbol, searchTerm) ||
                compareTwoStrings(asset.name, searchTerm) ||
                compareTwoStrings(asset.description, searchTerm),
            );
          }
          if (searchType == SearchType.ASSET) {
            newData = newData.filter((asset: StockGet | CryptoGet) =>
              compareTwoStrings(asset.symbol, searchTerm),
            );
          }
          if (searchType == SearchType.TAG) {
            newData = newData.filter((asset: AssetGet) => asset.tags.includes(searchTerm));
          }
        }

        setSearchResult(newData);
      } catch (error) {
        //À changer
        console.error("Error fetching data:", error);
      }
    };

    if (searchResult.length === 0) {
      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className="mt-12">
      <p className="flex justify-center items-center">Search</p>
      <p className="flex justify-center items-center">
        Filtre information : {searchTerm} & {searchType}
      </p>
      <div className="p-8 flex-col">
        {searchResult.map((el: AssetGet) => (
          <div className="bg-_background1 dark:bg-_darkBackground1 p-4 rounded-xl mb-4">
            <div>{el.name}</div>
            <div className="text-sm">Description : {el.description}</div>
            <div className="text-sm">Quantity : {el.quantity}</div>
            <div className="text-sm text-_grayText">Portfolio id : {el.portfolioId}</div>
          </div>
          // <Asset objectAsset={el} />
        ))}
      </div>
    </div>
  );
}
