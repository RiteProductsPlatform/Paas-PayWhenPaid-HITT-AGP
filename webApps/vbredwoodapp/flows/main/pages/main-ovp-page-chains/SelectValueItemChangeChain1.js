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

  class SelectValueItemChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.previousValue
     * @param {any} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.key
     * @param {any} params.data
     * @param {any} params.metadata
     * @param {any} params.valueItem
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      //  debugger;

  //     await Actions.resetVariables(context, {
  //       variables: [
  //   '$page.variables.createobj.supplier_site',
  // ],
  //     });

      if (data) {
        $variables.createobj.supplier_id = data.VENDOR_ID;

        try {

          const response = await Actions.callRest(context, {
            endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_VENDOR_SITES_SYNC1_0Getprojects',
            uriParams: {
              'p_username': $application.variables.user,
              'p_vendor_id': $variables.createobj.supplier_id,
            },
            headers: {
              'R_PAGE_NAME': 'criteria page -create criteria -Supplier Sites LOV - PAY_WHEN_PAID/PWP_PROJECTSYNC/1.0/getprojects',
              'R_TRACE_ID': $application.variables.traceIdDisplay ?
                $application.variables.traceIdDisplay : '',
              'R_USER_NAME': $application.variables.user,
            },
          });

          $variables.supplierSitesAdp.data = response.body.DATA_DS.G_1;
           $variables.supplierSitesLoad = true;
          $variables.supplierSitesError = null;
        } catch (error) {
          $variables.supplierSitesLoad = false;
          $variables.supplierSitesError = error.message;
        } finally {
        }

      }
    }
  }

  return SelectValueItemChangeChain1;
});
