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
  p.c-signup-form__label
    | {{ label }}

  .c-signup-form__field-block
    form-field(
      v-model="input"
      class="c-signup-form__field"
      size="ultra-large"
    )

    base-button(
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
    label: {
      type: String,
      required: true
    },

    buttonLabel: {
      type: String,
      default: "Continue"
    }
  },

  data() {
    return {
      // --> STATE <--
      input: ""
    };
  },

  computed: {}
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
  }

  #{$c}__field {
    display: flex;
    flex: 1 1 auto;
    margin-inline-end: 20px;
  }

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
