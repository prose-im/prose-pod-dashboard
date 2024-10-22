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
    breadcrumb(
      class="c-dashboard-main__breadcrumb"
    )

    base-section-background
      slot

</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSectionBackground from "../base/BaseSectionBackground.vue";
import Breadcrumb from "../breadcrumb/Breadcrumb.vue";

export default {
  name: "DashboardMain",

  components: {
    BaseSectionBackground,
    Breadcrumb,
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
  display: flex; //verifierflex
  flex-direction: column; //verifierflex
  align-items: center;
  width: 100%;
  background-color: $color-background-primary;

  #{$c}__breadcrumb {
    // margin-inline: auto; //verifierflex
  }

  #{$c}__content {
    // height: 100%; //verifierflex
    flex: 1; //verifierflex
    display: flex; //verifierflex
    flex-direction: column; //verifierflex
    padding-top: 50px;
    padding-inline: 100px;
    max-width: 918px;  //verifierflex
    width: 100%;
  }
}
</style>
