import { ProductPriceRange } from '@models';

export class Product {
  /** How many of this product we sold to customers. */
  private quantitySold = 0;
  /** How many of this product we bought from the manufacturer. */
  private quantityBought = 0;

  minOrder = 0;
  fees = 0;
  shipping = 0;

  /**
   * The minimum amount we need to increment each "step" of quantity when buying from the manufacturer.
   * For example, maybe there's a t-shirt that you can buy in batches of 10 un.: 10 un., 20 un., 30 un., ...
   */
  batchSize = 1;

  constructor(public readonly id: string, private readonly unitPriceRanges: ProductPriceRange[]) {
    const nRanges = this.unitPriceRanges.length;

    if (nRanges) {
      /** SNIPPET: filter duplicated breakpoints and keep only the maximum price
      this.unitPriceRanges = Object.values(
        this.unitPriceRanges.reduce<Record<number, ProductPriceRange>>(
          (acc, cur) => (acc[cur.breakpoint] = { breakpoint: cur.breakpoint, price: Math.max(acc?.[cur.breakpoint].price, cur.price) }),
          {},
        ),
      );
      */
      this.unitPriceRanges.sort((a, b) => b.breakpoint - a.breakpoint);
      this.unitPriceRanges[nRanges - 1].breakpoint = 0;
    } else {
      this.unitPriceRanges.push({ breakpoint: 0, price: 0 });
    }
  }

  /** The product's unitary cost considering it's current price range given how many of it we bought. */
  get unitCost(): number {
    return this.unitPriceRanges.find(range => range.breakpoint <= this.quantityBought).price;
  }

  /** The product's estimate unitary cost considering the shipping value and also any extra fees. */
  get totalUnitCost(): number {
    return this.quantityBought && this.unitCost + (this.shipping + this.fees) / this.quantityBought;
  }

  /** The total amount of money we spent buying this product from the manufacturer. */
  get cost(): number {
    return this.quantityBought && this.unitCost * this.quantityBought + this.shipping + this.fees;
  }

  /** How many of this product we bought from the manufacturer. */
  get quantity(): number {
    return this.quantityBought;
  }

  sell(amount: number) {
    if (amount) {
      this.quantitySold += amount;

      // the amount we need to buy from the manufacturer is either:
      // - if we sold <= minOrder: the minimum order
      // - if we sold > minOrder && batchSize === 1: exactly the amount we sold
      // - else: the minimum amount we can buy given batchSize (e.g., for a batch size of 10, if we sold 12 we need to buy 20)
      this.quantityBought = Math.max(Math.ceil(this.quantitySold / this.batchSize) * this.batchSize, this.minOrder);
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

  setBatchSize(size?: number): Product {
    this.batchSize = size ?? this.batchSize;

    return this;
  }
}
