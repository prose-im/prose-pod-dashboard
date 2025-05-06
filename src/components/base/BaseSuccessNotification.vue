<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.c-base-success-notification
  p
    | Success

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
  name: "BaseNotification",

  props: {
    visibility: {
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
  position: fixed;
  display: flex;
  align-items: center;
  top: 5%;
  right: 15%;
  padding-right: 10px;
  font-size: $font-size-baseline;
  color: $color-base-green-normal;

  #{$c}__icon {
    padding-left: 4px;
  }
}
</style>
