<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-broken-api
  .v-broken-api__content
    h1 
      | Sorry, we're experiencing technical problems 
      
    span.v-broken-api__subtitle
      | Please try again later

    base-button(
      @click="onRetry"
      class="v-broken-api__button"
      size="medium"
      tint="purple"
    )
      p
        | Go back home
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BrokenAPI",

  methods: {
    onRetry() {
      this.$router.push("/");
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
  background: linear-gradient(
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.98)
    ),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;
  text-align: center;

  h1 {
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-medium;
    margin-block: 0 17px;
  }

  #{$c}__subtitle {
    display: block;
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-light;
    margin-block: 0 108px;
    color: $color-base-grey-normal;
  }

  #{$c}__content {
    max-width: 30em;
    margin: 5em auto;
  }
}
</style>
