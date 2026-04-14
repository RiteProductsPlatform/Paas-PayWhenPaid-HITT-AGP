define([], () => {
  'use strict';

  class PageModule {


    pwpChartData(mydata) {
      let dataArray = typeof mydata === "string" ? JSON.parse(mydata) : mydata;

      let items = [];
      let newID = 1;

      dataArray.forEach(item => {

        // Map metric text → series-id
        let seriesName =
          item.metric === "Total Subcontractor invoices awaiting owner payment" ? "Total Subcontractor invoices awaiting owner payment" :
            item.metric === "Owner payments received this month" ? "Owner payments received this month" :
              item.metric === "Subcontractor payments released this month (PWP)" ? "Subcontractor payments released this month (PWP)" :
                item.metric === "Current cash tied up in PWP hold" ? "Current cash tied up in PWP hold" :
                  "Metric Other";


        items.push({
          id: newID++,
          group: item.metric,
          series: seriesName,
          value: item.value_example,
          notes: item.notes
        });
      });

      return items;
    }

    pwpChartData_Aging(mydata) {
      let dataArray = typeof mydata === "string" ? JSON.parse(mydata) : mydata;

      let items = [];
      let newID = 1;

      dataArray.forEach(item => {

        // Map aging_bucket → series-id that matches your seriesTemplate
        let seriesName =
          item.aging_bucket === "0-15days" ? "0-15days" :
            item.aging_bucket === "16-30days" ? "16-30days" :
              item.aging_bucket === "31-60days" ? "31-60days" :
                item.aging_bucket === "60+days" ? "60+days" :
                  "Aging Other";
        items.push({
          id: newID++,
          group: item.aging_bucket,
          series: seriesName,
          value: item.amountheld_of_invoices
        });
      });

      return items;
    }


  }

  return PageModule;
});
