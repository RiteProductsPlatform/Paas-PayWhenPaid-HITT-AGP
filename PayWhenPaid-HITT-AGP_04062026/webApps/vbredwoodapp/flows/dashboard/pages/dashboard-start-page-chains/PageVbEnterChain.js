define([
  'vb/action/actionChain',
  'vb/action/actions',
  'vb/action/actionUtils',
], (
  ActionChain,
  Actions,
  ActionUtils
) => {
  'use strict';

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      const data = await $functions.getData();
      $variables.dataADP.data = data;
      const data1 = await $functions.getData1();      
      $variables.trackerADP.data = data1;

       const data2 = await $functions.getData2();      
        $variables.releaseADP.data= data2;

         const data3 = await $functions.getChartData();      
        $variables.chartADP.data= data3;

        
         const data4 = await $functions.getChartData1();      
        $variables.chartADP1.data= data4;





    }
  }

  return PageVbEnterChain;
});
