import { AssetGet, AssetType, CryptoGet, StockGet } from "../services/returnTypes";
import { getYahooFinanceData, getYahooFinanceFromCrumb } from "../services/yahooFinanceService";

interface YahooData {
  crumb?: string;
  cookie?: string;
}

export function getCrumbAndCookieFromLocalStorage(): YahooData {
  let cookie = localStorage.getItem("yahooFinanceCookie");
  let crumb = localStorage.getItem("crumb");
  return { crumb: crumb != null ? crumb : undefined, cookie: cookie != null ? cookie : undefined };
}

export async function getValueFromAssets(assets: AssetGet[]): Promise<number> {
  let total = 0;
  let yahooData = getCrumbAndCookieFromLocalStorage();
  const promises: Promise<void>[] = [];
  for (let i = 0; i < assets.length; i++) {
    switch (assets[i].assetType) {
      case AssetType.CRYPTO:
        let cryptoAsset = assets[i] as CryptoGet;
        if (!yahooData.cookie || !yahooData.crumb) {
          // error
        } else {
          const promise = getYahooFinanceFromCrumb(
            cryptoAsset.symbol,
            "modules=price",
            yahooData.crumb,
            yahooData.cookie,
          ).then((result) => {
            total =
              total +
              result.data.key.quoteSummary.result[0].price.regularMarketPrice.raw *
                cryptoAsset.quantity;
          });
          promises.push(promise);
        }
        break;
      case AssetType.STOCK:
        let stockAsset = assets[i] as StockGet;
        if (!yahooData.cookie || !yahooData.crumb) {
          // error
        } else {
          const promise = getYahooFinanceFromCrumb(
            stockAsset.symbol,
            "modules=price",
            yahooData.crumb,
            yahooData.cookie,
          ).then((result) => {
            total =
              total +
              result.data.key.quoteSummary.result[0].price.regularMarketPrice.raw *
                stockAsset.quantity;
          });
          promises.push(promise);
        }
        break;
      default:
        break;
    }
  }
  await Promise.all(promises);
  return total;
}

function getUniqueAssetsFromRecord(assets: Record<string, AssetGet[]>): AssetGet[] {
  const addedAssets: { [key: string]: boolean } = {};
  let assetList = [];
  for (const tag in assets) {
    for (let i = 0; i < assets[tag].length; i++) {
      if (!addedAssets[assets[tag][i].id]) {
        assetList.push(assets[tag][i]);
        addedAssets[assets[tag][i].id] = true;
      }
    }
  }
  return assetList;
}

export async function getTotalValueOfUniqueAssetsInRecord(
  assetRecord: Record<string, AssetGet[]>,
): Promise<number> {
  let assetList: AssetGet[] = getUniqueAssetsFromRecord(assetRecord);

  let total = 0;
  let yahooData = getCrumbAndCookieFromLocalStorage();
  const promises: Promise<void>[] = [];
  for (let i = 0; i < assetList.length; i++) {
    switch (assetList[i].assetType) {
      case AssetType.CRYPTO:
        let cryptoAsset = assetList[i] as CryptoGet;
        if (!yahooData.cookie || !yahooData.crumb) {
          // error
        } else {
          const promise = getYahooFinanceFromCrumb(
            cryptoAsset.symbol,
            "modules=price",
            yahooData.crumb,
            yahooData.cookie,
          ).then((result) => {
            total =
              total +
              result.data.key.quoteSummary.result[0].price.regularMarketPrice.raw *
                cryptoAsset.quantity;
          });
          promises.push(promise);
        }
        break;
      case AssetType.STOCK:
        let stockAsset = assetList[i] as StockGet;
        if (!yahooData.cookie || !yahooData.crumb) {
          // error
        } else {
          const promise = getYahooFinanceFromCrumb(
            stockAsset.symbol,
            "modules=price",
            yahooData.crumb,
            yahooData.cookie,
          ).then((result) => {
            total =
              total +
              result.data.key.quoteSummary.result[0].price.regularMarketPrice.raw *
                stockAsset.quantity;
          });
          promises.push(promise);
        }
        break;
      default:
        break;
    }
  }
  await Promise.all(promises);
  return total;
}

export async function getAllArraysOfUniqueAssetsInRecord(
  assetRecord: Record<string, AssetGet[]>,
  range: string,
  interval: string,
): Promise<{ values: number[]; timestamps: number[] }> {
  const promises: Promise<void>[] = [];

  let assetList: AssetGet[] = getUniqueAssetsFromRecord(assetRecord);
  let timestamps: number[] = [];
  const result = await getYahooFinanceData("BTC-USD", range, interval);
  timestamps = result.data.key.chart.result[0].timestamp;
  let values: number[] = Array(timestamps.length).fill(0);

  for (let i = 0; i < assetList.length; i++) {
    switch (assetList[i].assetType) {
      case AssetType.CRYPTO:
        let cryptoAsset = assetList[i] as StockGet;
        const cryptoPromise = getYahooFinanceData(cryptoAsset.symbol, range, interval).then(
          (result) => {
            let priceArray: number[] = result.data.key.chart.result[0].indicators.quote[0].close;
            let timeArray: number[] = result.data.key.chart.result[0].timestamp;
            let lastNumberMemory = -1;

            timestamps.map((time: number, index) => {
              const closestTime = timeArray.reduce((closest: number, current: number) => {
                const closestDifference = Math.abs(closest - time);
                const currentDifference = Math.abs(current - time);

                return currentDifference < closestDifference ? current : closest;
              }, timeArray[0]);

              if (
                closestTime &&
                priceArray[timeArray.indexOf(closestTime)] != null &&
                priceArray[timeArray.indexOf(closestTime)] != 0
              ) {
                const indexStock: number = timeArray.indexOf(closestTime);
                const newValue = values[index] + priceArray[indexStock] * cryptoAsset.quantity;
                values[index] = parseFloat(newValue.toFixed(2));
                lastNumberMemory = priceArray[indexStock];
              } else {
                if (lastNumberMemory === -1) {
                  const firstNonZeroOrNullValue: number | undefined = priceArray.find(
                    (value) => value !== 0 && value !== null,
                  );
                  let newValue = 0;
                  if (firstNonZeroOrNullValue) {
                    newValue = values[index] + firstNonZeroOrNullValue * cryptoAsset.quantity;
                    lastNumberMemory = newValue;
                  }
                  values[index] = parseFloat(newValue.toFixed(2));
                } else {
                  const newValue = values[index] + lastNumberMemory * cryptoAsset.quantity;
                  values[index] = parseFloat(newValue.toFixed(2));
                }
              }
            });
          },
        );
        promises.push(cryptoPromise);
        break;
      case AssetType.STOCK:
        let stockAsset = assetList[i] as StockGet;
        const stockPromise = getYahooFinanceData(stockAsset.symbol, range, interval).then(
          (result) => {
            let priceArray: number[] = result.data.key.chart.result[0].indicators.quote[0].close;
            let timeArray: number[] = result.data.key.chart.result[0].timestamp;
            let lastNumberMemory = -1;

            timestamps.map((time: number, index) => {
              const closestTime = timeArray.reduce((closest: number, current: number) => {
                const closestDifference = Math.abs(closest - time);
                const currentDifference = Math.abs(current - time);

                return currentDifference < closestDifference ? current : closest;
              }, timeArray[0]);

              if (
                closestTime &&
                priceArray[timeArray.indexOf(closestTime)] != null &&
                priceArray[timeArray.indexOf(closestTime)] != 0
              ) {
                const indexStock: number = timeArray.indexOf(closestTime);
                const newValue = values[index] + priceArray[indexStock] * stockAsset.quantity;
                values[index] = parseFloat(newValue.toFixed(2));
                lastNumberMemory = priceArray[indexStock];
              } else {
                if (lastNumberMemory === -1) {
                  const firstNonZeroOrNullValue: number | undefined = priceArray.find(
                    (value) => value !== 0 && value !== null,
                  );
                  let newValue = 0;
                  if (firstNonZeroOrNullValue) {
                    newValue = values[index] + firstNonZeroOrNullValue * stockAsset.quantity;
                    lastNumberMemory = newValue;
                  }
                  values[index] = parseFloat(newValue.toFixed(2));
                } else {
                  const newValue = values[index] + lastNumberMemory * stockAsset.quantity;
                  values[index] = parseFloat(newValue.toFixed(2));
                }
              }
            });
          },
        );
        promises.push(stockPromise);
        break;
      default:
        break;
    }
  }
  await Promise.all(promises);
  values.pop();
  timestamps.pop();
  return { values: values, timestamps: timestamps };
}
