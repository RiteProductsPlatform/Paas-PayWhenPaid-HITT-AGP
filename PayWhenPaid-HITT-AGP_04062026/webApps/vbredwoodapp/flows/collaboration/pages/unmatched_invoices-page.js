define([], () => {
  'use strict';

  class PageModule {

    // function to check whether the selected records have the ar_invoice_number value or not 
    allRecordsHaveInvoiceNumber(tableSelectedData_Unmatched) {
  // debugger;
      if (
        !tableSelectedData_Unmatched ||
        !Array.isArray(tableSelectedData_Unmatched.data) ||
        tableSelectedData_Unmatched.data.length === 0
      ) {
        return false;
      }
      return tableSelectedData_Unmatched.data.every(record => {
        return (
          record.ar_invoice_number !== null &&
          record.ar_invoice_number !== undefined &&
          record.ar_invoice_number !== ""
        );
      });
    }

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

    buildPayload(invoiceInfo) {

      let payload = {
        AR_INVOICE_NUMBER: invoiceInfo.ar_invoice_number || "",
        AR_INVOICE_AMOUNT: invoiceInfo.ar_invoice_amount || "",
        AR_INVOICE_DUEAMOUNT: invoiceInfo.ar_invoice_dueamount || "",
        customer_name: invoiceInfo.customer_name || "",
        invoice_id: invoiceInfo.invoice_id || ""
      };
      return payload;
    }


    validateHoldId(dataArray) {
      return dataArray.every(item => item.hold_id !== null && item.hold_id !== undefined);
    }

    validateHoldStatus(dataArray) {
      return dataArray.every(item => item.invoice_hold_applied === 'Y');
    }

  }

  return PageModule;
});
