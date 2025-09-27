// Used for calls to the backend API.
// If {success} is true, then data should be present.
// If {success} is false, then message should be present.

// If no data has to be returned, use void type
export type APIResult<T> = {
  success: boolean;
  data?: T;
  message?: ErrorMessage;
};

export type ErrorMessage = {
  message: string;
  options?: ErrorMessageOptions;
};

export type ErrorMessageOptions = {
  [key: string]: any;
};

export type resultData = {
  [key: string]: any;
};

// All the types below should match the json sent to or received from the API

//////////////// Asset interfaces ////////////////
interface Asset {
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tags: string[];
  assetType: AssetType;
  buyDate: string;
}
export interface AssetGet extends Asset {
  id: string;
  portfolioId: string;
}
export interface AssetCreate extends Asset {
  buyFromAccount: boolean;
  commissionFee: number;
}

export enum AssetType {
  STOCK = "STOCK",
  CRYPTO = "CRYPTO",
  RESSOURCE = "RESSOURCE",
  FIXED_REVENUE = "FIXED_REVENUE",
}

//////////////// Stock interfaces ////////////////
interface Stock {
  symbol: string;
}
export interface StockGet extends AssetGet, Stock {}
export interface StockCreate extends AssetCreate, Stock {}

//////////////// Crypto interfaces ////////////////
interface Crypto {
  symbol: string;
}
export interface CryptoGet extends AssetGet, Crypto {}
export interface CryptoCreate extends AssetCreate, Crypto {}

//////////////// FixedRevenue interfaces ////////////////
interface FixedRevenue {
  interestRate: number;
  paymentFrequencyPerYear: number;
  expirationDate: string;
  firstPayementDate: string;
}
export interface FixedRevenueGet extends AssetGet, FixedRevenue {}
export interface FixedRevenueCreate extends AssetCreate, FixedRevenue {}

//////////////// Ressource interfaces ////////////////

interface Ressource {
  ressourceType: string;
}
export interface RessourceGet extends AssetGet, Ressource {}
export interface RessourceCreate extends AssetCreate, Ressource {}

///////////////// Portfolio ///////////////////

export interface Portfolio {
  name: string;
  description: string;
  cashBalance: number;
  cashInterestRate: number;
  interestPaymentFrequencyPerYear: number;
  initialInterestPaymentDate: string | null;
  currency: string;
  tags: string[];
}

export interface PortfolioGet extends Portfolio {
  id: string;
}

///////////////// Dashboard ///////////////////

export interface Dashboard {
  id: string;
}

//////////////////// Tag //////////////////////

interface Tag {
  hexColor: string;
  name: string;
}

export interface TagCreate extends Tag {}

export interface TagGet extends Tag {
  tagId: string;
}

//////////////////// Dashboard //////////////////////

export interface Dashboard {
  id: string;
}

//////////////////// Widget ///////////////////////
export enum WidgetType {
  DISTRIBUTION = "DISTRIBUTION",
  NETWORTH = "NET_WORTH",
  WATCHLIST = "WATCH_LIST",
}

export interface Widget {
  name: string;
  tags: string[];
  widgetType: string;
  posX: number;
  posY: number;
  height: number;
  width: number;
}

export interface WidgetGet extends Widget {
  id: string;
  dashboardId: string;
}

export interface WidgetCreate extends Widget {}

//////////////// WidgetDistribution interfaces ////////////////
export interface WidgetDistribution {}
export interface WidgetDistributionGet extends WidgetGet, WidgetDistribution {}
export interface WidgetDistributionCreate extends WidgetCreate, WidgetDistribution {}

//////////////// WidgetNetworth interfaces ////////////////
export interface WidgetNetworth {
  period: string;
  detailChart: boolean;
}
export interface WidgetNetworthGet extends WidgetGet, WidgetNetworth {}
export interface WidgetNetworthCreate extends WidgetCreate, WidgetNetworth {}

export enum WidgetNetworthDimensions {
  ONE_BY_ONE = "1x1",
  TWO_BY_ONE = "2x1",
}

//////////////// WidgetWatchlist interfaces ////////////////
export interface WidgetWatchlist {
  symbols: string[];
}
export interface WidgetWatchlistGet extends WidgetGet, WidgetWatchlist {}
export interface WidgetWatchlistCreate extends WidgetCreate, WidgetWatchlist {}

//////////////// Yahoo finance ////////////////
export enum RangeType {
  ONEDAY = "1d",
  FIVEDAYS = "5d",
  ONEMONTH = "1mo",
  THREEMONTHS = "3mo",
  SIXMONTHS = "6mo",
  ONEYEAR = "1y",
  TWOYEARS = "2y",
  FIVEYEARS = "5y",
  TENYEARS = "10y",
  YTD = "ytd",
  MAX = "max",
}
export enum IntervalType {
  ONEMINUTE = "1m",
  TWOMINUTES = "2m",
  FIVEMINUTES = "5m",
  FIFTEENMINUTES = "15m",
  THIRTYMINUTES = "30m",
  SIXTYMINUTES = "60m",
  NINETYMINUTES = "90m",
  ONEHOUR = "1h",
  ONEDAY = "1d",
  FIVEDAYS = "5d",
  ONEWEEK = "1wk",
  ONEMONTH = "1mo",
  THREEMONTHS = "3mo",
}
export const intervalForRangeType: Record<string, string> = {
  "1d": "2m",
  "5d": "15m",
  "1mo": "30m",
  "3mo": "1h",
  "6mo": "1h",
  "1y": "1d",
  "2y": "5d",
  "5y": "5d",
  "10y": "1wk",
  ytd: "90m",
};

//////////////// Navigation ////////////////

export enum SearchType {
  SEARCH = "search",
  ASSET = "asset",
  TAG = "tag",
}
