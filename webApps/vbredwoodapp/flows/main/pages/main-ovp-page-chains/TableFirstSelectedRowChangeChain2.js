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

  class TableFirstSelectedRowChangeChain2 extends ActionChain {

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
      const { $page, $flow, $application, $constants, $variables, $eq } = context;
   
      $variables.createobj.top_task_id = rowData.TopTaskId;
      $variables.createobj.top_task_name = rowData.TaskName;
      $variables.createobj.task_name = rowData.TaskName;

      const searchDailogLikeToptaskClose = await Actions.callComponentMethod(context, {
        selector: '#searchDailog_like_Toptask',
        method: 'close',
      });
   debugger;
      const response = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05ProjectsProjectIdChildTasks',
        uriParams: {
          ProjectId: $variables.createobj.project_number,
          q: "TaskName%20LIKE%20'%25"+$variables.createobj.task_name+"%25'",
        },
        requestTransformOptions: {
          filter: {
            op: '$eq',
            attribute: 'TopTaskId',
            value: $variables.createobj.top_task_id,
          },
        },
      });

      $variables.TaskADP.data = response.body.items;
    }
  }

  return TableFirstSelectedRowChangeChain2;
});
