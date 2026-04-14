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

  class searchAnalyticsButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_AnylyticsTable/getOrdsTimeritePWP_PRACTICEPwp_tracker',
        uriParams: {
          'SUPPLIER_NAME': $variables.analyticsHeaders.supplierName?$variables.analyticsHeaders.supplierName:'',
          'PROJECT_NAME': $variables.analyticsHeaders.projectName?$variables.analyticsHeaders.projectName:'',
        },
      });

      $variables.analyticsTableADP.data = response.body.items;

      await Actions.fireDataProviderEvent(context, {
        refresh: null,
        target: $variables.analyticsTableADP,
      });
    }
  }

  return searchAnalyticsButtonActionChain;
});
