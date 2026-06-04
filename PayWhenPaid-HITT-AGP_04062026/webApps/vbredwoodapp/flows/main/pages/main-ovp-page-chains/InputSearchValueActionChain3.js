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

  class InputSearchValueActionChain3 extends ActionChain {

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
      if (itemContext) {

        $variables.createobj.supplier_id = itemContext.data.SupplierId;
      }else{
 await Actions.resetVariables(context, {
   variables: [
    '$page.variables.createobj.supplier_id',
    '$page.variables.createobj.supplier_site',
  ],
 });
      }

     
    }
  }

  return InputSearchValueActionChain3;
});
