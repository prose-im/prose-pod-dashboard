<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.c-base-navigation-footer
  .c-base-navigation-footer__content
    base-button(
      size="mid-medium"
      tint="white"
      :square="true"
    )
      base-icon(
        name="arrow.left"
        size="10px"
        width="11px"
        stroke="#0000ff"
      )

    p
      | 10 out of 18 total users

    base-button(
      size="mid-medium"
      tint="white"
      :square="true"
    )
      base-icon(
        name="arrow.right"
        size="10px"
        width="11px"
        stroke="#0000ff"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseButton from './BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue'

export default {
  name: "BaseNavigationFooter",

  components: {
    BaseButton,
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
    },
  },

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--

  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-navigation-footer";

#{$c} {
  padding-block: 9.5px 8.5px;
  border-top: 1px solid $color-border-secondary;

  #{$c}__content {
    color: $color-text-tertiary;
    font-family: $font-family-default;
    font-size: ($font-size-baseline - 1px);
    display: flex;
    align-items: center;
    width: fit-content;
    margin: 0 auto;

    p{
      margin-inline: 39.5px;
    }
  }
}
</style>
