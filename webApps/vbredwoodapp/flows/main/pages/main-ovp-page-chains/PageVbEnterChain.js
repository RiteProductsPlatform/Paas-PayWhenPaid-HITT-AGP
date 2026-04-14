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

  class PageVbEnterChain extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const response = await Actions.callRest(context, {
      //   endpoint: 'getCriteriaall/getGetCriteria',
      // });

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getGetCriteria_ords',
      });

      $variables.tableData.data = response.body.items;
    }
  }

  return PageVbEnterChain;
});
