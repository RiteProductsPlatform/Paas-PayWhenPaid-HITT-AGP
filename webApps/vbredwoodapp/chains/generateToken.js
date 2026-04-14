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

  class generateToken extends ActionChain {

    /**
     * Action chain is used for "Role Based Authentication"
     * @param {Object} context
     */
    async run(context) {
      const { $application, $constants, $variables, $functions } = context;


      const username=  await $functions.getUsernameFromJwt($variables.jwt);

      // $variables.user = "veera.ganapabattula@rite.digital";

      // $variables.user = "RGorremuchu@hitt-gc.com";
          // $variables.user = "rite.user";
      $variables.user = username;
      
      const response = await Actions.callRest(context, {
        endpoint: 'PWP_ORDS/getPWP_PAGE_RESTRICTION',
        uriParams: {
          'p_username': $variables.user,
        },
      });

      const menuItems = await $functions.getMenuItems([
        {
          "name": "PWP-Criteria",
          "id": "shell/main",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "PWP-Workbench",
          "id": "shell/collaboration",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Discrepancy-Workbench",
          "id": "shell/collaboration/discrepancy",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Unmatched Invoices",
          "id": "shell/collaboration/unmatched_invoices",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Log Details",
          "id": "shell/logscreen",
          "iconClass": "oj-ux-ico-list"
        },
        {
          "name": "Analytics",
          "id": "shell/analytics/analytics-start",
          "iconClass": "oj-ux-ico-list"
        }
      ], response.body.items);

      $variables.navigationData = menuItems;


    }
  }

  return generateToken;
});