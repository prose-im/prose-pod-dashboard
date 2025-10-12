<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-start-init-success
  h3
    | 🎉

    base-space(
      :repeat="2"
    )

    | Congratulations!

  .c-start-init-success__text
    p Your server has been setup!
    p You will be redirected to the Dashboard now...

  span.c-start-init-success__loader
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseLoader from "@/components/base/BaseLoader.vue";

// CONSTANTS
const REDIRECT_WAIT_DELAY = 3000; // 3 seconds

export default {
  name: "StartInitSuccess",

  components: {
    BaseLoader
  },

  mounted() {
    setTimeout(
      () =>
        this.$router.push({
          name: "app"
        }),

      REDIRECT_WAIT_DELAY
    );
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-start-init-success";

#{$c} {
  text-align: center;

  h3 {
    font-size: ($font-size-baseline + 10px);
    margin: 0;
  }

  #{$c}__text {
    margin-block-start: 52px;

    p {
      color: $color-text-primary;
      font-size: ($font-size-baseline + 5px);
      margin-block: 0 20px;

      &:last-child {
        color: $color-text-secondary;
        margin-block-end: 0;
      }
    }
  }

  #{$c}__loader {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
    display: block;
    margin-inline: auto;
    margin-block-start: 86px;

    &::before {
      content: "";
      box-sizing: border-box;
      position: absolute;
      inset: 0px;
      border-radius: 50%;
      border: 3.5px solid $color-base-purple-normal;
      animation: prixClipFix 3s linear infinite;
    }
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
