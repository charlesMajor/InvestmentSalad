export type SearchStocks = {
  exchDisp: string;
  shortname: string;
  symbol: string;
  typeDisp: string;
  sector: string;
  price: string;
  percentage: string;
};

export function toObj(json: string): SearchStocks {
  const myObject: SearchStocks = JSON.parse(json);
  return myObject;
}

export function toObjArray(jsonArray: string[]): SearchStocks[] {
  const myObjects: SearchStocks[] = jsonArray.map((json) => toObj(json) as SearchStocks);
  return myObjects;
}

export function toJson(obj: SearchStocks): string {
  const jsonString: string = JSON.stringify(obj);
  return jsonString;
}

export function createObjSearch(
  exchDisp: string,
  shortname: string,
  symbol: string,
  typeDisp: string,
  sector: string,
  price: string = "0",
  percentage: string = "0%",
): SearchStocks {
  const obj: SearchStocks = {
    exchDisp: exchDisp,
    shortname: shortname,
    symbol: symbol,
    typeDisp: typeDisp,
    sector: sector,
    price: price,
    percentage: percentage,
  };
  return obj;
}
