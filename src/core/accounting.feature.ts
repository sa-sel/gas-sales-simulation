import { DialogTitle, fetchData, getRangeBelow, GS, Range } from '@lib';
import { KitModel, ProductModel, ProductPriceRange } from '@models';
import { Kit, Product } from '@utils/class';
import { NamedRange, sheets } from '@utils/constants';

/** Calculate the balance considering the kits we sold, the products we bought to make them and the sponsorship we received. */
const balance = (kits: Kit[], products: Product[], sponsorships: number): number => {
  const cost = products.reduce((acc, cur) => acc + cur.cost, 0);
  const income = kits.reduce((acc, cur) => acc + cur.income, 0);

  return income + sponsorships - cost;
};

const rangeNotEmpty = (row: any[]) => row.every(row => row !== undefined && row !== null && row !== '');

const fetchCurrentData = () => {
  const sponsorships: number = fetchData(sheets.sponsorships, {
    map: row => row[1],
    filter: rangeNotEmpty,
  }).reduce((acc, cur) => acc + cur, 0);

  const productsPriceRanges: Record<number, ProductPriceRange[]> = fetchData(sheets.productPriceRanges, {
    map: row => ({
      id: row[0],
      breakpoint: row[2],
      price: row[3],
    }),
    filter: rangeNotEmpty,
  }).reduce((acc: Record<number, ProductPriceRange[]>, cur) => {
    if (!acc[cur.id]) {
      acc[cur.id] = [];
    }
    acc[cur.id].push({ breakpoint: cur.breakpoint, price: cur.price });

    return acc;
  }, {});

  const productsQntPerKit: Record<number, number[]> = fetchData(sheets.productKitMapping, {
    map: row => ({
      id: row[0],
      qntPerKit: row.slice(2),
    }),
    filter: row => row[0],
  }).reduce((acc, cur) => ({ ...acc, [cur.id]: cur.qntPerKit }), {});

  const kits: Kit[] = fetchData(sheets.kits, {
    map: row => {
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

      return new Kit(data.name, data.price, data.quantity);
    },
  });

  const products: Product[] = fetchData(sheets.products, {
    map: row => {
      const data: ProductModel = {
        id: row[0],
        name: row[1],
        manufacturer: row[2],
        minOrder: row[3] || 1,
        batchSize: row[4] || 1,
        extraFees: row[6] || 0,
        shipping: row[7] || 0,
      };
      const product = new Product(data.id, productsPriceRanges[data.id])
        .setFees(data.extraFees)
        .setMinOrder(data.minOrder)
        .setShipping(data.shipping)
        .setBatchSize(data.batchSize);

      productsQntPerKit[product.id].forEach((qnt: number, i: number) => kits[i].addItem(product, qnt));

      return product;
    },
    filter: row => row[0] && row[1] && !!productsPriceRanges[row[0]],
  });

  return { kits, products, sponsorships };
};

export const refreshAccounting = (stealFocus = true) => {
  const kitSalesGoalRange: Range = getRangeBelow(NamedRange.KitSalesGoalHeader);
  const kitBreakEvenRange: Range = getRangeBelow(NamedRange.KitBreakEvenHeader);
  const profitGoal: number = GS.ss.getRangeByName(NamedRange.ProfitGoal).getValue();
  const nKits: number = kitBreakEvenRange.getNumRows();

  kitBreakEvenRange.setValue('???');
  kitSalesGoalRange.setValue('???');

  GS.ss.toast('A simulação das finanças está sendo calculada.', DialogTitle.InProgress);

  for (let i = 0; i < nKits; i++) {
    const { kits, products, sponsorships } = fetchCurrentData();
    const kitString = `${i + 1} ("${kits[i].name}")`;

    // if the current kits is not in use
    if (!kits[i].items.length || !kits[i].price) {
      kitBreakEvenRange.getCell(i + 1, 1).setValue('-');
      kitSalesGoalRange.getCell(i + 1, 1).setValue('-');
      continue;
    }

    GS.ss.toast(`Calculando simulação de break even para o kit ${kitString}.`, DialogTitle.InProgress);
    while (balance(kits, products, sponsorships) < 0) {
      kits[i].quantity += 1;
    }
    kitBreakEvenRange.getCell(i + 1, 1).setValue(kits[i].quantity);

    GS.ss.toast(`Calculando simulação de meta de lucro para o kit ${kitString}.`, DialogTitle.InProgress);
    while (balance(kits, products, sponsorships) < profitGoal) {
      kits[i].quantity += 1;
    }
    kitSalesGoalRange.getCell(i + 1, 1).setValue(kits[i].quantity);
  }

  if (stealFocus) {
    GS.ss.getRangeByName(NamedRange.DashboardAccounting).activate();
    GS.ss.toast('Aqui estão quantas vendas faltam para o break even.', DialogTitle.Success);
  } else {
    GS.ss.toast('As quantidades de break even foram atualizadas.', DialogTitle.Success);
  }
};
