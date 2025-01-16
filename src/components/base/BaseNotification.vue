<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.c-base-notification
  p
    | Sucess

  base-icon(
    class="c-base-notification__icon"
    name="checkmark.circle.fill"
    fill="#05c02b"
    size="12px"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS

// STORE

// PACKAGES

export default {
  name: "BaseNotification",

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  methods: {
    // --> HELPERS <--
    // --> EVENT LISTENERS <--
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-notification";

#{$c} {
  position: fixed;
  display: flex;
  align-items: center;
  top: 5%;
  right: 15%;
  padding-right: 10px;
  font-size: $font-size-baseline;

  #{$c}__icon {
    padding-left: 4px;
  }
}
</style>
