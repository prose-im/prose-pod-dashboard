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
        h3(
          :class=`[
            "c-base-subsection-item__subtitle",
            {
              "c-base-subsection-item__subtitle--restore": item.restoreSubtitle,
            }
          ]`
        )
          | {{ item.subtitle }}

          base-icon(
            v-if="item.restoreSubtitle"
            class="c-base-subsection-item__subtitle--icon"
            name="restore"
            size="8px"
            fill="#2490f0"
          )

        p.c-base-subsection-item__description {{ item.description}}

      slot 

      form-toggle(
        v-if="type === 'toggle'"
      )

      base-button(
        v-if="type === 'button'"
        :size="item.typeProps?.size"
        tint="white"
      )  
        | {{item.typeProps?.label}}

      form-select(
        v-if="type === 'select'"
        placeholder="1 year"
        :search="false"
        size="medium"
        :options="item.typeProps?.options"
        position="bottom"
      )

        
  </template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseButton from "./BaseButton.vue";
import BaseIcon from "./BaseIcon.vue";
import FormSelect from "../form/FormSelect.vue";
import FormToggle from "../form/FormToggle.vue";

export default {
  name: "BaseSubsectionItem",

  components: {
    BaseButton,
    BaseIcon,
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
  align-items: center;
  font-family: $font-family-default;
  padding-inline: 22px;
  padding-block: 11.5px;

  #{$c}__left {
    width: 100%;
  }

  #{$c}__subtitle {
    margin: 0;
    margin-bottom: 8px;
    font-size: $font-size-baseline;
    font-weight: $font-weight-medium;

    &--restore {
      color:$color-base-blue-normal;
    }

    &--icon {
      margin-left: 3.5px;
    }
  }

  #{$c}__description {
    max-width: 70%;
    margin: 0;
    color: $color-text-secondary;
    font-size: $font-size-baseline - 1px;
  }
}
</style>
