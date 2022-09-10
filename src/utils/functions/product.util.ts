import { getRangeBelow, manageDataInSheets, readDataFromSheet } from '@lib/fuctions';
import { Range } from '@lib/models';
import { NamedRange, sheets, syncedDataSheets } from '@utils/constants';

export const getSelectedProductsIds = (): string[] =>
  readDataFromSheet<string>(sheets.products, { map: row => row[0], filter: row => row[row.length - 1] });

/** Run a function for each selected product. It's parameter must be the product's id cell. */
export const manageSelectedProducts = (fn: (idCell: Range) => any): void =>
  getSelectedProductsIds().forEach(id => manageDataInSheets(id, syncedDataSheets, fn));

export const unselectProducts = () => getRangeBelow(NamedRange.SelectedProductsHeader).uncheck();
