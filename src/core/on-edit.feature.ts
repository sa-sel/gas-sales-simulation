import { ss } from '@lib/constants';
import { getRangeBelow, rangesOverlap } from '@lib/fuctions';
import { SheetsOnEditEvent } from '@lib/models';
import { NamedRange, watchedRanges } from '@utils/constants';
import { calculateBreakEven } from './break-even.feature';

export const onEdit = (e: SheetsOnEditEvent) => {
  const isHookEnabled: boolean = ss.getRangeByName(NamedRange.ControlBreakEven).getValue();

  if (isHookEnabled && watchedRanges.some(range => rangesOverlap(getRangeBelow(range), e.range))) {
    calculateBreakEven(false);
  }
};
