import { ui } from '@lib/constants';
import { calculateBreakEven } from './break-even.feature';
import { saveNewProducts } from './new-products.feature';

export const onOpen = () => {
  ui.createMenu('[Produtos]').addItem('Salvar novos produtos', saveNewProducts.name).addToUi();
  ui.createMenu('[Cálculos]').addItem('Calcular o break even', calculateBreakEven.name).addToUi();
};
