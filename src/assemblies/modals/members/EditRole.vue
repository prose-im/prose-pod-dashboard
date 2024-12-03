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
        |  New role for {{ user.jid }}

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
// PROJECT: COMPONENTS
import BaseModal from "@/components/base/modal/BaseModal.vue";
import FormSelect from "@/components/form/FormSelect.vue";

// STORE
import store from "@/store";

// TYPES
import { Roles } from "@/api/providers/teamMembers";

export default {
  name: "EditRole",

  components: {
    BaseModal,
    FormSelect,
  },

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

      newRole: null as Roles.Member | Roles.Admin | null,

      roleOptions: [
        {
          label: Roles.Member,
          value: Roles.Member,
        },
        {
          label: Roles.Admin,
          value: Roles.Admin,
        },
      ],
    };
  },

  computed: {
    memberRole: {
      get() {
        console.log("getting role", this.user.role, this.newRole);

        if (!this.newRole) {
          return this.user.role === "ADMIN" ? Roles.Admin : Roles.Member;
        } else {
          return this.newRole;
        }
      },

      set(value: Roles.Admin | Roles.Member) {
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
      if (this.newRole && this.user.role !== this.newRole.toUpperCase()) {
        store.$teamMembers.updateRoleByMemberId(
          this.user.jid,
          this.newRole.toUpperCase()
        );

        // Close modal
        this.$emit("close");
      } else {
        // Close modal
        this.$emit("close");
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
  //margin-inline: 25%;
  font-family: $font-family-default;

  h4 {
    color: $color-text-secondary;
    margin-top: 0px;
    margin-bottom: 20px;
    font-weight: $font-weight-medium;
  }

  #{$c}__select {
    width: fit-content;
    height: fit-content;
    margin: 0 auto;
  }

  // BOOLEANS
  &--open {
    margin-block-end: 70px;
  }
}
</style>
