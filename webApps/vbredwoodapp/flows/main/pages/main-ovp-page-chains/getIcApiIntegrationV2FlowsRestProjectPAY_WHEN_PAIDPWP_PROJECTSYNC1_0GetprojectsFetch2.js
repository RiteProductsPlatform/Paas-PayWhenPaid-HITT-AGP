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

  class getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PROJECTSYNC1_0GetprojectsFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PROJECTSYNC1_0Getprojects',
        uriParams: {
          'p_username': $application.variables.user,
        },
        responseType: 'getIcApiIntegrationV2FlowsRestProjectPAYWHENPAIDPWPPROJECTSYNC1GetprojectsResponse4',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PROJECTSYNC1_0GetprojectsFetch2;
});
