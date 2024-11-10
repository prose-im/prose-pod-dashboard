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
  @confirm="$emit('proceed')"
  title="Factory reset this Pod"
  titleColor="red"
  buttonColor="red"
  buttonLabel="Run Factory Reset"
  :flexContainer="true"
)
  .a-factory-reset
    .a-factory-reset__top
      base-modal-disclaimer(
        class="a-factory-reset__disclaimer"
        warning="Read this first:  Performing a factory reset will wipe all data."
        description="As soon as you run the factory reset, all data stored on this server will be wiped. In other words, this data will be permanently lost. The Pod will restart and show the configuration form that is visible on the first start.Please export a full backup first, that is, of your Pod settings and all user data. Store those backups in a safe place, as you might need them in the future to restore this server."
      )

      base-modal-input-block(
        label="Password verification"
        placeholder="Enter your account password..."
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
        labelColor="red"
      )
        |I confirm that I am aware that all data will be erased
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalDisclaimer from '@/components/base/modal/BaseModalDisclaimer.vue';
import BaseModalInputBlock from '@/components/base/modal/BaseModalInputBlock.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';

export default {
  name: "FactoryReset",

  components: {
    BaseModal,
    BaseModalDisclaimer,
    BaseModalInputBlock,
    FormCheckbox
  },

  props: {

  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      downloadConfirmed: false,
      dataLossConfirmed: false
    };
  },

  computed: {},

  watch: {

  },

  created() {},

  methods: {
    // --> HELPERS <--
  },
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
  font-family: $font-family-default;

  #{$c}__disclaimer{
    margin-top: 4px;
    margin-bottom: 31px;
  }

  #{$c}__confirm{
    &--upper {
      margin-bottom: 8px;
    }
  }
}
</style>
        