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
      .c-search-bar__field
        base-icon(
          size="14px"
          name="magnifying.glass"
          fill="#949eb1"
          class="c-search-bar__field-icon"
        )

        form-field(
          v-model="term"
          @change="onInputChange"
          :disabled="disabled"
          :placeholder="'Search for ' + placeholderText"
          type="text"
          align="left"
          class="c-search-bar__field-input"
        )

    .c-search-bar__right
      base-button(
        @click="clickHandle"
        :icon="buttonIcon"
        tint="purple"
        size="large"
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

    buttonIcon: {
      type: String,
      default: null
    },

    clickHandle: {
      type: Function,
      required: true
    },

    disabled: {
      type: Boolean,
      default: false
    },

    placeholderText: {
      type: String,
      default: ""
    }
  },

  emits: ["update:modelValue", "change"],

  computed: {
    term: {
      get() {
        return this.modelValue;
      },

      set(value: string) {
        this.$emit("update:modelValue", value);
      }
    }
  },

  methods: {
    onInputChange() {
      this.$emit("change");
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
    column-gap: 14px;
    padding: 22px 29px;
  }

  #{$c}__left {
    flex: 1;
  }

  #{$c}__right {
    display: flex;
    flex: 0 1 auto;
  }

  #{$c}__field {
    max-width: 440px;
    position: relative;

    #{$c}__field-icon {
      position: absolute;
      left: 21px;
      top: 35.5%;
      z-index: 10;
    }

    #{$c}__field-input {
      z-index: 0;
    }
  }
}
</style>
