<!--
 * This file is part of prose-app-web
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
      :accordion="true"
    )
</template>
    
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import FormSelectAccordion from '@/components/form/FormSelectAccordion.vue';

export default {
  name: "SidebarAccordion",

  components: {
    FormSelectAccordion
  },

  props: {
    items: {
      type: Array,
      required: true
    },
    disclosureListClass: {
      type: String,
      default: null
    }
  },

  emits: ["addContact"],

  data() {
    return {
      // --> STATE <--
      activeCategory: "Members & Invites"
    };
  },

  computed: {

  },

  watch: {

  },

  created() {
    
  },

  methods: {
    // --> HELPERS <--
  }
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