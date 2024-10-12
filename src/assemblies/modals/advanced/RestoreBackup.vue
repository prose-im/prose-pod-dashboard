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
  title="Restore this Pod from backup"
  buttonColor="red"
  buttonLabel="Restore This Backup"
)
  .a-restore-backup
    .a-restore-backup__top
      base-modal-input-block(
        label="Password verification"
        placeholder="Enter your account password..."
      )

      base-modal-disclaimer(
        warning="Beware!  Restoring a backup may result in data loss."
        description="Whenever you hit restore, your server will be erased, similarly to doing a factory reset. \nOnce cleaned up, the settings will be restored. Then, the data archive will be imported."
      )

    base-modal-confirm-field(
      text="I confirm that I am aware of the risks of data loss"
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
import AdvancedDnsTableRow from '@/components/advanced/AdvancedDnsTableRow.vue';

export default {
  name: "RestoreBackup",

  components: {
    AdvancedDnsTableRow,
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
$c: ".a-restore-backup";

#{$c} {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-inline: 48px;
  font-family: $font-family-default;



}

</style>
        