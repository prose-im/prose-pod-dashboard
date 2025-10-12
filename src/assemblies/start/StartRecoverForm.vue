<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
start-access-form(
  @submit="onSubmit"
  :loading="loading"
  title="Change your account password"
  submit-label="Change my account password"
)
  template(
    v-slot="{ errors, meta }"
  )
    form-field(
      v-model="form.password"
      :disabled="loading"
      :display-error="errors?.password && meta.touched"
      :loading="loading"
      :rules="{required: true}"
      error-message="Please enter a password"
      name="password"
      placeholder="Enter a new password…"
      size="ultra-large"
      type="password"
      autofocus
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { Form as VeeForm } from "vee-validate";

// PROJECT: COMPONENTS
import StartAccessForm from "@/components/start/StartAccessForm.vue";

// INTERFACES
export interface StateForm {
  password: string;
}

export default {
  name: "StartRecoverForm",

  components: {
    VeeForm,
    StartAccessForm
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
