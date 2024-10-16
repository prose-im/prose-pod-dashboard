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
  :flexContainer="true"
)
  .a-restore-backup
    .a-restore-backup__top
      .a-restore-backup__upload
        h4
          | Upload backups

        .a-restore-backup__block(
          class="a-restore-backup--flex"
        )
          .a-restore-backup__subblock
            .a-restore-backup__subblock--content

              .a-restore-backup--flex
                p 1️⃣  Please upload a 
                p.a-restore-backup--blue .settings.backup 
                p file:
              
              base-button(
                tint="white"
              )
                | Choose settings backup...

          .a-restore-backup__subblock
            .a-restore-backup__subblock--content

              .a-restore-backup--flex
                p 2️⃣  Please upload a 
                p.a-restore-backup--blue .data.backup 
                p archive:

              base-button(
                tint="white"
              )
                | Choose data backup...

      base-modal-input-block(
        class="a-restore-backup__input-block"
        label="Password verification"
        placeholder="Enter your account password..."
      )

      base-modal-disclaimer(
        warning="Beware!  Restoring a backup may result in data loss."
        description="`Whenever you hit restore, your server will be erased, similarly to doing a factory reset. \nOnce cleaned up, the settings will be restored. Then, the data archive will be imported.`"
      )

    base-modal-confirm-field(
      v-model="dataLossConfirmed"
      text="I confirm that I am aware of the risks of data loss"
    )
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseButton from '@/components/base/BaseButton.vue';
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalConfirmField from '@/components/base/modal/BaseModalConfirmField.vue';
import BaseModalDisclaimer from '@/components/base/modal/BaseModalDisclaimer.vue';
import BaseModalInputBlock from '@/components/base/modal/BaseModalInputBlock.vue';

export default {
  name: "RestoreBackup",

  components: {
    BaseButton,
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
      dataLossConfirmed: false
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
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-inline: 48px;
  font-family: $font-family-default;

  #{$c}__block {
    border-radius: 7px;
    border: 1px solid $color-border-secondary;
  }

  #{$c}__subblock {
    font-size: ($font-size-baseline - 3px);
    padding-block: 15.5px 19.5px;
    width: 50%;
    

    &--content {
      width: max-content;
      margin-inline: auto;
    }

    &:first-child{
      border-right: 1px solid $color-border-secondary;  
    }
  }

  #{$c}__upload {
    margin-bottom: 38px;


    h4{
      color:$color-text-secondary;
      margin-top: 0;
      margin-bottom: 11px;
      margin-left: 8px;
      font-weight: $font-weight-medium;
    }
  }

  #{$c}__input-block {
    margin-bottom: 38px;
  }

  &--flex {
    display: flex;
  }

  &--blue {
    color: $color-base-purple-normal;
    font-weight: $font-weight-medium;

    &:before,
    &:after {
      content: "\00a0";
    }
  }

}

</style>
        