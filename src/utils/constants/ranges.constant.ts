/** Named ranges that point to a (or many) column's header. */
export const enum NamedRange {
  ControlAccounting = 'ControlAccounting',
  DashboardAccounting = 'DashboardAccounting',
  ItemsPerKit = 'ItemsPerKit',
  KitBreakEvenHeader = 'KitBreakEvenHeader',
  KitData = 'KitData',
  KitSalesGoalHeader = 'KitSalesGoalHeader',
  ProductData = 'ProductData',
  ProductsIdsHeader = 'ProductsIdsHeader',
  ProductsUnitPrices = 'ProductsUnitPrices',
  ProfitGoal = 'ProfitGoal',
  SelectedProductsHeader = 'SelectedProductsHeader',
  Sponsorship = 'Sponsorship',
}

export const watchedRanges: NamedRange[] = [
  NamedRange.ControlAccounting,
  NamedRange.ItemsPerKit,
  NamedRange.KitData,
  NamedRange.ProductData,
  NamedRange.ProductsUnitPrices,
  NamedRange.Sponsorship,
];
