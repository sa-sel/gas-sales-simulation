import { GS } from '@lib/constants';
import { rangesOverlap } from '@lib/fuctions';
import { SheetsOnEditEvent } from '@lib/models';
import { NamedRange, watchedRanges } from '@utils/constants';
import { calculateBreakEven } from './break-even.feature';

export const onEdit = (e: SheetsOnEditEvent) => {
  const isHookEnabled: boolean = GS.ss.getRangeByName(NamedRange.ControlBreakEven).getValue();

  if (isHookEnabled && watchedRanges.some(range => rangesOverlap(GS.ss.getRangeByName(range), e.range))) {
    calculateBreakEven(false);
  }
};
