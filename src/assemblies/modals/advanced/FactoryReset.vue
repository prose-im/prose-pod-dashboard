<!--
* This file is part of prose-app-web
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
  buttonColor="red"
  buttonLabel="Run Factory Reset"
)
  .a-factory-reset
    base-modal-disclaimer(
      warning="Read this first:  Performing a factory reset will wipe all data."
      description="As soon as you run the factory reset, all data stored on this server will be wiped. In other words, this data will be permanently lost. The Pod will restart and show the configuration form that is visible on the first start.Please export a full backup first, that is, of your Pod settings and all user data. Store those backups in a safe place, as you might need them in the future to restore this server."
    )

    base-modal-input-block(
      label="Password verification"
      placeholder="Enter your account password..."
    )

    .a-factory-reset__confirm
      base-modal-confirm-field(
        text="I have downloaded a recent backup of this Pod"
      )

      base-modal-confirm-field(
        text="I confirm that I am aware that all data will be erased"
      )
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalConfirmField from '@/components/base/modal/BaseModalConfirmField.vue';
import BaseModalDisclaimer from '@/components/base/modal/BaseModalDisclaimer.vue';
import BaseModalInputBlock from '@/components/base/modal/BaseModalInputBlock.vue';

export default {
  name: "FactoryReset",

  components: {
    BaseModal,
    BaseModalConfirmField,
    BaseModalDisclaimer,
    BaseModalInputBlock,
  },

  props: {

  },

  emits: ["close", "proceed"],

  data() {
    return {
      // --> STATE <--
      
    };
  },

  computed: {},

  watch: {},

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
  margin-inline: 48px;
  font-family: $font-family-default;

  #{$c}__step{
    margin-top: 0;
    margin-bottom: 16px;
    margin-left: 10.5px;
  }

  #{$c}__table{
    border: 1px solid $color-border-primary;
    margin-bottom: 27px;

    &--one--row{
      p:first-child{
        min-width: 15%;
        margin-left: 0;
      }

      p:nth-child(2){
        min-width: 6%;
        margin-left: 6.5%;
      }

      p:nth-child(3){
        margin-left: 4%;
      }

      p:nth-child(4){
        margin-left: 5%;
      }

    }

    &--two--row{
      p:first-child{
        min-width: 9%;
        margin-left: 0;
      }

      p:nth-child(2){
        min-width: 4.5%;
        margin-left: 7%;
      }

      p:nth-child(3){
        min-width: 5%;
        margin-left: 6.5%;
      }

      p:nth-child(4){
        min-width: 4%;
        margin-left: 4%;
      }

      p:nth-child(5){
        min-width: 7%;
        margin-left: 3%;
      }      
      
      p:nth-child(6){
        min-width: 4.5%;
        margin-left: 5%;
      }

      p:nth-child(7){
        margin-left: 4.5%;
      }
    }
  }

  h3{
    font-weight: $font-weight-bolder;
    font-size: ($font-size-baseline + 4px);
    padding-left: 10px;
    padding-bottom: 14px;
    border-bottom: 1px solid $color-border-secondary;
    margin-bottom: 19px;
  }
}

</style>
        