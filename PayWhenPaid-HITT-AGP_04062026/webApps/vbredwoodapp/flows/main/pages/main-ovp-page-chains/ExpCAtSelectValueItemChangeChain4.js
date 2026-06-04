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

  class ExpCAtSelectValueItemChangeChain4 extends ActionChain {

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
  //   '$page.variables.createobj.expenditure_type',
  // ],
  //     });

      if (data) {
        $variables.createobj.EXPENDITURE_CATEGORY_ID = data.EXPENDITURE_CATEGORY_ID;

        try {
          const response = await Actions.callRest(context, {
            endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_EXPENDITUR_TYPE1_0Getprojects',
            uriParams: {
              'P_EXP_CATEGORY_ID': $variables.createobj.EXPENDITURE_CATEGORY_ID,
            },
            headers: {
              'R_PAGE_NAME': 'criteria page -create criteria -Expenditure Type LOV - /PAY_WHEN_PAID/PWP_EXPENDITUR_TYPE/1.0/getprojects',
              'R_TRACE_ID': $application.variables.traceIdDisplay ?
                $application.variables.traceIdDisplay : '',
              'R_USER_NAME': $application.variables.user,
            },
          });

          $variables.expTypeAdp.data = response.body.DATA_DS.G_1;
          $variables.expTypeLoad = true;
          $variables.expTypeError = null;
         
              } catch (error) {
          $variables.expTypeLoad = false;
          $variables.expTypeError = error.message;
          // debugger;

        } finally {
        }
      }
    }
  }

  return ExpCAtSelectValueItemChangeChain4;
});
