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
  title="Edit nickname of member"
  button-color="purple"
  button-label="Set new nickname"
  auto-visible
)
  vee-form(
    v-slot="{ errors, meta }"
    @submit="onProceed"
    ref="veeFormInstance"
  )
    base-modal-input-block(
      v-model="memberNickname"
      :display-error="errors?.nickname && meta.touched"
      :rules="{required: true}"
      :disabled="sendingRequest"
      error-message="This field is required"
      name="nickname"
      label="New nickname for member"
      placeholder="Enter a nickname (eg. 'John Smith')"
      type="text"
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
import { MemberNickname } from "@/api/providers/members";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

export default {
  name: "EditNickname",

  components: {
    VeeForm
  },

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--

      newNickname: "" as MemberNickname,

      sendingRequest: false
    };
  },

  computed: {
    memberNickname: {
      get() {
        if (!this.newNickname) {
          return this.user.nickname;
        }

        return this.newNickname;
      },

      set(value: MemberNickname) {
        this.newNickname = value;
      }
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    async onProceed() {
      // Update only if nickname has changed
      if (
        this.newNickname &&
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).meta.valid
      ) {
        if (this.user.nickname !== this.newNickname) {
          try {
            // Update loading status
            this.sendingRequest = true;

            await store.$teamMembers.updateNicknameByMemberId(
              this.user.jid,
              this.newNickname
            );

            BaseAlert.success(
              "Nickname edited",
              `${this.user.jid} is now ${this.newNickname}`
            );

            store.$teamMembers.updateNicknameLocally(
              this.user.jid,
              this.newNickname
            );

            // Close modal
            this.onClose();
          } catch (error) {
            const typedError = error as ErrorFromResponse;

            // Update loading status
            this.sendingRequest = false;

            BaseAlert.error(
              "Could not edit nickname",
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
      this.newNickname = "";

      // Close modal
      this.$emit("close");
    }
  }
};
</script>
