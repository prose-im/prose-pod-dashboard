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
  :visible="visibility"
  title="Factory reset this Pod"
  title-color="red"
  button-color="red"
  button-label="Run Factory Reset"
  :flex-container="true"
  @close="$emit('close')"
  @confirm="onProceed"
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
        label="Password verification"
        placeholder="Enter your account password..."
        type="password"
      )

    .a-factory-reset__confirm
      form-checkbox(
        v-model="downloadConfirmed"
        class="a-factory-reset__confirm--upper"
        size="mid"
        bold="semibold"
      )
        | I have downloaded a recent backup of this Pod

      form-checkbox(
        v-model="dataLossConfirmed"
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
    return {
      // --> STATE <--

      downloadConfirmed: false,
      dataLossConfirmed: false,

      password: ""
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--
    onProceed() {
      // Check if the whole form was filled
      if (!this.password) {
        BaseAlert.error("Please enter your password");
      } else if (!this.downloadConfirmed || !this.dataLossConfirmed) {
        BaseAlert.error(
          "Please confirm that you have read and accept all the conditions"
        );
      } else {
        // Reset state
        this.password = "";

        this.downloadConfirmed = false;
        this.dataLossConfirmed = false;

        // Close modal
        this.$emit("close");
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
