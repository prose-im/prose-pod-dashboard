<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
base-topography(
  class="v-start-init"
)
  start-init-sidebar(
    :items="items"
    :step="currentStep"
  )

  start-init-page(
    class="v-start-init__page"
    @update-step="onUpdateStep"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import StartInitSidebar from "@/components/start/StartInitSidebar.vue";
import StartInitPage from "@/components/start/StartInitPage.vue";

export default {
  name: "StartInit",

  components: {
    StartInitPage,
    StartInitSidebar
  },

  data() {
    return {
      // --> STATES <--

      currentStep: null as number | null,

      isFormLoading: false,

      // --> DATA <--

      items: [
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
}
</style>
