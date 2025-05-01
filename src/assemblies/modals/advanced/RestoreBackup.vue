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
  @close="onClose"
  @confirm="onProceed"
  :visible="visibility"
  :flex-container="true"
  title="Restore this Pod from backup"
  button-color="red"
  button-label="Restore This Backup"
)
  .a-restore-backup
    .a-restore-backup__top
      .a-restore-backup__uploads
        h4
          | Upload backups

        .a-restore-backup__block(
          class="a-restore-backup--flex"
        )
          .a-restore-backup__subblock
            .a-restore-backup__subblock--content
              .a-restore-backup__step(
                class="a-restore-backup--flex"
              )
                p
                  | 1️⃣  Please upload a&nbsp;

                p.a-restore-backup--blue
                  | .settings.backup

                p
                  | &nbsp;file:

              base-upload-button(
                @file-picked="onSettingsFilePicked"
                accept=".settings.backup"
                label="Choose settings backup..."
                width="168px"
              )

              .a-restore-backup__uploaded(
                v-if="settingsBackupFileName"
              )
                p
                  | {{ settingsBackupFileName }}

                base-icon(
                  class="a-restore-backup__uploaded--icon"
                  name="checkmark.circle.fill"
                  fill="#05c02b"
                  size="12px"
                )

          .a-restore-backup__subblock(
            :class=`[
              {
                "a-restore-backup--opaque" : !settingsBackupFile
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

              base-upload-button(
                @file-picked="onDataFilePicked"
                :disabled="!settingsBackupFile"
                accept=".data.backup"
                label="Choose data backup..."
                width="150px"
              )

              .a-restore-backup__uploaded(
                v-if="dataBackupFileName"
              )
                p
                  | {{ dataBackupFileName }}

                base-icon(
                  class="a-restore-backup__uploaded--icon"
                  name="checkmark.circle.fill"
                  fill="#05c02b"
                  size="12px"
                )

      base-modal-input-block(
        v-model="password"
        class="a-restore-backup__input-block"
        label="Password verification"
        placeholder="Enter your account password..."
        type="password"
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
import BaseAlert from "@/components/base/BaseAlert.vue";

export default {
  name: "RestoreBackup",

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

      dataLossConfirmed: false,

      password: "",

      settingsBackupFile: null as File | null,
      settingsBackupFileName: "",

      dataBackupFile: null as File | null,
      dataBackupFileName: ""
    };
  },

  methods: {
    // --> EVENT LISTENERS <--

    async onSettingsFilePicked(event: Event) {
      let file = (event.target as HTMLInputElement).files?.[0];

      if (file) {
        const fileType = file.type.split("/")[1];

        if (fileType !== "jpeg") {
          BaseAlert.error("Please choose a .settings.backup file");

          return;
        }

        this.settingsBackupFile = file;
        this.settingsBackupFileName = file.name;
      }
    },

    async onDataFilePicked(event: Event) {
      let file = (event.target as HTMLInputElement).files?.[0];

      if (file) {
        const fileType = file.type.split("/")[1];

        if (fileType !== "jpeg") {
          BaseAlert.error("Please choose a .data.backup file");

          return;
        }

        this.dataBackupFile = file;
        this.dataBackupFileName = file.name;
      }
    },

    // --> HELPERS <--

    onProceed() {
      // Check if the whole form was filled
      if (!this.settingsBackupFile || !this.dataBackupFile) {
        BaseAlert.error("Please upload your backup files");
      } else if (!this.password) {
        BaseAlert.error("Please enter your password");
      } else if (!this.dataLossConfirmed) {
        BaseAlert.error(
          "Please confirm that you have read and accept all the conditions"
        );
      } else {
        // Reset state and close modal
        this.onClose();
      }
    },

    onClose() {
      // Reset state
      this.dataBackupFile = null;
      this.settingsBackupFile = null;

      this.dataBackupFileName = "";
      this.settingsBackupFileName = "";

      this.password = "";
      this.dataLossConfirmed = false;

      // Close modal
      this.$emit("close");
    }
  }
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

  #{$c}__block {
    border-radius: 7px;
    border: 1px solid $color-border-secondary;
  }

  #{$c}__subblock {
    position: relative;
    font-size: ($font-size-baseline - 1.5px);
    padding-block: 15.5px 19.5px;
    width: 50%;

    p {
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

  #{$c}__uploads {
    margin-bottom: 38px;

    h4 {
      color: $color-text-secondary;
      margin-top: 0;
      margin-bottom: 11px;
      margin-left: 8px;
      font-weight: $font-weight-medium;
    }
  }

  #{$c}__uploaded {
    color: $color-base-green-normal;
    font-weight: $font-weight-mid;
    margin-block-start: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    &--icon {
      margin-inline-start: 5px;
    }
  }

  #{$c}__file {
    position: absolute;
    cursor: pointer;
    width: 120px;
    left: 18%;
    opacity: 0;
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
