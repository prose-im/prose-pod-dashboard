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
  <!-- NORMAL DASHBOARD -->
  .c-members-invites-dashboard__content(
    v-if="memberTotal"
  )
    search-bar(
      v-model="searchTerm"
      :button-label="label"
      :click-handle="showInviteModal"
      :disabled="searchBarDisabled"
      placeholder-text="team members..."
      button-icon="plus.circle"
    )

    .c-members-invites-dashboard__content
      <!-- HEADERS -->

      members-invites-row(
        :user-data="{}"
        :table-headers="['User', 'Role', 'Status']"
      )

      .c-members-invites-dashboard__scroll(
        v-if="!isMembersLoading"
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

      <!-- MEMBER LOADING SPINNER -->
      base-spinner(
        v-if="searchTerm && isMembersLoading"
        class="c-members-invites-dashboard__spinner"
      )

    base-navigation-footer(
      v-if="!searchTerm"
      @nav-footer-update="onChangePage"
      :page="pageNumber"
      :total="memberTotal"
      listing="users"
    )

  <!-- EMPRTY DASHBOARD -->
  .c-members-invites-dashboard__empty(
    v-else-if="!isMembersLoading && !memberTotal"
  )
    img(
      src="/images/components/illustrations/empty.members.webp"
    )

    span.c-members-invites-dashboard__title
      | Looking a bit empty around here

    span.c-members-invites-dashboard__subtitle
      | It looks like you're all alone in your workspace, get started by inviting your team members.

    base-button(
      @click="showInviteModal"
      class="a-server-whitelist__button"
      size="large"
      tint="purple"
    )
      | Invite People

<!-- MODALS -->
welcome-first-use(
  v-if="activeModal === modals.WelcomeFirstUse"
  @close="onModalClose"
  @onboarding-action="onOnboardingAction"
  :checks="onboardingStatus"
)

invite-team-member(
  v-if="activeModal === modals.Invite"
  @close="onModalClose"
)

cancel-invite(
  v-if="activeModal === modals.CancelInvite"
  @close="onModalClose"
  :invite="inviteToDelete"
)

edit-role(
  v-if="activeModal === modals.EditRole"
  @close="onModalClose"
  :user="userToUpdate"
)

edit-nickname(
  v-if="activeModal === modals.EditNickname"
  @close="onModalClose"
  :user="userToUpdate"
)

edit-email(
  v-if="activeModal === modals.EditEmail"
  @close="onModalClose"
  :jid="userToUpdate?.jid"
)

reset-password(
  v-if="activeModal === modals.ResetPassword"
  @close="onModalClose"
  :jid="userToUpdate?.jid"
)

delete-member(
  v-if="activeModal === modals.DeleteMember"
  @close="onModalClose"
  :jid="userToUpdate?.jid"
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
import EditNickname from "@/assemblies/modals/members/EditNickname.vue";
import EditEmail from "@/assemblies/modals/members/EditEmail.vue";
import ResetPassword from "@/assemblies/modals/members/ResetPassword.vue";
import WelcomeFirstUse from "@/assemblies/modals/WelcomeFirstUse.vue";

// PROJECT: STORE
import store from "@/store";

// PROJECT: API
import { MemberRole } from "@/api/providers/members";
import APIInvitations from "@/api/providers/invitations";
import { OnboardingChecks } from "@/store/tables/account";

// ENUMERATIONS
enum Modals {
  // Invite Team Member Modal
  Invite = "invite",
  // Invite Team Member Modal
  CancelInvite = "cancelInvite",
  // Edit Role Modal
  EditRole = "editRole",
  // Edit Nickname Modal
  EditNickname = "editNickname",
  // Edit Email Modal
  EditEmail = "editEmail",
  // Reset Password Modal
  ResetPassword = "resetPassword",
  // Delete Member Modal
  DeleteMember = "deleteMember",
  // Welcome First Use Modal
  WelcomeFirstUse = "welcome"
}

export default {
  name: "MembersInvitesDashboard",

  components: {
    CancelInvite,
    DeleteMember,
    EditRole,
    EditNickname,
    EditEmail,
    ResetPassword,
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
      // --> DATA <--

      modals: Modals,

      // --> STATES <--

      onboardingStatus: null as OnboardingChecks | null,

      isMembersLoading: false,
      isInvitesLoading: false,

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
      return store.$teamMembers.getFilteredInviteList(
        this.searchTerm || undefined
      );
    },

    searchBarDisabled() {
      return false;
    },

    actionsMenuEnabled() {
      return store.$account.getUserRole() === MemberRole.Admin;
    }
  },

  watch: {
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

  async mounted() {
    try {
      await store.$account.loadOnboardingStatus();

      this.onboardingStatus = store.$account.getOnboardingStatus();

      if (
        !this.onboardingStatus.all_dns_checks_passed_once ||
        !this.onboardingStatus.at_least_one_invitation_sent
      ) {
        this.activeModal = Modals.WelcomeFirstUse;
      }
    } catch (_) {
      BaseAlert.error(
        "Could not log in",
        "Check your credentials and try again"
      );
    }

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
      }
    }
  },

  methods: {
    // --> HELPERS <--

    async showInviteModal() {
      const canInviteMembers = await APIInvitations.canInviteMember();

      switch (canInviteMembers) {
        case "forbidden": {
          BaseAlert.error("You cannot do that", "Forbidden to invite members");

          break;
        }

        case "missing-notifier-config": {
          BaseAlert.error(
            "The Prose Pod API is missing configuration",
            "Add `[notifier.email]` in your `Prose.toml` configuration file."
          );

          break;
        }

        case false: {
          BaseAlert.error(
            "You cannot do that",
            "…but that might just be a bug!"
          );

          break;
        }

        case true: {
          this.activeModal = Modals.Invite;

          break;
        }
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

    onMenuAction(actionId: string, user: object) {
      this.userToUpdate = user;

      switch (actionId) {
        case "edit_nickname": {
          this.activeModal = Modals.EditNickname;

          break;
        }

        case "edit_email": {
          this.activeModal = Modals.EditEmail;

          break;
        }

        case "reset_password": {
          this.activeModal = Modals.ResetPassword;

          break;
        }

        case "change_role": {
          this.activeModal = Modals.EditRole;

          break;
        }

        case "delete_member": {
          this.activeModal = Modals.DeleteMember;

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

        this.activeModal = Modals.CancelInvite;
      } else {
        return BaseAlert.error(
          "You cannot do that",
          "Ask an admin to do this task"
        );
      }
    },

    async onSearchTermChange() {
      try {
        if (!this.searchTerm) {
          await store.$teamMembers.loadActiveMembersByPage(
            true,
            this.pageNumber
          );
        } else {
          await store.$teamMembers.loadActiveMembersByPage(
            true,
            1,
            this.searchTerm
          );
        }
      } catch (error) {
        console.error("Could not load members page", error);
      } finally {
        this.isMembersLoading = false;
      }
    },

    onModalClose() {
      this.activeModal = null;
    },

    async onOnboardingAction(type: string) {
      switch (type) {
        case "all_dns_checks_passed_once": {
          await this.$router.push({
            name: "app.advanced.network",
            query: { action: "onboard" }
          });

          break;
        }

        case "at_least_one_invitation_sent": {
          this.activeModal = Modals.Invite;

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
      background-color: darken-color($color-base-purple-ultra-light, 1.2%);
    }

    #{$c}__spinner {
      margin: 60px auto 40px;
    }
  }

  #{$c}__empty {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    max-width: 341px;
    margin-inline: auto;
    margin-block-end: 100px;

    img {
      display: flex;
      margin-inline: auto;
      width: 100%;
    }

    #{$c}__title {
      display: block;
      font-size: ($font-size-baseline + 4px);
      font-weight: $font-weight-medium;
      margin-block-end: 12px;
    }

    #{$c}__subtitle {
      color: $color-base-grey-normal;
      display: block;
      font-size: ($font-size-baseline - 1px);
      margin-block-end: 26px;
    }
  }
}
</style>
