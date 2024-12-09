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
    .c-sidebar-footer__left
      base-avatar(
        avatarDataUrl="https://avatars.githubusercontent.com/u/1451907?v=4"
      )

    .c-sidebar-footer__center
      p Valerian Saliou

      base-badge

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
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseBadge from "@/components/base/BaseBadge.vue";

// PROJECT: STORES
import Store from "@/store";

export default {
  name: "SidebarAccordion",

  components: {
    BaseAvatar,
    BaseBadge,
    BaseButton,
  },

  props: {},

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> EVENT LISTENERS <--

    async onLogoutClick(): Promise<void> {
      try {
        // Logout from account
        await Store.$account.logout();

        // Redirect to login page
        this.$router.push({
          name: "start.login",
        });

        // Acknowledge logout success
        BaseAlert.info("Logged out", "Logged out of your dashboard");
      } catch (_) {
        BaseAlert.error("Could not log out", "Maybe try again?");
      }
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-sidebar-footer";

#{$c} {
  display: flex;
  align-items: center;

  #{$c}__left {
    margin-right: 13px;
  }

  #{$c}__center {
    text-align: left;
    margin-right: 51px;
    p {
      margin-top: 0px;
      margin-bottom: 5.5px;
      font-weight: $font-weight-medium;
      font-size: ($font-size-baseline - 1.5px);
      font-family: $font-family-default;
      line-height: 11px;
    }
  }
}
</style>
