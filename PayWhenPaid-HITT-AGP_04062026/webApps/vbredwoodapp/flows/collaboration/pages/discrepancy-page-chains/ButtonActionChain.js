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

  class ButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {

           const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getPWP_DISC_WORKBENCH_SEARCH',
        uriParams: {
          'P_PROJECT_NUMBER': $variables.headers.project?$variables.headers.project:'',
          'P_VENDOR_NAME': $variables.headers.supplier?$variables.headers.supplier:'',
          'P_INVOICE_NUMBER': $variables.headers.apInvoice?$variables.headers.apInvoice:'',
          'P_USERNAME': $application.variables.user,
        },
      });

      if (response.ok) {

        const addUniqId = await $functions.addUniqId(response.body.items);
        $variables.disp_searchADP.data = addUniqId;
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
      
      } catch (error) {
      } finally {
      }

   
 
    }
  }

  return ButtonActionChain;
});
