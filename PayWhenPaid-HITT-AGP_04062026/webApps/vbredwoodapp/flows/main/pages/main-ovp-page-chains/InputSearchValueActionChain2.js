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

  class InputSearchValueActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.value
     * @param {any} params.itemContext
     * @param {string} params.previousValue
     */
    async run(context, { event, value, itemContext, previousValue }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // $variables.createobj.expenditure_type = itemContext.data.ExpenditureTypeName;

      

    }
  }

  return InputSearchValueActionChain2;
});
