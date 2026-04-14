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

  class CreateBtnAction extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;

      await Actions.resetVariables(context, {
        variables: [
    '$page.variables.createobj',
    '$page.variables.createobj.top_task_id',
    '$page.variables.createobj.top_task_name',
    '$page.variables.createobj.supplier_site',
    '$page.variables.createobj.site_id',
    '$page.variables.topTaskAdp',
    '$page.variables.TaskADP',
    '$page.variables.expTypeAdp',
    '$page.variables.supplierSiteADP',
  ],
      });

      const addCriteriaModalOpen = await Actions.callComponentMethod(context, {
        selector: '#Add-criteria-modal',
        method: 'open',
      });
    }
  }

  return CreateBtnAction;
});
