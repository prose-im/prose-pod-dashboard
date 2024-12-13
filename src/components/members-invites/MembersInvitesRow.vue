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
  :class=`[
    {
      "c-members-invites-row--yellow" : (userData.invitation_id && !tableHeaders),
      "c-members-invites-row--header" : tableHeaders
    }
  ]`
)
    <!--  1st column -->
    form-checkbox(
      :class=`[
        "c-members-invites-row__checkbox",
        {
          "c-members-invites-row--hidden" : tableHeaders
        }
      ]`
      :disabled="true"
    )

    <!-- 2nd column -->
    base-avatar(
      :class=`[
        "c-members-invites-row__avatar",
        {
          "c-members-invites-row--hidden" : (userData.invitation_id || tableHeaders)
        }
      ]`
      :avatar-data-url="userEnrichedData?.avatar"
    )

    <!-- 3rd column -->
    .c-members-invites-row__user
      base-loader(
        v-if="!userEnrichedData && !userData.invitation_id && !tableHeaders"
      )

      p(
        v-else
        class="c-members-invites-row--main"
      )
        | {{ userEnrichedData?.nickname }}

      p.c-members-invites-row--submain
        | {{ userData.jid }}

      p(
        v-if="tableHeaders"
      )
        | {{ tableHeaders[0] }}

    <!-- 4th column -->
    .c-members-invites-row__badge
      base-badge(
        v-if="!tableHeaders"
        :class=`[
          {
            "c-members-invites-row--hidden" : userData.invitation_id,
          }
        ]`
        :admin="userData.role"
        size="long"
      )

      p(
        v-else
      )
        | {{ tableHeaders[1] }}

    <!-- 5th column -->
    .c-members-invites-row__status
        p(
          v-if="!tableHeaders"
          :class=`[
            "c-members-invites-row--main",
            {
              "c-members-invites-row--none" : userData.invitation_id
            }
          ]`
        )
          | {{ userData.online }}

        p(
          v-if="!tableHeaders"
          class="c-members-invites-row--submain"
        )
          |{{ userStatusDetail }}

        p(
          v-else
        ) {{ tableHeaders[2] }}

    <!-- 6th column -->
    .c-members-invites-row__encryption(
      :class=`[
        {
          "c-members-invites-row__encryption--hidden" : userData.invitation_id && !tableHeaders
        }
      ]`
    )
      .c-members-invites-row__encryption--block(
        v-if="!tableHeaders"
        :class=`[
          {
            "c-members-invites-row--hidden" : userData.invitation_id
          }
        ]`
      )
        base-mfa-badge(
          v-if="userData.mfa"
        )

        p(
          v-else
          class="c-members-invites-row__soon"
        )
          | Coming soon

      p(
        v-if="tableHeaders"
      )
        | {{ tableHeaders[3] }}

    <!-- 7th column -->
    .c-members-invites-row__parameters
      base-button(
        :class=`[
          {
            "c-members-invites-row--hidden":tableHeaders
          }
        ]`
        size="medium"
        tint="white"
        :square="true"
        @click="onActionOnMember"
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

      members-invites-menu(
        v-if="isMenuOpen"
        v-click-away="onMenuClickAway"
        class="c-members-invites-row__parameters--menu"
        :options="menuOptions"
        @menuAction="onMenuAction"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import MembersInvitesMenu from "./MembersInvitesMenu.vue";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "MembersInvitesRow",

  components: {
    MembersInvitesMenu
  },

  props: {
    avatarUrl: {
      type: String,
      default: "../../assets/icons/missing.avatar.svg"
    },

    userData: {
      type: Object,
      required: true
    },

    userEnrichedData: {
      type: Object,
      default: null
    },

    tableHeaders: {
      type: Array,
      default: null
    }
  },

  emits: ["menuAction"],

  data() {
    return {
      // --> STATE <--
      isMenuOpen: false,

      menuOptions: [
        {
          value: "Security settings",
          disabled: true
        },
        {
          value: "Change role"
        },
        {
          value: "Delete member",
          color: "red"
        }
      ]
    };
  },

  computed: {
    userStatusDetail() {
      if (!this.userEnrichedData?.nickname && this.userData.invitation_id) {
        return "Invited";
      } else if (this.userData.status === "Active") {
        return "Prose " + this.userData.os;
      } else {
        return "";
      }
    }
  },

  watch: {},

  methods: {
    // <-- EVENT LISTENERS -->
    onActionOnMember(): void {
      this.userData.invitation_id
        ? this.onCancelInvite()
        : this.toggleMenuOpen();
    },

    onCancelInvite() {
      console.log("inviteId", this.userData.invitation_id);
      store.$teamMembers.cancelInvitation(this.userData.invitation_id);
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
  display: flex;
  align-items: center;
  padding-inline: 29px;
  padding-block: 18.5px;

  #{$c}__checkbox {
    min-width: 24px;
    max-width: 46px;
    flex: 1 1 0;
    //border: 1px solid blue;
    margin-right: 10px;
  }

  #{$c}__avatar {
    //border: 1px solid blue;
    margin-right: 10px;
    min-width: 34px;
    max-width: 41px;
    flex: 1 1 0;
  }

  #{$c}__user {
    //border: 1px solid blue;
    min-width: 100px;
    max-width: 220px;
    margin-right: 10px;
    flex: 1 1 0;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  #{$c}__badge {
    //border: 1px solid blue;
    margin-right: 10px;
    max-width: 90px;
    flex: 1 1 0;
    min-width: 56px;

    p {
      margin: 0;
      width: fit-content;
    }
  }

  #{$c}__status {
    border: 1px solid blue;
    min-width: 50px;
    max-width: 15%;
    margin-right: 10px;
    flex: 1 1 0;
  }

  #{$c}__encryption {
    //border: 1px solid blue;
    flex: 1 1 0;
    margin-right: 10px;
    min-width: 66px;

    p {
      margin: 0;
    }

    &--block {
      display: flex;
      align-items: center;
      font-size: ($font-size-baseline - 2px);
      color: $color-base-green-normal;
    }

    &--icon {
      margin-right: 6.5px;
    }

    &--hidden {
      max-width: 222px;
    }

    &--light {
      font-weight: $font-weight-light;
    }
  }

  #{$c}__soon {
    font-size: ($font-size-baseline - 1.5px);
    color: $color-base-grey-normal;
    width: max-content;
  }

  #{$c}__parameters {
    position: relative;
    width: 100px;
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
      right: -30%;
    }
  }

  //STYLE
  &--main {
    color: $color-text-primary;
    font-weight: $font-weight-medium;
    font-size: ($font-size-baseline - 0.5px);
    line-height: ($font-size-baseline + 1.5px);
    margin-top: 0;
    margin-bottom: 5.5px;
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
    border-block: 1px solid $color-border-primary;
    padding-block: 0;

    p {
      line-height: 13px;
      margin-block: 11px;
    }
  }

  //<!-- COLORS -->

  &--yellow {
    background-color: $color-base-yellow-light;
    padding-block: 11.5px;
  }

  //<!-- INVISIBLE MANAGEMENT -->

  &--hidden {
    visibility: hidden;
    height: 0;
  }

  &--none {
    display: none;
  }

  @media (max-width: 768px) {
    #{$c}__parameters {
      justify-content: center;
    }
  }
}
</style>
