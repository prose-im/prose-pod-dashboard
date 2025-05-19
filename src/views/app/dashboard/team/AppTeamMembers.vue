<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-team-members
  members-invites-dashboard(
    label="Add a Team Member"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import MembersInvitesDashboard from "@/components/members-invites/MembersInvitesDashboard.vue";

export default {
  name: "AppTeamMembers",

  components: {
    MembersInvitesDashboard
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-team-members";

#{$c} {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
}
</style>
