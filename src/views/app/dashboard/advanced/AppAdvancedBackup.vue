<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-advanced-backup
  base-subsection(
    v-model="config"
    @update="onBackupUpdate"
    :items="backupItems"
    title="Backup Settings"
  )

  base-subsection(
    :items="exportItems"
    title="Export Data"
  )

  base-subsection(
    :items="dangerItems"
    title="Danger Zone"
    title-color="red"
    sup="tm"
  )

<!-- MODALS -->

restore-backup(
  v-if="activeModal === 'restore'"
  @close="toggleRestoreModalVisible"
  :visibility="restoreModalVisibility"
)

factory-reset(
  v-if="activeModal === 'reset'"
  @close="toggleResetModalVisible"
  :visibility="resetModalVisibility"
)
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: ASSEMBLIES
import FactoryReset from "@/assemblies/modals/advanced/FactoryReset.vue";
import RestoreBackup from "@/assemblies/modals/advanced/RestoreBackup.vue";

// PROJECT: STORE
import store from "@/store";

// ENUMERATIONS
enum BackupKey {
  PodSettings = "podBackup",
  UserData = "userDataBackup"
}

enum TimeVariable {
  Frequency = "frequency",
  Time = "time"
}

export default {
  name: "AppAdvancedBackup",

  components: {
    FactoryReset,
    RestoreBackup
  },

  data() {
    return {
      // --> STATE <--

      activeModal: null as string | null,

      restoreModalVisibility: false,
      resetModalVisibility: false,

      // --> DATA <--

      backupItems: [
        {
          subtitle: "Automatic backup of Pod settings",
          description:
            "The settings of your Prose Pod are backed up periodically and can be restored if you make a mistake, or if you want to transfer your Pod settings to a new server.",
          type: "doubleSelect",
          disabled: true,

          typeProps: {
            options: [
              {
                label: "Daily",
                value: "P1D"
              },

              {
                label: "Weekly",
                value: "P1W"
              }
            ],

            secondOptions: [
              {
                label: "at 1am",
                value: "01"
              },

              {
                label: "at 2am",
                value: "02"
              }
            ],

            size: "medium",
            minWidth: "94px"
          }
        },

        {
          subtitle: "Automatic backup of Pod user data",
          description:
            "All your Prose Pod user data gets backed up periodically and can be restored to a new server anytime. Note that user data backups can be quite heavy depending on your workspace size.",
          type: "doubleSelect",
          disabled: true,

          typeProps: {
            options: [
              {
                label: "Daily",
                value: "P1D"
              },

              {
                label: "Weekly",
                value: "P1W"
              }
            ],

            secondOptions: [
              {
                label: "at 1am",
                value: "01"
              },

              {
                label: "at 2am",
                value: "02"
              }
            ],

            size: "medium",
            minWidth: "94px"
          }
        }
      ],

      exportItems: [
        {
          subtitle: "Export full backup",
          description:
            "A full backup, containing your Prose Pod settings and all user data, can be downloaded from there. This is a manual backup which contains everything. It can be quite heavy.",
          type: "button",
          disabled: true,
          color: "bwPurple",

          typeProps: {
            label: "Download backup",
            size: "mid-medium"
          }
        }
      ],

      dangerItems: [
        {
          subtitle: "Restore from backup",
          description:
            "This will erase all data on your Pod (all settings and all user data), essentially performing a factory reset. It then imports everything back again from an automated or manual backup.",
          type: "button",
          disabled: true,
          action: this.toggleRestoreModalVisible,

          typeProps: {
            label: "Restore from backup…",
            size: "mid-medium"
          }
        },

        {
          subtitle: "Erase everything",
          description:
            "This will erase all data on your Pod (all settings and all user data). Your Pod will then restart and show the initial setup process, as if it was never used before.",
          type: "button",
          action: this.toggleResetModalVisible,
          color: "redShell",

          typeProps: {
            label: "Start factory reset…",
            size: "mid-medium"
          }
        }
      ]
    };
  },

  computed: {
    config() {
      return store.$settingsBackup.getBackupSettings();
    }
  },

  watch: {
    activeModal(newActiveModal) {
      this.restoreModalVisibility = false;
      this.resetModalVisibility = false;

      if (newActiveModal === "restore") {
        setTimeout(() => (this.restoreModalVisibility = true), 10);
      } else if (newActiveModal === "reset") {
        setTimeout(() => (this.resetModalVisibility = true), 10);
      }
    }
  },

  mounted() {
    return store.$settingsBackup.loadConfig();
  },

  methods: {
    // --> HELPERS <--

    toggleRestoreModalVisible() {
      if (this.activeModal === "restore") {
        this.activeModal = null;
      } else {
        this.activeModal = "restore";
      }
    },

    toggleResetModalVisible() {
      if (this.activeModal === "reset") {
        this.activeModal = null;
      } else {
        this.activeModal = "reset";
      }
    },

    // --> EVENT LISTENERS <--

    onBackupUpdate(
      newValue: string,
      changedKey: BackupKey,
      changedSubKey: TimeVariable
    ) {
      if (this.config[changedKey][changedSubKey] !== newValue) {
        switch (changedKey) {
          case "podBackup": {
            // TODO: implement this

            break;
          }
          case "userDataBackup": {
            // TODO: implement this

            break;
          }
        }
      }
    }
  }
};
</script>
