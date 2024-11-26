<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
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
      "c-base-badge--admin": admin === "ADMIN",
    }
  ]`
)
  | {{ label }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseBadge",

  props: {
    admin: {
      type: String,
      default: "MEMBER",
    },

    size: {
      type: String,
      default: "short",
    },
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    label() {
      return this.admin === "ADMIN" ? "Admin" : "Member";
    },
  },

  watch: {},

  methods: {},
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
  color: $color-white;
  font-weight: $font-weight-mid;
  font-size: ($font-size-baseline - 5.5px);
  border-radius: 5px;
  font-family: $font-family-default;

  // --> SIZES <--
  &--long {
    text-align: center;
    min-width: 36px;
    font-size: 10px;
    padding-inline: ($badge-padding-inline + 3px);
  }

  // --> BOOLEANS <--
  &--admin {
    background-color: $color-base-blue-normal;
  }
}
</style>
