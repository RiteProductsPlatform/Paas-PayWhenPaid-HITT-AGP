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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const response4 = await Actions.callRest(context, {
      //   endpoint: 'getarapdetails/getGetaraplinkdetails',
      // });

      // $variables.arapdata.data = response4.body.items;
      // debugger;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.headers',
    '$page.variables.selectedrowDetails',
    '$page.variables.UnmatchedDataADP',
  ],
      });

      await Actions.callChain(context, {
        chain: 'ButtonActionChain',
      });

      // await Actions.fireDataProviderEvent(context, {
      //   refresh: null,
      //   target: $variables.tableSelectedData_Unmatched,
      // });

      // await Actions.fireDataProviderEvent(context, {
      //   target: $variables.disp_searchADP,
      //   refresh: null,
      // });

      // await Actions.callChain(context, {
      //   chain: 'ButtonActionChain',
      // });

      // await Actions.fireNotificationEvent(context, {
      //   summary: 'Table refreshed',
      //   type: 'info',
      //   displayMode: 'transient',
      // });
    }
  }

  return ButtonActionChain1;
});
