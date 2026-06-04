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

  class SelectValueItemChangeChain3 extends ActionChain {

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

      debugger;

      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getPWP_TASK_NUMBERS',
        uriParams: {
          'project_number': $variables.headers.project,
          'P_USERNAME': $application.variables.user,
        },
      });

      $variables.taskNameADP.data = response.body.items;
    }
  }

  return SelectValueItemChangeChain3;
});
