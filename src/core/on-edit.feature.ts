import { GS } from '@lib/constants';
import { rangesOverlap } from '@lib/fuctions';
import { SheetsOnEditEvent } from '@lib/models';
import { NamedRange, watchedRanges } from '@utils/constants';
import { refreshAccounting } from './accounting.feature';

export const onEdit = (e: SheetsOnEditEvent) => {
  const isHookEnabled: boolean = GS.ss.getRangeByName(NamedRange.ControlAccounting).getValue();

  if (isHookEnabled && watchedRanges.some(range => rangesOverlap(GS.ss.getRangeByName(range), e.range))) {
    refreshAccounting(false);
  }
};
