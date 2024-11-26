/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";
import mitt from "mitt";
import store from "..";

// PROJECT: BROKER
// import Broker from "@/broker";

/**************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

/**************************************************************************
 * TYPES
 * ************************************************************************* */

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface Backup {
  frequency: string;
  time: string;
}

interface BackupSettings {
  podBackup: Backup;
  userDataBackup: Backup;
}

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * CONSTANTS
 * ************************************************************************* */

const LOCAL_STATES = {
  loaded: false
};

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $settingsBackup = defineStore("settingsBackup", {
  state: (): BackupSettings => {
    return {
      podBackup: {
        frequency: "",
        time: "01"
      },

      userDataBackup: {
        frequency: "",
        time: "02"
      }
    };
  },

  getters: {
    getBackupSettings: function () {
      return (): BackupSettings => {
        return {
          podBackup: this.podBackup,
          userDataBackup: this.userDataBackup,
        };
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadConfig(reload = false): Promise<void> {
      // Load channels? (or reload)
      await store.$globalConfig.loadGlobalConfig();

      const response = await store.$globalConfig.getGlobalConfig();

      this.$patch(() => {
        this.podBackup.frequency = response.settings_backup_interval;
        this.userDataBackup.frequency = response.user_data_backup_interval;
      })

      // Mark as loaded
      LOCAL_STATES.loaded = true;
    },
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export type { BackupSettings, Backup };
export default $settingsBackup;
