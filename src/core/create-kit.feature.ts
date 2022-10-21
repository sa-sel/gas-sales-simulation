import { addColsToSheet, appendDataToSheet, DialogTitle, getRangeBelow, GS, input } from '@lib';
import { NamedRange, sheets } from '@utils/constants';

export const createKit = () => {
  const kitName = input({ title: 'Criação de Kit', body: 'Qual o nome do novo kit?' });

  if (!kitName) {
    GS.ss.toast('Criação de kit cancelada.', DialogTitle.Aborted);

    return;
  }

  // add new kit row to kit data sheet
  const newKitRow = appendDataToSheet([[undefined, kitName, 0, 0]], sheets.kits);

  // add new kit column to product-kit map sheet
  addColsToSheet(sheets.productKitMapping, [
    [
      undefined,
      ...getRangeBelow(NamedRange.ProductsIdsHeader)
        .getValues()
        .flat()
        .map(() => 0),
    ],
  ]);

  // add new kit row to accounting panel in dashboard sheet
  sheets.dashboard.insertRows(GS.ss.getRangeByName(NamedRange.DashboardAccounting).getRow() + 4);

  GS.ss.toast(`Criação de kit concluída: "${kitName}".`, DialogTitle.Success);
  newKitRow.activate();
};
