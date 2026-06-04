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

  class getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_EXPENDITUR_TYPE1_0GetprojectsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_EXPENDITUR_TYPE1_0Getprojects',
        responseType: 'getIcApiIntegrationV2FlowsRestProjectPAYWHENPAIDPWPEXPENDITURTYPE1GetprojectsResponse2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          'P_EXP_CATEGORY_ID': $variables.createobj.EXPENDITURE_CATEGORY_ID,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_EXPENDITUR_TYPE1_0GetprojectsFetch;
});
