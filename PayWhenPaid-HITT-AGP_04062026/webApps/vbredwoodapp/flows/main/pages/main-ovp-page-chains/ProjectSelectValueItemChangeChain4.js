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

  class ProjectSelectValueItemChangeChain4 extends ActionChain {

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


      // debugger;
      if (data) {
        $variables.createobj.project_id = data.PROJECT_ID;
        $variables.createobj.project_number = data.PROJECT_NUMBER;
        $variables.createobj.BusinessUnitId = data.BU_ID;
        $variables.createobj.BusinessUnitName = data.BU_name;

  //       await Actions.resetVariables(context, {
  //         variables: [
  //   '$page.variables.createobj.top_task_id',
  //   '$page.variables.createobj.task_id',
  //   '$page.variables.createobj.task_name',
  //   '$page.variables.createobj.top_task_name',
  // ],
  //       });

        try {

          const response = await Actions.callRest(context, {
            endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PJC_TOP_TASK_SYNC1_0Getprojects',
            uriParams: {
              'p_projectid': $variables.createobj.project_id,
              'p_username': $application.variables.user,
            },
            headers: {
              'R_PAGE_NAME': 'criteria page -create criteria -Top Tasks LOV - PAY_WHEN_PAID/PWP_PJC_TOP_TASK_SYNC/1.0/getprojects',
              'R_TRACE_ID': $application.variables.traceIdDisplay ?
                $application.variables.traceIdDisplay : '',
              'R_USER_NAME': $application.variables.user,
            },
          });

          $variables.topTaskAdp.data = response.body.DATA_DS.G_1;

          $variables.topTasksLoad = true;
          $variables.toptasksError = null;
        } catch (error) {
          $variables.topTasksLoad = false;
          $variables.toptasksError = error.message;
        } finally {
        }
      }
    }
  }

  return ProjectSelectValueItemChangeChain4;
});
