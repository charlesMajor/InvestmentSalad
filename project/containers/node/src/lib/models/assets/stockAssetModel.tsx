export type StockAsset = {
  id: string;
  portfolioId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tags: string[];
  buyDate: string;
  symbol: string;
};

export function toObj(json: string) {
  const myObject: StockAsset = JSON.parse(json);
  return myObject;
}

export function toJson(obj: StockAsset) {
  const jsonString: string = JSON.stringify(obj);
  return jsonString;
}

export function createObjStockAsset(
  id: string,
  portfolioId: string,
  name: string,
  description: string,
  quantity: number,
  unitPrice: number,
  tags: string[],
  buyDate: string,
  symbol: string,
): StockAsset {
  const obj: StockAsset = {
    id: id,
    portfolioId: portfolioId,
    name: name,
    description: description,
    quantity: quantity,
    unitPrice: unitPrice,
    tags: tags,
    buyDate: buyDate,
    symbol: symbol,
  };
  return obj;
}
