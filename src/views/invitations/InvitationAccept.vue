<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-invitation-accept
  .v-invitation-accept__content(
    v-if="!invitationExpired"
  )
    h1 👋 Welcome to Prose!

    p Let’s create your account.

    .v-invitation-accept__form
      form-field(
        v-model="nickname"
        ref="firstFormField"
        autofocus
        align="left"
        placeholder="How should people call you?"
        size="mid-large"
        @keyup.enter="onKeyupFirstInput"
      )

      form-field(
        v-model="password"
        ref="secondFormField"
        align="left"
        type="password"
        placeholder="Password"
        size="mid-large"
        @keyup.enter="onSubmit"
      )

      base-button(
        @click="onSubmit"
        tint="purple"
        size="mid-large"
      )
        span Create my account

        base-icon(
          class="v-invitation-accept__icon"
          name="arrow.right"
          stroke="#ffffff"
          size="1em"
        )

  .v-invitation-accept__content(
    v-else
  )
    h1 ✋ This invitation has expired
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseAlert from "@/components/base/BaseAlert.vue";
import FormField from "@/components/form/FormField.vue";
import APIInvitations, {
  InvitationTokenType,
  InvitationBasicDetails
} from "@/api/providers/invitations";
import Store from "@/store";

export default {
  name: "InvitationAccept",

  props: {
    token: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      nickname: "",
      password: "",
      invitationDetails: null as InvitationBasicDetails | null,
      invitationExpired: null as boolean | null
    };
  },

  async mounted() {
    try {
      this.invitationDetails = await APIInvitations.getInvitationDetails(
        this.token,
        InvitationTokenType.Accept
      );
    } catch (e: any) {
      console.error(e);
      this.invitationExpired = true;
    }
  },

  methods: {
    async onSubmit() {
      if (!this.invitationDetails) {
        return BaseAlert.error(
          "Something went wrong",
          "This invitation has probably expired"
        );
      }
      if (!this.nickname || !this.password) {
        return BaseAlert.error("All fields are required");
      }

      try {
        await APIInvitations.acceptInvitation(this.token, {
          nickname: this.nickname,
          password: this.password
        });
      } catch (e: any) {
        console.error(e);
        return BaseAlert.error(
          "Something went wrong",
          "We couldn’t accept this invitation"
        );
      }

      await Store.$account.login(this.invitationDetails.jid, this.password);
      BaseAlert.success(
        "Account created successfully",
        "Redirecting you to the Dashboard…"
      );
      setTimeout(() => this.$router.push("/"), 2_000);
    },

    onKeyupFirstInput() {
      (
        this.$refs.firstFormField as InstanceType<typeof FormField>
      ).unfocusFieldFromParent();
      (
        this.$refs.secondFormField as InstanceType<typeof FormField>
      ).focusFieldFromParent();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-invitation-accept";

#{$c} {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.98)
    ),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;

  #{$c}__content {
    max-width: 30em;
    margin: 5em auto;
  }

  #{$c}__form {
    display: grid;
    gap: 0.5em;
  }

  #{$c}__icon {
    margin-inline-start: 0.5em;
  }
}
</style>
