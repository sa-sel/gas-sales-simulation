import { DialogTitle, ss } from '@lib/constants';
import { confirm } from '@lib/fuctions';
import { sheets } from '@utils/constants';
import { getSelectedProductsIds, manageSelectedProducts } from '@utils/functions';
import { calculateBreakEven } from './break-even.feature';

/** Delete selected products in all synced sheets. */
export const deleteSelectedProducts = () => {
  const nSelectedProducts = getSelectedProductsIds().length;

  if (nSelectedProducts) {
    confirm(
      () => {
        ss.toast('Excluindo os produtos.', DialogTitle.InProgress);
        manageSelectedProducts(cell => cell.getSheet().deleteRow(cell.getRow()));
        ss.toast('Produtos excluídos com sucesso.', DialogTitle.Success);
        calculateBreakEven();
      },
      {
        title: 'Excluir Produtos',
        body: `Você tem certeza que deseja excluir ${nSelectedProducts} produtos? Essa ação não poderá ser desfeita.`,
      },
    );
  } else {
    const sh = sheets.products;
    const nHeaderRows = sh.getFrozenRows();

    sh.getRange(nHeaderRows + 1, sh.getMaxColumns(), sh.getMaxRows() - nHeaderRows, 1).activate();
    ss.toast('Nenhum produto foi selecionado.', DialogTitle.Error);
  }
};
