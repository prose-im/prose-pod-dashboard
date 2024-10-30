<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.c-base-modal-disclaimer
  .c-base-modal-disclaimer__warning
    base-icon(
      class="c-base-modal-disclaimer--icon"
      name="exclamationmark.triangle.fill"
      fill="#dd2f2f"
      height="14px"
      width="15.5px"
    )

    p
      | {{ warning }}
   
  .c-base-modal-disclaimer__description
    p
      | {{ description }}
  </template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from '@/components/base/BaseIcon.vue';

export default {
  name: "BaseModalDisclaimer",

  components: {
    BaseIcon,
  },

  props: {
    warning: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
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
$c: ".c-base-modal-disclaimer";

#{$c} {  
  font-family: $font-family-default;
  background-color: rgba($color-base-red-normal, 0.06);
  padding: 10px 19px 10.5px 21px;
  border-radius: 5px;
  white-space: pre-wrap;

  #{$c}__warning {
    color: $color-base-red-normal;
    font-size: ($font-size-baseline + 1px);
    font-weight: $font-weight-medium;
    margin-bottom: 7px;
    display: flex;
    align-items: center;

    &--icon {
      margin-right: 6px;
    }

  }

  #{$c}__description {
    font-weight: $font-weight-light;
    font-size: ($font-size-baseline);
  }

  p{
    margin: 0;
  }

  &--icon{
    margin-right: 13px;
  }
}
</style>
        