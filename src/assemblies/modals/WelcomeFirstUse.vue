<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2025, Prose Foundation
-->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
  base-modal(
    @close="$emit('close')"
    :visible="visibility"
    button-label="Add custom Emoji"
    button-icon="checkmark.circle.empty"
    position="center"
    size="large"
    title=""
  )
    .a-welcome-first-use
      .a-welcome-first-use__top
        .a-welcome-first-use__header
          h3
            | 👋

            base-space(
              :repeat="2"
            )

            | Welcome to Prose!

          span
            | Let's

          base-space

          span.a-welcome-first-use--medium
            | finish setting up

            base-space

          span
            | your server. Please follow the next steps:

        .a-welcome-first-use__list
          ul
            li(
              v-for="(step, index ) in steps"
              :class=`[
                {
                  "a-welcome-first-use__active" : (index + 1) === currentStep
                }
              ]`
            )
              .a-welcome-first-use__list--left
                .a-welcome-first-use__number
                  | {{ index + 1 }}

                .a-welcome-first-use__text
                  .a-welcome-first-use__list--main
                    | {{ step.main }}

                  .a-welcome-first-use__list--submain
                    | {{step.submain }}

              .a-welcome-first-use__done(
                v-if="(index + 1) < currentStep "
              )
                base-icon(
                  class="a-welcome-first-use__done--icon"
                  name="checkmark.circle.empty"
                  fill="#05c02b"
                  size="12px"
                )

                span
                  | Done

        img.a-welcome-first-use__img(
          src="/images/components/welcome/welcome.illustration.webp"
        )

      .a-welcome-first-use__bottom
        span(
          @click="$emit('close')"
          class="a-server-whitelist__ignore"
        )
          | Ignore this for now

        base-button(
          @click="onButtonClick"
          class="a-server-whitelist__button"
          size="large"
          tint="purple"
        )
          span
            | {{ buttonText }}

      .a-welcome-first-use__line
  </template>

<!-- **********************************************************************
        SCRIPT
        ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import AdvancedNetworkDnsTableRow from "@/components/advanced/network/AdvancedNetworkDnsTableRow.vue";

export default {
  name: "WelcomeFirstUse",

  components: {
    AdvancedNetworkDnsTableRow
  },

  props: {
    checks: {
      type: Object,
      default: () => ({})
    },

    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "onboardingAction"],

  data() {
    return {
      // --> STATE <--

      reload: true,

      steps: [
        {
          main: "Configure your DNS records",
          submain: "This allows people to connect to your Prose server.",
          button: "Configure DNS"
        },

        {
          main: "Invite your first member",
          submain: "Bring all your team with you on your Prose server.",
          button: "Invite my first member"
        }
      ]
    };
  },

  computed: {
    currentStep() {
      return this.checks?.all_dns_checks_passed_once ? 2 : 1;
    },

    buttonText() {
      return this.steps[this.currentStep - 1].button;
    }
  },

  methods: {
    // --> HELPERS <--

    onButtonClick() {
      // close this modal
      this.$emit("close");

      // ask for next action
      this.$emit(
        "onboardingAction",
        Object.keys(this.checks)[this.currentStep - 1]
      );
    }
  }
};
</script>

<!-- **********************************************************************
       STYLE
       ********************************************************************** -->

<style lang="scss">
$c: ".a-welcome-first-use";

#{$c} {
  position: relative;
  font-weight: $font-weight-light;
  width: 100%;

  #{$c}__top {
    h3 {
      color: $color-text-primary;
      font-weight: $font-weight-bolder;
      font-size: ($font-size-baseline + 6px);
      margin-block: 0 17px;
    }

    text-align: center;
    font-size: ($font-size-baseline + 3px);
    color: $color-text-tertiary;
    font-weight: $font-weight-mid;
    padding-inline: 40px;
    padding-block-start: 44px;

    #{$c}__header {
      margin-block-end: 46px;
    }
  }

  #{$c}__list {
    display: flex;
    justify-content: center;
    text-align: left;
    margin-block-end: 40px;

    ul {
      padding: 0;
      margin: 0;
      width: 98%;
      max-width: 560px;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px;
        padding: 12px 36px;
        position: relative;
        z-index: $index-foreground-primary;
      }
    }

    #{$c}__number {
      display: flex;
      flex: none;
      align-items: center;
      background-color: $color-white;
      justify-content: center;
      border: 1px $color-border-primary solid;
      border-radius: 20px;
      width: 20px;
      height: 20px;
      color: $color-base-grey-normal;
      font-size: ($font-size-page - 4px);
      font-weight: $font-weight-mid;
      margin-inline-end: 14px;
    }

    &--left {
      display: flex;
    }
    &--main {
      color: $color-base-grey-normal;
      font-size: ($font-size-page);
      font-weight: $font-weight-medium;
      margin-block-end: 7px;
    }

    &--submain {
      color: $color-text-tertiary;
      font-size: ($font-size-page - 2px);
      font-weight: $font-weight-mid;
    }

    #{$c}__done {
      display: flex;
      align-items: center;
      color: $color-base-green-normal;
      font-size: ($font-size-page - 1px);
      font-weight: $font-weight-medium;
      margin-inline-start: 10px;

      &--icon {
        margin-inline-end: 5px;
      }
    }
  }

  #{$c}__img {
    width: 100%;
    max-height: 225px;
    border-radius: 6px;
  }

  #{$c}__line {
    position: absolute;
    border: 0.5px $color-border-primary solid;
    height: 300px;
    width: 0;
    left: 92px;
    top: 160px;
    z-index: $index-foreground-quaternary;
  }

  #{$c}__bottom {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 83px;
    background-color: rgba($color-white, 0.8);
    backdrop-filter: blur(10px);
    position: absolute;
    top: calc(100% - 83px);
    width: 100%;
    z-index: $index-foreground-primary;
    padding-inline: 40px;
    font-weight: $font-weight-mid;
    font-size: ($font-size-baseline - 1px);
    cursor: pointer;
  }

  #{$c}__active {
    background-color: $color-white;
    z-index: $index-foreground-secondary;
    border: 1px $color-border-primary solid;

    #{$c}__list {
      &--main {
        color: $color-base-blue-normal;
      }

      &--submain {
        color: $color-text-secondary;
      }
    }

    #{$c}__number {
      color: $color-white;
      font-weight: $font-weight-bolder;
      background-color: $color-base-blue-normal;
      border: 1px $color-base-blue-normal solid;
    }
  }

  // --> WEIGHTS <--

  &--medium {
    color: $color-text-primary;
    font-weight: $font-weight-medium;
  }

  &--bold {
    font-weight: $font-weight-medium;
  }

  &--link {
    color: $color-base-blue-normal;
    font-weight: $font-weight-regular;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 500px) {
    li {
      padding: 12px 20px !important;
    }

    #{$c}__line {
      left: 75px;
    }
  }

  @media (max-width: 580px) {
    #{$c}__line {
      top: 180px;
    }
  }
}
</style>
