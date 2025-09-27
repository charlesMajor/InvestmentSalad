//TODO: Supprimer
/*export type TagType = {
  id: string;
  name: string;
  color: string;
};*/

import { TagGet } from "@/lib/services/returnTypes";

export type PortfolioType = {
  id: string;
  tags: TagGet[];
  name: string;
  description: string;
  cashBalance: number;
  totalBalance: number;
  currency: string;
  interestRate: number;
  payoutFrequency: number;
  firstInterestPayoutDate: string;
  nbOfPositions: number;
  nbOfRules: number;
};

export type StockAssetType = {
  id: string;
  tags: TagGet[];
  name: string;
  description: string;
  symbol: string;
  quantity: number;
  commissionFee: number;
  assetType: string;
  buyFromAccount: boolean;
  unitPrice: number;
  transactionDate: string;
};

export type AssetType = {
  id: string;
  portfolioId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tags: TagGet[];
  buyDate: string;
  symbol: string;
};

export type DistributionWidgetType = {
  id: string;
  tags: TagGet[];
  name: string;
  widgetType: string;
  width: number;
  height: number;
};

export type NetworthWidgetType = {
  id: string;
  tags: TagGet[];
  name: string;
  period: string;
  widgetType: string;
  isDetailChart: boolean;
  width: number;
  height: number;
};

export type WatchlistWidgetType = {
  id: string;
  name: string;
  symbols: string[];
  widgetType: string;
  width: number;
  height: number;
};

//Enlever
export const tags: TagGet[] = [
  { tagId: "1", name: "Desjardins", hexColor: "c1ffba" },
  { tagId: "2", name: "REER", hexColor: "ccd4ff" },
  { tagId: "3", name: "CELI", hexColor: "ffccfb" },
  { tagId: "4", name: "BMO", hexColor: "feffcc" },
  { tagId: "5", name: "WealthSimple", hexColor: "ffcccc" },
  { tagId: "6", name: "WealthSimple", hexColor: "f0ccff" },
] as const;

//TODO: Supprimer quand plus utiliser
export const tags2: TagGet[] = [
  { tagId: "1", name: "Desjardins", hexColor: "c1ffba" },
  { tagId: "2", name: "REER", hexColor: "ccd4ff" },
] as const;

export const tags3: TagGet[] = [
  { tagId: "1", name: "Desjardins", hexColor: "c1ffba" },
  { tagId: "2", name: "REER", hexColor: "ccd4ff" },
  { tagId: "3", name: "CELI", hexColor: "caa4ff" },
] as const;

export const distributionWidget: DistributionWidgetType = {
  id: "1",
  tags: tags,
  name: "Distribution Widget",
  widgetType: "DISTRIBUTION",
  width: 1,
  height: 1,
};

export const networthWidget: NetworthWidgetType = {
  id: "2",
  tags: tags,
  name: "Distribution Widget",
  widgetType: "NETWORTH",
  isDetailChart: false,
  width: 2,
  height: 1,
  period: "3mo",
};

export const watchlistWidget: WatchlistWidgetType = {
  id: "3",
  name: "Watchlist Widget",
  widgetType: "WATCHLIST",
  symbols: ["AAPL", "MSFT", "AA", "TSLA"],
  width: 1,
  height: 2,
};

export const assets: AssetType[] = [
  {
    id: "f1561080-0784-4b8f-99e4-50e5697cff18",
    portfolioId: "",
    name: "New Stock asset",
    description: "description",
    quantity: 3.0,
    unitPrice: 100.0,
    tags: tags2,
    buyDate: "2022-10-02",
    symbol: "AAPL",
  },
  {
    id: "f1561080-0784-4b8f-99e4-50e5697cff18",
    portfolioId: "",
    name: "New Stock asset2",
    description: "description",
    quantity: 3.0,
    unitPrice: 100.0,
    tags: tags2,
    buyDate: "2022-10-02",
    symbol: "MSFT",
  },
  {
    id: "f1561080-0784-4b8f-99e4-50e5697cff18",
    portfolioId: "",
    name: "New Stock asset3",
    description: "description",
    quantity: 3.0,
    unitPrice: 100.0,
    tags: tags2,
    buyDate: "2022-10-02",
    symbol: "ATD.TO",
  },
];

export const stockAssets: StockAssetType[] = [
  {
    id: "1",
    tags: [
      {
        tagId: "1",
        name: "Desjardins",
        hexColor: "228B22",
      },
    ],
    name: "AAPL",
    description: "description",
    symbol: "AAPL",
    quantity: 2,
    commissionFee: 0.2,
    assetType: "CRYPTO",
    buyFromAccount: true,
    unitPrice: 200.69,
    transactionDate: "2020-10-10",
  },
] as const;

export const data: PortfolioType[] = [
  {
    id: "1",
    tags: [
      {
        tagId: "1",
        name: "REER",
        hexColor: "dff8bd",
      },
    ],
    name: "w",
    description: "w",
    totalBalance: 9291.34,
    cashBalance: 4291.34,
    currency: "CAD",
    interestRate: 0.0,
    payoutFrequency: 0,
    firstInterestPayoutDate: "2024-02-09",
    nbOfPositions: 5,
    nbOfRules: 2,
  },
  {
    id: "2",
    tags: [
      {
        tagId: "1",
        name: "REER",
        hexColor: "dff8bd",
      },
    ],
    name: "allo",
    description: "w",
    totalBalance: 2291.34,
    cashBalance: 1610,
    currency: "CAD",
    interestRate: 0.0643,
    payoutFrequency: 29,
    firstInterestPayoutDate: "2024-02-09",
    nbOfPositions: 3,
    nbOfRules: 5,
  },
  {
    id: "3",
    tags: [
      {
        tagId: "1",
        name: "REER",
        hexColor: "dff8bd",
      },
    ],
    name: "bonjour",
    description: "w",
    totalBalance: 1000,
    cashBalance: 1000,
    currency: "CAD",
    interestRate: 0.05,
    payoutFrequency: 59,
    firstInterestPayoutDate: "2024-02-09",
    nbOfPositions: 0,
    nbOfRules: 1,
  },
  {
    id: "4",
    tags: [
      {
        tagId: "1",
        name: "REER",
        hexColor: "dff8bd",
      },
    ],
    name: "Karl",
    description: "w",
    totalBalance: 1091.66,
    cashBalance: 5550,
    currency: "CAD",
    interestRate: 0.15,
    payoutFrequency: 21,
    firstInterestPayoutDate: "2024-02-09",
    nbOfPositions: 10,
    nbOfRules: 24,
  },
  {
    id: "5",
    tags: [
      {
        tagId: "1",
        name: "REER",
        hexColor: "dff8bd",
      },
      {
        tagId: "2",
        name: "Desjardins",
        hexColor: "aae9c8",
      },
      {
        tagId: "3",
        name: "CELI",
        hexColor: "b8d3ff",
      },
      {
        tagId: "4",
        name: "Crypto",
        hexColor: "e2c4ff",
      },
    ],
    name: "w",
    description: "w",
    totalBalance: 1500,
    cashBalance: 1250,
    currency: "CAD",
    interestRate: 0.1,
    payoutFrequency: 29,
    firstInterestPayoutDate: "2024-02-09",
    nbOfPositions: 5,
    nbOfRules: 5,
  },
];
