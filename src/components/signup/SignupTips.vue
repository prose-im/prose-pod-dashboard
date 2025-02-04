<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-signup-tips
  .c-signup-tips__sidecard
    .c-signup-tips__logo
      base-icon(
        class="c-signup-tips__icon"
        name="stars"
        stroke="#ffffff"
        size="15px"
      )

      p
        | Tips

  ol.c-signup-tips__list
    li(
      v-for="tip in tips"
    )
      span(
        v-for="sentence in tip"
        :class=`[
          {
            "c-signup-tips__bold": sentence[1]
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
  name: "SignupTips",

  components: {},

  props: {
    tips: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      // --> STATES <--
    };
  },

  methods: {
    // --> EVENT LISTENERS <--
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-signup-tips";

#{$c} {
  display: flex;

  #{$c}__sidecard {
    border-right: 1px solid $color-border-primary;
  }

  #{$c}__logo {
    display: flex;
    align-items: center;
    color: $color-white;
    background-color: $color-base-purple-normal;
    width: fit-content;
    padding: 6px 8px;
    margin-inline-end: 27px;
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
    font-size: ($font-size-baseline + 2px);
    font-weight: $font-weight-light;
    line-height: ($font-size-baseline + 10px);
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
      content: counter(li) "."; /* Use the counter as content */
      counter-increment: li; /* Increment the counter by 1 */
      /* Position and style the number */
      position: absolute;
      margin-block-start: -4px;
      margin-inline-start: -26px;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 2em;
      /* Some space between the number and the content in browsers that support
         generated content but not positioning it (Camino 2 is one example) */
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

  //--> STYLE <--
  #{$c}__bold {
    font-weight: $font-weight-medium;
  }
}
</style>
