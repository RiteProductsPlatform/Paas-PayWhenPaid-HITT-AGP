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

  class RefreshButtonActionChain4 extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      $variables.searchselectedpnum = null;

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getGetCriteria_ords',
        uriParams: {
          'P_USERNAME': $application.variables.user,
          'project_id': $variables.searchselectedpnum ?$variables.searchselectedpnum :'',
          'ENABLED_FLAG': $variables.headers_enable_Criteria ?$variables.headers_enable_Criteria:'',
        },
      });


      $variables.tableData.data = response.body.items;

      // const response4 = await Actions.callRest(context, {
      //   endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PROJECTSYNC1_0Getprojects',
      //   uriParams: {
      //     'p_username': $application.variables.user,
      //   },
      // });

      // const countDuplicatesByName = await $functions.countDuplicatesByName(response4.body.DATA_DS.G_1);
      // debugger;
    }
  }

  return RefreshButtonActionChain4;
});
