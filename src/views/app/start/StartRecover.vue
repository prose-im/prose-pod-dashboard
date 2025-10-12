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
  class="v-start-recover"
)
  start-recover-form(
    @submit="onFormSubmit"
    :loading="isFormLoading"
    class="v-start-recover__form"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: ASSEMBLIES
import StartRecoverForm, {
  StateForm
} from "@/assemblies/start/StartRecoverForm.vue";

// PROJECT: API
import APIAuth from "@/api/providers/auth";

// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: COMMONS
import { ErrorFromResponse } from "@/commons/errors";

// PROJECT: STORES
import Store from "@/store";

export default {
  name: "StartRecover",

  components: {
    StartRecoverForm
  },

  props: {
    token: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      // --> STATES <--

      isFormLoading: false
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    async onFormSubmit(form: StateForm): Promise<void> {
      if (this.isFormLoading !== true) {
        // Mark as loading
        this.isFormLoading = true;

        try {
          // Reset password
          await APIAuth.setPasswordResetTokensUse(this.token, form.password);

          // Redirect to login page (this acknowledges password change)
          await this.$router.push({
            name: "start.login",
            query: { action: "recover" }
          });
        } catch (error) {
          const typedError = error as ErrorFromResponse;

          BaseAlert.error(
            "Could not change password",
            typedError.response?.data?.message || "Unknown reason"
          );

          // Mark as not loading
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
$c: ".v-start-recover";

#{$c} {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
