<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
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
    @change="onSearchTermChange"
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
        :actions-enabled="actionsMenuEnabled"
      )

      <!-- MEMBERS -->
      members-invites-row(
        v-for="(user, index) in allMembers"
        class="c-members-invites-dashboard__users"
        :key="user.jid"
        :user-data="user"
        :actions-enabled="actionsMenuEnabled"
        @menuAction="onMenuAction"
      )
  p {{ activeModal }}

  base-navigation-footer(
    v-if="!searchTerm"
    @navFooterUpdate="onChangePage"
    listing="users"
    :page="pageNumber"
    :total="memberTotal"
  )

<!-- Modals -->
invite-team-member(
  v-if="activeModal === 'invite'"
  @close="toggleInviteModalVisible"
  :visibility="inviteModalVisibility"
)

edit-role(
  v-if="activeModal === 'editRole'"
  @close="toggleEditRoleModalVisible"
  :visibility="editRoleModalVisibility"
  :user="userToUpdate"
)

delete-member(
  v-if="activeModal === 'deleteMember'"
  @close="toggleDeleteMemberModalVisible"
  :visibility="deleteMemberModalVisibility"
  :jid="userToUpdate?.jid"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// ENUMERATIONS
enum Modals {
  // Invite Team Member Modal
  Invite = "invite",
  // Edit Role Member Modal
  EditRole = "editRole",
  //delete Member Modal
  DeleteMember = "deleteMember"
}

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import DeleteMember from "@/assemblies/modals/members/DeleteMember.vue";
import EditRole from "@/assemblies/modals/members/EditRole.vue";
import InviteTeamMember from "@/assemblies/modals/members/InviteTeamMember.vue";
import MembersInvitesRow from "@/components/members-invites/MembersInvitesRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";

// PROJECT: STORE
import store from "@/store";
import { MemberRole } from "@/api/providers/members";
import APIInvitations from "@/api/providers/invitations";

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
      activeModal: null as null | Modals,

      // --> STATES <--
      isMembersLoading: false,
      isInvitesLoading: false,

      // --> STATE <--

      inviteModalVisibility: false,
      editRoleModalVisibility: false,
      deleteMemberModalVisibility: false,

      userToUpdate: null as object | null,

      searchTerm: "",

      pageNumber: 1
    };
  },

  computed: {
    allMembers() {
      return store.$teamMembers.getAllMembers();
    },

    memberTotal() {
      const memberTotal = Number(store.$teamMembers.getMemberTotal());

      return memberTotal ? memberTotal : 1;
    },

    members() {
      return this.allMembers; //this.searchTerm
      //? store.$teamMembers.getFilteredMembers(this.searchTerm)
    },

    invites() {
      return this.searchTerm
        ? store.$teamMembers.getFilteredInviteList(this.searchTerm)
        : store.$teamMembers.getFilteredInviteList();
    },

    searchBarDisabled() {
      // Never disable the search bar: one could still search JIDs.
      return false;
    },

    actionsMenuEnabled() {
      return store.$account.getUserRole() === MemberRole.Admin;
    }
  },

  watch: {
    activeModal(newActiveModal) {
      this.inviteModalVisibility = false;
      this.editRoleModalVisibility = false;
      this.deleteMemberModalVisibility = false;

      if (newActiveModal === "invite") {
        setTimeout(() => (this.inviteModalVisibility = true), 10);
      } else if (newActiveModal === "editRole") {
        setTimeout(() => (this.editRoleModalVisibility = true), 10);
      } else if (newActiveModal === "deleteMember") {
        setTimeout(() => (this.deleteMemberModalVisibility = true), 10);
      }
    }
  },

  mounted() {
    console.log("Loading members…");
    if (this.isMembersLoading !== true) {
      // Mark as loading
      this.isMembersLoading = true;

      console.log("Loading members inside…");

      try {
        // Load already accepted members
        store.$teamMembers.loadActiveMembersByPage(true);
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
    async toggleInviteModalVisible() {
      //TODO so many cases?
      if (this.activeModal !== "invite") {
        const canInviteMembers = await APIInvitations.canInviteMember();
        switch (canInviteMembers) {
          case "forbidden":
            return BaseAlert.error("You cannot do that");
          case "missing-notifier-config":
            return BaseAlert.error(
              "The Prose Pod API is missing configuration",
              "Add `[notifier.email]` in your `Prose.toml` configuration file."
            );
          case false:
            return BaseAlert.error(
              "You cannot do that",
              "…but that might just be a bug."
            );
          case true:
            return (this.activeModal = Modals.Invite);
        }
      }

      this.activeModal = null;
    },

    toggleDeleteMemberModalVisible() {
      if (this.activeModal === "deleteMember") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.DeleteMember;
      }
    },

    toggleEditRoleModalVisible() {
      if (this.activeModal === "editRole") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.EditRole;
      }
    },

    // --> EVENT LISTENERS <--

    onChangePage(type: string) {
      if (type === "forth") {
        this.pageNumber += 1;
        store.$teamMembers.loadActiveMembersByPage(true, this.pageNumber);
      } else if (type === "back") {
        if (this.pageNumber === 1) {
          return;
        } else {
          this.pageNumber -= 1;
          store.$teamMembers.loadActiveMembersByPage(true, this.pageNumber);
        }
      }

      return;
    },

    onMenuAction(action: string, user: object) {
      console.log("action on dashboard", action, user);
      this.userToUpdate = user;

      switch (action) {
        case "Security settings": {
          break;
        }

        case "Change role": {
          this.toggleEditRoleModalVisible();
          break;
        }

        case "Delete member": {
          this.toggleDeleteMemberModalVisible();
          break;
        }

        default: {
          break;
        }
      }
    },

    onSearchTermChange() {
      if (!this.searchTerm) {
        console.log("no searchtrem");
        store.$teamMembers.loadActiveMembersByPage(true, this.pageNumber);
      } else {
        console.log("termSearch", this.searchTerm);
        store.$teamMembers.loadActiveMembersByPage(true, 1, this.searchTerm);
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
      min-height: 142px;
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
