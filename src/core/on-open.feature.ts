import { GS } from '@lib';
import { unselectProducts } from '@utils/functions';
import { refreshAccounting } from './accounting.feature';
import { deleteSelectedProducts } from './delete-products.feature';
import { saveNewProducts } from './new-products.feature';
import { createInputProductPriceRanges, createSelectedProductsPriceRanges } from './price-ranges.feature';

export const onOpen = () => {
  unselectProducts();

  GS.ssui
    .createMenu('[Produtos]')
    .addItem('Salvar novos produtos', saveNewProducts.name)
    .addItem('Excluir produtos selecionados', deleteSelectedProducts.name)
    .addItem('Adicionar faixas de preço de um produto', createInputProductPriceRanges.name)
    .addItem('Adicionar faixas de preço dos produtos selecionados', createSelectedProductsPriceRanges.name)
    .addToUi();

  GS.ssui.createMenu('[Simulação]').addItem('Simular break even e meta de lucro', refreshAccounting.name).addToUi();
};
