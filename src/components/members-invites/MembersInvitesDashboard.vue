<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
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
    button-icon="plus.circle"
  )

  .c-members-invites-dashboard__content
    <!-- HEADERS -->

    members-invites-row(
      :user-data="{}"
      :table-headers="['User', 'Role', 'Status', 'Two-Factor']"
    )

    .c-members-invites-dashboard__scroll(
      v-if="!isMembersLoading && memberTotal"
    )
      <!-- INVITATIONS -->

      members-invites-row(
        v-if="pageNumber === 1"
        v-for="(invite, index) in invites"
        @cancel-invite-request="onCancelInviteRequest"
        :user-data="invite"
        :actions-enabled="actionsMenuEnabled"
      )

      <!-- MEMBERS -->

      members-invites-row(
        v-for="(user, index) in members"
        @menu-action="onMenuAction"
        :key="user.jid"
        :user-data="user"
        :actions-enabled="actionsMenuEnabled"
        class="c-members-invites-dashboard__users"
      )

      span.c-members-invites-dashboard__failed-search(
        v-if="searchNotFound"
      )
        | No members found

    span.c-members-invites-dashboard__failed-api(
      v-else-if="!memberTotal"
    )
      | No members here, invite some 👥
      
    base-spinner(
      v-else
      class="c-members-invites-dashboard__spinner"
    )
    
  base-navigation-footer(
    v-if="!searchTerm"
    @nav-footer-update="onChangePage"
    :page="pageNumber"
    :total="memberTotal"
    listing="users"
  )

<!-- MODALS -->
welcome-first-use(
  v-if="activeModal === 'welcome'"
  @close="toggleWelcomeModalVisible"
  :visibility="welcomeModalVisibility"
)

invite-team-member(
  v-if="activeModal === 'invite'"
  @close="toggleInviteModalVisible"
  :visibility="inviteModalVisibility"
)

cancel-invite(
  v-if="activeModal === 'cancelInvite'"
  @close="toggleCancelInviteModalVisible"
  :invite="inviteToDelete"
  :visibility="cancelInviteModalVisibility"
)

edit-role(
  v-if="activeModal === 'editRole'"
  @close="toggleEditRoleModalVisible"
  :user="userToUpdate"
  :visibility="editRoleModalVisibility"
)

delete-member(
  v-if="activeModal === 'deleteMember'"
  @close="toggleDeleteMemberModalVisible"
  :jid="userToUpdate?.jid"
  :visibility="deleteMemberModalVisibility"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import MembersInvitesRow from "@/components/members-invites/MembersInvitesRow.vue";
import SearchBar from "@/components/search/SearchBar.vue";

// PROJECT: ASSEMBLIES
import InviteTeamMember from "@/assemblies/modals/members/InviteTeamMember.vue";
import CancelInvite from "@/assemblies/modals/members/CancelInvite.vue";
import DeleteMember from "@/assemblies/modals/members/DeleteMember.vue";
import EditRole from "@/assemblies/modals/members/EditRole.vue";
import WelcomeFirstUse from "@/assemblies/modals/WelcomeFirstUse.vue";

// PROJECT: STORE
import store from "@/store";

// PROJECT: API
import { MemberRole } from "@/api/providers/members";
import APIInvitations from "@/api/providers/invitations";

// ENUMERATIONS
enum Modals {
  // Invite Team Member Modal
  Invite = "invite",
  // Invite Team Member Modal
  CancelInvite = "cancelInvite",
  // Edit Role Member Modal
  EditRole = "editRole",
  //delete Member Modal
  DeleteMember = "deleteMember",
  //delete Member Modal
  WelcomeFirstUse = "welcome"
}

export default {
  name: "MembersInvitesDashboard",

  components: {
    CancelInvite,
    DeleteMember,
    EditRole,
    InviteTeamMember,
    MembersInvitesRow,
    SearchBar,
    WelcomeFirstUse
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

      inviteModalVisibility: false,
      cancelInviteModalVisibility: false,
      editRoleModalVisibility: false,
      deleteMemberModalVisibility: false,
      welcomeModalVisibility: false,

      activeModal: null as null | Modals,
      userToUpdate: null as object | null,
      inviteToDelete: null as object | null,

      searchTerm: "",

      pageNumber: 1
    };
  },

  computed: {
    members() {
      return store.$teamMembers.getAllMembers();
    },

    memberTotal() {
      const memberTotal = Number(store.$teamMembers.getMemberTotal());

      return memberTotal ? memberTotal : 0;
    },

    searchNotFound() {
      return this.searchTerm && this.members.length === 0;
    },

    invites() {
      // TODO: revisit this
      return this.searchTerm
        ? store.$teamMembers.getFilteredInviteList(this.searchTerm)
        : store.$teamMembers.getFilteredInviteList();
    },

    searchBarDisabled() {
      return false;
    },

    actionsMenuEnabled() {
      return store.$account.getUserRole() === MemberRole.Admin;
    }
  },

  watch: {
    activeModal(newActiveModal) {
      this.inviteModalVisibility = false;
      this.cancelInviteModalVisibility = false;
      this.editRoleModalVisibility = false;
      this.deleteMemberModalVisibility = false;
      this.welcomeModalVisibility = false;

      switch (newActiveModal) {
        case "invite": {
          setTimeout(() => (this.inviteModalVisibility = true), 10);
          break;
        }
        case "cancelInvite": {
          setTimeout(() => (this.cancelInviteModalVisibility = true), 10);
          break;
        }
        case "editRole": {
          setTimeout(() => (this.editRoleModalVisibility = true), 10);
          break;
        }
        case "deleteMember": {
          setTimeout(() => (this.deleteMemberModalVisibility = true), 10);
          break;
        }
        case "welcome": {
          setTimeout(() => (this.welcomeModalVisibility = true), 10);
          break;
        }
        default: {
          break;
        }
      }
    },

    searchTerm(newTerm) {
      this.isMembersLoading = true;

      const timeout = setTimeout(() => {
        if (newTerm === this.searchTerm) {
          this.onSearchTermChange();
        } else {
          clearTimeout(timeout);
        }
      }, 500);
    }
  },

  mounted() {
    if (this.isMembersLoading !== true) {
      // Mark as loading
      this.isMembersLoading = true;

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

        //TODO: Review this

        this.toggleWelcomeModalVisible();
      }
    }
  },

  methods: {
    // --> HELPERS <--

    async toggleInviteModalVisible() {
      // TODO: so many cases?
      if (this.activeModal !== "invite") {
        const canInviteMembers = await APIInvitations.canInviteMember();

        switch (canInviteMembers) {
          case "forbidden": {
            return BaseAlert.error(
              "You cannot do that",
              "Forbidden to invite members"
            );
          }

          case "missing-notifier-config": {
            return BaseAlert.error(
              "The Prose Pod API is missing configuration",
              "Add `[notifier.email]` in your `Prose.toml` configuration file."
            );
          }

          case false: {
            return BaseAlert.error(
              "You cannot do that",
              "…but that might just be a bug!"
            );
          }

          case true: {
            return (this.activeModal = Modals.Invite);
          }
        }
      }

      this.activeModal = null;
    },

    toggleCancelInviteModalVisible() {
      if (this.activeModal !== "cancelInvite") {
        this.activeModal = Modals.CancelInvite;
      } else {
        this.activeModal = null;
        this.inviteToDelete = null;
      }
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

    toggleWelcomeModalVisible() {
      if (this.activeModal === "welcome") {
        this.activeModal = null;
      } else {
        this.activeModal = Modals.WelcomeFirstUse;
      }
    },

    // --> EVENT LISTENERS <--

    async onChangePage(type: string) {
      this.isMembersLoading = true;

      if (type === "forth") {
        this.pageNumber += 1;

        await store.$teamMembers.loadActiveMembersByPage(true, this.pageNumber);
      } else if (type === "back") {
        if (this.pageNumber === 1) {
          return;
        }

        this.pageNumber -= 1;

        await store.$teamMembers.loadActiveMembersByPage(true, this.pageNumber);
      }

      this.isMembersLoading = false;
    },

    onMenuAction(action: string, user: object) {
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
      }
    },

    async onCancelInviteRequest(inviteId: number, jid: string) {
      const canInviteMembers = await APIInvitations.canInviteMember();

      if (canInviteMembers === true) {
        this.inviteToDelete = {
          id: inviteId,
          jid
        };

        console.log("inviteToDelete =", this.inviteToDelete);

        this.toggleCancelInviteModalVisible();
      } else {
        return BaseAlert.error(
          "You cannot do that",
          "Ask an admin to do this task"
        );
      }
    },

    async onSearchTermChange() {
      if (!this.searchTerm) {
        await store.$teamMembers.loadActiveMembersByPage(true, this.pageNumber);

        this.isMembersLoading = false;
      } else {
        await store.$teamMembers.loadActiveMembersByPage(
          true,
          1,
          this.searchTerm
        );

        this.isMembersLoading = false;
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
      padding-bottom: 25px;
      overflow: auto;
      flex: 1 1 0;

      #{$c}__failed-search {
        display: flex;
        justify-content: center;
        margin-block-start: 200px;
      }
    }

    #{$c}__users {
      &:nth-child(even) {
        background-color: $color-base-purple-ultra-light;
      }
    }

    #{$c}__failed-api {
      font-size: ($font-size-baseline + 4px);
      font-weight: $font-weight-mid;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-block: 25px;
      background-color: darken($color-base-purple-ultra-light, 1.2%);
    }

    #{$c}__spinner {
      margin: 60px auto 40px;
    }
  }
}
</style>
