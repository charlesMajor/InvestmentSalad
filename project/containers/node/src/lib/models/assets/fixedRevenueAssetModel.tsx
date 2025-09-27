import exp from "constants";

export type FixedRevenueAsset = {
  id: string;
  portfolioId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tags: string[];
  buyDate: string;
  interestRate: number;
  paymentFrequencyPerYear: number;
  expirationDate: string;
  firstPaymentDate: string;
};

export function toObj(json: string) {
  const myObject: FixedRevenueAsset = JSON.parse(json);
  return myObject;
}

export function toJson(obj: FixedRevenueAsset) {
  const jsonString: string = JSON.stringify(obj);
  return jsonString;
}

export function createObjFixedRevenueAsset(
  id: string,
  portfolioId: string,
  name: string,
  description: string,
  quantity: number,
  unitPrice: number,
  tags: string[],
  buyDate: string,
  interestRate: number,
  paymentFrequencyPerYear: number,
  expirationDate: string,
  firstPaymentDate: string,
): FixedRevenueAsset {
  const obj: FixedRevenueAsset = {
    id: id,
    portfolioId: portfolioId,
    name: name,
    description: description,
    quantity: quantity,
    unitPrice: unitPrice,
    tags: tags,
    buyDate: buyDate,
    interestRate: interestRate,
    paymentFrequencyPerYear: paymentFrequencyPerYear,
    expirationDate: expirationDate,
    firstPaymentDate: firstPaymentDate,
  };
  return obj;
}
