<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE Math.random() > 0.5
     ********************************************************************** -->
<template lang="pug">
.c-base-copy-icon
  transition(
    enter-active-class="u-animate u-animate--scale-up u-animate--semifast"
  )
    .c-base-copy-icon__content
      .c-base-copy-icon__copied(
        :class=`[
          "c-base-copy-icon__content",
          "c-base-copy-icon--flex",
          {
            "c-base-copy-icon--hidden" : !isCopied,
            "c-base-copy-icon--visible" : isCopied
          }
        ]`
      )
        .c-base-copy-icon__unit
          base-icon(
            name="checkmark.circle.fill"
            fill="#05c02b"
            size="11px"
            width="10px"
          )

        .c-base-copy-icon__unit
          p
            | Copied

      .c-base-copy-icon__copy(
        :class=`[
          "c-base-copy-icon__content",
          "c-base-copy-icon--flex",
          {
            "c-base-copy-icon--hidden" : isCopied,
            "c-base-copy-icon--visible" : !isCopied
          }
        ]`
      )
        .c-base-copy-icon__unit
          base-icon(
            name="copy"
            fill="#2490f0"
            size="11px"
            width="10px"
          )

        .c-base-copy-icon__unit
          p
            | Copy
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseCopyIcon",

  props: {
    isCopied: {
      type: Boolean,
      default: false
    }
  },

  emits: ["click"]
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-copy-icon";

// VARIABLES
$inner-bordered-box-shadow-sizes: inset 0 -1px 0px 0;

#{$c} {
  width: 50px;
  color: $color-base-blue-normal;
  font-weight: $font-weight-light;
  position: relative;
  cursor: pointer;

  #{$c}__copied {
    color: $color-base-green-normal;
    font-weight: $font-weight-light;
    position: absolute;
  }

  #{$c}__unit {
    height: 16px;
    display: flex;
    align-items: center;
    p {
      margin-left: 5.5px;
      width: fit-content;
    }
  }

  &--flex {
    display: flex;
    align-items: center;
  }

  &--hidden {
    transform: scale(0);
    animation: popDown 1s linear;
    animation-fill-mode: forwards;
    //visibility: hidden;
  }

  &--visible {
    transform: scale(0);
    animation: popUp 1s linear;
    animation-fill-mode: forwards;
    //visibility: hidden;
  }

  @keyframes popDown {
    100% {
      transform: scale(0);
    }
  }

  @keyframes popUp {
    100% {
      transform: scale(1);
    }
  }
}
</style>
