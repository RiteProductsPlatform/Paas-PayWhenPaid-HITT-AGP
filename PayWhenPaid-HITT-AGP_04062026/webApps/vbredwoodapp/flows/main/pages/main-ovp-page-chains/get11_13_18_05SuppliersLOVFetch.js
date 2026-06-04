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

  class get11_13_18_05SuppliersLOVFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05SuppliersLOV',
        responseType: 'get1113185SuppliersLOVResponse2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          q: `InactiveDate IS NULL AND SupplierName LIKE '%${$variables.createobj.supplier_name?$variables.createobj.supplier_name:''}%'`,
        },
      });

      return callRestEndpoint1;
    }
  }

  return get11_13_18_05SuppliersLOVFetch;
});
