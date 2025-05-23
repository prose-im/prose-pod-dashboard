<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
   TEMPLATE
   ********************************************************************** -->

<template lang="pug">
transition(
  :enter-active-class="enterAnimation"
  :leave-active-class="leaveAnimation"
)
  .c-base-modal-container(
    v-if="containerVisible"
    :class=`[
      "c-base-modal-container--" + position,
      "c-base-modal-container--" + size
    ]`
  )
    .c-base-modal-container__upper
      .c-base-modal-container__title(
        :class=`[
          "c-base-modal-container--" + titleColor
        ]`
      )
        span.c-base-modal-container__title--text
          | {{ title }}

        span.c-base-modal-container__reload(
          v-if="reload"
          @click="onReloadClick"
        )
          span.c-base-modal-container__reload-text
            | {{ reloadText }}

          base-icon(
            class="c-base-modal-container__subtitle--right-icon"
            name="restore"
            size="8px"
            fill="#2490f0"
          )

    .c-base-modal-container__body(
      :class=`[
        {
          "c-base-modal-container--flex": flexBody
        }
      ]`
    )
      slot

    .c-base-modal-container__footer
      base-button(
        @click="onClose"
        size="large"
        tint="grey"
      )
        | {{ abortButtonText }}

      base-button(
        v-if="buttonColor !== 'grey'"
        @click="onConfirm"
        :disabled="disabled"
        :icon="buttonIcon"
        :loading="loading"
        :tint="buttonColor"
        size="large"
        type="submit"
        class="c-base-modal-container__footer--extra-button"
      )
        span(
          :class=`[
            {
              "c-base-modal-container--hidden": loading && disabled
            }
          ]`
        )
          | {{ buttonLabel }}

        span.c-base-modal-container__loader(
          v-if="loading"
        )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseModalContainer",

  props: {
    title: {
      type: String,
      required: true
    },

    titleColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
    },

    buttonColor: {
      type: String,
      default: "grey",

      validator(x: string) {
        return ["grey", "purple", "red"].includes(x);
      }
    },

    buttonLabel: {
      type: String,
      default: ""
    },

    buttonIcon: {
      type: String,
      default: null
    },

    containerVisible: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    flexBody: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    position: {
      type: String,
      default: "left",

      validator(x: string) {
        return ["center", "left"].includes(x);
      }
    },

    reload: {
      type: Boolean,
      default: false
    },

    reloadText: {
      type: String,
      default: ""
    },

    size: {
      type: String,
      default: "medium",

      validator(x: string) {
        return ["medium", "large"].includes(x);
      }
    }
  },

  emits: ["closeModal", "confirmAction", "reload"],

  computed: {
    abortButtonText() {
      return this.buttonColor === "grey" ? "Close" : "Cancel";
    },

    enterAnimation() {
      return this.position === "left"
        ? "u-animate u-animate--slide-in"
        : "u-animate u-animate--fade-in-up-small";
    },

    leaveAnimation() {
      return this.position === "left"
        ? "u-animate u-animate--slide-out"
        : "u-animate u-animate--fade-out-down-small";
    }
  },

  methods: {
    onClose(event: Event) {
      this.$emit("closeModal", event);
    },

    onConfirm(event: Event) {
      this.$emit("confirmAction", event);
    },

    onReloadClick() {
      this.$emit("reload");
    }
  }
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-container";

// VARIABLES
$inner-padding-inline: 34px;

#{$c} {
  max-width: 750px;
  background-color: $color-white;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1 1 0;

  #{$c}__upper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    flex: 1 1 0;
    max-height: 114.5px;

    #{$c}__title {
      font-weight: $font-weight-bolder;
      font-size: ($font-size-page + 6px);
      display: flex;
      justify-content: space-between;
      padding-inline: $inner-padding-inline;
      padding-bottom: 20px;

      #{$c}__reload {
        font-size: ($font-size-page - 2.5px);
        font-weight: $font-weight-mid;
        color: $color-base-blue-normal;
        cursor: pointer;

        #{$c}__reload-text {
          margin-inline-end: 5px;
        }

        &:hover {
          #{$c}__reload-text {
            text-decoration: underline;
          }
        }
      }
    }
  }

  #{$c}__body {
    font-size: ($font-size-baseline + 1px);
    line-height: ($font-size-baseline + 5px);
    overflow: auto;
    padding-inline: $inner-padding-inline;
    padding-block: 30px;
    border-block: 1px solid $color-border-secondary;
    flex: 1 1 0;
  }

  #{$c}__footer {
    background-color: $color-white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: $inner-padding-inline;
    min-height: 90px;

    &--extra-button {
      margin-left: 12px;
      position: relative;
    }
  }

  // --> POSITIONS <--

  &--center {
    max-width: 550px;
    width: 40%;
    border-radius: 9px;
    height: fit-content;

    #{$c}__title {
      padding-top: 30px;
      flex: 1 1 auto;
    }

    #{$c}__body {
      overflow: initial;
    }
  }

  // --> SIZES <--
  &--large {
    max-width: 640px;
    width: 45%;
    height: 64%;
    max-height: 600px;
    border-radius: 9px;
    margin: 20px;

    #{$c}__upper {
      display: none;
    }

    #{$c}__body {
      display: flex;
      justify-content: center;
      border-block: none;
      overflow: hidden;
      padding: 0;
    }

    #{$c}__footer {
      display: none;
    }
  }

  // --> DISPLAYS <--

  &--flex {
    display: flex;
    flex-direction: column;
  }

  &--hidden {
    visibility: hidden;
  }

  // --> COLORS <--

  &--red {
    color: $color-base-red-normal;
  }

  // --> LOADER <--

  #{$c}__loader {
    position: absolute !important;
    top: 40%;
    left: 45%;
    display: block;
    width: 12.5px;
    height: 12.5px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite;
  }

  #{$c}__loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 2px solid #fff;
    animation: prixClipFix 2s linear infinite;
  }

  // --> KEYFRAMES <--

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
}
</style>
