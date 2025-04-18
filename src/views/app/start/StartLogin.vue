<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
     TEMPLATE
     ********************************************************************** -->

<template lang="pug">
.v-start-login
  .v-start-login__header
    base-identity-badge
    
  start-login-form(
    @submit="onFormSubmit"
    :loading="isFormLoading"
    class="v-start-login__form"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: ASSEMBLIES
import StartLoginForm, {
  StateForm as FormStateForm
} from "@/assemblies/start/StartLoginForm.vue";

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: STORES
import Store from "@/store";

export default {
  name: "StartLogin",

  components: {
    StartLoginForm
  },

  data() {
    return {
      // --> STATES <--

      isFormLoading: false
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    async onFormSubmit(form: FormStateForm): Promise<void> {
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
          // Reload global config after a successful log in since some
          // data needs authentication and couldn’t be queried earlier.
          Store.$globalConfig.loadGlobalConfig(true);

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
$c: ".v-start-login";

#{$c} {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.98),
      rgba(255, 255, 255, 0.98)
    ),
    url("/images/components/base/BaseTopography.svg");
  background-size: 35%;

  #{$c}__header {
    position: absolute;
    z-index: 10;
    top: 2px;
    left: 46px;
  }

  #{$c}__form {
    flex: 0 0 auto;

    > * {
      pointer-events: initial;
    }
  }

  // --> CONTEXTS <--

  &--context-application {
    #{$c}__box {
      background-color: transparent;
      border-block: 0 none;
      backdrop-filter: none;
    }
  }

  // --> BOOLEANS <--

  &--translucent {
    background-color: rgba(var(--color-background-primary), 0.94);
  }
}
</style>
