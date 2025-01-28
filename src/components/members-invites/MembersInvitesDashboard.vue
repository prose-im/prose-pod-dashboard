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
    :disabled="searchBarDisabled"
    placeholder-text="team members..."
  )
  
  .c-members-invites-dashboard__content
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
        :disabled="menuActionDisabled"
        @menuAction="onMenuAction"
      )

  base-navigation-footer(
    v-if="!searchTerm"
    @navFooterUpdate="onChangePage"
    listing="users"
    :page="pageNumber"
    :total="totalMemberNumber"
  )

<!-- Modals -->
invite-team-member(
  v-if="isInviteModalVisible"
  @close="toggleInviteModalVisible"
  :visibility="inviteModalVisibility"
)

edit-role(
  v-if="isEditRoleModalVisible"
  @close="toggleEditRoleModalVisible"
  :visibility="editRoleModalVisibility"
  :user="userToUpdate"
)

delete-member(
  v-if="isDeleteMemberModalVisible"
  @close="toggleDeleteMemberModalVisible"
  :visibility="deleteMemberModalVisibility"
  :jid="userToUpdate?.jid"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import DeleteMember from "@/assemblies/modals/members/DeleteMember.vue";
import EditRole from "@/assemblies/modals/members/EditRole.vue";
import InviteTeamMember from "@/assemblies/modals/members/InviteTeamMember.vue";
import MembersInvitesRow from "@/components/members-invites/MembersInvitesRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";

// PROJECT: STORE
import store from "@/store";
import { ROLES } from "@/api/providers/teamMembers";

export default {
  name: "MembersInvitesDashboard",

  components: {
    DeleteMember,
    EditRole,
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
    allMembers() {
      return store.$teamMembers.getAllMembers();
    },

    members() {
      return this.searchTerm
        ? store.$teamMembers.getFilteredMembers(this.searchTerm)
        : store.$teamMembers.getFilteredMembers(this.pageNumber);
    },

    enrichedMembers() {
      return store.$teamMembers.getEnrichedMemberList();
    },

    invites() {
      return this.searchTerm
        ? store.$teamMembers.getFilteredInviteList(this.searchTerm)
        : store.$teamMembers.getFilteredInviteList();
    },

    searchBarDisabled() {
      return Object.keys(this.enrichedMembers).length === 0;
    },

    totalMemberNumber() {
      return this.allMembers.length;
    },

    menuActionDisabled() {
      return store.$account.getUserRole() === ROLES.ADMIN ? false : true;
    }
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
    }
  },

  mounted() {
    console.log(`Loading memebers`);
    if (this.isMembersLoading !== true) {
      // Mark as loading
      this.isMembersLoading = true;

      console.log(`Loading memebers inside`);

      try {
        // Load already accepted members
        store.$teamMembers.loadActiveMembers(true);
      } catch (_) {
        BaseAlert.error(
          "Could not log in",
          "Check your credentials and try again"
        );
      } finally {
        this.isMembersLoading = false;
      }
    }

    if (this.isInvitesLoading !== true) {
      // Mark as loading
      this.isInvitesLoading = true;

      try {
        // Load invited members
        store.$teamMembers.loadInvitedMembers();
      } catch (_) {
        BaseAlert.error(
          "Could not log in",
          "Check your credentials and try again"
        );
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

  #{$c}__content {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;

    #{$c}__scroll {
      overflow: auto;
      flex: 1 1 0;
    }

    #{$c}__users {
      &:nth-child(even) {
        background-color: $color-base-purple-ultra-light;
      }
    }
  }
}
</style>
