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

      // SelectSingleFilter emits two formats:
      //   Flat:   { op:'$eq', attribute:'field', value: val }
      //   Nested: { op:'$eq', value: { field: val } }
      // Multiple chips wrap in: { $tag:'_root_', op:'$and', criteria:[...] }
      function getVal(crit, field) {
        if (!crit) return null;
        const list = (crit.$tag === '_root_' || crit.op === '$and')
          ? (crit.criteria || [])
          : [crit];

        for (const c of list) {
          if (!c) continue;
          // Flat format: { op:'$eq', attribute:'field', value:val }
          if (c.attribute === field && c.value != null) return c.value;
          // Nested format: { op:'$eq', value:{ field: val } }
          if (c.op === '$eq' && c.value && typeof c.value === 'object' && !Array.isArray(c.value)) {
            if (c.value[field] != null) return c.value[field];
          }
        }
        return null;
      }

      // Project — field:'project_id' so SelectSingleFilter puts the numeric project_id in criterion
      const projectId = getVal(criterion, 'project_id');
      $variables.searchProjectName = projectId != null ? String(projectId) : '';
      $variables.searchselectedpnum = projectId != null ? String(projectId) : '';

      // Enable Criteria — SelectSingleFilter emits LookupCode ('Y'/'N') as value
      const enabledFlag = getVal(criterion, 'enabled_flag');
      $variables.headers_enable_Criteria = enabledFlag != null ? enabledFlag : '';

      await Actions.callChain(context, { chain: 'SearchButtonActionChain4' });
    }
  }

  return SmartSearchFilterChangedChain;
});
