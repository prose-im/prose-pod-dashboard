/*
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 */

/**************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";
import mitt from "mitt";

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
  frequency: string,
  time: string,
}

interface BackupSettings {
  podBackup: Backup,
  userDataBackup: Backup,
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
  persist: false,

  state: (): BackupSettings => {
    return {
      podBackup:{
        frequency: '',
        time: '',
      },

      userDataBackup:{
        frequency: '',
        time: '',
      }
    };
  },

  getters: {
    getBackupSettings: function () {
      return (): BackupSettings => {
        return this;
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async load(reload = false): Promise<ChannelList> {
      // Load channels? (or reload)
      if (LOCAL_STATES.loaded === false || reload === true) {
        // Initialize entries
        const entries: ChannelList = [];

        // Load all public channels
        const publicChannels = await Broker.$channel.loadPublicChannels();

        publicChannels.forEach(publicChannel => {
          entries.push({
            type: ChannelType.Public,
            jid: publicChannel.jid.toString(),
            name: publicChannel.name
          });
        });

        this.$patch(state => {
          state.list = entries;
        });

        // Mark as loaded
        LOCAL_STATES.loaded = true;
      }

      return this.list;
    },

    markChannelsChanged(): void {
      EventBus.emit("channels:changed");
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export type { BackupSettings, Backup };
export default $settingsBackup;
