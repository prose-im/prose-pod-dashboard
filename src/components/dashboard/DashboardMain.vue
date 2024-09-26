<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
  .c-dashboard-main
    .c-dashboard-main__content
      breadcrumb

      base-section-background
        base-subsection(
          title="Messaging"
          :items="messagingItems"
        )
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSectionBackground from '../base/BaseSectionBackground.vue';
import BaseSubsection from '../base/BaseSubsection.vue';
import Breadcrumb from '../breadcrumb/Breadcrumb.vue';

export default {
  name: "DashboardMain",

  components: {
    BaseSectionBackground,
    BaseSubsection,
    Breadcrumb
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      messagingItems:[
        {
          subtitle:"Store archives of all messages",
          description: "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type:"toggle"
        },
        {
          subtitle: "Message archive retention time",
          description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type:"toggle"
        }
      ]
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
$c: ".c-dashboard-main";

#{$c} {
  width:80%;

  #{$c}__content {
    height: 100%;
    padding-top: 50px;
    padding-inline: 100px;
  }
}
</style>
