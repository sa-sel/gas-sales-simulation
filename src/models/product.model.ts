export type ProductModel = {
  id: number;
  name: string;
  manufacturer: string;
  minOrder: number;
  qntIncrement: number;
  unitPrice: number;
  extraFees: number;
  shipping: number;
  soldQnt: number;
  boughtQnt: number;
  cost: number;
};

export type ProductPriceRange = {
  breakpoint: number;
  price: number;
};
