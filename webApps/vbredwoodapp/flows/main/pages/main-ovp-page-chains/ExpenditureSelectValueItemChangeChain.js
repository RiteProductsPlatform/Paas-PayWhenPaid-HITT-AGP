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

  class ExpenditureSelectValueItemChangeChain extends ActionChain {

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
     */
    async run(context, { event, previousValue, value, updatedFrom, key, data, metadata, valueItem }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      
   $variables.createobj.EXPENDITURE_CATEGORY_ID = data.EXPENDITURE_CATEGORY_ID;

  // const category = $variables.createobj.expenditure_category;
 
      // const query = "ExpenditureCategory='" + category + "'";
      // const response = await Actions.callRest(context, {
      //   endpoint: 'Fusion_PWP/get11_13_18_05ExpenditureTypesLOV',
      //   uriParams: {
      //     q: query
      //   },
      // });

      // $variables.expenditureTypeADP.data = response.body.items;
    }
  }

  return ExpenditureSelectValueItemChangeChain;
});
