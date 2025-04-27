<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-sidebar-footer
  .c-sidebar-footer__content
    .c-sidebar-footer__left
      .c-sidebar-footer__avatar
        base-avatar(
          :avatar-data="avatar"
          :name="nickname"
        )

      .c-sidebar-footer__center
        p
          | {{ nickname }}

        base-badge(
          :admin="admin"
        )

    .c-sidebar-footer__right
      base-button(
        @click="onLogoutClick"
        tint="white"
        size="medium"
      )
        | Logout
</template>

<!-- **********************************************************************
  SCRIPT
  ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: STORES
import Store from "@/store";

export default {
  name: "SidebarAccordion",

  props: {
    admin: {
      type: String,
      required: true
    },

    avatar: {
      type: String,
      default: null
    },

    nickname: {
      type: String,
      required: true
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    async onLogoutClick(): Promise<void> {
      try {
        // Logout from account
        await Store.$account.logout();

        // Redirect to login page
        await this.$router.push({
          name: "start.login"
        });

        // Acknowledge logout success
        BaseAlert.info("Logged out", "Logged out of your dashboard");
      } catch (_) {
        BaseAlert.error("Could not log out", "Maybe try again?");
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-sidebar-footer";

#{$c} {
  display: flex;
  align-items: end;

  #{$c}__content {
    display: flex;
    align-items: center;
    width: 254px;
  }

  #{$c}__left {
    display: flex;
    margin-right: 10px;
    min-width: 80px;
    max-width: 184px;
    flex: 1 1 0;

    #{$c}__avatar {
      margin-right: 13px;
    }

    #{$c}__center {
      text-align: left;

      p {
        margin-top: 0px;
        margin-bottom: 5.5px;
        font-weight: $font-weight-medium;
        font-size: ($font-size-baseline - 0.5px);
        line-height: 11px;
      }
    }
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 768px) {
    #{$c}__content {
      display: block;
      width: fit-content;

      #{$c}__left {
        margin-block-end: 10px;
      }

      #{$c}__right {
        //text-align: end;
        margin-inline-start: 0px;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 922px) {
    #{$c}__content {
      width: 210px;
    }
  }
}
</style>
