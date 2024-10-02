<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
  .c-members-invites-dashboard
    search-bar(
      buttonLabel="Add Custom Emoji"
    )

    members-invites-row(
      :userData="{}"
      :tableHeaders="['User', 'Role', 'Status', 'Two-Factor']"
    )

    members-invites-row(
      :userData="invited"
    )

    members-invites-row(
      v-for="(user, index) in users"
      :key="user.name"
      :userData="user"
      class="c-members-invites-dashboard__users"
    )

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import MembersInvitesRow from './MembersInvitesRow.vue';
import SearchBar from '@/components/search/SearchBar.vue';

export default {
  name: "MembersInvitesDashboard",

  components: {
    MembersInvitesRow,
    SearchBar,
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
      ],

      users:[
        {
          name:"Baptiste Jamin",
          email:"baptiste@crisp.chat",
          picture:"https://gravatar.com/avatar/5603c33823b047149d9996a1be53afd4?size=400&default=retro&rating=g",
          admin: true,
          status:"Active",
          os:"mac OS"
        },
        {
          name:"Valerian Saliou",
          email:"valerian.saliou@crisp.chat",
          picture:"https://avatars.githubusercontent.com/u/1451907?v=4",
          admin: true,
          status:"Active",
          os:"mac OS"
        },
        {
          name:"Eliott Vincent",
          email:"eliott@crisp.chat",
          picture:"https://eliottvincent.com/assets/img/profile-pic.webp",
          admin: false,
          status:"Inactive",
          os:"Last seen active 12 days ago"
        }
      ],

      invited:{
        name:"",
        email:"valerian.saliou@crisp.chat",
        status:"Active",
        os:"mac OS"
      }
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
$c: ".c-members-invites-dashboard";

#{$c} {

  #{$c}__users {

    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }
}
</style>
