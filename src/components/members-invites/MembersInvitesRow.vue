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
    )

    <!-- 2nd column -->
    base-avatar(
      :class=`[
        "c-members-invites-row__avatar",
        {
          "c-members-invites-row--hidden" : (userData.invitation_id || tableHeaders)
        }
      ]`
      :avatarDataUrl="userEnrichedData?.avatar"
    )

    <!-- 3rd column -->
    .c-members-invites-row__user
      loader-base(
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
    base-badge(
      v-if="!tableHeaders"
      :class=`[
        "c-members-invites-row__badge",
        {
          "c-members-invites-row--hidden" : userData.invitation_id,
        }
      ]`
      :admin="userData.role"
      size="long"
    )

    p(
      v-else
      :class=`[
        "c-members-invites-row__badge",
        "c-members-invites-row__badge--header"
      ]`
    )
      | {{ tableHeaders[1] }}

    <!-- 5th column -->
    .c-members-invites-row__status
        p(
          :class=`[
            "c-members-invites-row--main",
            {
              "c-members-invites-row--none" : userData.invitation_id
            }
          ]`
        ) {{ userData.online }}
        p(
          v-if="!tableHeaders"
          class="c-members-invites-row--submain"
        )
          |{{ userStatusDetail }}

        p(
          v-else
        )
          | {{ tableHeaders[2] }}

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
        class="c-members-invites-row__badge--header"
      )
        | {{ tableHeaders[3] }}
        
    <!-- 7th column -->
    .c-members-invites-row__parameters
      base-button(
        v-if="!tableHeaders"
        size="medium"
        tint="white"
        :square="true"
        @click="onActionOnMember"
      )
        base-icon(
          v-if="!userData.invitation_id"
          fill="#949EB1"
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
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseBadge from "@/components/base/BaseBadge.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseComingSoon from "../base/BaseComingSoon.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseMfaBadge from "../base/BaseMfaBadge.vue";
import FormCheckbox from "@/components/form/FormCheckbox.vue";
import MembersInvitesMenu from "./MembersInvitesMenu.vue";
import LoaderBase from "../base/loader/LoaderBase.vue";

// STORE
import store from "@/store";

export default {
  name: "MembersInvitesRow",

  components: {
    BaseAvatar,
    BaseBadge,
    BaseButton,
    BaseComingSoon,
    BaseIcon,
    BaseMfaBadge,
    FormCheckbox,
    MembersInvitesMenu,
    LoaderBase,
  },

  props: {
    avatarUrl: {
      type: String,
      default: "../../assets/icons/missing.avatar.svg",
    },

    userData: {
      type: Object,
      required: true,
    },

    userEnrichedData: {
      type: Object,
      default: null,
    },

    tableHeaders: {
      type: Array,
      default: null,
    },
  },

  emits: ["menuAction"],

  data() {
    return {
      // --> STATE <--
      isMenuOpen: false,

      menuOptions: [
        {
          value: "Security settings",
          disabled: true,
        },
        {
          value: "Change role",
        },
        {
          value: "Delete member",
          color: "red",
        },
      ],
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
    },
  },

  watch: {},

  methods: {
    // <-- EVENT LISTENERS -->
    onActionOnMember(): void {
      this.userData.invitation_id ? this.onCancelInvite() : this.toggleMenuOpen();
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
    },
  },
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
  font-family: $font-family-default;

  #{$c}__checkbox {
    margin-right: 28px;
  }

  #{$c}__avatar {
    margin-right: 17px;
    min-width: 34px;
  }

  #{$c}__user {
    min-width: 220px;
    margin-right: 10px;
  }

  #{$c}__badge {
    margin-right: 40px;

    &--header {
      min-width: 50px;
    }
  }

  #{$c}__status {
    min-width: 16.3%;
  }

  #{$c}__encryption {
    position: relative;
    margin-right: 24%;

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
      margin-right: 15%;
    }

    &--light {
      font-weight: $font-weight-light;
    }
  }

  #{$c}__soon {
    font-size: ($font-size-baseline - 4px);
    color: $color-base-grey-normal;
    width: max-content;
  }

  #{$c}__parameters {
    position: relative;

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

  //STYLE
  &--main {
    color: $color-text-primary;
    font-weight: $font-weight-medium;
    font-size: ($font-size-baseline - 0.5px);
    line-height: ($font-size-baseline - 0.5px);
    margin-top: 0;
    margin-bottom: 5.5px;
  }

  &--submain {
    color: $color-text-secondary;
    font-weight: $font-weight-light;
    font-size: ($font-size-baseline - 1px);
    line-height: ($font-size-baseline - 1px);
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
}
</style>
