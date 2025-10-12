<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  @close="onClose"
  @confirm="onProceed"
  :disabled="sendingRequest"
  :loading="sendingRequest"
  position="center"
  title="Request password reset"
  button-color="purple"
  button-label="Send password reset"
  auto-visible
)
  | This will send a password reset link to the member. The current password will not be changed, until it is reset by the member.
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: API
import { BareJid } from "@/api/providers/global";

// PROJECT: STORE
import store from "@/store";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

export default {
  name: "ResetPassword",

  props: {
    jid: {
      type: String,
      default: null
    }
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      sendingRequest: false
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    onClose() {
      // Close modal
      this.$emit("close");
    },

    async onProceed() {
      try {
        // Update loading status
        this.sendingRequest = true;

        // Request password reset
        await store.$account.recover(this.jid as BareJid);

        // Close modal
        this.$emit("close");

        BaseAlert.success(
          "Requested password reset",
          `${this.jid} will receive an email`
        );
      } catch (error) {
        const typedError = error as ErrorFromResponse;

        // Update loading status
        this.sendingRequest = false;

        BaseAlert.error(
          "Could not reset password",
          typedError.response?.data?.message || "Unknown error"
        );
      }
    }
  }
};
</script>
