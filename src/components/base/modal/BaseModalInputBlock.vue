<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-modal-input-block
  h4
    | {{ label }}
    
  form-field(
    type="text"
    size="mid-large"
    align="left"
    :placeholder="placeholder"
  )
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import FormField from '@/components/form/FormField.vue';

export default {
  name: "BaseModalInputBlock",

  components: {
    FormField
  },

  props: {
    label:{
      type: String,
      required: true
    },

    placeholder:{
      type: String,
      default:""
    }

  },

  emits: [],

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
$c: ".c-base-modal-input-block";

#{$c} {
  font-family: $font-family-default;

  h4{
    color:$color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-medium;
  }
}
</style>