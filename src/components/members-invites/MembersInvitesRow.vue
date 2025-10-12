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
  form-checkbox(
    :class=`[
      "c-members-invites-row__checkbox",
      "c-members-invites-row--hidden"
    ]`
    disabled
  )

  <!-- 2nd column -->
  base-avatar(
    :class=`[
      "c-members-invites-row__avatar",
      "c-members-invites-row--hidden"
    ]`
  )

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
    base-button(
      @click="onActionOnMember"
      :disabled="!actionsEnabled"
      class="c-members-invites-row--hidden"
      size="medium"
      tint="white"
      square
    )
      base-icon(
        v-if="!userData.invitation_id"
        fill="#495462"
        name="gearshape.fill"
        size="10px"
      )

      p(
        v-else
        class="c-members-invites-row__parameters--button"
      )
        | Cancel invite

    base-row-menu(
      v-if="isMenuOpen"
      v-click-away="onMenuClickAway"
      @menu-action="onMenuAction"
      :options="menuOptions"
      class="c-members-invites-row__parameters--menu"
    )

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
        @click="onActionOnMember"
        :disabled="!actionsEnabled"
        size="medium"
        tint="white"
        square
      )
        base-icon(
          v-if="!userData.invitation_id"
          fill="#495462"
          name="gearshape.fill"
          size="10px"
        )

        p(
          v-else
          class="c-members-invites-row__parameters--button"
        )
          | Cancel invite

      base-row-menu(
        v-if="isMenuOpen"
        v-click-away="onMenuClickAway"
        @menu-action="onMenuAction"
        :options="menuOptions"
        class="c-members-invites-row__parameters--menu"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: API
import { Invitation } from "@/api/providers/invitations";
import { Member, EnrichedMember } from "@/api/providers/members";

// PROJECT: COMPONENTS
import BaseRowMenu from "@/components/base/BaseRowMenu.vue";

// PROJECT: STORE
import { PropType } from "vue";

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

  emits: ["menuAction", "cancelInviteRequest"],

  data() {
    return {
      // --> STATE <--

      isMenuOpen: false,

      // --> DATA <--

      menuOptions: [
        {
          id: "edit_nickname",
          value: "Edit nickname"
        },

        {
          id: "edit_email",
          value: "Edit email"
        },

        {
          id: "change_role",
          value: "Change role"
        },

        {
          id: "delete_member",
          value: "Delete member",
          color: "red"
        }
      ]
    };
  },

  computed: {
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
    // --> EVENT LISTENERS <--

    onActionOnMember(): void {
      this.userData && (this.userData as Invitation).invitation_id
        ? this.onCancelInvite()
        : this.toggleMenuOpen();
    },

    onCancelInvite() {
      this.$emit(
        "cancelInviteRequest",
        (this.userData as Invitation).invitation_id,
        (this.userData as Invitation).jid
      );
    },

    toggleMenuOpen() {
      this.isMenuOpen = !this.isMenuOpen;
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

    &--button {
      margin: 0;
      padding-inline: 18px;
    }

    &--menu {
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
