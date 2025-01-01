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
  title="Invite a team member"
  button-color="purple"
  button-label="Invite Team Member"
  @close="onClose"
  @confirm="onSendInvite"
)
  .a-invite-team-member
    base-modal-input-block(
      v-model="inviteEmail"
      type="email"
      label="Email to Invite"
      placeholder="Enter e-mail address to invite..."
      @change="onChange"
      autofocus
    )

    base-modal-input-block(
      v-model="inviteUserName"
      label="Username"
      placeholder="Enter an username for user..."
      type="text"
    )

    h4
      | User role

    form-select(
      v-model="inviteRole"
      class="a-invite-team-member__select"
      position="bottom"
      :options="roleOptions"
    )

    base-modal-information(
      class="a-invite-team-member__info"
      text="An email will be sent, so that the invited team member can setup their Prose account and download the Prose app within minutes."
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// TYPES
import { ROLES, Roles } from "@/api/providers/teamMembers";

//Store
import store from "@/store";

export default {
  name: "InviteTeamMember",

  props: {
    visibility: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--
      inviteEmail: "",
      inviteUserName: "",

      inviteRole: ROLES.MEMBER,

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

  computed: {},

  watch: {},

  methods: {
    // --> EVENT LISTENERS <--
    async onSendInvite(): Promise<void> {
      // Check if all fields have been filled
      if (!this.inviteEmail || !this.inviteUserName) {
        BaseAlert.error("Cannot send the invitation", "Please complete all the fields");
        return;
      } else {
        try {
          // Send invitation
          await store.$teamMembers.sendInvitation(
            this.inviteUserName,
            this.inviteRole,
            this.inviteEmail
          );

          // Reload invite list
          await store.$teamMembers.loadInvitedMembers(true);

          // Let user know the invitaion was sent
          BaseAlert.success("An invitation has been sent", "");

          //Reset values and close modal
          this.onClose();
        } catch (error: any) {
          console.error("Invite Error", error.message);

          // If member has already been invited
          if (error.status === 409) {
            BaseAlert.warning(
              "This username is already in use",
              "Please choose a different username"
            );
          }
        }
      }
    },

    onChange(value: string) {
      // Auto fill nickname from e-mail
      if (value.includes("@") && !this.inviteUserName) {
        this.inviteUserName = value.split("@")[0];
      }
    },

    onClose() {
      // Reset values
      this.inviteEmail = "";
      this.inviteUserName = "";
      this.inviteRole = ROLES.MEMBER;

      // Close modal
      this.$emit("close", true);
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-invite-team-member";

#{$c} {
  margin-inline: 48px;

  h4 {
    color: $color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-medium;
  }

  #{$c}__select {
    width: fit-content;
  }

  #{$c}__info {
    display: flex;
    align-items: center;
    font-weight: $font-weight-light;
    margin-top: 38px;
    margin-left: 9px;
  }
}
</style>
