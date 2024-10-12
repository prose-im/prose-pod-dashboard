<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
.c-base-modal-confirm-field
  form-checkbox

  p
    | {{ text }}
  
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import FormCheckbox from '@/components/form/FormCheckbox.vue';

export default {
  name: "BaseModalWarning",

  components: {
    FormCheckbox
  },

  props: {
    text: {
      type: String,
      required: true
    },
  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      
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
$c: ".c-base-modal-confirm-field";

#{$c} {  
  display: flex;
  align-items: center;
  font-weight: $font-weight-light;
  margin-top: 28px;
  margin-bottom: 42px;
  margin-left: 9px;
  font-family: $font-family-default;
  font-size: ($font-size-baseline - 1px);

  p{
    margin: 0;
  }

  &--icon{
    margin-right: 13px;
  }
}

</style>
        