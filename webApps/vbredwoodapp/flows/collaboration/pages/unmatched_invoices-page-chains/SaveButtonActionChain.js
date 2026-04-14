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

  class SaveButtonActionChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {object} params.event
     * @param {any} params.originalEvent
     */
    async run(context, { event, originalEvent }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      
      try {
        if ($variables.tableSelectedData_Unmatched.data.length > 0) {

          const allRecordsHaveInvoiceNumber = await $functions.allRecordsHaveInvoiceNumber($variables.tableSelectedData_Unmatched);
          if (allRecordsHaveInvoiceNumber) {

            const loadingDialogOpen = await Actions.callComponentMethod(context, {
              selector: '#loadingDialog',
              method: 'open',
            });

            let responseCode;
            const results = await ActionUtils.forEach($variables.tableSelectedData_Unmatched.data, async (item, index) => {

              const buildPayload = await $functions.buildPayload(item);

              const response = await Actions.callRest(context, {
                endpoint: 'PWP_ORDS/postPWP_Unmatched_Screen',
                body: buildPayload,
                headers: {
                  'R_TRACE_ID': $application.variables.traceIdDisplay,
                  'R_USER_NAME': $application.variables.user,
                  'R_PAGE_NAME': 'Unmatched Invoices PWP_ORDS/postPWP_Unmatched_Screen'
                },
              });

              responseCode = response;
            }, { mode: 'serial' });

            if (responseCode.ok) {

              await Actions.resetVariables(context, {
                variables: [
                  '$page.variables.tableSelectedData_Unmatched.data',
                ],
              });
              const response = await Actions.callRest(context, {
                endpoint: 'PWP_ORDS/getPWP_Unmatched_Screen',
                uriParams: {
                  'project_number': $variables.headers.project ? $variables.headers.project : '',
                  'supplier_name': $variables.headers.supplier ? $variables.headers.supplier : '',
                  'task_name': $variables.headers.taskName ? $variables.headers.taskName : '',
                  'P_USERNAME': $application.variables.user,
                },
              });

              const addUniqId = await $functions.addUniqId(response.body.items);
              $variables.UnmatchedDataADP.data = addUniqId;
              // await Actions.callChain(context, {
              //   chain: 'ButtonActionChain',
              // });
              await Actions.fireNotificationEvent(context, {
                summary: 'Selected Records Saved Succeesfully',
                displayMode: 'transient',
                type: 'confirmation',
              });
            }

          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Selected Records Should have the AR Invoice Number',
              displayMode: 'transient',
              type: 'error',
            });

          }
        }else{


          await Actions.fireNotificationEvent(context, {
            summary: 'Select Atleast one Record to Proceed',
            displayMode: 'transient',
            type: 'error',
          });

          await Actions.resetVariables(context, {
            variables: [
              '$page.variables.selectedrowDetails',
            ],
          });
        }
      } catch (error) {
   
          await Actions.callRest(context, {
            endpoint: 'PWP_ORDS/postPWP_ORCL_REST_API',
            headers: {
              'R_TRACE_ID': $application.variables.traceIdDisplay,
              'R_USER_NAME': $application.variables.user,
              'R_PAGE_NAME': 'Unmatched Screen- Save button',
            },
            body: {
              p_api_name: '/PWP_Unmatched_Screen',
              p_debug_message: error.message,
            },
          });

          await Actions.fireNotificationEvent(context, {
            summary: error.message,
            type: 'error',
            displayMode: 'transient',
            message: 'pwp-unmatched Invoices-Save Action',
          });
     
      } finally {
        const loadingDialogClose = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }
    }
  }

  return SaveButtonActionChain;
});
