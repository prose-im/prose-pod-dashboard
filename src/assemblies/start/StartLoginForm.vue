<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.a-start-login-form
  base-prose-logo(
    class="a-start-login-form__logo"
    size="large"
  )

  form.a-start-login-form__inner(
    @submit.prevent="onSubmit"
  )
    form-field(
      v-model="form.jid"
      :disabled="loading"
      :loading="loading"
      class="a-start-login-form__field"
      type="email"
      name="jid"
      placeholder="Enter your Prose admin address…"
      size="ultra-large"
      autofocus
    )

    form-field(
      v-model="form.password"
      :disabled="loading"
      :loading="loading"
      class="a-start-login-form__field"
      type="password"
      name="password"
      placeholder="Enter your password…"
      size="ultra-large"
    )

    base-button(
      :disabled="loading"
      :loading="loading"
      class="a-start-login-form__button"
      size="ultra-large"
      type="submit"
      tint="purple"
    )
      | Access Prose server dashboard
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// INTERFACES
export interface StateForm {
  jid: string;
  password: string;
}

export default {
  name: "StartLoginForm",

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
        jid: "",
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
$c: ".a-start-login-form";

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
