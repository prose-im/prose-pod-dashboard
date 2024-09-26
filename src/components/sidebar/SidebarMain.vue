<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
  .c-sidebar-main
    .c-sidebar-main__content
      sidebar-header

      sidebar-accordion(
        :items="items"
      )

      sidebar-footer
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import SidebarAccordion from "./SidebarAccordion.vue";
import SidebarFooter from "./SidebarFooter.vue";
import SidebarHeader from "./SidebarHeader.vue";

export default {
  name: "SidebarMain",

  components: {
    SidebarAccordion,
    SidebarFooter,
    SidebarHeader
  },

  props: {
    disclosureListClass: {
      type: String,
      default: null,
    },
  },

  emits: ["addContact"],

  data() {
    return {
      // --> STATE <--
      items: [
        {
          value: "Team Members",
          label: "Team Members",
          subcategories: [
            {
              icon: "two.people",
              label: "Members & Invites",
            },
          ],
        },
        {
          value: "Server Features",
          subcategories: [
            {
              icon: "gear",
              label: "Configuration",
            },
          ],
        },
        {
          value: "Customization",
          subcategories: [
            {
              icon: "stack",
              label: "Workspace",
            },
            {
              icon: "gift",
              label: "Emojis & Reactions",
            },
          ],
        },
        {
          value: "Advanced Settings",
          subcategories: [
            {
              icon: "key",
              label: "Security & Encryption",
            },
            {
              icon: "world",
              label: "Network Setup",
            },
            {
              icon: "archive",
              label: "Backup & Reset",
            },
          ],
        },
      ],
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-sidebar-main";

#{$c} {
  height: 100vh;
  border-right: solid 1px $color-border-secondary;

  #{$c}__content {
    padding-top: 40px;
    padding-bottom: 30px;
    padding-left: 34px;
    padding-right: 32px;
    height: 100vh;
  }
}
</style>
