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
    "c-base-coming-soon",
    "c-base-coming-soon--" + size,
  ]`
)
  p
    | {{ text }}
  </template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseComingSoon",

  props: {
    cases: {
      type: String,
      default: "upper",

      validator(x: string) {
        return ["lower", "upper", "mix"].includes(x);
      }
    },

    size: {
      type: String,
      default: "short"
    }
  },

  data() {
    return {
      // --> STATE <--

      label: "Coming Soon"
    };
  },

  computed: {
    text() {
      let comingSoon = "";

      switch (this.cases) {
        case "lower": {
          comingSoon = "Coming soon";

          break;
        }

        case "upper": {
          comingSoon = this.label.toUpperCase();

          break;
        }

        case "mix": {
          comingSoon = this.label;

          break;
        }
      }

      return comingSoon;
    }
  }
};
</script>

<!-- **********************************************************************
    STYLE
    ********************************************************************** -->

<style lang="scss">
$c: ".c-base-coming-soon";

// VARIABLES
$badge-padding-block: 3.5px;
$badge-padding-inline: 7px;

#{$c} {
  width: fit-content;
  height: fit-content;
  padding-block: $badge-padding-block;
  padding-inline: $badge-padding-inline;
  margin-inline-start: 10px;
  background-color: rgba($color-base-blue-normal, 0.8);
  color: $color-white;
  font-weight: $font-weight-mid;
  font-size: ($font-size-baseline - 5.5px);
  line-height: ($font-size-baseline - 1px);
  border-radius: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  p {
    margin: 0;
  }

  // --> SIZES <--

  &--long {
    text-align: center;
    min-width: 36px;
    font-size: ($font-size-baseline - 4px);
    padding-inline: ($badge-padding-inline + 3px);
  }

  &--smaller {
    text-align: center;
    min-width: 36px;
    font-size: ($font-size-baseline - 7.5px);
    font-weight: $font-weight-medium;
  }
}
</style>
