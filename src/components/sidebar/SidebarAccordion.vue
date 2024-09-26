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
    form-select(
      v-for="item in items"
      :name̦="item.title"
      :options="item.subcategories"
      :search="false"
      :placeholder="item.value"
    )

</template>
    
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import FormSelect from '../form/FormSelect.vue';

export default {
  name: "SidebarAccordion",

  components: {
    FormSelect
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