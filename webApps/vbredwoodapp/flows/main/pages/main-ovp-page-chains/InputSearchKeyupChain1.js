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

  class InputSearchKeyupChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createobj.supplier_site',
  ],
      });

      $variables.createobj.supplier_id = null;
    }
  }

  return InputSearchKeyupChain1;
});
