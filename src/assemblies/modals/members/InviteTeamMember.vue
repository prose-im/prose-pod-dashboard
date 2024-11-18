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
  @close="$emit('close')"
  @confirm="onSendInvite"
  title="Invite a team member"
  buttonColor="purple"
  buttonLabel="Invite Team Member"
)
  .a-invite-team-member
    base-modal-input-block(
      v-model="inviteEmail"
      type="email"
      label="Email to Invite"
      placeholder="Enter e-mail address to invite..."
      @change="onChange"
    )

    base-modal-input-block(
      v-model="inviteUserName"
      label="Username"
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
import { Roles } from "@/api/providers/teamMembers";
import BaseAlert from "@/components/base/BaseAlert.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseModal from "@/components/base/modal/BaseModal.vue";
import BaseModalInformation from "@/components/base/modal/BaseModalInformation.vue";
import BaseModalInputBlock from "@/components/base/modal/BaseModalInputBlock.vue";
import FormSelect from "@/components/form/FormSelect.vue";

//Store
import store from "@/store";

export default {
  name: "InviteTeamMember",

  components: {
    BaseIcon,
    BaseModal,
    BaseModalInformation,
    BaseModalInputBlock,
    FormSelect,
  },

  props: {
    visibility: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["close", "proceed", "update"],

  data() {
    return {
      // --> STATE <--
      inviteEmail: "",

      inviteUserName: "",

      inviteRole: Roles.Member,

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

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
    onSendInvite(): void {
      // console.log(this.inviteEmail)
      if (!this.inviteEmail || !this.inviteUserName) {
        BaseAlert.error("Cannot send the invitation", "Please complete all the fields");
        return;
      } else {
        store.$teamMembers.sendInvitation(
          this.inviteUserName,
          this.inviteRole,
          this.inviteEmail
        );

        this.inviteEmail = "";
        this.inviteUserName = "";
        this.inviteRole = Roles.Member;

        this.$emit("close", true);
      }
    },

    onChange(value: string) {
      if (value.includes("@") && !this.inviteUserName) {
        this.inviteUserName = value.split("@")[0];
      }
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
  font-family: $font-family-default;

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
