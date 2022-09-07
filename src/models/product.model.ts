export type ProductModel = {
  id: string;
  name: string;
  manufacturer: string;
  minOrder: number;
  qntIncrement: number;
  extraFees: number;
  shipping: number;
};

export type ProductPriceRange = {
  breakpoint: number;
  price: number;
};
