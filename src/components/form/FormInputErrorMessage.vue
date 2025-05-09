<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.c-input-error-message(
  :class=`[
    {
      "c-input-error-message__visible" :visibility
    }
  ]`
)

  .c-input-error-message__content
    base-icon(
      class="c-input-error-message__icon"
      name="exclamationmark.triangle.fill"
      fill="#dd2f2f"
      size="12px"
    )

    span
      slot
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
$c: ".c-input-error-message";

#{$c} {
  animation: appear 200ms linear;

  #{$c}__content {
    display: flex;
    align-items: center;
    padding-right: 10px;
    font-size: $font-size-baseline;
    color: $color-base-red-normal;

    #{$c}__icon {
      padding-inline-end: 4px;
    }
  }

  // --> KEYFRAMES <--

  @keyframes appear {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }

    89% {
      opacity: 0;
    }

    90% {
      transform: translateY(-10px);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</style>
