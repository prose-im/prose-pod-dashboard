<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
    .c-base-subsection-item
      .c-base-subsection-item__left
        h3.c-base-subsection-item__subtitle {{ item.subtitle }}
        p.c-base-subsection-item__description {{ item.description}}

      slot 

      form-toggle(
        v-if="type === 'toggle'"
      )

      base-button(
        v-if="type === 'button'"
      )

      form-select(
        v-if="type === 'select'"
      )

        
  </template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseButton from "./BaseButton.vue";
import FormSelect from "../form/FormSelect.vue";
import FormToggle from "../form/FormToggle.vue";

export default {
  name: "BaseSubsectionItem",

  components: {
    BaseButton,
    FormSelect,
    FormToggle,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      default: "",

      validator(x: string) {
        return ["toggle", "button", "select"].includes(x);
      }
    },
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
$c: ".c-base-subsection-item";

#{$c} {
  display: flex;
  font-family: $font-family-default;
  padding-inline: 22px;
  padding-block: 11.5px;

  #{$c}__subtitle {
    margin: 0;
    margin-bottom: 8px;
    font-size: $font-size-baseline;
    font-weight: $font-weight-medium;
  }

  #{$c}__description {
    margin: 0;
    color: $color-text-secondary;
    font-size: $font-size-baseline - 1px;
  }
}
</style>
