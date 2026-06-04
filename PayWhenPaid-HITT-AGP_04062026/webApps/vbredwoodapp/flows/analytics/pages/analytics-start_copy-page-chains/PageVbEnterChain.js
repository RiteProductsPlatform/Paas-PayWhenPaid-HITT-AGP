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
      const results = await Promise.all([
        async () => {

          const response = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getPWP_ANALYTICS_PAGE',
          });

          const pwpChartData = await $functions.pwpChartData(response.body.items);

          $variables.chartArray = pwpChartData;
        },
        async () => {

          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/getPWP_AP_AGING',
          });

          let pwpChartDataAging = await $functions.pwpChartData_Aging(response2.body.items);

          $variables.agingArray = pwpChartDataAging;
        },
        async () =>{
          const response3 = await Actions.callRest(context, {
            endpoint: 'PWP_AnylyticsTable/getOrdsTimeritePWP_PRACTICEPwp_tracker',
            uriParams: {
              'PROJECT_NAME': $variables.analyticsHeaders.projectName?$variables.analyticsHeaders.projectName:'',
              'SUPPLIER_NAME': $variables.analyticsHeaders.supplierName?$variables.analyticsHeaders.supplierName:'',
            },
          });

          $variables.analyticsTableADP.data = response3.body.items;
        
       }

      ].map(sequence => sequence()));
    }
  }

  return PageVbEnterChain;
});
