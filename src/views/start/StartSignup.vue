<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-start-signup
  signup-sidebar(
    :items="items"
    :step="currentStep"
  )

  signup-page(
    class="v-start-signup__page"
    @updateStep="onUpdateStep"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import SignupSidebar from "@/components/signup/SignupSidebar.vue";
import SignupPage from "@/components/signup/SignupPage.vue";

export default {
  name: "StartSignup",

  components: {
    SignupPage,
    SignupSidebar
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
$c: ".v-start-signup";

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
