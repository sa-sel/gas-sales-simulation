import { GS } from '@lib/constants';
import { unselectProducts } from '@utils/functions';
import { calculateBreakEven } from './break-even.feature';
import { deleteSelectedProducts } from './delete-products.feature';
import { saveNewProducts } from './new-products.feature';
import { createInputProductPriceRanges, createSelectedProductsPriceRanges } from './price-ranges.feature';

export const onOpen = () => {
  const ui = GS.ui();

  unselectProducts();

  ui.createMenu('[Produtos]')
    .addItem('Salvar novos produtos', saveNewProducts.name)
    .addItem('Excluir produtos selecionados', deleteSelectedProducts.name)
    .addItem('Adicionar faixas de preço de um produto', createInputProductPriceRanges.name)
    .addItem('Adicionar faixas de preço dos produtos selecionados', createSelectedProductsPriceRanges.name)
    .addToUi();

  ui.createMenu('[Cálculos]').addItem('Calcular o break even', calculateBreakEven.name).addToUi();
};
