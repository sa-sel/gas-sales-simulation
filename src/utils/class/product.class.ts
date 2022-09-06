import { ProductPriceRange } from '@models';

export class Product {
  private qntSold = 0;
  private _quantity = 0;

  minOrder = 0;
  qntIncrement = 1;
  fees = 0;
  shipping = 0;

  constructor(public readonly id: number, private readonly unitPriceRanges: ProductPriceRange[]) {
    this.unitPriceRanges.sort((a, b) => b.breakpoint - a.breakpoint);
  }

  get unitPrice(): number {
    return this.unitPriceRanges.find(range => range.breakpoint <= this._quantity).price;
  }

  get unitCost(): number {
    return this._quantity && this.unitPrice + (this.shipping + this.fees) / this._quantity;
  }

  get cost(): number {
    return this._quantity && this.unitPrice * this._quantity + this.shipping + this.fees;
  }

  get quantity(): number {
    return this._quantity;
  }

  sell(quantity: number) {
    if (quantity) {
      this.qntSold += quantity;
      this._quantity = Math.max(Math.ceil(this.qntSold / this.qntIncrement) * this.qntIncrement, this.minOrder);
    }
  }

  setMinOrder(minOrder?: number): Product {
    this.minOrder = minOrder ?? this.minOrder;

    return this;
  }

  setFees(fees?: number): Product {
    this.fees = fees ?? this.fees;

    return this;
  }

  setShipping(shipping?: number): Product {
    this.shipping = shipping ?? this.shipping;

    return this;
  }

  setQntIncrement(increment?: number): Product {
    this.qntIncrement = increment ?? this.qntIncrement;

    return this;
  }
}