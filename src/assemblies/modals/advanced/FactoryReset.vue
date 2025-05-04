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
  :loading="isResetting"
  :disabled="isResetting"
  :flex-container="true"
  title="Factory reset this Pod"
  title-color="red"
  button-color="red"
  button-label="Run Factory Reset"
)
  .a-factory-reset
    .a-factory-reset__top
      base-modal-disclaimer(
        class="a-factory-reset__disclaimer"
        warning="Read this first:  Performing a factory reset will wipe all data."
        description="As soon as you run the factory reset, all data stored on this server will be wiped. In other words, this data will be permanently lost. The Pod will restart and show the configuration form that is visible on the first start.Please export a full backup first, that is, of your Pod settings and all user data. Store those backups in a safe place, as you might need them in the future to restore this server."
      )

      base-modal-input-block(
        v-model="password"
        :disabled="isResetting"
        label="Password verification"
        placeholder="Enter your account password..."
        type="password"
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

// PROJECT: API
import APIAuth from "@/api/providers/auth";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "FactoryReset",

  props: {
    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close"],

  data() {
    return this.initialState();
  },

  methods: {
    // --> HELPERS <--

    initialState() {
      return {
        hasDownloadedBackup: false,
        acceptsDataLoss: false,

        isResetting: false,

        password: ""
      };
    },

    // --> EVENT LISTENERS <--

    async onProceed() {
      // Check if the whole form was filled
      // FIXME: Check `hasDownloadedBackup` once [Export full backup · Issue \
      //   #131 · prose-im/prose-pod-api](https://github.com/prose-im/\
      //   prose-pod-api/issues/131) is fixed.
      if (!this.password) {
        return BaseAlert.error("Please enter your password");
      }

      if (!this.acceptsDataLoss) {
        return BaseAlert.error(
          "Please confirm that you have read and do accept all the conditions"
        );
      }

      if (!store.$account.$state.session.jid) {
        return BaseAlert.error("Internal error: Can’t find your JID");
      }

      // Mark as loading
      this.isResetting = true;

      const jid = store.$account.$state.session.jid;

      // Verify password (by performing a log-in)
      // TODO: this should be moved to 'performFactoryReset()'! this is by no \
      //   means secure, API-side.
      try {
        await APIAuth.login(jid, this.password);

        // Reset state
        Object.assign(this.$data, this.initialState());

        // Run factory reset
        await store.$globalConfig.performFactoryReset();

        // Alert that we are done
        BaseAlert.success(
          "Factory reset complete",
          "Your Pod needs to be set up again"
        );

        // Redirect to initialization page
        await this.$router.push({
          name: "start.init"
        });
      } catch (error) {
        this.isResetting = false;

        BaseAlert.error(
          "Could not run factory reset",
          "Did you enter an incorrect password?"
        );
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
  margin-inline: 48px;

  #{$c}__disclaimer {
    margin-top: 4px;
    margin-bottom: 31px;
  }

  #{$c}__confirm {
    &--upper {
      margin-bottom: 8px;
    }
  }
}
</style>
