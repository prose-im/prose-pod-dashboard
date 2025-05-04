<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
base-topography(
  class="v-broken-api"
)
  .v-broken-api__content
    h1
      | Sorry, your Prose Pod is unreachable at the moment.

    span.v-broken-api__subtitle
      | Please try again later!

    base-button(
      @click="onRetryClick"
      class="v-broken-api__button"
      tint="red"
      size="large"
      icon="restore"
    )
      | Try loading again
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BrokenAPI",

  methods: {
    // --> EVENT LISTENERS <--

    onRetryClick() {
      this.$router.push({
        name: "app"
      });
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-broken-api";

#{$c} {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-align: center;

  #{$c}__content {
    max-width: 30em;
    margin: 5em auto;
  }

  h1 {
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-medium;
    margin-block: 0 17px;
  }

  #{$c}__subtitle {
    display: block;
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-light;
    color: $color-base-grey-normal;
  }

  #{$c}__button {
    margin-top: 68px;
  }
}
</style>
