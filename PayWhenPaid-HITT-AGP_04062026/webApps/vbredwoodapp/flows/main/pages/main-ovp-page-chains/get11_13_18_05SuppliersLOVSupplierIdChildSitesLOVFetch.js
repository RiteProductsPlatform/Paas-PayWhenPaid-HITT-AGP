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

  class get11_13_18_05SuppliersLOVSupplierIdChildSitesLOVFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if ($variables.createobj.supplier_id) {


        const callRestEndpoint1 = await Actions.callRest(context, {
          endpoint: 'Fusion_PWP/get11_13_18_05SuppliersLOVSupplierIdChildSitesLOV',
          uriParams: {
            SupplierId: $variables.createobj.supplier_id,
            q: "SupplierSite%20LIKE%20'%25"+($variables.createobj.supplier_site?$variables.createobj.supplier_site:"")+"%25'",
          },
          responseType: 'get1113185SuppliersLOVSupplierIdChildSitesLOVResponse2',
          hookHandler: configuration.hookHandler,
          requestType: 'json',
        });
        return callRestEndpoint1;
      }

      
    }
  }

  return get11_13_18_05SuppliersLOVSupplierIdChildSitesLOVFetch;
});
