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

              .a-restore-backup--flex(
                class="a-restore-backup__step"
              )
                p 
                  | 1️⃣  Please upload a&nbsp;
                p.a-restore-backup--blue 
                  | .settings.backup 
                p 
                  | &nbsp;file:
              
              base-button(
                tint="white"
              )
                | Choose settings backup...

          .a-restore-backup__subblock(
            :class=`[
              {
                "a-restore-backup--opaque" : noSettings
              }
            ]`
          )
            .a-restore-backup__subblock--content
              .a-restore-backup--flex(
                class="a-restore-backup__step"
              )
                p 
                  | 2️⃣  Please upload a&nbsp;
                p.a-restore-backup--blue 
                  | .data.backup 
                p 
                  | &nbsp;archive:

              base-button(
                tint="white"
                :disabled="noSettings"
              )
                | Choose data backup...
          
            <!-- .a-restore-backup__filter -->

      base-modal-input-block(
        class="a-restore-backup__input-block"
        label="Password verification"
        placeholder="Enter your account password..."
      )

      base-modal-disclaimer(
        warning="Beware!  Restoring a backup may result in data loss."
        description="Whenever you hit restore, your server will be erased, similarly to doing a factory reset. \nOnce cleaned up, the settings will be restored. Then, the data archive will be imported."
      )

    form-checkbox(
      v-model="dataLossConfirmed"
      size="mid"
      bold="semibold"
    )
      | I confirm that I am aware of the risks of data loss
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseButton from '@/components/base/BaseButton.vue';
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalDisclaimer from '@/components/base/modal/BaseModalDisclaimer.vue';
import BaseModalInputBlock from '@/components/base/modal/BaseModalInputBlock.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';

export default {
  name: "RestoreBackup",

  components: {
    BaseButton,
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
      noSettings: true,

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
  margin-inline: 48px;
  font-family: $font-family-default;

  #{$c}__block {
    border-radius: 7px;
    border: 1px solid $color-border-secondary;
  }

  #{$c}__subblock {
    position: relative;
    font-size: ($font-size-baseline - 1.5px);
    padding-block: 15.5px 19.5px;
    width: 50%;

    p{
      margin-block: 0;
    }
    
    &--content {
      max-width: max-content;
      min-width: 151px;
      margin-inline: auto;
    }

    &:first-child {
      border-right: 1px solid $color-border-secondary;  
      min-width: 168px;

    }
  }

  #{$c}__step {
    flex-flow: row wrap;
    margin-bottom: 12px;
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
    justify-content: center;
  }

  &--blue {
    color: $color-base-purple-normal;
    font-weight: $font-weight-medium;
  }

  &--opaque {
    opacity: 0.4;
  }
}

</style>
        