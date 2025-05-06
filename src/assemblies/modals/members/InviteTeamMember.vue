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
  @confirm="onSendInvite"
  :visible="visibility"
  title="Invite a team member"
  button-color="purple"
  button-label="Invite Team Member"
  button-icon="checkmark.circle.empty"
)
  .a-invite-team-member
    base-modal-input-block(
      v-model="inviteEmail"
      @change="onChange"
      type="email"
      label="Email to Invite"
      name="email"
      placeholder="Enter e-mail address to invite..."
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
      :options="roleOptions"
      class="a-invite-team-member__select"
      position="bottom"
      min-width="200px"
      align="left"
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

// PROJECT: API
import { MemberRole, ROLES_DISPLAY_STRINGS } from "@/api/providers/members";

// PROJECT: STORE
import store from "@/store";

// PROJECT: COMMONS
import { ErrorWithMessageAndStatus } from "@/commons/errors";

export default {
  name: "InviteTeamMember",

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--

      inviteEmail: "",
      inviteUserName: "",

      inviteRole: MemberRole.Member,

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

  methods: {
    // --> EVENT LISTENERS <--

    async onSendInvite(): Promise<void> {
      // Check if all fields have been filled
      if (!this.inviteEmail || !this.inviteUserName) {
        BaseAlert.error(
          "Cannot send the invitation",
          "Please complete all the fields"
        );

        return;
      }

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

        // Reset values and close modal
        this.onClose();
      } catch (error) {
        const typedError = error as ErrorWithMessageAndStatus;

        // If member has already been invited
        if (typedError.status === 409) {
          BaseAlert.warning(
            "This username is already in use",
            "Please choose a different username"
          );
        } else {
          BaseAlert.error("Something went wrong", typedError.message);
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
      this.inviteRole = MemberRole.Member;

      // Close modal
      this.$emit("close", true);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-invite-team-member";

#{$c} {
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
