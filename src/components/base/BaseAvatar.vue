<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-avatar"
  ]`
  :style=`{
    backgroundImage: backgroundImage,
    height: size,
    width: size,
    borderRadius: borderRadius
  }`
)
</template>

<!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseAvatar",

  props: {
    size: {
      type: String,
      default: "34px"
    },

    avatarDataUrl: {
      type: String,
      default: ""
    },

    borderRadius:{
      type: String,
      default: "5px"
    }
  },

  computed: {
    backgroundImage(): string | void {
      return `url(${this.avatarDataUrl})`;
    },
  },

  watch: {

  },

  methods: {
  }  
};
</script>

<!-- **********************************************************************
      STYLE
      ********************************************************************** -->

<style lang="scss">
$c: ".c-base-avatar";

#{$c} {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
  