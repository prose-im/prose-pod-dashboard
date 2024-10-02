<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
.c-table-row
  .c-table-row__content
    slot


</template>
    
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import FormField from '../form/FormField.vue';

export default {
  name: "TableRow",

  components: {
    BaseButton,
    BaseIcon,
    FormField
  },

  props: {

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
$c: ".c-table-row";

#{$c} {
  #{$c}__content {
    display: flex;
    align-items: center;
  }
}
</style>