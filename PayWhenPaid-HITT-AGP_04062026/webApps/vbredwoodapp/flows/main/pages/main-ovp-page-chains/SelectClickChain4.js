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

  class SelectClickChain4 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

  // debugger;
      if ($variables.createobj.project_name) {
      
        // If data already loaded → do nothing (fast open)
        if ($variables.topTasksLoad) {
          return;
        }

        // If there was an error during background load
        if ($variables.toptasksError) {

          if ($application.variables.traceIdDisplay) {

            await Actions.fireNotificationEvent(context, {
              summary: $variables.toptasksError,
              displayMode: 'transient',
              type: 'error',
            });

          } else {

            await Actions.fireNotificationEvent(context, {
              summary: 'Unable to load TopTasks.',
              displayMode: 'transient',
              type: 'error',
            });

          }

          return;
        }
      }
       else {
          await Actions.fireNotificationEvent(context, {
            summary: 'Please Select Project to get Top Tasks',
            displayMode: 'transient',
            type: 'error',
          });

        }
    }
  }

  return SelectClickChain4;
});
