define([], () => {
  'use strict';

  class PageModule {

    formatDate(inputDate) {
      const date = new Date(inputDate);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    addUniqId(data) {
      let uniqIdResult = [];
      data.forEach((item, idex) => {
        item.uid = idex + 1;
        uniqIdResult.push(item);
      });
      return uniqIdResult;
    }

    validateHoldId(dataArray) {
      return dataArray.every(item => item.hold_id !== null && item.hold_id !== undefined);
    }

    validateHoldStatus(dataArray) {
      return dataArray.every(item => item.invoice_hold_applied === 'Y');
    }

    exportWorkbench_PWP(data) {
      debugger;
      if (data) {
        // Define columns for Sheet1
        let headerFields = [
          "Project Number",
          "Supplier Name",
          "AP Invoice",
          "AP Invoice Date",
          "AP Invoice Amount",
          "Hold Date",
          "AR Invoice Number",
          "AR Invoice Amount",
          "AR Receipt Number",
          "AR Invoice Dueamount",
          "PO Number",
          "PO Receipt Number",
          "Hold Status",
          "Currency Code",
          "Lag Days"
        ];

        // Prepare data for Sheet1 (only selected fields)
        let exData1 = [headerFields];
        data.forEach((itm) => {
          exData1.push([
            itm["project_number"],
            itm["vendor_name"],
            itm["invoice_number"],
            itm["invoice_creation_date"],
            itm["invoice_amount"],
            itm["hold_date"],
            itm["ar_invoice_number"],
            itm["ar_invoice_amount"],
            itm["ar_receipt_number"],
            itm["ar_invoice_dueamount"],
            itm["po_number"],
            itm["po_receipt_number"],
            itm["invoice_hold_applied"],
            itm["invoice_currency_code"],
            itm["lag_days"]


          ]);
        });


        // Create workbook and sheets
        let workbook = XLSX.utils.book_new();
        let worksheet1 = XLSX.utils.aoa_to_sheet(exData1);

        // Append both sheets
        XLSX.utils.book_append_sheet(workbook, worksheet1, "Sheet1");

        // Export the file
        XLSX.writeFile(workbook, "PWP_Workbench.xlsx");
        return true;
      }
    }

  }

  return PageModule;
});
