<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
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
  title="Resend invitation"
  button-color="purple"
  button-label="Resend invitation"
  auto-visible
)
  | Resend this invitation now? An email will be delivered again.
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: STORE
import store from "@/store";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

export default {
  name: "ResendInvite",

  props: {
    invite: {
      type: Object,
      default: () => ({})
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

        // Re-send invitation
        await store.$teamMembers.resendInvitation(this.invite.id);

        // Close modal
        this.$emit("close");

        BaseAlert.success(
          "Invite sent again",
          `The invitation to ${this.invite.jid} has been sent again`
        );
      } catch (error) {
        const typedError = error as ErrorFromResponse;

        BaseAlert.error("Something went wrong", typedError);

        // Update loading status
        this.sendingRequest = false;
      }
    }
  }
};
</script>
