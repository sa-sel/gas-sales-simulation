import { fetchData, getRangeBelow, manageDataInSheets, Range } from '@lib';
import { NamedRange, sheets, syncedDataSheets } from '@utils/constants';

export const getSelectedProductsIds = (): string[] =>
  fetchData<string>(sheets.products, { map: row => row[0], filter: row => row[row.length - 1] });

/** Run a function for each selected product. Its parameter must be the product's ID cell. */
export const manageSelectedProducts = (fn: (idCell: Range) => any): void =>
  getSelectedProductsIds().forEach(id => manageDataInSheets(id, syncedDataSheets, fn));

export const unselectProducts = () => getRangeBelow(NamedRange.SelectedProductsHeader).uncheck();
