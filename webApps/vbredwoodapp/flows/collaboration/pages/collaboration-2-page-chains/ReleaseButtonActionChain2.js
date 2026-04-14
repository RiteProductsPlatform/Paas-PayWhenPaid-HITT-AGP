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

  class ReleaseButtonActionChain2 extends ActionChain {

    /**
     * @param {Object} context
     */
    async run(context) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;
      try {
        debugger;
        if ($variables.tableSelectedData.data.length > 0) {

          const validateHoldId = await $functions.validateHoldId($variables.tableSelectedData.data);

          if (validateHoldId) {

            const validateHoldStatus = await $functions.validateHoldStatus($variables.tableSelectedData.data);

            if (validateHoldStatus) {

              // try {

              const loadingDialogOpen = await Actions.callComponentMethod(context, {
                selector: '#loadingDialog',
                method: 'open',
              });

              const results = await ActionUtils.forEach($variables.tableSelectedData.data, async (item, index) => {

                const response2 = await Actions.callRest(context, {
                  endpoint: 'Fusion_PWP/patch11_13_18_05InvoiceHoldsHoldId',
                  uriParams: {
                    HoldId: item.hold_id,
                  },
                  body: {
                    ReleaseName: 'PWP Release',
                  },
                });
                if (!response2.ok) {
                  throw new Error(response2.body["o:errorDetails"][0].detail || 'Release Hold API Failed');
                }
                if (response2.ok) {

                  await Actions.fireNotificationEvent(context, {
                    summary: "Hold Released For Invoice Number" + item.invoice_number,
                    type: 'confirmation',
                    displayMode: 'transient',
                  });
                  let releasePayload = {
                    "P_INVOICE_ID": item.invoice_id
                  }

                  const response = await Actions.callRest(context, {
                    endpoint: 'PWP_ORDS/postPWP_AP_INVOICES_RELEASE',
                    body: releasePayload,
                    headers: {
                      'R_USER_NAME': $application.variables.user,
                      'R_PAGE_NAME': 'PWP Workbench PWP_ORDS/postPWP_AP_INVOICES_RELEASE',
                      'R_TRACE_ID': $application.variables.traceIdDisplay ? $application.variables.traceIdDisplay : '',
                    },
                  });


                } else {

                  await Actions.fireNotificationEvent(context, {
                    summary: 'Failed To Release Hold',
                    type: 'error',
                    displayMode: 'transient',
                  });

                }

              }, { mode: 'serial' });
              // } catch (error) {

              //   if ($application.variables.traceIdDisplay) {
              //     const response3 = await Actions.callRest(context, {
              //       endpoint: 'PWP_ORDS/postPWP_ORCL_REST_API',
              //       headers: {
              //         'R_TRACE_ID': $application.variables.traceIdDisplay,
              //         'R_USER_NAME': $application.variables.user,
              //         'R_PAGE_NAME': 'PWP Workbench postPWP_ORCL_REST_API ReleaseButtonActionChain2',
              //       },
              //       body: {
              //         'p_api_name': 'https://fa-etao-dev20-saasfademo1.ds-fa.oraclepdemos.com/fscmRestApi/resources/11.13.18.05/invoiceHolds/',
              //         'p_debug_message': error.message,
              //       },
              //     });
              //     await Actions.fireNotificationEvent(context, {
              //       summary: error.message,
              //       message: 'Release button -PWP workbench',
              //       displayMode: 'transient',
              //       type: 'error',
              //     });

              //   }else{
              //          await Actions.fireNotificationEvent(context, {
              //         summary: 'Failed To Release Hold',
              //         type: 'error',
              //         displayMode: 'transient',
              //       });
              //     }




              // } finally {

              //   const loadingDialogClose2 = await Actions.callComponentMethod(context, {
              //     selector: '#loadingDialog',
              //     method: 'close',
              //   });
              // }

              // await Actions.callChain(context, {
              //   chain: 'SearchBtnAction',
              // });

              const response = await Actions.callRest(context, {
                endpoint: 'PWP_ORDS/getPWP_Workbench_Search',
                uriParams: {
                  'p_ap_invoice': $variables.headers.apInvoice ? $variables.headers.apInvoice : '',
                  'p_project_number': $variables.headers.project ? $variables.headers.project : '',
                  'p_supplier_name': $variables.headers.supplier ? $variables.headers.supplier : '',
                  'p_invoice_hold': $variables.headers.hold_active ? $variables.headers.hold_active : '',
                  'P_USERNAME': $application.variables.user,
                },
              });

              const addUniqId = await $functions.addUniqId(response.body.items);

              $variables.collabration2ADP.data = addUniqId;

            } else {
              await Actions.fireNotificationEvent(context, {
                summary: 'Status Should be "Hold" For Selected Records',
                displayMode: 'transient',
                type: 'error',
              });

            }
          } else {
            await Actions.fireNotificationEvent(context, {
              summary: 'Selected Records Should have Hold Id',
              displayMode: 'transient',
              type: 'error',
            });

          }
        } else {
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





        const response3 = await Actions.callRest(context, {
          endpoint: 'PWP_ORDS/postPWP_ORCL_REST_API',
          headers: {
            'R_TRACE_ID': $application.variables.traceIdDisplay,
            'R_USER_NAME': $application.variables.user,
            'R_PAGE_NAME': 'PWP Workbench postPWP_ORCL_REST_API ReleaseButtonActionChain2',
          },
          body: {
            'p_api_name': '/fscmRestApi/resources/11.13.18.05/invoiceHolds/',
            'p_debug_message': error.message,
          },
        });

        await Actions.fireNotificationEvent(context, {
          summary: error.message,
          message: 'Release button -PWP workbench',
          displayMode: 'transient',
          type: 'error',
        });


      } finally {
        const loadingDialogClose2 = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'close',
        });
      }




    }
  }

  return ReleaseButtonActionChain2;
});
