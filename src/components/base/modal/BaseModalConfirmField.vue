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

  p(
    :class=`[
      "c-base-modal-confirm-field--" + color
    ]`
  )
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

    color: {
      type: String,
      default:"black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
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
  font-weight: $font-weight-medium;
  margin-left: 9px;
  margin-bottom: 8px;
  font-family: $font-family-default;
  font-size: ($font-size-baseline - 1px);

  p{
    margin-block: 0;
    margin-inline-start: 11px;
  }

  &--icon{
    margin-right: 13px;
  }

  //<!-- COLORS -->

  &--red{
    color: $color-base-red-normal;
  }
}

</style>
        