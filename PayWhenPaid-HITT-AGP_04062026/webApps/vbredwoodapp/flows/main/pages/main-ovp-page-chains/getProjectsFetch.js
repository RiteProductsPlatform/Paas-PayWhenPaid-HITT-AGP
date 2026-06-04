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

  class getProjectsFetch extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {{hookHandler:'vb/RestHookHandler'}} params.configuration
     */
    async run(context, { configuration }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      // const callRestEndpoint1 = await Actions.callRest(context, {
      //   endpoint: 'Fusion_PWP/getProjects',
      //   uriParams: {
      //     q: "ProjectName%20LIKE%20'%25" + ($variables.createobj.project_name ? $variables.createobj.project_name : '') + "%25'",
      //   },
      //   responseType: 'getProjectsResponse',
      //   hookHandler: configuration.hookHandler,
      //   requestType: 'json',
      // });

      // return callRestEndpoint1;
    }
  }

  return getProjectsFetch;
});
