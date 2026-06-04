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

  class get11_13_18_05ExpenditureTypesLOVFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05ExpenditureTypesLOV',
        responseType: 'get1113185ExpenditureTypesLOVResponse3',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          q: "ExpenditureCategory%20LIKE%20'%25" + ($page.variables.createobj.expenditure_category ? $variables.createobj.expenditure_category : '') + "%25'",
        },
      });

      return callRestEndpoint1;
    }
  }

  return get11_13_18_05ExpenditureTypesLOVFetch2;
});
