<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
  .c-base-pulse-icon
    .c-base-pulse-icon__inner
    .c-base-pulse-icon__outer
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  props: {
    size: {
      type: String,
      default: "15px"
    }
  },

  data() {
    return {
      // --> STATE <--
      parameter: true
    };
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-pulse-icon";

#{$c} {
  width: 14px;
  height: 14px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  #{$c}__inner {
    position: absolute;
    width: 5px;
    height: 5px;
    border: 1.5px solid $color-base-blue-normal;
    border-radius: 5px;
    animation: 1.5s ease-out infinite 0.75s pulse;
  }

  #{$c}__outer {
    position: absolute;
    width: 3px;
    height: 3px;
    border: 1.5px solid $color-base-blue-normal;
    border-radius: 5px;
    animation: 1.5s ease-out infinite pulse;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1, 1);
    border-radius: 5px;
    opacity: 1;
  }
  100% {
    transform: scale(1.7, 1.7);
    border-radius: 13px;
    opacity: 0.4;
  }
}
</style>
