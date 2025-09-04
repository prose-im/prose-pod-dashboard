<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
base-modal(
  @close="$emit('close')"
  @confirm="onProceed"
  :visible="visibility"
  :disabled="isResetting || !password"
  :flex-container="true"
  :loading="isResetting"
  title="Factory reset this Pod"
  title-color="red"
  button-color="red"
  button-label="Run Factory Reset"
)
  .a-factory-reset
    .a-factory-reset__top
      img(
        src="/images/components/illustrations/factory.reset.webp"
      )

      vee-form(
        v-slot="{ errors, meta }"
        @submit="onProceed"
        ref="veeFormInstance"
      )
        base-modal-disclaimer(
          :description="disclaimerDescription"
          warning="Read this first:  Performing a factory reset will wipe all data."
          class="a-factory-reset__disclaimer"
        )

        base-modal-input-block(
          v-model="password"
          :disabled="isResetting"
          :display-error="errors?.password && meta.touched"
          :rules="{required: true}"
          error-message="This field is required"
          label="Password verification"
          name="password"
          placeholder="Enter your account password..."
          type="password"
          autofocus
        )

    .a-factory-reset__confirm
      form-checkbox(
        v-model="hasDownloadedBackup"
        class="a-factory-reset__confirm--upper"
        size="mid"
        bold="semibold"
        disabled
      )
        | I have downloaded a recent backup of this Pod

      form-checkbox(
        v-model="acceptsDataLoss"
        :disabled="isResetting"
        size="mid"
        bold="semibold"
        label-color="red"
      )
        | I confirm that I am aware that all data will be erased
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAlert from "@/components/base/BaseAlert.vue";

// PROJECT: VEE-VALIDATE
import { Form as VeeForm } from "vee-validate";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "FactoryReset",

  components: {
    VeeForm
  },

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--

      hasDownloadedBackup: false,
      acceptsDataLoss: false,

      isResetting: false,

      password: "",

      // --> DATA <--

      disclaimerDescription: [
        "As soon as you run the factory reset, all data stored on this server will be wiped. In other words, this data will be permanently lost. The Pod will restart and show the configuration form that is visible on the first start.",
        "Please export a full backup first, that is, of your Pod settings and all user data. Store those backups in a safe place, as you might need them in the future to restore this server."
      ]
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    async onProceed() {
      // Check if the whole form was filled
      // TODO: Check `hasDownloadedBackup` once [Export full backup · Issue \
      //   #131 · prose-im/prose-pod-api](https://github.com/prose-im/\
      //   prose-pod-api/issues/131) is fixed.
      if (
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).meta.valid
      ) {
        if (!this.password) {
          return BaseAlert.error(
            "Please enter your password",
            "We need to make sure that it's you!"
          );
        }

        if (!this.acceptsDataLoss) {
          return BaseAlert.error(
            "Please accept all conditions",
            "Confirm that you are aware that all data will be erased"
          );
        }

        // Mark as loading
        this.isResetting = true;

        // Verify password (by performing a log-in)
        try {
          // Run factory reset
          await store.$globalConfig.performFactoryReset(this.password);

          // Alert that we are done
          BaseAlert.success(
            "Factory reset complete",
            "Your Pod needs to be set up again"
          );

          // Redirect to initialization page
          await this.$router.push({
            name: "start.init"
          });
        } catch {
          this.isResetting = false;

          BaseAlert.error(
            "Could not run factory reset",
            "Did you enter an incorrect password?"
          );
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
$c: ".a-factory-reset";

#{$c} {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  img {
    max-width: 260px;
    display: flex;
    margin-inline: auto;
    margin-block: 10px;
  }

  #{$c}__disclaimer {
    margin-top: 20px;
    margin-bottom: 31px;
  }

  #{$c}__confirm {
    &--upper {
      margin-bottom: 8px;
    }
  }
}
</style>
