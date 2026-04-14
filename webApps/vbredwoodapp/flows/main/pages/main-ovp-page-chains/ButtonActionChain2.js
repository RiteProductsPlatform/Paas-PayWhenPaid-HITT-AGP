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

  class ButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      try {
        // debugger;

        const validateGroup = await $application.functions.validateGroup('search');

        if (validateGroup === 'valid') {

          // if ($variables.selectedenabledflag === "true") {
          //   $variables.createobj.enabled_flag = 'Y'
          // } else {
          //   $variables.createobj.enabled_flag = 'N'
          // }

          $variables.createobj.end_dt = await $functions.formatDate($variables.createobj.end_dt_copy);
          $variables.createobj.start_dt = await $functions.formatDate($variables.createobj.start_dt_copy);
          // debugger;
          let payload = {
            "project_id": $variables.createobj.project_id,
            "top_task_id": $variables.createobj.top_task_id ? $variables.createobj.top_task_id : '',
            "include_subtask_flag": $variables.createobj.include_subtask_flag ? $variables.createobj.include_subtask_flag : '',
            "task_id": $variables.createobj.task_id ? $variables.createobj.task_id : '',
            "expenditure_category": $variables.createobj.expenditure_category ? $variables.createobj.expenditure_category : '',
            "include_allexp_typ_flag": $variables.createobj.include_allexp_typ_flag ? $variables.createobj.include_allexp_typ_flag : '',
            "expenditure_type": $variables.createobj.expenditure_type ? $variables.createobj.expenditure_type : '',
            "supplier_id": $variables.createobj.supplier_id ? $variables.createobj.supplier_id : '',
            "start_dt": $variables.createobj.start_dt ? $variables.createobj.start_dt : '',
            "end_dt": $variables.createobj.end_dt ? $variables.createobj.end_dt : '',
            "lag_days": $variables.createobj.lag_days ? $variables.createobj.lag_days : '',
            // "enabled_flag": $variables.createobj.enabled_flag ? $variables.createobj.enabled_flag : '',
            "enabled_flag": $variables.selectedenabledflag ? $variables.selectedenabledflag : 'N',
            "project_name": $variables.createobj.project_name ? $variables.createobj.project_name : '',
            "top_task_name": $variables.createobj.top_task_name ? $variables.createobj.top_task_name : '',
            "task_name": $variables.createobj.task_name ? $variables.createobj.task_name : '',
            "supplier_name": $variables.createobj.supplier_name ? $variables.createobj.supplier_name : '',
            "invoice_amount_limit": $variables.createobj.invoice_amount_limit ? $variables.createobj.invoice_amount_limit : '',
            "creation_date": $variables.createobj.creation_date ? $functions.formatDate($variables.createobj.creation_date) : '',
            "criteria_name": $variables.createobj.criteria_name ? $variables.createobj.criteria_name : '',
            "supplier_site": $variables.createobj.supplier_site ? $variables.createobj.supplier_site : '',
            "project_number": $variables.createobj.project_number ? $variables.createobj.project_number : '',
            "contract_number": $variables.createobj.contract_num ? $variables.createobj.contract_num : '',
            "businessunit_id": $variables.createobj.BusinessUnitId ? $variables.createobj.BusinessUnitId : '',
            "businessunit_name": $variables.createobj.BusinessUnitName ? $variables.createobj.BusinessUnitName : '',
            "criteria_id": $variables.createobj.criteria_id
          }

          const response2 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/putGetCriteria',
            body: payload,
            headers: {
              'R_PAGE_NAME': "criteria page , update criteria button-putGetCriteria",
              'R_TRACE_ID': $application.variables.traceIdDisplay?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
            },
          });
          // const response = await Actions.callRest(context, {
          //   endpoint: 'postCriteria/updatecriteria',
          //   body: payload,
          // });

          if (response2.ok) {

            const loadingDialogClose = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.callChain(context, {
              chain: 'SearchButtonActionChain4',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Updated Successfully.',
              type: 'confirmation',
              displayMode: 'transient',
            });
          }

          if (!response2.ok) {
            const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'close',
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Error in Updating.',
              displayMode: 'transient',
              type: 'error',
            });

            return;
          }

          const addCriteriaModalClose = await Actions.callComponentMethod(context, {
            selector: '#Add-criteria-modal',
            method: 'close',
          });
        } else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Select all the Required feilds',
            displayMode: 'transient',
            type: 'error',
          });

        }
      } catch (error) {
         await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postPWP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.variables.user,
            'R_PAGE_NAME': 'PWP Criteria PWP_ORDS/postPWP_ORCL_REST_API UpdateBtnAction',
          },
          body: {
            'p_api_name': 'getCriteria-put',
            'p_debug_message': error.message,
          },
        });

          await Actions.fireNotificationEvent(context, {
          summary: 'Error',
          message: error.message,
          type: 'error',
          displayMode: 'transient'
        });
      } finally {
      }




    }
  }

  return ButtonActionChain2;
});
