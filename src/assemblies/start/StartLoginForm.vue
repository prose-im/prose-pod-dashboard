<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
start-access-form(
  @submit="onSubmit"
  :loading="loading"
  :submit-label="submitLabel"
)
  template(
    v-slot="{ errors, meta }"
  )
    form-field(
      v-model="form.jid"
      :disabled="loading"
      :display-error="errors?.jid && meta.touched"
      :loading="loading"
      :placeholder="fieldJidPlaceholder"
      :rules="{email:true, required: true}"
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
        error-message="Please enter your password"
        name="password"
        placeholder="Enter your password…"
        size="ultra-large"
        type="password"
      )

  template(
    v-slot:options
  )
    a(
      v-if="mode === 'login'"
      @click="onNavigate('recover')"
    )
      | Lost your account password?

    a(
      v-else-if="mode === 'recover'"
      @click="onNavigate('login')"
    )
      | Go back to login
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
  mode: Mode;
  jid: string;
  password: string;
}

// TYPES
export type Mode = "login" | "recover";

export default {
  name: "StartLoginForm",

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
