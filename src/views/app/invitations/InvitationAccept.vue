<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
base-topography(
  class="v-invitation-accept"
)
  init-sidebar(
    :items="items"
    :step="currentStep"
  )

  .v-invitation-accept__content(
    v-if="!invitationExpired"
  )
    h1
      | 👋 Welcome to Prose!

    p.v-invitation-accept__subtitle
      | Let’s create your account.

    init-form(
      v-model="nickname"
      @change-step="onSubmit"
      :secondary-input="password"
      @update-second-input="onUpdateSecondInput"
      :form-visible="currentStep === 1"
      :loading="pending"
      :tips="tip"
      placeholder="How should people call you?"
      type="text"
      secondary-placeholder="Password"
      secondary-type="password"
      button-label="Create my account"
      form-type="double"
      class="v-invitation-accept__form"
    )

  .v-invitation-accept__content(
    v-else
  )
    h1
      | ✋ This invitation has expired

    p.v-invitation-reject__subtitle
      | Please contact the server admin to get a new one.
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import InitForm from "@/components/init/InitForm.vue";
import InitSidebar from "@/components/init/InitSidebar.vue";

// PROJECT: API
import APIInvitations, {
  InvitationTokenType,
  InvitationBasicDetails
} from "@/api/providers/invitations";

// PROJECT: STORE
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
      // --> STATE <--

      nickname: "",
      password: "",

      invitationDetails: null as InvitationBasicDetails | null,
      invitationExpired: null as boolean | null,

      currentStep: 1,

      pending: false,

      // --> DATA <--

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
    } catch (_) {
      this.invitationExpired = true;
    }
  },

  methods: {
    async onSubmit() {
      if (!this.invitationDetails) {
        BaseAlert.error(
          "Something went wrong",
          "This invitation has probably expired"
        );
      } else if (!this.nickname || !this.password) {
        BaseAlert.error(
          "All fields are required",
          "Please enter nickname and password"
        );
      } else if (this.pending !== true) {
        try {
          // Mark as pending
          this.pending = true;

          // Accept invitation
          await APIInvitations.acceptInvitation(this.token, {
            nickname: this.nickname,
            password: this.password
          });

          // Login
          await Store.$account.login(this.invitationDetails.jid, this.password);
        } catch (_) {
          BaseAlert.error(
            "Something went wrong",
            "We couldn’t accept this invitation"
          );

          // Not pending anymore
          this.pending = false;
        } finally {
          BaseAlert.success(
            "Account created successfully",
            "Redirecting you to the Dashboard…"
          );

          // Redirect to dashboard (after some time)
          setTimeout(
            () =>
              this.$router.push({
                name: "app"
              }),
            1_000
          );
        }
      }
    },

    // --> EVENT LISTENERS <--

    onUpdateSecondInput(value: string) {
      this.password = value;
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
  overflow: auto;

  h1 {
    font-size: ($font-size-page + 12px);
    line-height: ($font-size-page + 16px);
    font-weight: $font-weight-medium;
    margin-block: 0 17px;
  }

  #{$c}__subtitle {
    font-size: ($font-size-page + 3px);
    line-height: ($font-size-page + 6px);
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
    max-width: 440px;
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
