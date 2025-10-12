<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-start-init-tips
  .c-start-init-tips__sidecard
    .c-start-init-tips__logo
      base-icon(
        class="c-start-init-tips__icon"
        name="stars"
        stroke="#ffffff"
        size="15px"
      )

      p
        | Tips

  ol.c-start-init-tips__list
    li(
      v-for="tip in tips"
    )
      span(
        v-for="sentence in tip"
        :class=`[
          {
            "c-start-init-tips__bold": sentence[1]
          }
        ]`
      )
        | {{ sentence[0] === 'br' ? '' : sentence[0]  }}

        br(
          v-if="sentence[0] === 'br'"
        )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "StartInitTips",

  props: {
    tips: {
      type: Object,
      required: true
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-start-init-tips";

#{$c} {
  display: flex;
  padding-block-start: 64px;

  #{$c}__sidecard {
    border-right: 1px solid $color-border-primary;
    width: 100%;
    max-width: 90px;
    padding-block-start: 4px;
  }

  #{$c}__logo {
    display: flex;
    align-items: center;
    color: $color-white;
    background-color: $color-base-purple-normal;
    width: fit-content;
    padding: 6px 8px;
    border-radius: 4px;

    #{$c}__icon {
      margin-inline-end: 6px;
    }

    p {
      font-size: ($font-size-baseline);
      font-weight: $font-weight-medium;
      margin: 0;
    }
  }

  #{$c}__list {
    font-size: ($font-size-baseline + 1.5px);
    font-weight: $font-weight-light;
    line-height: ($font-size-baseline + 8px);
    text-align: left;
    padding-block-end: 64px;
    padding-inline-start: 54px;
    margin: 0;
    counter-reset: li;

    span {
      text-align: left;
      margin: 0;
    }

    li {
      list-style: none;
      margin-block-end: 24px;
    }

    > li:before {
      content: counter(li) ".";
      counter-increment: li;
      position: absolute;
      margin-block-start: -4px;
      margin-inline-start: -26px;
      box-sizing: border-box;
      width: 2em;
      padding: 4px;
      font-size: ($font-size-baseline + 2px);
      font-weight: $font-weight-bolder;
      font-family: $font-family-default;
      text-align: center;
    }

    li:last-child {
      margin-bottom: 0;
    }
  }

  #{$c}__bold {
    font-weight: $font-weight-medium;
  }
}
</style>
