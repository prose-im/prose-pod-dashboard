<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-init-success
  h3 Congratulations!

  br

  p Your server has been setup

  br

  p You will be redirected to the Dashboard

  span.c-init-success__loader
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseLoader from "@/components/base/BaseLoader.vue";

export default {
  name: "InitSuccess",

  components: {
    BaseLoader
  },

  mounted() {
    setTimeout(
      () =>
        this.$router.push({
          name: "app"
        }),

      3000
    );
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-init-success";

#{$c} {
  text-align: center;

  h3 {
    font-size: ($font-size-baseline + 10px);
  }

  p {
    font-size: ($font-size-baseline + 6px);
  }

  #{$c}__loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
    display: block;
    margin-inline: auto;
    margin-block-start: 100px;
  }

  #{$c}__loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid $color-base-purple-normal;
    animation: prixClipFix 3s linear infinite;
  }
}

//--> KEYFRAMES <--

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }

  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }

  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }

  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
