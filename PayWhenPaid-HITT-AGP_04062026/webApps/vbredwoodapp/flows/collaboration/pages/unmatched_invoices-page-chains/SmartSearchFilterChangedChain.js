define([
  'vb/action/actionChain',
  'vb/action/actions',
], (
  ActionChain,
  Actions,
) => {
  'use strict';

  class SmartSearchFilterChangedChain extends ActionChain {

    /**
     * @param {Object} context
     * @param {Object} params
     * @param {any} params.criterion
     */
    async run(context, { criterion }) {
      const { $variables } = context;

      function getVal(crit, field) {
        if (!crit) return null;
        const list = (crit.$tag === '_root_' || crit.op === '$and') ? (crit.criteria || []) : [crit];
        for (const c of list) {
          if (!c) continue;
          if (c.attribute === field && c.value != null) return c.value;
          if (c.op === '$eq' && c.value && typeof c.value === 'object' && !Array.isArray(c.value)) {
            if (c.value[field] != null) return c.value[field];
          }
        }
        return null;
      }

      $variables.headers.project  = getVal(criterion, 'project_number');
      $variables.headers.supplier = getVal(criterion, 'supplier_name');

      await Actions.callChain(context, { chain: 'ButtonActionChain' });
    }
  }

  return SmartSearchFilterChangedChain;
});
