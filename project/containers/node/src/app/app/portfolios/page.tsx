"use client";

import { t } from "i18next";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import {
  getTotalReturnFromAssetList,
  getTotalReturnPercentageFromAssetList,
  getTotalValueFromAssetList,
} from "@/lib/models/assets/assetsCalculs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FormTitle from "@/components/formTitle";
import { Button } from "@/components/ui/button";
import TagComponent from "@/components/tagComponent";
import { Portfolio } from "@/lib/models/portfolioModel";
import { AddPortfolio } from "@/components/addPortfolio";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { selectTagById } from "@/redux/selectors/tagSelectors";
import DeletePopup from "@/components/forms/portfolio/deletePopup";
import { getCrumbAndCookieFromLocalStorage } from "@/lib/utils/util";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AssetGet, AssetType, StockGet, TagGet } from "@/lib/services/returnTypes";
import { CaretSortIcon, ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AssetInformation, getAssetsInformationFromAssetList } from "@/lib/managers/assetsManager";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Portfolios() {
  const { portfolioArray } = useSelector((state: any) => state.portfolioArray);

  return (
    <div className="w-min-[300px] w-[70vw] mx-auto drop-shadow-lg mt-12">
      <PortfolioTable data={portfolioArray} />
    </div>
  );
}

function getTagFromSelector(id: string): TagGet {
  return useSelector(selectTagById(id));
}
interface PortfolioTableProps {
  data: Portfolio[];
}

function PortfolioTable({ data }: PortfolioTableProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isModifyView, setIsModifyView] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [rowDeletePopup, isRowDeletePopup] = useState<Row<Portfolio>>();
  const [portfolioIdSelect, setPortfolioIdSelect] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { portfolioArray } = useSelector((state: any) => state.portfolioArray);
  const { assetArray } = useSelector((state: any) => state.assetArray);
  const [allPortfolioAssetsInfo, setAllPortfolioAssetsInfo] = useState<
    {
      portfolioId: string;
      assetInfo: (AssetInformation | null)[];
      allStocksAssets: StockGet[];
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      let assetsInformationPortfolioArray: {
        portfolioId: string;
        assetInfo: (AssetInformation | null)[];
        allStocksAssets: StockGet[];
      }[] = [];
      for (const portfolio of portfolioArray) {
        const allAssets = assetArray.filter(
          (asset: AssetGet) => asset.portfolioId === portfolio.id,
        );
        const allStocksAssets = allAssets.filter(
          (asset: AssetGet) =>
            asset.assetType === AssetType.STOCK || asset.assetType === AssetType.CRYPTO,
        );
        let yahooData = getCrumbAndCookieFromLocalStorage();
        const allAssetsInfo: (AssetInformation | null)[] = await getAssetsInformationFromAssetList(
          allStocksAssets,
          yahooData.crumb || "",
          yahooData.cookie || "",
        ).then((result) => {
          console.log(result);
          if (result.success && result.data) return result.data;
          else !result.success;
          return [];
        });
        assetsInformationPortfolioArray.push({
          portfolioId: portfolio.id,
          assetInfo: allAssetsInfo,
          allStocksAssets: allStocksAssets,
        });
      }
      setAllPortfolioAssetsInfo(assetsInformationPortfolioArray);
    };

    fetchData();
  }, [portfolioArray, assetArray]);

  const columns: ColumnDef<Portfolio>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tagsStrings: string[] = row.getValue("tags");
        if (tagsStrings != undefined) {
          const tagsObjects: TagGet[] = tagsStrings.map((tag) => getTagFromSelector(tag));
          let tagsComponents = undefined;
          if (tagsObjects[0] !== undefined) {
            tagsComponents = tagsObjects.map((tag) => (
              <div key={tag.tagId} className="row">
                <TagComponent tag={tag} />
              </div>
            ));
          }
          return (
            <div className="capitalize flex gap-1 overflow-hidden">
              {tagsComponents !== undefined ? <>{tagsComponents}</> : <div></div>}
            </div>
          );
        }
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            className="pl-2 -ml-2"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {t("NAME_LABEL")}
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <p className="text-nowrap">{row.getValue("name")}</p>;
      },
    },
    {
      accessorKey: "nbOfPositions",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const infoAssets = allPortfolioAssetsInfo.filter(
          (assetArray: { portfolioId: string; assetInfo: (AssetInformation | null)[] }) =>
            assetArray.portfolioId === row.getValue("id"),
        );
        const nbOfPositions: number = infoAssets[0] ? infoAssets[0].assetInfo.length : 0;

        return <div>{nbOfPositions}</div>;
      },
    },
    {
      accessorKey: "nbOfRules",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const nbOfRules: number = 0;

        return <div>{nbOfRules}</div>;
      },
    },
    {
      accessorKey: "cashBalance",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const cashBalance: number = row.getValue("cashBalance");
        const formatCashBalance: string = Number(cashBalance)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
          .replace(".", t("DECIMAL"));

        return <p className="text-nowrap">{formatCashBalance}</p>;
      },
    },
    {
      accessorKey: "totalBalance",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const cashBalance: number = row.getValue("cashBalance");
        const infoAssets = allPortfolioAssetsInfo.filter(
          (assetArray: { portfolioId: string; assetInfo: (AssetInformation | null)[] }) =>
            assetArray.portfolioId === row.getValue("id"),
        );
        const totalBalance =
          getTotalValueFromAssetList(
            infoAssets[0] ? infoAssets[0].allStocksAssets : [],
            infoAssets[0] ? infoAssets[0].assetInfo : [],
          ) + cashBalance;
        const totalBalanceString = totalBalance
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
          .replace(".", t("DECIMAL"));
        return <p className="text-nowrap">{totalBalanceString}</p>;
      },
    },
    {
      accessorKey: "totalReturn",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const infoAssets = allPortfolioAssetsInfo.filter(
          (assetArray: { portfolioId: string; assetInfo: (AssetInformation | null)[] }) =>
            assetArray.portfolioId === row.getValue("id"),
        );
        const totalReturn = getTotalReturnFromAssetList(
          infoAssets[0] ? infoAssets[0].allStocksAssets : [],
          infoAssets[0] ? infoAssets[0].assetInfo : [],
        );
        const totalReturnString = totalReturn
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, t("THOUSANDS_SEPARATOR"))
          .replace(".", t("DECIMAL"));
        const totalReturnPercentage = getTotalReturnPercentageFromAssetList(
          infoAssets[0] ? infoAssets[0].allStocksAssets : [],
          infoAssets[0] ? infoAssets[0].assetInfo : [],
        );
        const totalReturnPercentageString =
          totalReturnPercentage.toFixed(2).replace(".", t("DECIMAL")) + "%";
        return (
          <div>
            <>
              <p className="text-nowrap">{totalReturnString}</p>
              {totalReturnPercentageString.includes("-") ? (
                <p className="text-_redText text-xs text-nowrap">{totalReturnPercentageString}</p>
              ) : (
                <>
                  {totalReturn !== 0 && (
                    <p className="text-_greenText text-xs text-nowrap">
                      {totalReturnPercentageString}
                    </p>
                  )}
                </>
              )}
            </>
          </div>
        );
      },
    },
    {
      accessorKey: "currency",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
    },
    {
      accessorKey: "cashInterestRate",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const interestRate: number = row.getValue("cashInterestRate");
        const interestRatePercentage: string = Number(interestRate * 100).toFixed(2) + "%";
        const formatInterestRate: string = interestRatePercentage.replace(".", t("DECIMAL"));
        return <div>{interestRate === 0 ? "-" : formatInterestRate}</div>;
      },
    },
    {
      accessorKey: "interestPaymentFrequencyPerYear",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const payoutFrequency: number = row.getValue("interestPaymentFrequencyPerYear");
        const formatPayoutFrequency: string = Number(payoutFrequency)
          .toString()
          .replace(".", t("DECIMAL"));

        return (
          <div>
            {payoutFrequency === 0 ? "-" : formatPayoutFrequency + "/" + t("YEAR_PORTFOLIOS_VIEW")}
          </div>
        );
      },
    },
    {
      accessorKey: "initialInterestPaymentDate",
      header: ({ column }) => {
        return <>{t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}</>;
      },
      cell: ({ row }) => {
        const initialInterestPaymentDate: number = row.getValue("initialInterestPaymentDate");

        return (
          <div>
            {initialInterestPaymentDate === null ? "-" : row.getValue("initialInterestPaymentDate")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        function prevent(e: any) {
          e.stopPropagation();
        }

        function openAddPortfolio(e: any) {
          prevent(e);
          setOpen(true);
          setIsModifyView(true);
          setPortfolioIdSelect(row.getValue("id"));
        }

        function openOnePortfolio(e: any) {
          prevent(e);
          router.push(window.location.pathname + "/" + row.getValue("id"));
        }

        function openDeletePopup(e: any) {
          e.stopPropagation();
          isRowDeletePopup(row);
          setOpenDeletePopup(true);
        }

        return (
          <DropdownMenu>
            <div onClick={prevent}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only hover:cursor-pointer">Open menu</span>
                  <DotsHorizontalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Button variant={"noStyle"} size={"noStyle"} onClick={openAddPortfolio}>
                    {t("PORTFOLIO_LIST_EDIT_PORTFOLIO")}
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button variant={"noStyle"} size={"noStyle"} onClick={openOnePortfolio}>
                    {t("PORTFOLIO_LIST_VIEW_PORTFOLIO")}
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant={"noStyle"}
                    size={"noStyle"}
                    className="text-_redText"
                    onClick={openDeletePopup}
                  >
                    {t("PORTFOLIO_LIST_DELETE")}
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </div>
          </DropdownMenu>
        );
      },
    },
  ] as ColumnDef<Portfolio>[];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const tagsString = "tags";
  const nameString = "name";
  const currencyString = "currency";
  const interestRateString = "cashInterestRate";
  const payoutFrequencyString = "payoutFrequency";
  const firstInterestPayoutDateString = "firstInterestPayoutDate";
  const nbOfPositionsString = "nbOfPositions";
  const nbOfRulesString = "nbOfRules";
  const cashBalanceString = "cashBalance";
  const totalBalanceString = "totalBalance";
  const actionsString = "actions";
  const totalReturnString = "totalReturn";
  const localStorageSlug = "PortfolioColumn";

  useEffect(() => {
    table.getAllColumns().map((column) => {
      column.id === tagsString && column.toggleVisibility(false);
      column.id === currencyString && column.toggleVisibility(false);
      column.id === interestRateString && column.toggleVisibility(false);
      column.id === payoutFrequencyString && column.toggleVisibility(false);
      column.id === firstInterestPayoutDateString && column.toggleVisibility(false);
      column.id === cashBalanceString && column.toggleVisibility(false);
      column.id === actionsString && column.toggleVisibility(false);
      column.id === "id" && column.toggleVisibility(false);
    });
    table.getAllColumns().map((column) => {
      column.id === tagsString &&
        localStorage.getItem(tagsString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(tagsString + localStorageSlug) == "true" ? true : false,
        );
      column.id === nameString &&
        localStorage.getItem(nameString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(nameString + localStorageSlug) == "true" ? true : false,
        );
      column.id === nbOfPositionsString &&
        localStorage.getItem(nbOfPositionsString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(nbOfPositionsString + localStorageSlug) == "true" ? true : false,
        );
      column.id === nbOfRulesString &&
        localStorage.getItem(nbOfRulesString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(nbOfRulesString + localStorageSlug) == "true" ? true : false,
        );
      column.id === currencyString &&
        localStorage.getItem(currencyString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(currencyString + localStorageSlug) == "true" ? true : false,
        );
      column.id === cashBalanceString &&
        localStorage.getItem(cashBalanceString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(cashBalanceString + localStorageSlug) == "true" ? true : false,
        );
      column.id === interestRateString &&
        localStorage.getItem(interestRateString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(interestRateString + localStorageSlug) == "true" ? true : false,
        );
      column.id === firstInterestPayoutDateString &&
        localStorage.getItem(firstInterestPayoutDateString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(firstInterestPayoutDateString + localStorageSlug) == "true"
            ? true
            : false,
        );
      column.id === payoutFrequencyString &&
        localStorage.getItem(payoutFrequencyString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(payoutFrequencyString + localStorageSlug) == "true" ? true : false,
        );
      column.id === actionsString &&
        localStorage.getItem(actionsString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(actionsString + localStorageSlug) == "true" ? true : false,
        );
      column.id === totalBalanceString &&
        localStorage.getItem(totalBalanceString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(totalBalanceString + localStorageSlug) == "true" ? true : false,
        );
      column.id === totalReturnString &&
        localStorage.getItem(totalReturnString + localStorageSlug) &&
        column.toggleVisibility(
          localStorage.getItem(totalReturnString + localStorageSlug) == "true" ? true : false,
        );
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"blue"} size={"sm"} onClick={() => setIsModifyView(false)}>
              {t("ADD_PORTFOLIO")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px]">
            <FormTitle
              title={isModifyView ? t("MODIFY_PORTFOLIO") : t("ADD_PORTFOLIO")}
              description={t("ADD_PORTFOLIO_DESCRIPTION")}
            />
            <AddPortfolio
              setOpen={setOpen}
              modifyView={isModifyView}
              portfolioId={portfolioIdSelect}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog open={openDeletePopup} onOpenChange={setOpenDeletePopup}>
          <DeletePopup row={rowDeletePopup} setOpenDeletePopup={setOpenDeletePopup} />
        </AlertDialog>
        <Input
          placeholder={t("PORTFOLIO_LIST_SEARCH_BAR")}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-[15rem] mx-2"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto dark:bg-gray-800">
              {t("PORTFOLIO_LIST_COLUMNS")} <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                if (!column.id.includes("id")) {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className=""
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                        localStorage.setItem(
                          column.id + localStorageSlug,
                          !column.getIsVisible() ? "true" : "false",
                        );
                      }}
                    >
                      {t("PORTFOLIO_LIST_" + column.id.toLocaleUpperCase() + "_LABEL")}
                    </DropdownMenuCheckboxItem>
                  );
                }
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => router.push(window.location.pathname + "/" + row.getValue("id"))}
                >
                  {row.getVisibleCells().map((cell) => (
                    <>
                      {!cell.id.includes("id") && (
                        <>
                          {!cell.id.includes("action") ? (
                            <>
                              <TableCell key={cell.id}>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <div className="max-w-[14vw]">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </>
                          ) : (
                            <TableCell key={cell.id}>
                              <div className="max-w-[14vw]">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            </TableCell>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {t("PORTFOLIO_LIST_NO_RESULTS")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
