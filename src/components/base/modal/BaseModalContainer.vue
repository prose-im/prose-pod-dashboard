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
  enter-active-class="u-animate u-animate--slide-in"
  leave-active-class="u-animate u-animate--slide-out"
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
import BaseButton from "@/components/base/BaseButton.vue";

export default {
  name: "BaseModalContainer",

  components: {
    BaseButton,
  },

  props: {
    title: {
      type: String,
      required: true,
    },

    titleColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      },
    },

    buttonColor: {
      type: String,
      default: "grey",

      validator(x: string) {
        return ["grey", "purple", "red"].includes(x);
      },
    },

    buttonLabel: {
      type: String,
      default: "",
    },

    containerVisible: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    flexBody: {
      type: Boolean,
      default: false,
    },

    position: {
      type: String,
      default: "left",

      validator(x: string) {
        return ["center", "left"].includes(x);
      },
    },
  },

  emits: ["closeModal", "confirmAction"],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    buttonSize() {
      return this.position === "left" ? "mid-large" : "large";
    },

    abortButtonText() {
      return this.buttonColor === "grey" ? "Close" : "Cancel";
    },
  },

  watch: {},

  methods: {
    onClose(event: Event) {
      this.$emit("closeModal", event);
    },

    onConfirm(event: Event) {
      this.$emit("confirmAction", event);
    },
  },
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

  #{$c}__title {
    font-weight: $font-weight-bolder;
    font-family: $font-family-default;
    font-size: ($font-size-page + 6px);
    height: 9.5%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 48px;
    padding-bottom: 27.5px;
  }

  #{$c}__body {
    overflow: scroll;
    height: 73%;
    padding-top: 35.5px;
    padding-bottom: 26.5px;
    margin-inline: auto;
    border-block: 1px solid $color-border-primary;
  }

  #{$c}__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 48px;
    height: 9%;

    &--extra-button {
      margin-left: 12px;
    }
  }

  //<!-- POSITIONS -->

  &--center {
    min-width: 40%;
    border-radius: 14px;
    height: fit-content;

    #{$c}__title {
      padding-block-start: 27.5px;
    }

    #{$c}__footer {
      padding-block: 20px;
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
