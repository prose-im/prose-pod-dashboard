<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.v-app-team-members
  members-invites-dashboard(
    label="Invite People"
  )

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import MembersInvitesDashboard from '@/components/members-invites/MembersInvitesDashboard.vue';

export default {
  name: "AppTeamMembers",

  components: {
    MembersInvitesDashboard,
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      messagingItems:[
        {
          subtitle:"Store archives of all messages",
          description: "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type:"toggle"
        },
        {
          subtitle: "Message archive retention time",
          description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type:"button",
          typeProps:{
            label:"Edit details...",
            size:"medium"
          }
        },
                {
          subtitle: "Message archive retention time",
          description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                label:"1 year"
              }, 
              {
                icon:"",
                label:"2 years"
              }
            ],
            size:"medium"
          }
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
  },
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
}
</style>
