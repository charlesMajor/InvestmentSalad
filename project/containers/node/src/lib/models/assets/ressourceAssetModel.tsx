export type RessourceAsset = {
  id: string;
  portfolioId: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  tags: string[];
  buyDate: string;
  ressourceType: string;
};

export function toObj(json: string) {
  const myObject: RessourceAsset = JSON.parse(json);
  return myObject;
}

export function toJson(obj: RessourceAsset) {
  const jsonString: string = JSON.stringify(obj);
  return jsonString;
}

export function createObjRessourceAsset(
  id: string,
  portfolioId: string,
  name: string,
  description: string,
  quantity: number,
  unitPrice: number,
  tags: string[],
  buyDate: string,
  ressourceType: string,
): RessourceAsset {
  const obj: RessourceAsset = {
    id: id,
    portfolioId: portfolioId,
    name: name,
    description: description,
    quantity: quantity,
    unitPrice: unitPrice,
    tags: tags,
    buyDate: buyDate,
    ressourceType: ressourceType,
  };
  return obj;
}
