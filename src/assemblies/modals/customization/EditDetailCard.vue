<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
base-modal(
  title="Add a custom emoji"
  button-color="purple"
  button-label="Add custom Emoji"
)
</template>

<!-- **********************************************************************
         SCRIPT
         ********************************************************************** -->

<script lang="ts">
export default {
  name: "EditDetailCard",

  props: {},

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--

      imageUrl: "",
      image: "",

      shortcut: ""
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
  }
};
</script>

<!-- **********************************************************************
       STYLE
       ********************************************************************** -->

<style lang="scss">
$c: ".a-add-custom-emoji";

#{$c} {
  margin-inline: 48px;

  h4 {
    color: $color-text-secondary;
    margin-top: 0;
    margin-bottom: 11px;
    margin-left: 8px;
    font-weight: $font-weight-medium;
  }

  #{$c}__upload {
    display: flex;
    align-items: center;
    position: relative;
    padding-block: 13.5px;
    padding-left: 33px;
    margin-bottom: 30px;
    border: 1px solid $color-border-secondary;
    border-radius: 7px;

    &--avatar {
      outline: 1px solid $color-border-secondary;
      outline-offset: 1.5px;
      margin-right: 21.5px;
    }
  }

  #{$c}__input {
    position: absolute;
    cursor: pointer;
    width: 120px;
    left: 18%;
    opacity: 0;
  }

  #{$c}__info {
    display: flex;
    align-items: center;
    font-weight: $font-weight-light;
    margin-top: 38px;
    margin-left: 9px;
    font-size: ($font-size-baseline - 1px);

    p {
      margin: 0;
    }

    &--icon {
      margin-right: 13px;
    }
  }
}
</style>
