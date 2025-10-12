<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.a-start-recover-form
  //- TODO: commonize this between recover and login

  base-prose-logo(
    class="a-start-recover-form__logo"
    size="large"
  )

  vee-form.a-start-recover-form__inner(
    v-slot="{ errors, meta }"
    @submit="onSubmit"
  )
    h1.a-start-recover-form__title
      | Change your account password

    form-field(
      v-model="form.password"
      :disabled="loading"
      :display-error="errors?.password && meta.touched"
      :loading="loading"
      :rules="{required: true}"
      class="a-start-recover-form__field"
      error-message="Please enter a password"
      name="password"
      placeholder="Enter a new password…"
      size="ultra-large"
      type="password"
      autofocus
    )

    base-button(
      :disabled="loading"
      :loading="loading"
      class="a-start-recover-form__button"
      size="ultra-large"
      type="submit"
      tint="purple"
    )
      | Change my account password
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { Form as VeeForm } from "vee-validate";

// INTERFACES
export interface StateForm {
  password: string;
}

export default {
  name: "StartRecoverForm",

  components: {
    VeeForm
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ["submit"],

  data() {
    return {
      // --> STATES <--

      form: {
        password: ""
      } as StateForm
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    onSubmit(): void {
      this.$emit("submit", {
        ...this.form
      });
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-start-recover-form";

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

    #{$c}__field,
    #{$c}__button {
      width: 100%;
      display: block;
    }

    #{$c}__field {
      margin-block-end: 10px;
    }

    #{$c}__button {
      margin-block-start: 30px;
    }
  }
}
</style>
