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

  class SelectClickChain3 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      
      // If data already loaded → do nothing (fast open)
      if ($variables.contractsLoad) {
        return;
      }

      // If there was an error during background load
      if ($variables.contractsError) {

        if ($application.variables.traceIdDisplay) {

          await Actions.fireNotificationEvent(context, {
            summary: $variables.contractsError,
            displayMode: 'transient',
            type: 'error',
          });

        } else {

          await Actions.fireNotificationEvent(context, {
            summary: 'Unable to load Contracts.',
            displayMode: 'transient',
            type: 'error',
          });

        }

        return;
      }
    }
  }

  return SelectClickChain3;
});
