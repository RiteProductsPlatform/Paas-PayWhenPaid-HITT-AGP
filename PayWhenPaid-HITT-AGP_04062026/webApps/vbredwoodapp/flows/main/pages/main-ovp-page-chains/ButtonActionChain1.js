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

  class ButtonActionChain1 extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const response = await Actions.callRest(context, {
        endpoint: 'Fusion_PWP/getProjects',
        uriParams: {
          q: "ProjectName%20LIKE%20'%25"+$variables.createobj.project_name+"%25'",
        },
      });

      $variables.getProjectsADP.data = response.body.items;
    }
  }

  return ButtonActionChain1;
});
