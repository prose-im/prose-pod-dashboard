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
  )
    h1 
      | 👋 Welcome to Prose!

    p.v-invitation-accept__subtitle
      | Let's create your account.

    .v-invitation-accept__form
      form-field(
        v-model="nickname"
        @keyup.enter="onKeyupFirstInput"
        ref="firstFormField"
        autofocus
        align="left"
        placeholder="How should people call you?"
        size="mid-large"
        class="v-invitation-accept__field"
      )

      form-field(
        v-model="password"
        @keyup.enter="onSubmit"
        ref="secondFormField"
        align="left"
        type="password"
        placeholder="Password"
        size="mid-large"
        class="v-invitation-accept__field"
      )

      base-button(
        @click="onSubmit"
        tint="purple"
        size="mid-large"
        class="v-invitation-accept__button"
      )
        .v-invitation-accept__button--content 
          | Create my account

          base-icon(
            class="v-invitation-accept__icon"
            name="arrow.right"
            stroke="#ffffff"
            size="1em"
          )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseAlert from "@/components/base/BaseAlert.vue";
import FormField from "@/components/form/FormField.vue";
import APIInvitations, {
  InvitationTokenType,
  InvitationBasicDetails,
} from "@/api/providers/invitations";
import Store from "@/store";

export default {
  name: "InvitationAccept",

  props: {
    token: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      nickname: "",
      password: "",
      invitationDetails: null as InvitationBasicDetails | null,
      invitationExpired: null as boolean | null,
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
      this.$router.push("/invitations/reject");
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
          password: this.password,
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
      (this.$refs.firstFormField as InstanceType<
        typeof FormField
      >).unfocusFieldFromParent();
      (this.$refs.secondFormField as InstanceType<
        typeof FormField
      >).focusFieldFromParent();
    },
  },
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
  background: linear-gradient(rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.98)),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;
  overflow: auto;

  #{$c}__subtitle {
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-light;
    margin-block: 0 108px;
    color: $color-base-grey-normal;
  }

  #{$c}__content {
    text-align: center;
    max-width: 30em;
    margin-inline: auto;
    margin-block-start: 120px;
  }

  #{$c}__form {
    margin-block-start: 35px;
  }

  #{$c}__field {
    margin-block-end: 10px;
  }

  #{$c}__button {
    margin-block-start: 20px;
    width: 100%;

    &--content {
      font-size: ($font-size-page + 1px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-inline-start: 32.5px;
    }
  }

  #{$c}__icon {
    margin-inline-start: 0.5em;
  }
}
</style>
