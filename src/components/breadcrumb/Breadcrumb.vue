<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.c-breadcrumb
  nav.c-breadcrumb__nav
    ul.c-breadcrumb__list
      li(
        class=`[
          "c-breadcrumb__list-element"
        ]`
        v-for="(crumb, index) in breadcrumbs" 
        :key="index"
      )
        span(
        ) 
          | {{ crumb.label }} 

        base-icon(
          v-if="index !== breadcrumbs.length -1"
          class="c-breadcrumb__icon"
          name="chevron.right"
          size="11px"
          width="6.35px"
          fill="#949eb1"
        )
    base-icon(
      name="help"
      size="16px"
      fill="#949eb1"
    )
      
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from '../base/BaseIcon.vue'

export default {
  name: "Breadcrumb",

  components: {
    BaseIcon
  },

  props: {
    disclosureListClass: {
      type: String,
      default: null,
    },
  },

  emits: ["invitePeople"],

  data() {
    return {
      // --> STATE <--
      
    };
  },

  computed: {
    breadcrumbs() {
      const route = this.$route || "/dashboard/settings";
      const matchedRoutes = route.matched || "/dashboard/settings";

      console.log(route)

      return [
        {
          label: "Team Members",
          to: "/"
        },
        {
          label: "Members & Invites",
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
$c: ".c-breadcrumb";

#{$c} {

  #{$c}__nav {
    display:flex ;
    align-items: center;
    justify-content: space-between;
    padding-inline:20px;
    margin-top: 10px;
    margin-bottom: 26.5px;
    text-decoration: none;

    ul{
      display:flex;
      list-style: none;
      font-family: $font-family-default;
      font-size: $font-size-page + 7px;
      margin-block:0px;
      padding-inline:0px;

      li {
        color: $color-base-grey-normal;

            &:last-child {
              color: $color-black;
              font-weight: $font-weight-bolder;
            }
      }
    }
  }

  #{$c}__icon {
    margin-left:11.2px;
    margin-right:11.9px;
  }
  
}
</style>
