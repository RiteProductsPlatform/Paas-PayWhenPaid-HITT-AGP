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

  class RefreshButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.headers',
    '$page.variables.selectedrowDetails',
    '$page.variables.collabration2ADP',
  ],
      });

      await Actions.callChain(context, {
        chain: 'SearchBtnAction',
      });

      const response4 = await Actions.callRest(context, {
        endpoint: 'getarapdetails/getGetaraplinkdetails',
      });

      $variables.arapdata.data = response4.body.items;

      // await Actions.fireNotificationEvent(context, {
      //   summary: 'Table refreshed',
      //   type: 'info',
      //   displayMode: 'transient',
      // });
    }
  }

  return RefreshButtonActionChain;
});
