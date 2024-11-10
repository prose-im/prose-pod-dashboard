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
      placeholder="Enter your Prose address…"
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

    .a-start-login-form__options
      .a-start-login-form__options-left

      .a-start-login-form__options-right
        a.a-start-login-form__options-recover
          | Forgot password?

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseProseLogo from "@/components/base/BaseProseLogo.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
import FormField from "@/components/form/FormField.vue";

// PROJECT: STORES
// import Store from "@/store";

// INTERFACES
export interface StateForm {
  jid: string;
  password: string;
}

export default {
  name: "StartLoginForm",

  components: {
    BaseButton,
    BaseProseLogo,
    FormCheckbox,
    FormField
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

  created() {
    // Populate initial values
    // this.form.jid = Store.$account.last.jid || "";
  },

  methods: {
    // --> EVENT LISTENERS <--

    onSubmit(): void {
      BaseAlert.error(
        "Account credentials are invalid",
        "Please check your password and try again"
      );
      //   this.$emit("submit", {
      //     ...this.form
      //   });
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
  font-family: $font-family-default;
  width: 100%;
  max-width: 440px;

  #{$c}__logo {
    margin-block: 0;
    margin-inline: auto;
  }

  #{$c}__inner {
    margin-block-start: 55px;
    width: 440px;

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

    #{$c}__options {
      font-size: ($font-size-baseline + 2px);
      margin-block-start: 37px;
      padding-block: 0;
      padding-inline: 12px;
      display: flex;
      align-items: center;

      #{$c}__options-left {
        flex: 1;
        padding-inline-end: 6px;
        font-weight: $font-weight-medium;
      }

      #{$c}__options-right {
        flex: 0 0 auto;
      }

      #{$c}__options-recover {
        color: $color-text-primary;
        pointer-events: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
