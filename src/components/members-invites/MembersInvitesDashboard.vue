<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-members-invites-dashboard
  .c-members-invites-dashboard__upper
    search-bar(
      :buttonLabel="label"
      :clickHandle="toggleModalVisible"
      placeholderText="team members..."
    )

    members-invites-row(
      :userData="{}"
      :tableHeaders="['User', 'Role', 'Status', 'Two-Factor']"
    )

    members-invites-row(
      v-for="(invite, index) in invites"
      :userData="invite"
    )

    members-invites-row(
      v-for="(user, index) in members"
      :key="user.name"
      :userData="user"
      class="c-members-invites-dashboard__users"
    )

  base-navigation-footer

invite-team-member(
  :visibility="modalIsVisible"
  @close="toggleModalVisible"
  @proceed="onSendInvite"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseNavigationFooter from "@/components/base/BaseNavigationFooter.vue";
import InviteTeamMember from "@/assemblies/modals/members/InviteTeamMember.vue";
import MembersInvitesRow from "@/components/members-invites/MembersInvitesRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";
import store from "@/store";

export default {
  name: "MembersInvitesDashboard",

  components: {
    BaseNavigationFooter,
    InviteTeamMember,
    MembersInvitesRow,
    SearchBar
  },

  props: {
    label: {
      type: String,
      required: true
    }
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      modalIsVisible: false,

      messagingItems: [
        {
          subtitle: "Store archives of all messages",
          description:
            "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type: "toggle"
        },
        {
          subtitle: "Message archive retention time",
          description:
            "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type: "button",
          typeProps: {
            label: "Edit details...",
            size: "medium"
          }
        },
        {
          subtitle: "Message archive retention time",
          description:
            "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type: "select",
          typeProps: {
            options: [
              {
                icon: "",
                label: "1 year"
              },
              {
                icon: "",
                label: "2 years"
              }
            ],
            size: "medium"
          }
        }
      ]
    };
  },

  computed: {
    members() {
      return store.$teamMembers.getMemberList();
    },

    invites() {
      return store.$teamMembers.getInviteList();
    }
  },

  watch: {},

  created() {},

  methods: {
    // --> EVENT LISTENERS <--
    toggleModalVisible() {
      this.modalIsVisible = !this.modalIsVisible;
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-members-invites-dashboard";

#{$c} {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  #{$c}__users {
    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }
}
</style>
