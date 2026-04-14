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

  class SelectValueItemChangeChain4 extends ActionChain {

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
     * @param {number} params.index
     * @param {any} params.current
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      if (data) {

        $variables.unmatchedInvCurrentData.ar_invoice_amount = data.ar_invoice_amount;
        $variables.unmatchedInvCurrentData.ar_invoice_name = data.ar_invoice_name;
        $variables.unmatchedInvCurrentData.ar_invoice_number = data.ar_invoice_number;
        $variables.unmatchedInvCurrentData.customer_name = data.customer_name;
        $variables.unmatchedInvCurrentData.ar_invoice_dueamount = data.ar_invoice_dueamount;
        
        await Actions.fireDataProviderEvent(context, {
          target: $variables.UnmatchedDataADP,
          update: {
            data: $variables.unmatchedInvCurrentData,
            indexes: index,
          },
        });
      }

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.selectedrowDetails',
  ],
      });
    }
  }

  return SelectValueItemChangeChain4;
});
