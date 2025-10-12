<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.a-app-sidebar
  .a-app-sidebar__content
    .a-app-sidebar__upper
      sidebar-header

      sidebar-accordion(
        :items="items"
      )

    sidebar-footer(
      :nickname="userData.nickname"
      :admin="userData.role"
      :avatar="userData.avatar"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import SidebarAccordion from "@/components/sidebar/SidebarAccordion.vue";
import SidebarFooter from "@/components/sidebar/SidebarFooter.vue";
import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "AppSidebar",

  components: {
    SidebarAccordion,
    SidebarFooter,
    SidebarHeader
  },

  props: {
    disclosureListClass: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      // --> DATA <--

      items: [
        {
          value: "Team Members",

          subcategories: [
            {
              icon: "two.people",
              value: "Members & Invites",
              link: "/team/members"
            }
          ]
        },

        {
          value: "Server Features",

          subcategories: [
            {
              icon: "gearshape",
              value: "Configuration",
              link: "/server/configuration"
            }
          ]
        },

        {
          value: "Customization",

          subcategories: [
            {
              icon: "stack",
              value: "Workspace",
              link: "/customization/workspace"
            }
          ]
        },

        {
          value: "Advanced Settings",

          subcategories: [
            {
              icon: "key",
              value: "Security & Encryption",
              link: "/advanced/security"
            },

            {
              icon: "world",
              value: "Network Setup",
              link: "/advanced/network"
            },

            {
              icon: "archive",
              value: "Backup & Reset",
              link: "/advanced/backup"
            }
          ]
        }
      ]
    };
  },

  computed: {
    userData() {
      return store.$account.getUserSessionData();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-app-sidebar";

#{$c} {
  display: flex;

  #{$c}__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 40px;
    padding-bottom: 30px;
    padding-inline: 22px;
    border-right: solid 1px $color-border-secondary;
    box-sizing: border-box;
    overflow-y: auto;
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 768px) {
    #{$c}__content {
      padding-inline: 16px;
    }
  }
}
</style>
