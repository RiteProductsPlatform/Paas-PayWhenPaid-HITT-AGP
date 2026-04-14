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

  class SearchBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      try {
           const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getPWP_Workbench_Search',
        uriParams: {
          'p_ap_invoice': $variables.headers.apInvoice ? $variables.headers.apInvoice :'',
          'p_project_number': $variables.headers.project ? $variables.headers.project :'',
          'p_supplier_name': $variables.headers.supplier?$variables.headers.supplier:'',
          'p_invoice_hold': $variables.headers.hold_active ?$variables.headers.hold_active:'',
          'P_USERNAME': $application.variables.user,
        },
      });

      const addUniqId = await $functions.addUniqId(response.body.items);

      $variables.collabration2ADP.data = addUniqId;
      
        const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });

      await Actions.fireDataProviderEvent(context, {
        target: $variables.collabration2ADP,
        refresh: null,
      });

    
      } catch (error) {
      } finally {
      }

   
    }
  }

  return SearchBtnAction;
});
