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
  )
    form-field(
      v-model="form.jid"
      :disabled="loading"
      :display-error="errors?.jid && meta.touched"
      :loading="loading"
      :placeholder="fieldJidPlaceholder"
      :rules="{email:true, required: true}"
      class="a-start-login-form__field"
      error-message="Your address is required"
      name="jid"
      size="ultra-large"
      type="email"
      autofocus
    )

    template(
      v-if="mode === 'login'"
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
      | {{ submitLabel }}

    .a-start-login-form__options
      .a-start-login-form__option.a-start-login-form__option--center
        a(
          v-if="mode === 'login'"
          @click="onNavigate('recover')"
          class="a-start-login-form__navigate"
        )
          | Lost your account password?

        a(
          v-else-if="mode === 'recover'"
          @click="onNavigate('login')"
          class="a-start-login-form__navigate"
        )
          | Go back to login
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { Form as VeeForm } from "vee-validate";

// INTERFACES
export interface StateForm {
  mode: Mode;
  jid: string;
  password: string;
}

// TYPES
export type Mode = "login" | "recover";

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
      } as StateForm,

      mode: "login" as Mode
    };
  },

  computed: {
    fieldJidPlaceholder() {
      if (this.mode === "recover") {
        return "Enter your Prose account address…";
      }

      return "Enter your Prose admin address…";
    },

    submitLabel() {
      if (this.mode === "recover") {
        return "Recover my Prose account password";
      }

      return "Access Prose server dashboard";
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    onNavigate(mode: Mode): void {
      this.mode = mode;
    },

    onSubmit(): void {
      this.$emit("submit", {
        ...this.form,
        mode: this.mode
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

    #{$c}__navigate {
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    #{$c}__options {
      font-size: ($font-size-baseline + 1px);
      line-height: ($font-size-baseline + 2px);
      margin-block-start: 34px;
      column-gap: 8px;
      display: flex;
      align-items: center;

      #{$c}__option {
        &--center,
        &--left {
          flex: 1;
        }

        &--right {
          flex: 0 1 auto;
        }

        &--center {
          text-align: center;
        }
      }
    }
  }
}
</style>
