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

  class fetchLOVS extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     */
    async run(context, { event }) {
      const { $page, $flow, $application, $constants, $variables } = context;

      const results = await Promise.all([
        async () => {

          try {
            const response = await Actions.callRest(context, {
              endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_PROJECTSYNC1_0Getprojects',
              uriParams: {
                'p_username': $application.variables.user,
              },
              headers: {
                'R_PAGE_NAME': 'criteria page -create criteria -projects LOV - PAY_WHEN_PAID/PWP_PROJECTSYNC/1.0/getprojects',
                'R_TRACE_ID': $application.variables.traceIdDisplay ?
                  $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });

            $variables.projectsAdp.data = response.body.DATA_DS.G_1;

            $variables.projectsLoaded = true;
            $variables.projectsError = null;
          } catch (error) {
            $variables.projectsError = error.message;
            $variables.projectsLoaded = false;

          } finally {
          }
        },
        async () => {

          try {

        
            const response2 = await Actions.callRest(context, {
              endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_EXP_CATEGORY_SYNC1_0Getprojects',
              headers: {
                'R_PAGE_NAME': 'criteria page -create criteria -expenditure Category LOV - /PAY_WHEN_PAID/PWP_EXP_CATEGORY_SYNC/1.0/getprojects',
                'R_TRACE_ID': $application.variables.traceIdDisplay ?
                  $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });

            $variables.expCatAdp.data = response2.body.DATA_DS.G_1;
            $variables.expCatLoad = true;
            $variables.expCatError = null;
          } catch (error) {
            $variables.expCatError = error.message;
           
            $variables.expCatLoad = false;
          } finally {
          }
        },

        async () => {


          try {

            const response3 = await Actions.callRest(context, {
              endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_SUPPLIERS_SYNC1_0Getprojects',
              headers: {
                'R_PAGE_NAME': 'criteria page -create criteria -suppliers LOV - /PAY_WHEN_PAID/  PWP_SUPPLIERS_SYNC/1.0/getprojects',
                'R_TRACE_ID': $application.variables.traceIdDisplay ?
                  $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });

            $variables.suppliersAdp.data = response3.body.DATA_DS.G_1;
            $variables.suppliersload = true;
            $variables.suppliersError = null;
          } catch (error) {
            $variables.suppliersError = error.message;
            $variables.suppliersload = false;
          } finally {
          }
        },

        async () => {


          try {

            const response4 = await Actions.callRest(context, {
              endpoint: 'OIC_Projects/getIcApiIntegrationV2FlowsRestProjectPAY_WHEN_PAIDPWP_CONTRACTS_SYNC1_0Getprojects',
              uriParams: {
                'p_username': $application.variables.user,
              },
              headers: {
                'R_PAGE_NAME': 'criteria page -create criteria -Contracts LOV - PAY_WHEN_PAID/PWP_CONTRACTS_SYNC/1.0/getprojects',
                'R_TRACE_ID': $application.variables.traceIdDisplay ?
                  $application.variables.traceIdDisplay : '',
                'R_USER_NAME': $application.variables.user,
              },
            });

            $variables.contractAdp.data = response4.body.DATA_DS.G_1;
            $variables.contractsLoad = true;
            $variables.contractsError = null;

          } catch (error) {
            $variables.contractsError = error.message;
            $variables.contractsLoad = false;
          } finally {
          }
        },
      ].map(sequence => sequence()));
    }
  }

  return fetchLOVS;
});
