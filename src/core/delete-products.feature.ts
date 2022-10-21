import { confirm, DialogTitle, getRangeBelow, GS, safeDeleteRow } from '@lib';
import { NamedRange } from '@utils/constants';
import { getSelectedProductsIds, manageSelectedProducts } from '@utils/functions';
import { refreshAccounting } from './accounting.feature';

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
        manageSelectedProducts(cell => safeDeleteRow(cell.getSheet(), cell.getRow()));
        GS.ss.toast('Produtos excluídos com sucesso.', DialogTitle.Success);
        refreshAccounting();
      },
    );
  } else {
    getRangeBelow(NamedRange.SelectedProductsHeader).activate();
    GS.ss.toast('Nenhum produto foi selecionado.', DialogTitle.Error);
  }
};
