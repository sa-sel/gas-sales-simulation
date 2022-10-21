import { getRangeBelow, isSheetOneOf, saveNewData } from '@lib';
import { ProductModel } from '@models';
import { NamedRange, SheetName, sheets, syncedDataSheets } from '@utils/constants';

/** Save the products listed in the "new products" sheet to all synced data sheets. */
export const saveNewProducts = () => {
  saveNewData<ProductModel>({
    dataValidatorFactory: () => product => !!(product.name && product.manufacturer),
    hooks: {
      success: () => {
        syncedDataSheets.forEach(sheet => {
          if (isSheetOneOf(sheet, [sheets.products, sheets.productPriceRanges])) {
            sheet.sort(3);
          }
          sheet.sort(2);
        });
        sheets.products.activate();
      },
    },
    invalidDataErrorMessage: `Há produtos com nome/empresa ausentes na planilha "${SheetName.NewProducts}".`,
    newDataSheet: sheets.newProducts,
    parseDataToRow: (product, sheet) => {
      let row: any[] = [product.id];

      switch (sheet.getSheetId()) {
        case sheets.newProducts.getSheetId(): {
          row = row.concat([product.name, product.manufacturer, product.minOrder, product.batchSize, product.extraFees, product.shipping]);

          break;
        }

        case sheets.products.getSheetId(): {
          row = row.concat([
            product.name,
            product.manufacturer,
            product.minOrder,
            product.batchSize,
            undefined,
            product.extraFees,
            product.shipping,
          ]);

          break;
        }

        case sheets.productKitMapping.getSheetId(): {
          const nKits = getRangeBelow(NamedRange.KitBreakEvenHeader).getNumRows();

          row.push(undefined);
          for (let i = 0; i < nKits; i++) {
            row.push(0);
          }

          break;
        }

        case sheets.productPriceRanges.getSheetId(): {
          row = row.concat([undefined, 0, 0]);
          break;
        }

        default:
      }

      return row;
    },
    parseRowToData: row => ({
      id: Utilities.getUuid(),
      name: row[0],
      manufacturer: row[1],
      minOrder: row[2],
      batchSize: row[3],
      extraFees: row[4],
      shipping: row[5],
    }),
    targetSheets: syncedDataSheets,
  });
};
