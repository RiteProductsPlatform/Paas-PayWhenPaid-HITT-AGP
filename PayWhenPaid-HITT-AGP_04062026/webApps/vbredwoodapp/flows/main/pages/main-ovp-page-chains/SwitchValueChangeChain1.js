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

  class SwitchValueChangeChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.value 
     */
    async run(context, { value }) {
      const { $page, $flow, $application, $constants, $variables } = context;

   
      // $variables.selectedenabledflag = value;
      if (value) {
        $variables.selectedenabledflag = 'Y';
      }else{
        $variables.selectedenabledflag = 'N';
      }
    }
  }

  return SwitchValueChangeChain1;
});
