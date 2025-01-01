<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-customization-emojis
  emojis-reactions-dashboard

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import EmojisReactionsDashboard from "@/components/emojis-reactions/EmojisReactionsDashboard.vue";

export default {
  name: "AppCustomizationEmojis",

  components: {
    EmojisReactionsDashboard
  },

  props: {},

  emits: [],

  data() {
    return {
      // --> STATE <--
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
$c: ".v-app-customization-emojis";

#{$c} {
  height: 100%;
}
</style>
