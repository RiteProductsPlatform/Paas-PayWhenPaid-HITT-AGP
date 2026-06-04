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

  class get11_13_18_05ExpenditureTypesLOVFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables, $co, $pr, $eq, $functions } = context;

      // const expenditureType = $page.variables.createobj.expenditure_type;
      const category = $variables.createobj.expenditure_category;

      const query = "ExpenditureCategory='" + category + "'";


      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05ExpenditureTypesLOV',
        responseType: 'get1113185ExpenditureTypesLOVResponse2',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
        uriParams: {
          q: query
        },
      });
      const filterRecordsByLike = await $functions.filterRecordsByLike(callRestEndpoint1.body.items, $variables.createobj.expenditure_type);
      return filterRecordsByLike;
    }
  }

  return get11_13_18_05ExpenditureTypesLOVFetch;
});

