<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-signup-form
  .c-signup-form__label
    slot

  form.c-signup-form__field-block(
    @submit.prevent="onClick"
    :class=`[
      {
        "c-signup-form__field-block--block" : formType === 'double'
      }
    ]`
  )
    form-field(
      v-model="input"
      class="c-signup-form__field"
      autofocus
      align="left"
      :placeholder="placeholder"
      size="ultra-large"
      :type="type"
    )

    form-field(
      v-if="formType === 'double'"
      v-model="secondInput"
      align="left"
      class="c-signup-form__field"
      :placeholder="secondaryPlaceholder"
      size="ultra-large"
      :type="secondaryType"
    )

    base-button(
      @click="onClick"
      class="c-signup-form__button"
      tint="purple"
      size="ultra-large"
    )
      | {{ buttonLabel }} 

      base-icon(
        name="arrow.right"
        stroke="#ffffff"
        size="15px"
      )
</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
export default {
  name: "SignupPage",

  props: {
    buttonLabel: {
      type: String,
      default: "Continue",
    },

    formType: {
      type: String,
      default: "single",
    },

    modelValue: {
      type: String,
      default: "",
    },

    secondaryInput: {
      type: String,
      default: "",
    },

    placeholder: {
      type: String,
      default: "",
    },

    secondaryPlaceholder: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      required: true,
    },

    secondaryType: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue", "updateSecondInput", "changeStep"],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    input: {
      get() {
        return this.modelValue;
      },
      set(value: string) {
        this.$emit("update:modelValue", value);
      },
    },

    secondInput: {
      get() {
        return this.secondaryInput;
      },
      set(value: string) {
        this.$emit("updateSecondInput", value);
      },
    },
  },

  methods: {
    onClick() {
      this.$emit("changeStep");
    },
  },
};
</script>

<!-- **********************************************************************
       STYLE
       ********************************************************************** -->

<style lang="scss">
$c: ".c-signup-form";

#{$c} {
  text-align: center;

  #{$c}__label {
    font-size: ($font-size-page + 3px);
    margin-block: 0 35px;
    font-weight: $font-weight-light;
  }

  #{$c}__field-block {
    display: flex;
    flex: 1 1 auto;

    &--block {
      display: block;

      #{$c}__button {
        margin-block-start: 20px;
      }
    }
  }

  #{$c}__field {
    display: flex;
    flex: 1 1 auto;
    margin-inline-end: 20px;
    margin-block-end: 12px;
  }

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
