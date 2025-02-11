<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
svg(
  :style="iconStyle"
  class="c-base-icon"
)
  use(
    :href="href"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: ICONS
import icons from "@/commons/icons";

// CONSTANTS
const ICON_PREFIX = "icon";

export default {
  name: "BaseIcon",

  props: {
    name: {
      type: String,
      required: true,

      validator(x: string) {
        return icons.has(`${ICON_PREFIX}-${x}`);
      }
    },

    size: {
      type: String,
      default: "18px"
    },

    width: {
      type: String,
      default: ""
    },

    fill: {
      type: String,
      default: null,

      validator(x: string) {
        return (x.startsWith("rgb(") && x.endsWith(")")) || x.startsWith("#");
      }
    },

    stroke: {
      type: String,
      default: null,

      validator(x: string) {
        return (x.startsWith("rgb(") && x.endsWith(")")) || x.startsWith("#");
      }
    }
  },

  computed: {
    href(): string {
      return `#${ICON_PREFIX}-${this.name}`;
    },

    iconStyle(): { [property: string]: string | null } {
      return {
        fill: this.fill,
        stroke: this.stroke,
        height: this.size,
        width: this.width ? this.width : this.size
      };
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-icon";

// VARIABLES
$icon-fill-default: $color-black;

#{$c} {
  fill: $icon-fill-default;

  display: inline-block;
}
</style>
