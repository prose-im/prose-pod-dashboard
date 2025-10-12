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
  title="Change recovery email of member"
  button-color="purple"
  button-label="Update recovery email"
  auto-visible
)
  vee-form(
    v-slot="{ errors, meta }"
    @submit="onProceed"
    ref="veeFormInstance"
  )
    base-modal-input-block(
      v-model="memberEmail"
      :display-error="errors?.email && meta.touched"
      :rules="{required: true, email: true}"
      :disabled="sendingRequest"
      error-message="This field is required"
      name="email"
      label="New recovery email for member"
      placeholder="Enter an email address..."
      type="email"
      autofocus
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { Form as VeeForm } from "vee-validate";

// PROJECT: STORE
import store from "@/store";

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: API
import { MemberEmail } from "@/api/providers/members";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

export default {
  name: "EditEmail",

  components: {
    VeeForm
  },

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

      oldEmail: "" as MemberEmail,
      newEmail: "" as MemberEmail,

      sendingRequest: false
    };
  },

  computed: {
    memberEmail: {
      get() {
        return !this.newEmail ? this.oldEmail : this.newEmail;
      },

      set(value: MemberEmail) {
        this.newEmail = value;
      }
    }
  },

  beforeMount() {
    // Load the email address for member
    this.loadEmail();
  },

  methods: {
    // --> HELPERS <--

    async loadEmail() {
      if (this.sendingRequest !== true) {
        this.sendingRequest = true;

        try {
          this.oldEmail = await store.$teamMembers.acquireMemberEmailById(
            this.jid
          );
        } catch {
          BaseAlert.error("Could not load email");

          // Close modal
          this.onClose();
        } finally {
          this.sendingRequest = false;
        }
      }
    },

    // --> EVENT LISTENERS <--

    async onProceed() {
      // Update only if email has changed
      if (
        this.newEmail &&
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).meta.valid
      ) {
        if (this.oldEmail !== this.newEmail) {
          try {
            // Update loading status
            this.sendingRequest = true;

            await store.$teamMembers.updateEmailByMemberId(
              this.jid,
              this.newEmail
            );

            BaseAlert.success(
              "Email changed",
              `${this.jid} has a new recovery email set`
            );

            // Close modal
            this.onClose();
          } catch (error) {
            const typedError = error as ErrorFromResponse;

            // Update loading status
            this.sendingRequest = false;

            BaseAlert.error(
              "Could not change email",
              typedError.response?.data?.message || "Unknown reason"
            );
          }
        } else {
          // Close modal
          this.onClose();
        }
      }
    },

    onClose() {
      // Reinitialize variables
      this.newEmail = "";

      // Close modal
      this.$emit("close");
    }
  }
};
</script>
