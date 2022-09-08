import { DialogTitle, GS } from '@lib/constants';
import { confirm, getRangeBelow, safeDeleteRow } from '@lib/fuctions';
import { NamedRange } from '@utils/constants';
import { getSelectedProductsIds, manageSelectedProducts } from '@utils/functions';
import { calculateBreakEven } from './break-even.feature';

/** Delete selected products in all synced sheets. */
export const deleteSelectedProducts = () => {
  const nSelectedProducts = getSelectedProductsIds().length;

  if (nSelectedProducts) {
    confirm(
      {
        title: 'Excluir Produtos',
        body: `Você tem certeza que deseja excluir ${nSelectedProducts} produtos? Essa ação não poderá ser desfeita.`,
      },
      () => {
        GS.ss.toast('Excluindo os produtos.', DialogTitle.InProgress);
        manageSelectedProducts(cell => safeDeleteRow(cell));
        GS.ss.toast('Produtos excluídos com sucesso.', DialogTitle.Success);
        calculateBreakEven();
      },
    );
  } else {
    getRangeBelow(NamedRange.SelectedProductsHeader).activate();
    GS.ss.toast('Nenhum produto foi selecionado.', DialogTitle.Error);
  }
};
