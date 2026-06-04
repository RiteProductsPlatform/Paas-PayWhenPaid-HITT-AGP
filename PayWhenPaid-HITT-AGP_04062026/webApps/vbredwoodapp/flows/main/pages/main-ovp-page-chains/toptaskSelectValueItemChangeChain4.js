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

  class toptaskSelectValueItemChangeChain4 extends ActionChain {

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

  //     await Actions.resetVariables(context, {
  //       variables: [
  //   '$page.variables.createobj.task_id',
  //   '$page.variables.createobj.task_name',
  // ],
  //     });
      if (data) {
        $variables.createobj.top_task_id = data.TOP_TASK_ID;

        try {

          const response = await Actions.callRest(context, {
            endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PJC_TASK_SYNC1_0Getprojects2',
            uriParams: {
              'TOP_TASK_ID': $variables.createobj.top_task_id,
              'p_projectid': $variables.createobj.project_id,
              'p_username': $application.variables.user,
            },
             headers: {
                'R_PAGE_NAME': 'criteria page -create criteria -Tasks LOV - PAY_WHEN_PAID/PWP_PJC_TASK_SYNCC/1.0/getprojects',
                'R_TRACE_ID': $application.variables.traceIdDisplay?
                      $application.variables.traceIdDisplay:'',
                'R_USER_NAME': $application.variables.user,
              },
          });

          $variables.tasksAdp.data = response.body.DATA_DS.G_1;
          $variables.tasksLoad = true;
          $variables.tasksError = null;
        } catch (error) {
           $variables.tasksError = error.message;
         $variables.tasksLoad = false;
         
        } finally {
        }
      }
    }
  }

  return toptaskSelectValueItemChangeChain4;
});
