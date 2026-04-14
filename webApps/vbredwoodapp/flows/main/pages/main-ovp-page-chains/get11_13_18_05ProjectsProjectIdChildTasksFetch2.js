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

  class get11_13_18_05ProjectsProjectIdChildTasksFetch2 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const callRestEndpoint1 = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/get11_13_18_05ProjectsProjectIdChildTasks',
        uriParams: {
          ProjectId: $variables.createobj.project_id,
          q: "TaskName%20LIKE%20'%25"+($variables.createobj.task_name?$variables.createobj.task_name:'')+"%25'",
        },
        responseType: 'get1113185ProjectsProjectIdChildTasksResponse4',
        hookHandler: configuration.hookHandler,
        requestType: 'json',
      });

      return callRestEndpoint1;
    }
  }

  return get11_13_18_05ProjectsProjectIdChildTasksFetch2;
});
