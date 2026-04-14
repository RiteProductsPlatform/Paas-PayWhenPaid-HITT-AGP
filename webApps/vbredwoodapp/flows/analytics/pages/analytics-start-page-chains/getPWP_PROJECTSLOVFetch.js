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

  class getPWP_PROJECTSLOVFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getPWP_PROJECTSLOV',
        responseType: 'getPWPPROJECTSLOVResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          'P_USERNAME': $application.variables.user,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getPWP_PROJECTSLOVFetch;
});
