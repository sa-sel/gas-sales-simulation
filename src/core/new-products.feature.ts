import { generateId, getRangeBelow, isSameSheet, saveNewData } from '@lib/fuctions';
import { ProductModel } from '@models';
import { NamedRange, SheetName, sheets, syncedDataSheets } from '@utils/constants';

/** Save the products listed in the "new products" sheet to all synced data sheets. */
export const saveNewProducts = () =>
  saveNewData<ProductModel>({
    dataValidatorFactory: () => product => !!(product.name && product.manufacturer),
    hooks: {
      success: () => sheets.products.getRange(1, 1).activate(),
      afterAppend: sheet => {
        if (isSameSheet(sheet, sheets.products) || isSameSheet(sheet, sheets.productPriceRanges)) {
          sheet.sort(3);
        }
        sheet.sort(2);
      },
    },
    invalidDataErrorMessage: `Há produtos com nome/empresa ausentes na planilha "${SheetName.NewProducts}".`,
    newDataSheet: sheets.newProducts,
    parseDataToRow: (product, sheet) => {
      let row: any[] = [product.id];

      if (isSameSheet(sheet, sheets.products) || isSameSheet(sheet, sheets.newProducts)) {
        row = row.concat([product.name, product.manufacturer, product.minOrder, product.qntIncrement, product.extraFees, product.shipping]);
      } else if (isSameSheet(sheet, sheets.productKitMapping)) {
        const nKits = getRangeBelow(NamedRange.KitBreakEvenHeader).getNumRows();

        for (let i = 0; i < nKits; i++) {
          row.push(0);
        }
      }

      return row;
    },
    parseRowToData: row => ({
      id: generateId(),
      name: row[0],
      manufacturer: row[1],
      minOrder: row[2],
      qntIncrement: row[3],
      extraFees: row[4],
      shipping: row[5],
    }),
    targetSheets: syncedDataSheets,
  });
