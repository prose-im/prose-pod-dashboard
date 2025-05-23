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
  :visible="visibility"
  position="center"
  title="Change member's role"
  button-color="purple"
  button-label="Update role"

)
  .a-edit-role
    .a-edit-role__content(
      :class=`[
        {
          "a-edit-role--open": isSelectOpen
        }
      ]`
    )
      h4
        | Enter new role for {{ user.jid }}:

      form-select(
        v-model="memberRole"
        v-click-away="closeSelectOpen"
        class="a-edit-role__select"
        position="bottom"
        min-width="280px"
        :options="roleOptions"
        @click="toggleSelectOpen"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: STORE
import store from "@/store";

// PROJECT: API
import { MemberRole, ROLES_DISPLAY_STRINGS } from "@/api/providers/members";

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

export default {
  name: "EditRole",

  props: {
    user: {
      type: Object,
      default: () => ({})
    },

    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      isSelectOpen: false,

      newRole: null as MemberRole | null,

      sendingRequest: false,

      // --> DATA <--

      roleOptions: [
        {
          label: ROLES_DISPLAY_STRINGS[MemberRole.Member],
          value: MemberRole.Member
        },

        {
          label: ROLES_DISPLAY_STRINGS[MemberRole.Admin],
          value: MemberRole.Admin
        }
      ]
    };
  },

  computed: {
    memberRole: {
      get() {
        if (!this.newRole) {
          return this.user.role;
        }

        return this.newRole;
      },

      set(value: MemberRole) {
        this.newRole = value;
      }
    }
  },

  methods: {
    // --> HELPERS <--

    toggleSelectOpen() {
      this.isSelectOpen = !this.isSelectOpen;
    },

    closeSelectOpen() {
      this.isSelectOpen = false;
    },

    // --> EVENT LISTENERS <--

    async onProceed() {
      // Update only if role has changed
      if (this.newRole && this.user.role !== this.newRole) {
        try {
          // Update loading status
          this.sendingRequest = true;

          await store.$teamMembers.updateRoleByMemberId(
            this.user.jid,
            this.newRole
          );

          BaseAlert.success(
            "Success",
            `${this.user.jid} is now ${this.newRole.toLowerCase()}`
          );

          store.$teamMembers.updateRoleLocally(this.user.jid, this.newRole);

          // Close modal
          this.onClose();
        } catch (error) {
          const typedError = error as ErrorFromResponse;

          // Update loading status
          this.sendingRequest = false;

          if (typedError.response.data.error === "cannot_change_own_role") {
            BaseAlert.error(
              "You cannot change your own role",
              "Please ask an admin to change your role"
            );
          } else {
            BaseAlert.error(
              "Could not edit role",
              typedError.response.data.message || "Unknown reason"
            );
          }
        }
      } else {
        // Close modal
        this.onClose();
      }
    },

    onClose() {
      // Reinitialize variables
      this.newRole = null;
      this.isSelectOpen = false;

      // Close modal
      this.$emit("close");
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-edit-role";

#{$c} {
  display: flex;
  justify-content: center;
  padding-block-end: 40px;

  h4 {
    color: $color-text-secondary;
    margin-block: 0px 20px;
    font-weight: $font-weight-medium;
  }

  #{$c}__select {
    position: absolute;
    height: fit-content;
    margin: 0 auto;
    left: 0;
    right: 0;
    margin-inline: auto;
    width: fit-content;
  }
}
</style>
