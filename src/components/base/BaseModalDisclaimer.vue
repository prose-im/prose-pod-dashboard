<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-modal-disclaimer
  .c-base-modal-disclaimer__warning
    base-icon(
      class="c-base-modal-disclaimer__icon"
      name="exclamationmark.triangle.fill"
      fill="#dd2f2f"
      height="14px"
      width="15.5px"
    )

    p
      | {{ warning }}

  .c-base-modal-disclaimer__description(
    v-if="description.length > 0"
  )
    p(
      v-for="(line, index) in description"
      :key="'line_' + index"
    )
      | {{ line }}
  </template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseModalDisclaimer",

  props: {
    warning: {
      type: String,
      required: true
    },

    description: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-disclaimer";

#{$c} {
  background-color: rgba($color-base-red-normal, 0.06);
  padding: 11px 22px;
  border-radius: 5px;
  white-space: pre-wrap;

  #{$c}__warning {
    color: $color-base-red-normal;
    font-size: ($font-size-baseline + 1px);
    font-weight: $font-weight-medium;
    margin-bottom: 7px;
    display: flex;
    align-items: center;

    #{$c}__icon {
      margin-right: 8px;
    }
  }

  #{$c}__description {
    font-weight: $font-weight-light;
    font-size: $font-size-baseline;

    p {
      margin-block-end: 12px;

      &:last-child {
        margin-block-end: 0;
      }
    }
  }

  p {
    margin: 0;
  }
}
</style>
