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
    };
  },

  computed: {
    activeCategory() {
      const route = this.$route;
      let category = "";

      switch (route.path) {
        case "/team/members":
          category = "Members & Invites";
          break;
        case "/server/configuration":
          category = "Configuration";
          break;
        case "/customization/workspace":
          category = "Workspace";
          break;
        case "/customization/emojis":
          category = "Emojis & Reactions";
          break;
        case "/advanced/security":
          category = "Security & Encryption";
          break;
        case "/advanced/network":
          category = "Network Setup";
          break;
        case "/advanced/backup":
          category = "Backup & Reset";
          break;

        default:
          break;
      }
      return category;
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

  > * {
    &:last-child {
      margin-block-end: 0;
    }
  }
}
</style>
