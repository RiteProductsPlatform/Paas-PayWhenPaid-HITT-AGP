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
        endpoint: 'PWP_ORDS/getPWP_Unmatched_Screen',
        uriParams: {
          'project_number': $variables.headers.project?$variables.headers.project:'',
          'supplier_name': $variables.headers.supplier?$variables.headers.supplier:'',
          'task_name': $variables.headers.taskName?$variables.headers.taskName:'',
          'P_USERNAME': $application.variables.user,
        },
      });

      const addUniqId = await $functions.addUniqId(response.body.items);
      $variables.UnmatchedDataADP.data = addUniqId;

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
