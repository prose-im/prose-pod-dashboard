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
  :disabled="!inviteUserName || sendingRequest"
  :loading="sendingRequest"
  :visible="visibility"
  title="Invite a team member"
  button-color="purple"
  button-label="Invite Team Member"
  button-icon="checkmark.circle.empty"
)
  .a-invite-team-member
    img(
      src="/images/components/illustrations/invite.member.webp"
    )

    vee-form(
      v-slot="{ errors, meta }"
      ref="veeFormInstance"
    )
      base-modal-input-block(
        v-model="inviteEmail"
        @change="onChange"
        :display-error="errors?.email && meta.touched"
        :rules="{email: true, required: true}"
        error-message="Please enter a valid email"
        label="Email to Invite"
        name="email"
        placeholder="Enter e-mail address to invite..."
        type="email"
        autofocus
      )

      base-modal-input-block(
        v-model="inviteUserName"
        :display-error="errors?.username && meta.touched"
        :rules="{ alpha_spaces: true, required: true}"
        error-message="This field is required"
        label="Username"
        name="username"
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

// PROJECT: VEE-VALIDATE
import { Form as VeeForm } from "vee-validate";

// PROJECT: API
import { MemberRole, ROLES_DISPLAY_STRINGS } from "@/api/providers/members";

// PROJECT: STORE
import store from "@/store";

// PROJECT: COMMONS
import { ErrorWithMessageAndStatus } from "@/commons/errors";

// INTERFACES
export interface InviteForm {
  email: string;
  username: string;
}

export default {
  name: "InviteTeamMember",

  components: {
    VeeForm
  },

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

  methods: {
    // --> EVENT LISTENERS <--

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
    },

    async onSendInvite() {
      if (
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).meta.valid
      ) {
        // Check if all fields have been filled
        if (!this.inviteEmail || !this.inviteUserName) {
          BaseAlert.error(
            "Cannot send the invitation",
            "Please complete all the fields"
          );

          return;
        }

        try {
          // Update loading status
          this.sendingRequest = true;

          // Send invitation
          await store.$teamMembers.sendInvitation(
            this.inviteUserName,
            this.inviteRole,
            this.inviteEmail
          );

          // Reload invite list
          await store.$teamMembers.loadInvitedMembers(true);

          // Let user know the invitation was sent
          BaseAlert.success(
            "An invitation has been sent",
            "An email has been delivered to the invitee"
          );

          // Reset values and close modal
          this.onClose();
        } catch (error) {
          const typedError = error as ErrorWithMessageAndStatus;

          // Update loading status
          this.sendingRequest = false;

          // If member has already been invited
          if (typedError.status === 409) {
            BaseAlert.warning(
              "This username is already in use",
              "Please choose a different username"
            );
          } else {
            BaseAlert.error(
              "Something went wrong",
              typedError.message || "Unknown reason"
            );
          }
        }
      } else {
        BaseAlert.error(
          "Information is invalid!",
          "Make sure that the email you entered is valid."
        );
      }
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

  img {
    display: flex;
    max-width: 62%;
    margin-inline: auto;
    margin-block: 10px 30px;
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

  /// Displays
  #{$c}__display-none {
    display: none;
  }
}
</style>
