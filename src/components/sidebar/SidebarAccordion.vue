<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-sidebar-accordion
  form-select-accordion(
    v-for="item in items"
    v-model="activeCategory"
    :options="item.subcategories"
    :search="false"
    :placeholder="item.value"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import FormSelectAccordion from "@/components/form/FormSelectAccordion.vue";

export default {
  name: "SidebarAccordion",

  components: {
    FormSelectAccordion,
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
    disclosureListClass: {
      type: String,
      default: null,
    },
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      category: "",
    };
  },

  computed: {
    activeCategory: {
      get() {
        if (!this.category) {
          const route = this.$route;
          let activeCategory = "";

          switch (route.path) {
            case "/team/members": {
              activeCategory = "Members & Invites";
              break;
            }

            case "/server/configuration": {
              activeCategory = "Configuration";
              break;
            }

            case "/customization/workspace": {
              activeCategory = "Workspace";
              break;
            }

            case "/customization/emojis": {
              activeCategory = "Emojis & Reactions";
              break;
            }

            case "/advanced/security": {
              activeCategory = "Security & Encryption";
              break;
            }

            case "/advanced/network": {
              activeCategory = "Network Setup";
              break;
            }

            case "/advanced/backup": {
              activeCategory = "Backup & Reset";
              break;
            }

            default: {
              break;
            }
          }

          return activeCategory;
        } else {
          return this.category;
        }
      },

      set(value: string) {
        this.category = value;
      },
    },
  },

  watch: {},

  methods: {
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-sidebar-accordion";

#{$c} {
  font-family: $font-family-default;
  margin-block-end: 45px;

  @media (max-width: 768px) {
    width: fit-content;
  }
}
</style>
