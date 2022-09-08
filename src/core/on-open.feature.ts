import { GS } from '@lib/constants';
import { unselectProducts } from '@utils/functions';
import { calculateBreakEven } from './break-even.feature';
import { deleteSelectedProducts } from './delete-products.feature';
import { saveNewProducts } from './new-products.feature';

export const onOpen = () => {
  const ui = GS.ui();

  unselectProducts();

  ui.createMenu('[Produtos]')
    .addItem('Salvar novos produtos', saveNewProducts.name)
    .addItem('Excluir produtos selecionados', deleteSelectedProducts.name)
    .addToUi();

  ui.createMenu('[Cálculos]').addItem('Calcular o break even', calculateBreakEven.name).addToUi();
};
