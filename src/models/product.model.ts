export type ProductModel = {
  id: string;
  name: string;
  manufacturer: string;
  minOrder: number;
  batchSize: number;
  extraFees: number;
  shipping: number;
};

export type ProductPriceRange = {
  breakpoint: number;
  price: number;
};
