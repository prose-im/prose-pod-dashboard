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
  )

  signup-page(
    class="v-start-signup__page"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";
import SignupSidebar from "@/components/signup/SignupSidebar.vue";
import SignupPage from "@/components/signup/SignupPage.vue";

// PROJECT: STORES
import Store from "@/store";

export default {
  name: "StartSignup",

  components: {
    SignupPage,
    SignupSidebar
  },

  data() {
    return {
      // --> STATES <--

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

    async onFormSubmit(form): Promise<void> {
      if (this.isFormLoading !== true) {
        // Mark as loading
        this.isFormLoading = true;

        try {
          // Login to account
          await Store.$account.login(form.jid, form.password);

          // Redirect to dashboard
          this.$router.push({
            name: "app"
          });

          // Acknowledge login success
          BaseAlert.success("Logged in", "Welcome to your Prose dashboard");
        } catch (_) {
          BaseAlert.error(
            "Could not log in",
            "Check your credentials and try again"
          );
        } finally {
          this.isFormLoading = false;
        }
      }
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
