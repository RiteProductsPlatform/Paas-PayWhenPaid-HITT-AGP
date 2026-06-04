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

  class TaskSearchButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05ProjectsProjectIdChildTasks',
        uriParams: {
          ProjectId: $variables.createobj.project_id,
          q: "TaskName%20LIKE%20'%25"+$variables.createobj.task_name+"%25'",
        },
      });

      $variables.TaskADP.data = response.body.items;
    }
  }

  return TaskSearchButtonActionChain;
});
