<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
span.c-base-space(
  v-html="spacesHtml"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseSpace",

  props: {
    repeat: {
      type: Number,
      default: 1
    }
  },

  computed: {
    spacesHtml(): string {
      return Array(this.repeat).fill("&nbsp;").join("");
    }
  }
};
</script>
