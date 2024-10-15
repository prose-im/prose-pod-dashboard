<!--
 * This file is part of prose-app-web
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
// PROJECT: COMPONENTS

export default {

  components: {
  },

  props: {
    size:{
      type: String,
      default: "15px"
    },
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      parameter: true
    };
  },

  computed: {
    
  },

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
    
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-pulse-icon";

#{$c} {
  width: 16px;
  height: 16px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  #{$c}__inner {
    position: absolute;
    width: 6px;
    height: 6px;
    border: 1.5px solid $color-base-blue-normal;
    border-radius: 5px;
    animation: 1.5s ease-out infinite 0.75s pulse;
  }

  #{$c}__outer {
    position: absolute;
    width: 6px;
    height: 6px;
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
    transform: scale(2.5, 2.5);
    border-radius: 20px;
    opacity: 0.4;
  }
}


</style>

  
  <!--          -->