<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

  <template lang="pug">
    .c-base-section-background
      slot
  </template>
  
  <!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->
  
  <script lang="ts">
  // PROJECT: COMPONENTS
  import BaseIcon from '../base/BaseIcon.vue'
  
  export default {
    name: "BaseSectionBackground",
  
    components: {
      BaseIcon
    },
  
    props: {

    },
  
    data() {
      return {
        // --> STATE <--
        
      };
    },
  
    computed: {
      breadcrumbs() {
        const route = this.$route || "/dashboard/settings";
        const matchedRoutes = route.matched || "/dashboard/settings";

        return [
          {
            label: "Server Features",
            to: "/"
          },
          {
            label: "Configuration",
            to: "/"
          },
        ]
        //- matchedRoutes.map((routeItem) => ({
        //-   label: routeItem.meta.breadcrumb || routeItem.name,
        //-   to: this.getRoutePath(route, routeItem),
        //- }));
      },
    },
  
    watch: {},
  
    created() {},
  
    methods: {
      // --> HELPERS <--
      //- getRoutePath(route, routeItem) {
      //-   const matchedSegments = route.matched.slice(0, route.matched.indexOf(routeItem) + 1);
      //-   return matchedSegments.map((segment) => segment.path).join('/');
      //- },
    },
  };
  </script>
  
  <!-- **********************************************************************
       STYLE
       ********************************************************************** -->
  
  <style lang="scss">
  $c: ".c-base-section-background";
  
  #{$c} {
    height: 100%;
    border-radius: 8px;
    border: 1px solid $color-border-secondary;
    box-shadow: 0 4px 4px 0 rgba($color-base-purple-light, 0.08);

    #{$c}__icon {
      margin-left:11.2px;
      margin-right:11.9px;
    }
    
  }
  </style>
  