<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
  .c-search-bar
    .c-search-bar__content
      .c-search-bar__left
        base-icon(
          size="14px"
          name="magnifying.glass"
          fill="#949eb1"
          class="c-search-bar__magnifying"
        )
        form-field(
          v-model="term"
          type="text"
          :placeholder="'Search for' + ' ' + placeholderText"
          align="left"
          class="c-search-bar__field"
        )

      .c-search-bar__right
        base-button(
          tint="purple"
          size="large"
          @click="clickHandle"
        )
          | {{ buttonLabel }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "SearchBar",

  props: {
    modelValue: {
      type: String,
      default: ""
    },

    buttonLabel: {
      type: String,
      required: true
    },

    clickHandle: {
      type: Function,
      required: true
    },

    placeholderText: {
      type: String,
      default: ""
    }
  },

  emits: ["update:modelValue"],

  computed: {
    term: {
      get() {
        return this.modelValue;
      },

      set(value: string) {
        this.$emit("update:modelValue", value);
      }
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-search-bar";

#{$c} {
  #{$c}__content {
    display: flex;
    justify-content: space-between;
    padding: 22px 29px;
  }

  #{$c}__left {
    position: relative;
  }

  #{$c}__magnifying {
    position: absolute;
    left: 21px;
    top: 35.5%;
    z-index: 10;
  }

  #{$c}__field {
    position: relative;
    z-index: 0;
  }

  #{$c}__right {
    display: flex;
  }
}
</style>
