<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  :visible="visibility"
  position="center"
  title="Change member's role"
  button-color="purple"
  button-label="Update role"
  @close="onClose"
  @confirm="onProceed"
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
// STORE
import store from "@/store";

// TYPES
import { MemberRole, RolesDisplayStrings } from "@/api/providers/members";
import BaseAlert from "@/components/base/BaseAlert.vue";

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

      roleOptions: [
        {
          label: RolesDisplayStrings[MemberRole.Member],
          value: MemberRole.Member
        },
        {
          label: RolesDisplayStrings[MemberRole.Admin],
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
        } else {
          return this.newRole;
        }
      },

      set(value: MemberRole) {
        this.newRole = value;
      }
    }
  },

  watch: {},

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
      // update only if Role has changed
      if (this.newRole && this.user.role !== this.newRole) {
        try {
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
        } catch (e: any) {
          if (e.response.data.message.includes("own")) {
            BaseAlert.error(
              "You cannot change your own role",
              "Please ask an admin to change your role"
            );
          } else {
            BaseAlert.error(e.response.data.message);
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
