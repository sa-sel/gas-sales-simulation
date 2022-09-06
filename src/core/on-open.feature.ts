import { ui } from '@lib/constants';
import { calculateBreakEven } from './break-even.feature';

export const onOpen = () => {
  ui.createMenu('[Cálculos]').addItem('Calcular o break even', calculateBreakEven.name).addToUi();
};
