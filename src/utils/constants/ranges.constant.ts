/** Named ranges that point to a (or many) column's header. */
export const enum NamedRange {
  ItemsPerKit = 'ItemsPerKitHeader',
  ItemData = 'ItemData',
  ItemsUnitPrices = 'ItemsUnitPrices',
  KitBreakEvenHeader = 'KitBreakEvenHeader',
  KitsPrices = 'KitsSellingPricesHeader',
  Sponsorship = 'Sponsorship',
  DashboardBreakEven = 'DashboardBreakEven',
  ControlBreakEven = 'ControlBreakEven',
}

export const watchedRanges: NamedRange[] = [
  NamedRange.ItemsPerKit,
  NamedRange.ItemData,
  NamedRange.ItemsUnitPrices,
  NamedRange.KitsPrices,
  NamedRange.Sponsorship,
];
