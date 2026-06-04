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
      if ($variables.tableSelectedData_Unmatched.data.length >0) {

        const loadingDialogOpen = await Actions.callComponentMethod(context, {
          selector: '#loadingDialog',
          method: 'open',
        });

        const validateHoldId = await $functions.validateHoldId($variables.tableSelectedData_Unmatched.data);
  
        if (validateHoldId) {

          const validateHoldStatus = await $functions.validateHoldStatus($variables.tableSelectedData_Unmatched.data);

          if (validateHoldStatus) {

            const results = await ActionUtils.forEach($variables.tableSelectedData_Unmatched.data, async (item, index) => {             

                  const response2 = await Actions.callRest(context, {
                    endpoint: 'Fusion_PWP/patch11_13_18_05InvoiceHoldsHoldId',
                    uriParams: {
                      HoldId: item.hold_id,
                    },
                    body: {
                      ReleaseName: 'PWP Release',
                    },
                  });
              
                  const loadingDialogClose4 = await Actions.callComponentMethod(context, {
                    selector: '#loadingDialog',
                    method: 'close',
                  });

                  if (response2.ok) {

                    await Actions.fireNotificationEvent(context, {
                      summary: "Hold Released For Invoice Number" + item.invoice_number,
                      type: 'confirmation',
                      displayMode: 'transient',
                    });

                    let releasePayload = {
                      "P_INVOICE_ID":item.invoice_id
                    }

                const response = await Actions.callRest(context, {
                  endpoint: 'PWP_ORDS/postPWP_AP_INVOICES_RELEASE',
                  body: releasePayload,
                });

                  } else {
                    const loadingDialogClose3 = await Actions.callComponentMethod(context, {
                      selector: '#loadingDialog',
                      method: 'close',
                    });

                    await Actions.fireNotificationEvent(context, {
                      summary: 'Failed To Release Hold',
                      type: 'error',
                      displayMode: 'transient',
                    });

                  
                
              } 


            }, { mode: 'serial' });

            await Actions.callChain(context, {
              chain: 'SearchBtnAction',
            });
          }else{
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
      }else{
        await Actions.fireNotificationEvent(context, {
          summary: 'Please Select atleast One Record to Proceed',
          displayMode: 'transient',
          type: 'error',
        });
        
      }

      const loadingDialogClose = await Actions.callComponentMethod(context, {
        selector: '#loadingDialog',
        method: 'close',
      });
    }
  }

  return ReleaseButtonActionChain2;
});
