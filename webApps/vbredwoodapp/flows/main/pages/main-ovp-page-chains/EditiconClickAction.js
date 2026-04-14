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

  class EditiconClickAction extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.key 
     * @param {number} params.index 
     * @param {any} params.current 
     */
    async run(context, { key, index, current }) {
      const { $page, $flow, $application, $constants, $variables } = context;
      // debugger;

      // $variables.createobj = current.row;

     

 const addCriteriaModalOpen = await Actions.callComponentMethod(context, {
        selector: '#Add-criteria-modal',
        method: 'open',
      });

       const loadingDialogOpen = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'open',
      });

      $variables.createobj.project_id = current.row.project_id;
      $variables.createobj.project_name = current.row.project_name;
      $variables.createobj.top_task_name = current.row.top_task_name;
      $variables.createobj.task_name = current.row.task_name;
      $variables.createobj.top_task_id = current.row.top_task_id;
      $variables.createobj.task_id = current.row.task_id;
      $variables.createobj.supplier_id = current.row.supplier_id;
      $variables.createobj.supplier_name = current.row.supplier_name;
      $variables.createobj.supplier_site = current.row.supplier_site;
      $variables.createobj.BusinessUnitId = current.row.businessunit_id;
      $variables.createobj.BusinessUnitName = current.row.businessunit_name;
      $variables.createobj.criteria_id = current.row.criteria_id;
      $variables.createobj.criteria_name = current.row.criteria_name;
      $variables.createobj.enabled_flag = current.row.enabled_flag;
      $variables.createobj.expenditure_category = current.row.expenditure_category;
      $variables.createobj.expenditure_type = current.row.expenditure_type;
      $variables.createobj.include_allexp_typ_flag = current.row.include_allexp_typ_flag;
      $variables.createobj.include_subtask_flag = current.row.include_subtask_flag;
      $variables.createobj.invoice_amount_limit = current.row.invoice_amount_limit;
      $variables.createobj.lag_days = current.row.lag_days;
      $variables.createobj.project_number = current.row.project_number;
      $variables.createobj.contract_num = current.row.contract_number;
      $variables.dialogLabel = 'Edit';
      $variables.createobj.start_dt_copy = current.row.start_dt;
      $variables.createobj.end_dt_copy = current.row.end_dt;

      await Actions.resetVariables(context, {
        variables: [
          '$page.variables.selectedenabledflag',
        ],
      });
      if ($variables.createobj.enabled_flag === "Y") {
        $variables.createobj.enabled_flag = true;

      } else if ($variables.createobj.enabled_flag === "N") {
        $variables.createobj.enabled_flag = false;
      }

      await new Promise(resolve => setTimeout(resolve, 12000));

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
      
    }
  }

  return EditiconClickAction;
});
