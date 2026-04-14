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

  class getFscmRestApiResources11_13_18_05SuppliersFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/getFscmRestApiResources11_13_18_05Suppliers',
        responseType: 'getFscmRestApiResources1113185SuppliersResponse',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          q: `InactiveDate IS NULL AND Supplier LIKE '%${$variables.createobj.supplier_name?$variables.createobj.supplier_name:''}%'`,
        },
      });

      return callRestEndpoint1;
    }
  }

  return getFscmRestApiResources11_13_18_05SuppliersFetch;
});
