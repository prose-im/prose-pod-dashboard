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
      fill="#05c02b"
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
  color: $color-base-green-normal;
  font-size: $font-size-baseline;
  display: flex;
  align-items: center;

  #{$c}__icon {
    padding-left: 4px;
  }
}
</style>
