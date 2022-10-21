import { DialogTitle, fetchData, GS, input, safeDeleteCol, safeDeleteRow } from '@lib';
import { NamedRange, sheets } from '@utils/constants';

const description = `Qual o número do kit que deseja excluir? Ele deve ser exatamente igual aparece na planilha.
Essa operação não pode ser desfeita.
`;

export const deleteKit = () => {
  const kitNumber = input(
    { title: 'Exclusão de Kit', body: description },
    input => input && !isNaN(+input) && fetchData(sheets.kits, { map: row => row[0] }).includes(+input),
    input => `Não foi encontrado o kit "${input}". Verifique se ele realmente existe.`,
  );

  if (!kitNumber) {
    GS.ss.toast('Exclusão de kit cancelada.', DialogTitle.Aborted);

    return;
  }

  // delete kit column in product-kit map sheet
  safeDeleteCol(sheets.productKitMapping, sheets.productKitMapping.getFrozenColumns() + +kitNumber);

  // delete kit row in kit data sheet
  safeDeleteRow(sheets.kits, sheets.kits.getFrozenRows() + +kitNumber);

  // delete kit row in accounting panel in dashboard sheet
  sheets.dashboard.deleteRow(GS.ss.getRangeByName(NamedRange.DashboardAccounting).getRow() + 4);

  GS.ss.toast(`Exclusão de kit concluída: "${kitNumber}".`, DialogTitle.Success);
  sheets.kits.activate();
};
