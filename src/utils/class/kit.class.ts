import { KitItem } from '@models';
import { Product } from './product.class';

export class Kit {
  private _items: KitItem[] = [];

  constructor(public name: string, public price: number = 0, private _quantity = 0) {}

  get income(): number {
    return this.price * this.quantity;
  }

  get items(): KitItem[] {
    return this._items;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this.items.forEach(item => item.product.sell(item.quantity * (quantity - this._quantity)));
    this._quantity = quantity;
  }

  addItem(product: Product, quantity?: number): Kit {
    if (quantity) {
      this._items.push({ product, quantity });
      product.sell(quantity * this.quantity);
    }

    return this;
  }
}
