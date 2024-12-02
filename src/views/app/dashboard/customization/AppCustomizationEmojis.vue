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
    EmojisReactionsDashboard,
  },

  props: {},

  emits: [],

  data() {
    return {
      // --> STATE <--
      messagingItems: [
        {
          subtitle: "Store archives of all messages",
          description:
            "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type: "toggle",
        },
        {
          subtitle: "Message archive retention time",
          description:
            "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type: "button",
          typeProps: {
            label: "Edit details...",
            size: "medium",
          },
        },
        {
          subtitle: "Message archive retention time",
          description:
            "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          type: "select",
          typeProps: {
            options: [
              {
                icon: "",
                label: "1 year",
              },
              {
                icon: "",
                label: "2 years",
              },
            ],
            size: "medium",
          },
        },
      ],
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
$c: ".v-app-customization-emojis";

#{$c} {
  height: 100%;
}
</style>
