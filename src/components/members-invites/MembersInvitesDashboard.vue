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
  search-bar(
    v-model="searchTerm"
    :button-label="label"
    :click-handle="toggleInviteModalVisible"
    placeholder-text="team members..."
  )

  <!-- HEADERS -->
  members-invites-row(
    :user-data="{}"
    :table-headers="['User', 'Role', 'Status', 'Two-Factor']"
  )

  .c-members-invites-dashboard__scroll
  
    <!-- INVITATIONS -->
    members-invites-row(
      v-if="pageNumber === 1"
      v-for="(invite, index) in invites"
      :user-data="invite"
    )
    
    <!-- MEMBERS -->
    members-invites-row(
      v-for="(user, index) in members"
      class="c-members-invites-dashboard__users"
      :key="user.jid"
      :user-data="user"
      :user-enriched-data="enrichedMembers[user.jid]"
      @menuAction="onMenuAction"
    ) 

  base-navigation-footer(
    v-if="!searchTerm"
    :page="pageNumber"
    :total="totalMemberNumber"
    @navFooterUpdate="onChangePage"
  )

<!-- Modals -->
invite-team-member(
  v-if="isInviteModalVisible"
  :visibility="inviteModalVisibility"
  @close="toggleInviteModalVisible"
)

edit-role(
  v-if="isEditRoleModalVisible"
  :visibility="editRoleModalVisibility"
  :user="userToUpdate"
  @close="toggleEditRoleModalVisible"
)

delete-member(
  v-if="isDeleteMemberModalVisible" 
  :visibility="deleteMemberModalVisibility" 
  :jid="userToUpdate?.jid"
  @close="toggleDeleteMemberModalVisible"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "../base/BaseAlert.vue";
import BaseNavigationFooter from "@/components/base/BaseNavigationFooter.vue";
import DeleteMember from "@/assemblies/modals/members/DeleteMember.vue";
import EditRole from "@/assemblies/modals/members/EditRole.vue";
import InviteTeamMember from "@/assemblies/modals/members/InviteTeamMember.vue";
import MembersInvitesRow from "@/components/members-invites/MembersInvitesRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";

//STORE
import store from "@/store";

export default {
  name: "MembersInvitesDashboard",

  components: {
    BaseNavigationFooter,
    DeleteMember,
    EditRole,
    InviteTeamMember,
    MembersInvitesRow,
    SearchBar,
  },

  props: {
    label: {
      type: String,
      required: true,
    },
  },

  emits: [],

  data() {
    return {
      // --> STATES <--
      isMembersLoading: false,
      isInvitesLoading: false,

      // --> STATE <--
      isInviteModalVisible: false,

      inviteModalVisibility: false,

      isEditRoleModalVisible: false,

      editRoleModalVisibility: false,

      isDeleteMemberModalVisible: false,

      deleteMemberModalVisibility: false,

      userToUpdate: null as object | null,

      searchTerm: "",

      pageNumber: 1,

      messagingItems: [
        {
          subtitle: "Store archives of all messages",
          description:
            "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type: "toggle",
        },
        {
          subtitle: "Message archive retention time",
          description:
            "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type: "button",
          typeProps: {
            label: "Edit details...",
            size: "medium",
          },
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
                label: "1 year",
              },
              {
                icon: "",
                label: "2 years",
              },
            ],
            size: "medium",
          },
        },
      ],
    };
  },

  computed: {
    allMembers() {
      return store.$teamMembers.getAllMembers(this.pageNumber);
    },

    members() {
      console.log("getting filtered memebres");

      return this.searchTerm
        ? store.$teamMembers.getFilteredMembers(this.searchTerm)
        : store.$teamMembers.getFilteredMembers(this.pageNumber);
    },

    enrichedMembers() {
      return store.$teamMembers.getEnrichedMemberList();
    },

    invites() {
      return store.$teamMembers.getInviteList();
    },

    totalMemberNumber() {
      return this.allMembers.length;
    },
  },

  watch: {
    isInviteModalVisible(newValue) {
      setTimeout(() => (this.inviteModalVisibility = newValue), 10);
    },

    isEditRoleModalVisible(newValue) {
      setTimeout(() => (this.editRoleModalVisibility = newValue), 10);
    },

    isDeleteMemberModalVisible(newValue) {
      setTimeout(() => (this.deleteMemberModalVisibility = newValue), 10);
    },
  },

  mounted() {
    console.log(`Loading memebers`);
    if (this.isMembersLoading !== true) {
      // Mark as loading
      this.isMembersLoading = true;

      try {
        // Login to account
        store.$teamMembers.loadActiveMembers();
      } catch (_) {
        BaseAlert.error("Could not log in", "Check your credentials and try again");
      } finally {
        this.isMembersLoading = false;
      }
    }

    if (this.isInvitesLoading !== true) {
      // Mark as loading
      this.isInvitesLoading = true;

      try {
        // Login to account
        store.$teamMembers.loadInvitedMembers();
      } catch (_) {
        BaseAlert.error("Could not log in", "Check your credentials and try again");
      } finally {
        this.isInvitesLoading = false;
      }
    }
  },

  methods: {
    // <-- HELPERS -->
    toggleInviteModalVisible() {
      this.isInviteModalVisible = !this.isInviteModalVisible;
    },

    toggleDeleteMemberModalVisible() {
      this.isDeleteMemberModalVisible = !this.isDeleteMemberModalVisible;
    },

    toggleEditRoleModalVisible() {
      this.isEditRoleModalVisible = !this.isEditRoleModalVisible;
    },

    // --> EVENT LISTENERS <--

    onChangePage(type: string) {
      if (type === "forth") {
        this.pageNumber += 1;
      } else if (type === "back") {
        if (this.pageNumber === 1) {
          return;
        } else {
          this.pageNumber -= 1;
        }
      }

      return;
    },

    onMenuAction(action: string, user: object) {
      console.log("action on dashboard", action, user);
      this.userToUpdate = user;

      switch (action) {
        case "Security settings": {
          this.isDeleteMemberModalVisible = true;
          break;
        }

        case "Change role": {
          this.isEditRoleModalVisible = true;
          break;
        }

        case "Delete member": {
          this.isDeleteMemberModalVisible = true;
          break;
        }

        default: {
          break;
        }
      }
    },
  },
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

  #{$c}__scroll {
    min-height: 400px;
    flex: 1 1 0;
    overflow: scroll;
  }

  #{$c}__users {
    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }
}
</style>
