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

  class TableSelectedChangeChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any[]} params.keys 
     * @param {any} params.selected 
     */
    async run(context, { keys, selected }) {
      const { $page, $flow, $application, $constants, $variables, $functions } = context;

      // Ensure keys is an array
      if (Array.isArray(keys)) {
        // Collect all selected project_numbers
        const selectedProjects = keys.map(key => $variables.arapdata.data[key]?.project_number).filter(Boolean);

        // Join them into a comma-separated string for display
        $variables.select_mutliple_rows_release = selectedProjects.join(', ');

        // // Notify the user with the selected project numbers
        // await Actions.fireNotificationEvent(context, {
        //   summary: `Selected Projects: ${$variables.select_mutliple_rows_release}`,
        // });

        // Debugging log
        console.log('Selected Keys:', keys);
        console.log('Selected Project Numbers:', selectedProjects);
      } else {
        // Handle single key selection (fallback)
        $variables.select_mutliple_rows_release = $variables.arapdata.data[keys]?.project_number || 'No project number';

        // await Actions.fireNotificationEvent(context, {
        //   summary: `Selected Project: ${$variables.select_mutliple_rows_release}`,
        // });
      }
      let saveData=[];
      if(selected.row.keys.all){
        saveData = $variables.collabration2ADP.data;

      }else{
        if (keys) {
          const results = await ActionUtils.forEach(keys, async (itm, indx) => {

            const results2 = await ActionUtils.forEach($variables.collabration2ADP.data, async (item, index) => {

              if (itm===item.uid) {

                saveData.push(item);
                
              }
            }, { mode: 'serial' });
          }, { mode: 'serial' });
          
        }
        
      }
      $variables.tableSelectedData.data = saveData;


    }
  }

  return TableSelectedChangeChain;
});
