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
        |  Enter new role for {{ user.jid }}

      form-select(
        v-model="memberRole"
        v-click-away="closeSelectOpen"
        class="a-edit-role__select"
        position="bottom"
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
import { ROLES, Roles } from "@/api/providers/teamMembers";

export default {
  name: "EditRole",

  props: {
    user: {
      type: Object,
      default: () => ({}),
    },

    visibility: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      isSelectOpen: false,

      newRole: null as ROLES | null,

      roleOptions: [
        {
          label: Roles.Member,
          value: ROLES.MEMBER,
        },
        {
          label: Roles.Admin,
          value: ROLES.ADMIN,
        },
      ],
    };
  },

  computed: {
    memberRole: {
      get() {
        console.log("getting role", this.user.role, this.newRole);

        if (!this.newRole) {
          return this.user.role;
        } else {
          return this.newRole;
        }
      },

      set(value: ROLES) {
        console.log("set user role", value);
        this.newRole = value;
      },
    },
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
    onProceed() {
      // update only if Role has changed
      if (this.newRole && this.user.role !== this.newRole) {
        store.$teamMembers.updateRoleByMemberId(this.user.jid, this.newRole);

        // Close modal
        this.onClose();
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
    },
  },
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
