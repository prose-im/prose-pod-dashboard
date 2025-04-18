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
  init-sidebar(
    :items="items"
    :step="currentStep"
  )

  .v-invitation-accept__content
    h3 
      | 👋 Welcome to Prose!

    p.v-invitation-accept__subtitle
      | Let's create your account.

    init-form(
      v-model="nickname"
      @changeStep="onSubmit"
      :secondary-input="password"
      :form-visible="currentStep === 1"
      class="v-invitation-accept__form"
      
      placeholder="How should people call you?"
      type="text"

      secondary-placeholder="Password"
      secondary-type="password"

      button-label="Create my account"
      :tips="tip"
      form-type="double"
    )


</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseAlert from "@/components/base/BaseAlert.vue";
import InitForm from "@/components/init/InitForm.vue";
import InitSidebar from "@/components/init/InitSidebar.vue";
import APIInvitations, {
  InvitationTokenType,
  InvitationBasicDetails
} from "@/api/providers/invitations";
import Store from "@/store";

export default {
  name: "InvitationAccept",

  components: {
    InitForm,
    InitSidebar
  },

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
      invitationExpired: null as boolean | null,

      currentStep: 1,

      items: [
        {
          value: "Personal account",
          description: "Create your account",
          icon: "admin"
        }
      ],

      tip: {
        1: [
          ["You will be able to ", false],
          ["customize your identity or modify your password", true],
          [" later in the app.", false]
        ]
      }
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
      // this.$router.push("/invitations/reject");
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
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.98)
    ),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;
  overflow: auto;

  h1 {
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-medium;
    margin-block: 0 17px;
  }

  #{$c}__subtitle {
    font-size: ($font-size-page + 3px);
    font-weight: $font-weight-light;
    margin-block: 0 108px;
    color: $color-base-grey-normal;
  }

  #{$c}__content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-block-start: 13%;
  }

  #{$c}__form {
    max-width: 650px;
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
      justify-content: center;
      text-align: center;
    }

    &--text {
      flex: 1;
    }
  }

  #{$c}__icon {
    margin-inline-start: 0.5em;
  }
}
</style>
