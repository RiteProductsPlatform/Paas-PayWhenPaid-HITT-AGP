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

  class SubmitBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
  
      try {
              if ($variables.createobj.project_id) {

        const validateGroup = await $application.functions.validateGroup('search');

        if (validateGroup === 'valid') {

            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

          $variables.createobj.start_dt = $functions.formatDate($variables.createobj.start_dt_copy);
          $variables.createobj.end_dt = $functions.formatDate($variables.createobj.end_dt_copy);

          let payload = {
            "project_id": $variables.createobj.project_id ? $variables.createobj.project_id : '',
            "top_task_id": $variables.createobj.top_task_id ? $variables.createobj.top_task_id : '',
            "include_subtask_flag": $variables.createobj.include_subtask_flag ? $variables.createobj.include_subtask_flag : '',
            "task_id": $variables.createobj.task_id ? $variables.createobj.task_id : '',
            "expenditure_category": $variables.createobj.expenditure_category ? $variables.createobj.expenditure_category : '',
            "include_allexp_typ_flag": $variables.createobj.include_allexp_typ_flag,
            "expenditure_type": $variables.createobj.expenditure_type ? $variables.createobj.expenditure_type : '',
            "supplier_id": $variables.createobj.supplier_id ? $variables.createobj.supplier_id : '',
            "start_dt": $variables.createobj.start_dt ? $variables.createobj.start_dt : '',
            "end_dt": $variables.createobj.end_dt ? $variables.createobj.end_dt : '',
            "lag_days": $variables.createobj.lag_days ? $variables.createobj.lag_days : '',
            "enabled_flag": $variables.selectedenabledflag ? $variables.selectedenabledflag : 'N',
            "project_name": $variables.createobj.project_name ? $variables.createobj.project_name : '',
            "top_task_name": $variables.createobj.top_task_name ? $variables.createobj.top_task_name : '',
            "task_name": $variables.createobj.task_name ? $variables.createobj.task_name : '',
            "supplier_name": $variables.createobj.supplier_name ? $variables.createobj.supplier_name : '',
            "invoice_amount_limit": $variables.createobj.invoice_amount_limit ? $variables.createobj.invoice_amount_limit : '',
            "creation_date": $variables.createobj.creation_date ? $variables.createobj.creation_date : '',
            "criteria_name": $variables.createobj.criteria_name ? $variables.createobj.criteria_name : '',
            "supplier_site": $variables.createobj.supplier_site ? $variables.createobj.supplier_site : '',
            "project_number": $variables.createobj.project_number ? $variables.createobj.project_number : '',
            "contract_number": $variables.createobj.contract_num ? $variables.createobj.contract_num : '',
            "businessunit_id": $variables.createobj.BusinessUnitId ? $variables.createobj.BusinessUnitId : '',
            "businessunit_name": $variables.createobj.BusinessUnitName ? $variables.createobj.BusinessUnitName : '',
            "criteria_id": ""
          };
// debugger;
          const response3 = await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postGetCriteria',
            body: payload,
            headers: {
              'R_PAGE_NAME': 'criteria page , create criteria button -postGetCriteria',
              'R_TRACE_ID': $application.variables.traceIdDisplay?$application.variables.traceIdDisplay:'',
              'R_USER_NAME': $application.variables.user,
            },
          });

          if (response3.ok) {

            await Actions.resetVariables(context, {
              variables: [
                '$page.variables.createobj',
              ],
            });

            await Actions.fireNotificationEvent(context, {
              summary: 'Success',
              message: 'New Criteria Added',
              type: 'confirmation',
              displayMode: 'transient',
            });

            const addCriteriaModalClose = await Actions.callComponentMethod(context, {
              selector: '#Add-criteria-modal',
              method: 'close',
            });

            await Actions.callChain(context, {
              chain: 'SearchButtonActionChain4',
            });

            // const response = await Actions.callRest(context, {
            //   endpoint: 'ICS/getAP_RELEASE_HOLD_V1_1_0GetInvoiceNumber',
            // });

          } else {

            await Actions.fireNotificationEvent(context, {
              summary: 'Failed to Submit Criteria',
              displayMode: 'transient',
            });
          }
        }
        else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Select all the Required Feilds',
            displayMode: 'transient',
            type: 'error',
          });

        }
      } else{

        await Actions.fireNotificationEvent(context, {
          summary: 'Please Provide Project name to Proceed',
          displayMode: 'transient',
          type: 'error',
        });
        
      }
      } catch (error) {

            const response4 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postPWP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.variables.user,
            'R_PAGE_NAME': 'PWP Criteria PWP_ORDS/postPWP_ORCL_REST_API SubmitBtnAction',
          },
          body: {
            'p_api_name': 'getCriteria',
            'p_debug_message': error.message,
          },
        });

         await Actions.fireNotificationEvent(context, {
           summary: 'Error',
           message: error.message,
           type: 'error',
           displayMode: 'persist',
         });

      
      } finally {
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }


    }







  }

  return SubmitBtnAction;
});
