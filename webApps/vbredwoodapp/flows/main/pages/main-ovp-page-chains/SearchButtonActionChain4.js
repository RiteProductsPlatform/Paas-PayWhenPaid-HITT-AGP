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

  class SearchButtonActionChain4 extends ActionChain {
    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables } = context;
      try {
          const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        let response;
        const response2 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/getGetCriteria_ords',
          uriParams: {
            'P_USERNAME': $application.variables.user,
            'ENABLED_FLAG': $variables.headers_enable_Criteria ?$variables.headers_enable_Criteria:'',
            'project_id': $variables.searchselectedpnum ?$variables.searchselectedpnum :'',
          },
        });

          // // Call the REST API with the filter
          // response = await Actions.callRest(context, {
          //   endpoint: 'getCriteriaall/getGetCriteria',
          //   uriParams: {
          //     'project_id': $variables.searchselectedpnum ? $variables.searchselectedpnum:'',
          //     'ENABLED_FLAG': $variables.headers_enable_Criteria?$variables.headers_enable_Criteria:'',
          //     'P_USERNAME': $application.variables.user,
          //   },
          // });

      

        // Assign the response data to the table variable
        $variables.tableData.data = response2.body.items;
      

        if (response2.ok) {
          const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
        }else{
           const loadingDialogClose = await Actions.callComponentMethod(context, {
            selector: '#loadingDialog',
            method: 'close',
          });
        }
      } catch (error) {
      } finally {
      }
    }
  }

  return SearchButtonActionChain4;
});
