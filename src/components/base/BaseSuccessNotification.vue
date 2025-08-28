<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
transition(
  enter-active-class="u-animate u-animate--fade-in-up-small u-animate--superfast"
  leave-active-class="u-animate u-animate--fade-out u-animate--fast"
)
  .c-base-success-notification(
    v-if="visible"
  )
    slot

    base-icon(
      class="c-base-success-notification__icon"
      name="checkmark.circle.fill"
      fill="#ffffff"
      size="12px"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseSuccessNotification",

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-success-notification";

#{$c} {
  background-color: darken($color-base-green-normal, 2%);
  color: $color-text-reverse;
  font-size: $font-size-baseline;
  padding: 7px 11px;
  display: flex;
  align-items: center;
  border-radius: 6px;

  #{$c}__icon {
    padding-left: 6px;
  }
}
</style>
