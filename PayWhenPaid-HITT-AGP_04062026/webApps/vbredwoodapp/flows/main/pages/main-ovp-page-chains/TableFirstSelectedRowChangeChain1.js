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

  class TableFirstSelectedRowChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {object} params.previousValue
     * @param {object} params.value
     * @param {string} params.updatedFrom
     * @param {any} params.rowKey
     * @param {any} params.rowData
     * @param {any} params.firstSelectedRow
     */
    async run(context, { event, previousValue, value, updatedFrom, rowKey, rowData, firstSelectedRow }) {
      const { $page, $flow, $application, $constants, $variables } = context;


debugger;
      $variables.createobj.project_name = rowData.ProjectName;
      $variables.createobj.project_id = rowData.ProjectId;
      $variables.createobj.project_number = rowData.ProjectNumber;

      const response = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05ProjectsProjectIdChildTasks',
        uriParams: {
          ProjectId: $variables.createobj.project_id,
        },
      });

      $variables.TopTasksADP.data = response.body.items;

      const searchDailogLikeProjectClose = await Actions.callComponentMethod(context, {
        selector: '#searchDailog_like_project',
        method: 'close',
      });

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.getProjectsADP',
  ],
      });
    }
  }

  return TableFirstSelectedRowChangeChain1;
});
