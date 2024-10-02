<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-badge",
    "c-base-badge--" + size,
    {
      "c-base-badge--admin": admin,
    }
  ]`
)
  | {{admin?"Admin":"Member"}}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseBadge",

  props: {
    admin: {
      type: Boolean,
      default: false
    },

    size: {
      type: String,
      default: "short"
    }
  },

  data() {
    return {
      // --> STATE <--

    };
  },

  watch: {

  },

  methods: {
  }  
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-base-badge";

// VARIABLES
$badge-padding-block: 3.5px;
$badge-padding-inline: 7px;

#{$c} {
  width: fit-content;
  height: fit-content;
  padding-block: $badge-padding-block;
  padding-inline: $badge-padding-inline;
  background-color: $color-base-blue-ultra-dark;
  color:$color-white;
  font-weight:$font-weight-medium;
  font-size: ($font-size-baseline - 5.5px);
  border-radius: 5px;
  font-family: $font-family-default;

  // --> SIZES <--
  &--long {
    text-align: center;
    min-width: 36px;
  }

  // --> BOOLEANS <--
  &--admin {
    background-color: $color-base-blue-normal;
  }
  
}
</style>
