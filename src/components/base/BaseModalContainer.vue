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
      "c-base-modal-container--" + position
    ]`
  )
    .c-base-modal-container__title(
      :class=`[
        "c-base-modal-container--" + titleColor
      ]`
    )
      | {{ title }}

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
        :size="buttonSize"
        tint="grey"
        @click="onClose"
      )
        | {{ abortButtonText }}

      base-button(
        v-if="buttonColor !== 'grey'"
        class="c-base-modal-container__footer--extra-button"
        :disabled="disabled"
        :size="buttonSize"
        :tint="buttonColor"
        @click="onConfirm"
      )
        | {{ buttonLabel }}

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

    position: {
      type: String,
      default: "left",

      validator(x: string) {
        return ["center", "left"].includes(x);
      }
    }
  },

  emits: ["closeModal", "confirmAction"],

  computed: {
    abortButtonText() {
      return this.buttonColor === "grey" ? "Close" : "Cancel";
    },

    buttonSize() {
      return this.position === "left" ? "mid-large" : "large";
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

  watch: {},

  methods: {
    onClose(event: Event) {
      this.$emit("closeModal", event);
    },

    onConfirm(event: Event) {
      this.$emit("confirmAction", event);
    }
  }
};
</script>

<!-- **********************************************************************
  STYLE
  ********************************************************************** -->

<style lang="scss">
$c: ".c-base-modal-container";

#{$c} {
  max-width: 750px;
  background-color: $color-white;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  flex: 1 1 0;

  #{$c}__title {
    font-weight: $font-weight-bolder;
    font-size: ($font-size-page + 6px);
    max-height: 9.5%;
    min-height: 70px;
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 48px;
    padding-bottom: 27.5px;
  }

  #{$c}__body {
    overflow: scroll;
    max-height: 73%;
    padding-top: 35.5px;
    padding-bottom: 26.5px;
    border-block: 1px solid $color-border-primary;
    flex: 1 1 0;
  }

  #{$c}__footer {
    background-color: $color-white;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 48px;
    height: 9%;
    min-height: 70px;

    &--extra-button {
      margin-left: 12px;
    }
  }

  //<!-- POSITIONS -->

  &--center {
    max-width: 550px;
    min-width: 40%;
    border-radius: 14px;
    height: fit-content;

    #{$c}__title {
      min-height: 0;
      height: 9.5%;
      padding-block-start: 27.5px;
      flex: 1 1 auto;
    }

    #{$c}__body {
      overflow: initial;
      padding-block: 35.5px;
    }

    #{$c}__footer {
      padding-block: 20px;
      min-height: 0px;
    }
  }

  //<!-- DISPLAYS -->

  &--flex {
    display: flex;
    flex-direction: column;
  }

  //<!-- COLORS -->
  &--red {
    color: $color-base-red-normal;
  }
}
</style>
