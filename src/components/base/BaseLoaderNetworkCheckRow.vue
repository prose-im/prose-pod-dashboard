<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->
<template lang="pug">
.c-base-loader-network-check-row(
  class="c-base-loader-network-check-row--flex"
)
  base-pulse-icon(
    class="c-base-loader-network-check-row__icon"
  )

  .c-base-loader-network-check-row__right(
    :class=`[
      "c-base-loader-network-check-row--flex",
    ]`
  )
    .c-base-loader-network-check-row__loading(
      class="c-base-loader-network-check-row__animated"
    )

    p.c-base-loader-network-check-row__status
      | Pending
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseLoaderNetworkCheckRow",

  props: {},

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  methods: {
    // <-- HELPERS -->
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-loader-network-check-row";

#{$c} {
  margin-bottom: 9px;

  #{$c}__icon {
    margin-right: 9px;
  }

  #{$c}__loading {
    width: 180px;
    height: 18px;
  }

  #{$c}__animated {
    border-radius: 7px;
    background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: l1 1s infinite linear;
  }

  #{$c}__right {
    flex: 1;
    justify-content: space-between;
  }

  #{$c}__status {
    color: $color-base-blue-normal;
    font-size: ($font-size-baseline - 2px);
  }

  &--flex {
    display: flex;
    align-items: center;
  }

  @keyframes l1 {
    0% {
      background-position: right;
    }
  }
}
</style>
