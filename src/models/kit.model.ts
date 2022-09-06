import { Product } from '@utils/class';

export type KitModel = {
  no: number;
  name: string;
  price: number;
  quantity: number;
  qntItems: number;
  items: string[];
  cost: number;
  profit: number;
  income: number;
  breakEvenQnt: number;
};
export type KitItem = {
  product: Product;
  quantity: number;
};
