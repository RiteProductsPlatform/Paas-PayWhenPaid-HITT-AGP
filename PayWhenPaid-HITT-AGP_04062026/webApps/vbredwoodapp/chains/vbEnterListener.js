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

  class vbEnterListener extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables } = context;


      const response = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/getGenericLookups_YesORNo',
      });

      $variables.YesNoADP.data = response.body.items[0].lookupCodes.items;
    }
  }

  return vbEnterListener;
});
