import { GS } from '@lib';

export const enum SheetName {
  Controls = 'Controles',
  Dashboard = 'Geral',
  Kits = 'Kits',
  NewProducts = 'Novos Produtos',
  ProductKitMapping = 'Mapeamento Produto-Kit',
  ProductPriceRanges = 'Faixas de Preço dos Produtos',
  Products = 'Produtos',
  Sponsorships = 'Patrocínios',
}

export const sheets = {
  controls: GS.ss.getSheetByName(SheetName.Controls),
  dashboard: GS.ss.getSheetByName(SheetName.Dashboard),
  kits: GS.ss.getSheetByName(SheetName.Kits),
  newProducts: GS.ss.getSheetByName(SheetName.NewProducts),
  productKitMapping: GS.ss.getSheetByName(SheetName.ProductKitMapping),
  productPriceRanges: GS.ss.getSheetByName(SheetName.ProductPriceRanges),
  products: GS.ss.getSheetByName(SheetName.Products),
  sponsorships: GS.ss.getSheetByName(SheetName.Sponsorships),
};

/** Sheets that contain data for each member and must be kept synced. */
export const syncedDataSheets = [sheets.products, sheets.productKitMapping, sheets.productPriceRanges];
