import { appendDataToSheet, DialogTitle, getRangeBelow, GS, input } from '@lib';
import { NamedRange, sheets } from '@utils/constants';
import { getSelectedProductsIds, unselectProducts } from '@utils/functions';

const sortProductRangesSheet = () => sheets.productPriceRanges.sort(3).sort(2);

const createPriceRanges = (productIds: string[]) => {
  // unfortunately it's not possible to sort the sheets instantly only
  // when the operation is over (just won't work), so this trigger will
  // sort the sheet after about ~1.5 min
  ScriptApp.newTrigger(sortProductRangesSheet.name).timeBased().after(1).create();

  GS.ss.toast('Criando as faixas de preço solicitadas.', DialogTitle.InProgress);
  appendDataToSheet(
    productIds.map(id => [id, undefined, '???', '???']),
    sheets.productPriceRanges,
  );

  GS.ss.toast('Faixas de preço criadas. Lembre de preenchê-las.', DialogTitle.Success);
  sheets.productPriceRanges.activate();
};

export const createInputProductPriceRanges = () => {
  const productsIdsRange = getRangeBelow(NamedRange.ProductsIdsHeader);
  const existingProductsIds = new Set(productsIdsRange.getValues().flat());

  const productId = input(
    { title: 'Criação de Faixas de Preço', body: 'Para qual produto você deseja criar faixas de preço? Escreva o seu id abaixo.' },
    id => existingProductsIds.has(id),
    input => `O id do produto deve estar exatamente igual ao que consta na planilha. O input "${input || '<vazio>'}" é inválido`,
  );

  if (!productId) {
    return;
  }

  const nRanges = parseInt(
    input({ title: 'Criação de Faixas de Preço', body: 'Quantas faixas de preço você deseja criar?' }, n => {
      const num = parseInt(n);

      return !isNaN(num) && num > 0;
    }),
  );

  if (!nRanges) {
    return;
  }

  const ids: string[] = [];

  for (let i = 0; i < nRanges; i++) {
    ids.push(productId);
  }

  createPriceRanges(ids);
};

export const createSelectedProductsPriceRanges = () => {
  const ids = getSelectedProductsIds();

  if (ids.length) {
    createPriceRanges(ids);
    unselectProducts();
  } else {
    getRangeBelow(NamedRange.SelectedProductsHeader).activate();
    GS.ss.toast('Nenhum produto foi selecionado.', DialogTitle.Error);
  }
};
