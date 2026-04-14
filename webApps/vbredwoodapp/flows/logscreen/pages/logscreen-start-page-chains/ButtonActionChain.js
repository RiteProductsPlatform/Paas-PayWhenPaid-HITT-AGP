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
      const { $page, $flow, $application, $constants, $variables } = context;

      const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getPWP_DebugLogs',
        uriParams: {
          'P_END_DATE': $variables.headers.endDate ? $page.functions.formatDate($variables.headers.endDate):'',
          'P_START_DATE': $variables.headers.startDate ? $page.functions.formatDate($variables.headers.startDate):'',
          'P_SESSION_ID': $variables.headers.traceID?$variables.headers.traceID:'',
          'P_USER_ID': $variables.headers.username ?$variables.headers.username:'',
        },
      });

      $variables.logData.data = response.body.items;

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return ButtonActionChain;
});
