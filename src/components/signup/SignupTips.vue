<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-signup-tips
  .c-signup-tips__sidecard
    .c-signup-tips__logo
      base-icon(
        class="c-signup-tips__icon"
        name="stars"
        stroke="#ffffff"
        size="15px"
      )

      p
        | Tips

  ol.c-signup-tips__list
    slot
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "SignupTips",

  components: {},

  props: {
    tips: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      // --> STATES <--
    };
  },

  computed: {
    tipToDisplay() {}
  },

  methods: {
    // --> EVENT LISTENERS <--
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-signup-tips";

#{$c} {
  display: flex;

  #{$c}__sidecard {
    border-right: 1px solid $color-border-primary;
  }

  #{$c}__logo {
    display: flex;
    align-items: center;
    color: $color-white;
    background-color: $color-base-purple-normal;
    width: fit-content;
    padding: 6px 8px;
    margin-inline-end: 27px;
    border-radius: 4px;

    #{$c}__icon {
      margin-inline-end: 6px;
    }

    p {
      font-size: ($font-size-baseline);
      font-weight: $font-weight-medium;
      margin: 0;
    }
  }

  #{$c}__list {
    font-size: $font-size-baseline;
    font-weight: $font-weight-light;
    line-height: ($font-size-baseline + 10px);
    text-align: left;
    padding-block-end: 64px;
    margin: 0;

    span {
      text-align: left;
      margin: 0;
    }
  }
}
</style>
