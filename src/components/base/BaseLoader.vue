<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->
<template lang="pug">
.c-base-loader
  .c-base-loader__animated(
    :style=`{
      width: width,
    }`
  )
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseLoader",

  components: {},

  props: {
    width: {
      type: String,
      default: "100px"
    }
  },

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
$c: ".c-base-loader";

#{$c} {
  margin-bottom: 5.5px;

  #{$c}__animated {
    height: 13.5px;
    border-radius: 7px;
    background: linear-gradient(90deg, #0001 33%, #0005 50%, #0001 66%) #f2f2f2;
    background-size: 300% 100%;
    animation: l1 1s infinite linear;
  }

  @keyframes l1 {
    0% {
      background-position: right;
    }
  }
}
</style>
