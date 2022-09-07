import { ss } from '@lib/constants';
import { getRangeBelow, readDataFromSheet } from '@lib/fuctions';
import { KitModel, ProductModel, ProductPriceRange } from '@models';
import { Kit, Product } from '@utils/class';
import { NamedRange, sheets } from '@utils/constants';

const balance = (kits: Kit[], products: Product[], sponsorships: number): number => {
  const cost = products.reduce((acc, cur) => acc + cur.cost, 0);
  const income = kits.reduce((acc, cur) => acc + cur.income, 0);

  return income + sponsorships - cost;
};

const fetchCurrentData = () => {
  const sponsorships: number = readDataFromSheet(sheets.sponsorships, row => row[1]).reduce((acc, cur) => acc + cur, 0);

  const productsPriceRanges: Record<number, ProductPriceRange[]> = readDataFromSheet(sheets.productPriceRanges, row => ({
    id: row[0],
    breakpoint: row[2],
    price: row[3],
  })).reduce((acc: Record<number, ProductPriceRange[]>, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = [];
    }
    acc[cur.id].push({ breakpoint: cur.breakpoint, price: cur.price });

    return acc;
  }, {});

  const productsQntPerKit: Record<number, number[]> = readDataFromSheet(sheets.productKitMapping, row => ({
    id: row[0],
    qntPerKit: row.slice(2),
  })).reduce((acc, cur) => ({ ...acc, [cur.id]: cur.qntPerKit }), {});

  const kits: Kit[] = readDataFromSheet(sheets.kits, row => {
    const data: KitModel = {
      no: row[0],
      name: row[1],
      price: row[2] || 0,
      quantity: row[3] || 0,
      qntItems: row[4],
      items: row[5],
      cost: row[6],
      profit: row[7],
      income: row[8],
      breakEvenQnt: row[9],
    };

    return new Kit(data.price, data.quantity);
  });

  const products: Product[] = readDataFromSheet(sheets.products, row => {
    const data: ProductModel = {
      id: row[0],
      name: row[1],
      manufacturer: row[2],
      minOrder: row[3] || 1,
      qntIncrement: row[4] || 1,
      extraFees: row[5] || 0,
      shipping: row[6] || 0,
    };
    const product = new Product(data.id, productsPriceRanges[data.id])
      .setFees(data.extraFees)
      .setMinOrder(data.minOrder)
      .setShipping(data.shipping)
      .setQntIncrement(data.qntIncrement);

    productsQntPerKit[product.id].forEach((qnt, i) => kits[i].addItem(product, qnt));

    return product;
  });

  return { kits, products, sponsorships };
};

export const calculateBreakEven = (stealFocus = true) => {
  const kitBreakEvenRange = getRangeBelow(NamedRange.KitBreakEvenHeader);
  const nKits = kitBreakEvenRange.getNumRows();

  kitBreakEvenRange.clearContent();

  for (let i = 0; i < nKits; i++) {
    const { kits, products, sponsorships } = fetchCurrentData();

    if (!kits[i].items.length || !kits[i].price) {
      kitBreakEvenRange.getCell(i + 1, 1).setValue('-');
      continue;
    }

    while (balance(kits, products, sponsorships) < 0) {
      kits[i].quantity += 1;
    }

    kitBreakEvenRange.getCell(i + 1, 1).setValue(kits[i].quantity);
  }

  if (stealFocus) {
    ss.getRangeByName(NamedRange.DashboardBreakEven).activate();
  }
};
