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

  class ToptaskDialogOpenActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const searchDailogLikeToptaskOpen = await Actions.callComponentMethod(context, {
        selector: '#searchDailog_like_Toptask',
        method: 'open',
      });
    }
  }

  return ToptaskDialogOpenActionChain;
});
