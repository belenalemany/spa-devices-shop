import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', {
  state: () => ({
    breadcrumbs: null,
  }),
  actions: {
    setBreadcrumbs(breadcrumbs) {
      this.breadcrumbs = breadcrumbs
    },
    clearBreadcrumbs() {
      this.breadcrumbs = null
    },
  },
})
