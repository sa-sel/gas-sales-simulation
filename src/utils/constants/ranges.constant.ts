/** Named ranges that point to a (or many) column's header. */
export const enum NamedRange {
  ControlBreakEven = 'ControlBreakEven',
  DashboardBreakEven = 'DashboardBreakEven',
  ItemData = 'ItemData',
  ItemsPerKit = 'ItemsPerKit',
  ItemsUnitPrices = 'ItemsUnitPrices',
  KitBreakEvenHeader = 'KitBreakEvenHeader',
  KitData = 'KitData',
  Sponsorship = 'Sponsorship',
}

export const watchedRanges: NamedRange[] = [
  NamedRange.ControlBreakEven,
  NamedRange.ItemData,
  NamedRange.ItemsPerKit,
  NamedRange.ItemsUnitPrices,
  NamedRange.KitData,
  NamedRange.Sponsorship,
];
