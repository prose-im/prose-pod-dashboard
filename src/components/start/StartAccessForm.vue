<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.c-start-access-form
  base-prose-logo(
    class="c-start-access-form__logo"
    size="large"
  )

  vee-form.c-start-access-form__inner(
    v-slot="{ errors, meta }"
    @submit="onSubmit"
  )
    h1.c-start-access-form__title(
      v-if="title"
    )
      | {{ title }}

    .c-start-access-form__fields
      slot(
        :errors="errors"
        :meta="meta"
      )

    base-button(
      :disabled="loading"
      :loading="loading"
      class="c-start-access-form__button"
      size="ultra-large"
      type="submit"
      tint="purple"
    )
      | {{ submitLabel }}

    .c-start-access-form__options(
      v-if="$slots.options"
    )
      slot(
        name="options"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { Form as VeeForm } from "vee-validate";

export default {
  name: "StartAccessForm",

  components: {
    VeeForm
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },

    submitLabel: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  emits: ["submit"],

  methods: {
    // --> EVENT LISTENERS <--

    onSubmit(): void {
      this.$emit("submit");
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-start-access-form";

#{$c} {
  width: 100%;

  #{$c}__logo,
  #{$c}__inner {
    margin-inline: auto;
  }

  #{$c}__logo {
    margin-block: 0;
  }

  #{$c}__inner {
    margin-block-start: 55px;
    max-width: 440px;

    #{$c}__title {
      color: $color-text-primary;
      font-size: ($font-size-baseline + 9px);
      line-height: ($font-size-baseline + 13px);
      text-align: center;
      margin-block-end: 28px;
    }

    #{$c}__fields,
    #{$c}__fields > *,
    #{$c}__button {
      width: 100%;
      display: block;
    }

    #{$c}__fields {
      > * {
        margin-block-end: 10px;
      }
    }

    #{$c}__button {
      margin-block-start: 30px;
    }

    #{$c}__navigate {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    #{$c}__options {
      font-size: ($font-size-baseline + 1px);
      line-height: ($font-size-baseline + 2px);
      text-align: center;
      margin-block-start: 34px;

      a {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
