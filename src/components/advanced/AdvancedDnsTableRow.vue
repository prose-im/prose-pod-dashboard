<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
.c-advanced-dns-table-row
  .c-advanced-dns-table-row__content(
    :class=`[
      {
        "c-advanced-dns-table-row__content--header": header
      }
    ]`
  )
    .c-advanced-dns-table-row__slot(
      class="c-advanced-dns-table-row--flex"
    )
      slot

    .c-advanced-dns-table-row__icon(
      :class=`[
        "c-advanced-dns-table-row--flex",
        {
          "c-advanced-dns-table-row__icon--hidden":header
        }
      ]`
    )
      
      base-icon(
        name="copy"
        fill="#2490f0"
        size="9.5px"
        width="10.2px"
      )

      p
        | Copy


</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from '../base/BaseIcon.vue';

export default {
  name: "AdvancedDnsTableFirst",

  components: {
    BaseIcon
  },

  props: {
    header:{
      type: Boolean,
      default: false
    }

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
$c: ".c-advanced-dns-table-row";

#{$c} {
  font-family: $font-family-default;
  font-size: ($font-size-baseline - 3px);

  &--flex{
    display: flex;
    align-items: center;
  }

  #{$c}__content{
    display: flex;
    justify-content: space-between;
    line-height: ($font-size-baseline + 2px);
    padding-block: 5.5px;
    padding-inline: 19.5px;

    &--header{
      color: $color-text-secondary;
      font-weight: $font-weight-medium;
      background-color: $color-base-grey-ultra-light;
      border-bottom: 1px solid $color-border-primary;
    }
  }

  #{$c}__slot{
    width: 100%;
  }

  #{$c}__icon{
    color: $color-base-blue-normal;
    font-weight: $font-weight-medium;
    font-size: ($font-size-baseline - 3.5px);

    &--hidden{
      visibility: hidden;
    }

    p{
      margin-left: 5.5px !important;
    }
  }

  p{
    margin: 0;
  }
  
}

</style>
        