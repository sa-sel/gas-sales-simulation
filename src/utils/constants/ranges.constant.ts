/** Named ranges that point to a (or many) column's header. */
export const enum NamedRange {
  ControlBreakEven = 'ControlBreakEven',
  DashboardBreakEven = 'DashboardBreakEven',
  ItemsPerKit = 'ItemsPerKit',
  KitBreakEvenHeader = 'KitBreakEvenHeader',
  KitData = 'KitData',
  ProductData = 'ItemData',
  ProductsIdsHeader = 'ProductsIdsHeader',
  ProductsUnitPrices = 'ItemsUnitPrices',
  SelectedProductsHeader = 'SelectedProductsHeader',
  Sponsorship = 'Sponsorship',
}

export const watchedRanges: NamedRange[] = [
  NamedRange.ControlBreakEven,
  NamedRange.ItemsPerKit,
  NamedRange.KitData,
  NamedRange.ProductData,
  NamedRange.ProductsUnitPrices,
  NamedRange.Sponsorship,
];
