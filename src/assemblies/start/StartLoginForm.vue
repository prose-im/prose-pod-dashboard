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

  vee-form.a-start-login-form__inner(
    v-slot="{ errors, meta }"
    @submit="onSubmit"
    ref="veeFormInstance"
  )
    form-field(
      v-model="form.jid"
      :disabled="loading"
      :display-error="errors?.jid && meta.touched"
      :loading="loading"
      :rules="{email:true, required: true}"
      class="a-start-login-form__field"
      error-message="Your address is required"
      name="jid"
      placeholder="Enter your Prose admin address…"
      size="ultra-large"
      type="email"
      autofocus
    )

    form-field(
      v-model="form.password"
      :disabled="loading"
      :display-error="errors?.password && meta.touched"
      :loading="loading"
      :rules="{required: true}"
      class="a-start-login-form__field"
      error-message="Please enter your password"
      name="password"
      placeholder="Enter your password…"
      size="ultra-large"
      type="password"
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
// NPM
import { Form as VeeForm } from "vee-validate";

// INTERFACES
export interface StateForm {
  jid: string;
  password: string;
}

export default {
  name: "StartLoginForm",

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
