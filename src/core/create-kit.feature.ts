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
  addColsToSheet(
    [
      [
        undefined,
        ...getRangeBelow(NamedRange.ProductsIdsHeader)
          .getValues()
          .flat()
          .map(() => 0),
      ],
    ],
    sheets.productKitMapping,
  );

  // add new kit row to accounting panel in dashboard sheet
  const dashboardAccountingRange = GS.ss.getRangeByName(NamedRange.DashboardAccounting);
  const targetRow = dashboardAccountingRange.getRow() + 3;
  const nKits = getRangeBelow(NamedRange.KitBreakEvenHeader).getNumRows();

  if (dashboardAccountingRange.getNumRows() - nKits < 3) {
    sheets.dashboard.insertRows(targetRow);

    // restore style
    sheets.dashboard
      .getRange(targetRow + 1, 1, 1, sheets.dashboard.getMaxColumns())
      .copyFormatToRange(sheets.dashboard, 1, sheets.dashboard.getMaxColumns(), targetRow, targetRow);
    sheets.dashboard
      .getRange(targetRow, dashboardAccountingRange.getColumn(), 1, dashboardAccountingRange.getNumColumns())
      .setBorder(null, null, true, null, null, true, 'black', SpreadsheetApp.BorderStyle.SOLID);
  }

  GS.ss.toast(`Criação de kit concluída: "${kitName}".`, DialogTitle.Success);
  newKitRow.activate();
};
