<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-invitation-reject
  .v-invitation-reject__content(
    v-if="invitationCancelled === null"
  )
    h1 
      | Cancelling this invitation…

    p 
      | All of your data will be erased.

  .v-invitation-reject__content(
    v-else-if="invitationCancelled === true"
  )
    h1 
      | This invitation was cancelled by the person who send it.

    p 
      | All the data associated to you has been erased.

  .v-invitation-reject__content(
    v-else
  )
    h1 
      | ✋ This invitation has expired

    p 
      | Unless you already accepted this invitation before, all of your data has been erased.
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseAlert from "@/components/base/BaseAlert.vue";
import APIInvitations from "@/api/providers/invitations";

export default {
  name: "InvitationReject",

  props: {
    token: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      invitationCancelled: null as boolean | null,
    };
  },

  async mounted() {
    try {
      await APIInvitations.rejectInvitation(this.token);
      this.invitationCancelled = true;
    } catch (e: any) {
      console.error(e);
      BaseAlert.error("Something went wrong", "We could not cancel this invitation");
      this.invitationCancelled = false;
    }
  },
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
  overflow: hidden;
  background: linear-gradient(rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.98)),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;

  #{$c}__content {
    max-width: 30em;
    margin: 5em auto;
  }
}
</style>
