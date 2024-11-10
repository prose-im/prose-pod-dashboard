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

  .v-start-login__box
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
import BaseIdentityBadge from "@/components/base/BaseIdentityBadge.vue";

// PROJECT: STORES
import Store from "@/store";

export default {
  name: "StartLogin",

  components: {
    BaseIdentityBadge,
    StartLoginForm
  },

  data() {
    return {
      // --> DATA <--

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
  background-color: $color-background-primary;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  #{$c}__header {
    position: absolute;
    z-index: 10;
    top: 2px;
    left: 46px;
  }

  #{$c}__box {
    background-color: $color-white;
    border: 1px solid rgba($color-base-purple-light, 0.35);
    pointer-events: none;
    border-radius: 18px;
    backdrop-filter: blur(20px);
    box-shadow: 0 2px 4px 0 rgba($color-black, 0.03);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 71px 81px;
    padding-inline: 110px;
    overflow: auto;
    position: relative;
    z-index: 1;

    #{$c}__form {
      flex: 0 0 auto;

      > * {
        pointer-events: initial;
      }
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
