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

  class navigationDataListener extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{oldValue:navigationItem[],value:navigationItem[]}} params.event
     */
    async run(context, { event }) {
      const { $application, $constants, $variables } = context;

    }
  }

  return navigationDataListener;
});
