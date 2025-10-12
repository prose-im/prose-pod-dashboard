<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
.c-members-invites-row(
  v-if="tableHeaders"
  class="c-members-invites-row--header"
)
  <!-- 1st column -->
  .c-members-invites-row__checkbox

  <!-- 2nd column -->
  .c-members-invites-row__avatar

  <!-- 3rd column -->
  .c-members-invites-row__user
    p {{ tableHeaders[0] }}

  <!-- 4th column -->
  .c-members-invites-row__badge
    p {{ tableHeaders[1] }}

  <!-- 5th column -->
  .c-members-invites-row__status
    p {{ tableHeaders[2] }}

  <!-- 6th column -->
  .c-members-invites-row__parameters

.c-members-invites-row(
  v-else
  :class=`[
    {
      "c-members-invites-row--box-yellow" : (userData.invitation_id)
    }
  ]`
)
  <!--  1st column -->
  form-checkbox(
    class="c-members-invites-row__checkbox"
    disabled
  )

  <!-- 2nd column -->
  base-avatar(
    :avatar-content-type="userData.avatar?.type"
    :avatar-data-base64="userData.avatar?.base64"
    :placeholder-data="userData.nickname"
    class="c-members-invites-row__avatar"
  )

  <!-- 3rd column -->
  .c-members-invites-row__user(
    :class=`[
      {
        "c-members-invites-row__user--emphasis" : userData.invitation_id
      }
    ]`
  )
    p(
      v-if="userData.nickname"
      class="c-members-invites-row--main"
    )
      | {{ userData.nickname }}

    base-loader(
      v-else-if="!userData.enriched && !userData.invitation_id"
    )

    p(
      :title="userData.jid"
      :class=`[
        "c-members-invites-row--submain"
      ]`
    )
      | {{ userData.jid }}

  <!-- 4th column -->
  .c-members-invites-row__badge
    base-badge(
      v-if="!userData.invitation_id"
      :admin="userData.role ?? userData.pre_assigned_role"
      size="long"
    )

  <!-- 5th column -->
  .c-members-invites-row__status
    p(
      v-if="userStatus"
      :class=`[
        "c-members-invites-row--" + userStatus.level,
        {
          ["c-members-invites-row--" + userStatus.color]: userStatus.color
        }
      ]`
    )
      | {{ userStatus.label }}

    base-loader(
      v-else-if="!userData.enriched && !userData.invitation_id"
      width="50px"
    )

  <!-- 6th column -->
  .c-members-invites-row__parameters
    base-button(
      v-if="!userData.invitation_id"
      @click="onActionOnMember"
      :disabled="!actionsEnabled && !isSelfUser"
      size="medium"
      tint="white"
      square
    )
      base-icon(
        fill="#495462"
        name="gearshape.fill"
        size="10px"
      )

    .c-members-invites-row__parameters-actions(
      v-else
    )
      base-button(
        @click="onResendInvite"
        :disabled="!actionsEnabled"
        size="medium"
        tint="white"
        class="c-members-invites-row__parameters-action"
        square
      )
        | Resend

      base-button(
        @click="onCancelInvite"
        :disabled="!actionsEnabled"
        size="medium"
        tint="white"
        class="c-members-invites-row__parameters-action"
      )
        | Cancel

    base-row-menu(
      v-if="isMenuOpen"
      v-click-away="onMenuClickAway"
      @menu-action="onMenuAction"
      :options="menuOptions"
      class="c-members-invites-row__parameters-menu"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// NPM
import { PropType } from "vue";

// PROJECT: API
import { Invitation } from "@/api/providers/invitations";
import { Member, EnrichedMember, MemberRole } from "@/api/providers/members";

// PROJECT: COMPONENTS
import BaseRowMenu from "@/components/base/BaseRowMenu.vue";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "MembersInvitesRow",

  components: {
    BaseRowMenu
  },

  props: {
    actionsEnabled: {
      type: Boolean,
      default: false
    },

    userData: {
      type: Object as PropType<Member | EnrichedMember | Invitation>,
      required: true
    },

    tableHeaders: {
      type: Array,
      default: null
    }
  },

  emits: ["menuAction", "cancelInviteRequest", "resendInviteRequest"],

  data() {
    return {
      // --> STATE <--

      isMenuOpen: false
    };
  },

  computed: {
    isSelfAdmin() {
      return this.selfUserData.role === MemberRole.Admin;
    },

    isSelfUser() {
      return this.selfUserData.jid === this.userData.jid;
    },

    menuOptions() {
      const _options = [];

      // Only the logged-in user can edit their own nickname
      if (this.isSelfUser) {
        _options.push({
          id: "edit_nickname",
          value: "Edit nickname"
        });
      }

      // Administrators and self user can edit emails
      if (this.isSelfUser || this.isSelfAdmin) {
        _options.push({
          id: "edit_email",
          value: "Edit email"
        });
      }

      // Only administrators can change roles, delete members and reset \
      //   passwords
      if (this.isSelfAdmin) {
        _options.push(
          {
            id: "change_role",
            value: "Change role"
          },

          {
            id: "reset_password",
            value: "Reset password"
          },

          {
            id: "delete_member",
            value: "Delete member",
            color: "red"
          }
        );
      }

      return _options;
    },

    selfUserData() {
      return store.$account.getUserSessionData();
    },

    userStatus() {
      // Invited member?
      if (
        (this.userData as Invitation | undefined)?.invitation_id !== undefined
      ) {
        return {
          label: "Invited",
          level: "submain"
        };
      }

      // Regular member
      switch ((this.userData as EnrichedMember | undefined)?.online) {
        case true: {
          return {
            label: "Online",
            color: "text-green",
            level: "main"
          };
        }

        case false: {
          return {
            label: "Inactive",
            color: "text-secondary",
            level: "main"
          };
        }
      }

      return null;
    }
  },

  methods: {
    // --> HELPERS <--

    toggleMenuOpen() {
      this.isMenuOpen = !this.isMenuOpen;
    },

    dispatchInviteRequest(
      event: "resendInviteRequest" | "cancelInviteRequest"
    ) {
      this.$emit(
        event,
        (this.userData as Invitation).invitation_id,
        (this.userData as Invitation).jid
      );
    },

    // --> EVENT LISTENERS <--

    onActionOnMember(): void {
      this.toggleMenuOpen();
    },

    onResendInvite() {
      this.dispatchInviteRequest("resendInviteRequest");
    },

    onCancelInvite() {
      this.dispatchInviteRequest("cancelInviteRequest");
    },

    onMenuAction(action: string) {
      this.$emit("menuAction", action, this.userData);
    },

    onMenuClickAway() {
      this.toggleMenuOpen();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-members-invites-row";

#{$c} {
  border-block-end: 1px solid $color-border-secondary;
  display: flex;
  align-items: center;
  padding-inline: 29px;
  padding-block: 18.5px;

  #{$c}__checkbox {
    min-width: 24px;
    max-width: 46px;
    flex: 1;
    margin-right: 10px;
  }

  #{$c}__avatar {
    margin-right: 10px;
    min-width: 34px;
    max-width: 41px;
    flex: 0 0 auto;
  }

  #{$c}__user {
    min-width: 100px;
    max-width: 280px;
    margin-inline-end: 10px;
    margin-block: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    row-gap: 3px;

    &--emphasis {
      > * {
        font-weight: $font-weight-regular;
      }
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  #{$c}__badge {
    margin-right: 10px;
    min-width: 56px;
    max-width: 120px;
    flex: 1;

    p {
      margin: 0;
      width: fit-content;
    }
  }

  #{$c}__status {
    min-width: 50px;
    margin-right: 10px;
    flex: 1;
  }

  #{$c}__parameters {
    position: relative;
    display: flex;
    justify-content: end;

    #{$c}__parameters-actions {
      display: flex;
      align-items: center;
      column-gap: 4px;

      #{$c}__parameters-action {
        > * {
          padding-inline: 14px;
        }
      }
    }

    #{$c}__parameters-menu {
      z-index: $index-foreground-tertiary;
      position: absolute;
      top: 0%;
      right: -100%;
    }
  }

  // --> STYLE <--

  &--main {
    color: $color-text-primary;
    font-weight: $font-weight-medium;
    font-size: ($font-size-baseline - 0.5px);
    line-height: ($font-size-baseline + 1.5px);
    margin-block: 0;
  }

  &--submain {
    color: $color-text-secondary;
    font-weight: $font-weight-light;
    font-size: ($font-size-baseline - 1px);
    line-height: ($font-size-baseline + 1px);
    margin-block: 0;
  }

  &--header {
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 0px);
    font-weight: $font-weight-mid;
    line-height: 13px;
    border-block: 1px solid $color-border-primary;
    padding-block: 0;
  }

  // --> COLORS <--

  &--box-yellow {
    background-color: $color-base-yellow-light;
    padding-block: 11.5px;
  }

  &--text-green {
    color: $color-base-green-normal;
  }

  &--text-secondary {
    color: $color-text-secondary;
  }

  // --> INVISIBLE MANAGEMENT <--

  &--hidden {
    visibility: hidden;
    height: 0;
  }

  &--none {
    display: none;
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 768px) {
    #{$c}__parameters {
      justify-content: center;
    }
  }
}
</style>
