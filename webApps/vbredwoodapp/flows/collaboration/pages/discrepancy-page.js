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

  }

  return PageModule;
});
