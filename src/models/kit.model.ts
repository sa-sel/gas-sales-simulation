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
  /** This item's product. */
  product: Product;
  /** How many of this item's product there are on the kit. */
  quantity: number;
};
