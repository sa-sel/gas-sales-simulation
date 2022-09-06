import { ss } from '@lib/constants';

export const enum SheetName {
  Controls = 'Controles',
  General = 'Geral',
  Kits = 'Kits',
  ProductKitMapping = 'Mapeamento Produto-Kit',
  ProductPriceRanges = 'Faixas de Preço dos Produtos',
  Products = 'Produtos',
  Sponsorships = 'Patrocínios',
}

export const sheets = {
  controls: ss.getSheetByName(SheetName.Controls),
  general: ss.getSheetByName(SheetName.General),
  kits: ss.getSheetByName(SheetName.Kits),
  productKitMapping: ss.getSheetByName(SheetName.ProductKitMapping),
  productPriceRanges: ss.getSheetByName(SheetName.ProductPriceRanges),
  products: ss.getSheetByName(SheetName.Products),
  sponsorships: ss.getSheetByName(SheetName.Sponsorships),
};
