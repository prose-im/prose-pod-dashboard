<!--
 * This file is part of prose-app-web
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
  
        sidebar-footer
  </template>
  
  <!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->
  
  <script lang="ts">
  // PROJECT: COMPONENTS
  import SidebarAccordion from "@/components/sidebar/SidebarAccordion.vue";
  import SidebarFooter from "@/components/sidebar/SidebarFooter.vue";
  import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";
  
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
            subcategories: [
              {
                icon: "two.people",
                value: "Members & Invites",
                link:"/members",
              },
            ],
          },
          {
            value: "Server Features",
            subcategories: [
              {
                icon: "cogs",
                value: "Configuration",
                link:"/server",
              },
            ],
          },
          {
            value: "Customization",
            subcategories: [
              {
                icon: "stack",
                value: "Workspace",
                link:"/customization/workspace",
              },
              {
                icon: "gift",
                value: "Emojis & Reactions",
                link:"/customization/emojis",
              },
            ],
          },
          {
            value: "Advanced Settings",
            subcategories: [
              {
                icon: "key",
                value: "Security & Encryption",
                link:"/advanced/security",
              },
              {
                icon: "world",
                value: "Network Setup",
                link:"/advanced/network",
              },
              {
                icon: "archive",
                value: "Backup & Reset",
                link:"/advanced/backup",
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
  $c: ".a-app-sidebar";
  
  #{$c} {
    height: 93vh;   ///Verifier
  
    #{$c}__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 40px;
      padding-bottom: 30px;
      padding-left: 34px;
      padding-right: 32px;
      height: 100%;
      border-right: solid 1px $color-border-secondary;
    }
  }
  </style>
  