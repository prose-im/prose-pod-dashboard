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
