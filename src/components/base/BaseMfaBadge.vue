<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->

<template lang="pug">
.c-base-mfa-badge
  base-icon(
    class="c-base-mfa-badge__icon"
    name="padlock"
    fill="#05c02b"
    size="16px"
  )

  p(
    class="c-base-mfa-badge--light"
  )
    | Enabled
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseMfaBadge",

  props: {
    size: {
      type: String,
      default: "short"
    }
  }
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-base-mfa-badge";

#{$c} {
  display: flex;
  align-items: center;
  font-size: ($font-size-baseline - 2px);
  color: $color-base-green-normal;
  font-weight: $font-weight-light;

  #{$c}__icon {
    margin-right: 6.5px;
  }
}
</style>
