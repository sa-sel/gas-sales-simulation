import { getRangeBelow, rangesOverlap } from '@lib/fuctions';
import { SheetsOnEditEvent } from '@lib/models';
import { watchedRanges } from '@utils/constants';
import { calculateBreakEven } from './break-even.feature';

export const onEdit = (e: SheetsOnEditEvent) => {
  if (watchedRanges.some(range => rangesOverlap(getRangeBelow(range), e.range))) {
    calculateBreakEven(false);
  }
};
