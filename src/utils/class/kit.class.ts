import { KitItem } from '@models';
import { Product } from './product.class';

export class Kit {
  private _items: KitItem[] = [];

  constructor(public name: string, public price: number = 0, private quantitySold = 0) {}

  get income(): number {
    return this.price * this.quantity;
  }

  get items(): KitItem[] {
    return this._items;
  }

  /** Number of kits sold. */
  get quantity(): number {
    return this.quantitySold;
  }

  set quantity(newQuantitySold: number) {
    this.items.forEach(item => item.product.sell(item.quantity * (newQuantitySold - this.quantitySold)));
    this.quantitySold = newQuantitySold;
  }

  addItem(product: Product, quantity?: number): Kit {
    if (quantity && !isNaN(quantity)) {
      this._items.push({ product, quantity });

      // the item sold the number of times it appears on
      // the kit multiplied by the number of kits sold
      product.sell(quantity * this.quantitySold);
    }

    return this;
  }
}
