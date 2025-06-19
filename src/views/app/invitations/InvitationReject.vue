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
  class="v-invitation-reject"
)
  .v-invitation-reject__content(
    v-if="invitationCancelled === null"
  )
    h1
      | Cancelling this invitation…

    p.v-invitation-reject__subtitle
      | You have rejected this invitation

  .v-invitation-reject__content(
    v-else-if="invitationCancelled === true"
  )
    h1
      | 👋 Bye

    p.v-invitation-reject__subtitle
      | Unless you accepted this invitation before, all the data associated with you has been erased.

  .v-invitation-reject__content(
    v-else
  )
    h1
      | Something went wrong

    p.v-invitation-reject__subtitle
      | We could not cancel this invitation. Please contact the server admin.
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import APIInvitations from "@/api/providers/invitations";

export default {
  name: "InvitationReject",

  props: {
    token: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // --> STATE <--

      invitationCancelled: null as boolean | null
    };
  },

  async mounted() {
    try {
      await APIInvitations.rejectInvitation(this.token);
      this.invitationCancelled = true;
    } catch (_) {
      this.invitationCancelled = false;
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-invitation-reject";

#{$c} {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  text-align: center;

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
    max-width: 30em;
    margin: 5em auto;
  }
}
</style>
