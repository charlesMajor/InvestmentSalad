export type CryptoAsset = {
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
  const myObject: CryptoAsset = JSON.parse(json);
  return myObject;
}

export function toJson(obj: CryptoAsset) {
  const jsonString: string = JSON.stringify(obj);
  return jsonString;
}

export function createObjCryptoAsset(
  id: string,
  portfolioId: string,
  name: string,
  description: string,
  quantity: number,
  unitPrice: number,
  tags: string[],
  buyDate: string,
  symbol: string,
): CryptoAsset {
  const obj: CryptoAsset = {
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
