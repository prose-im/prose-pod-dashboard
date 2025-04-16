<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-start-init
  init-sidebar(
    :items="items"
    :step="currentStep"
  )

  init-page(
    class="v-start-init__page"
    @updateStep="onUpdateStep"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import InitSidebar from "@/components/init/InitSidebar.vue";
import InitPage from "@/components/init/InitPage.vue";

export default {
  name: "StartInit",

  components: {
    InitPage,
    InitSidebar
  },

  data() {
    return {
      // --> STATES <--
      currentStep: null as number | null,

      isFormLoading: false,

      items: [
        {
          value: "Domain name",
          description: "Setup server domain",
          icon: "world"
        },
        {
          value: "Server name",
          description: "Customize your server",
          icon: "wand"
        },
        {
          value: "Admin account",
          description: "Create your account",
          icon: "admin"
        }
      ]
    };
  },

  methods: {
    // --> EVENT LISTENERS <--
    onUpdateStep(newStep: number) {
      this.currentStep = newStep;
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-start-init";

#{$c} {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  background: linear-gradient(
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.98)
    ),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;
}
</style>
