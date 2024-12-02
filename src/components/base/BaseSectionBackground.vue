<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
  .c-base-section-background
    slot
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseSectionBackground",

  components: {},

  props: {},

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-section-background";

#{$c} {
  flex: 1;
  display: flex;
  background-color: white;
  border-radius: 8px;
  border: 1px solid $color-border-secondary;
  box-shadow: 0 4px 4px 0 rgba($color-base-purple-light, 0.08);

  #{$c}__icon {
    margin-left: 11px;
    margin-right: 12px;
  }
}
</style>
