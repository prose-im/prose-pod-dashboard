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
 
// PROJECT: BROKER
import APIServerConfiguration from '@/api/providers/serverConfiguration';

// STORE
import store from "..";

//TYPES
import { ServerConfig } from "@/api/providers/global";

/**************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

/**************************************************************************
 * TYPES
 * ************************************************************************* */

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */
interface ServerConfigUi {
  messaging: MessagingConfig;
  files: FilesConfig;
}

interface MessagingConfig {
  archiveEnabled: boolean;
  messageRetentionTime: string;
}

interface FilesConfig {
  fileUploadEnabled: boolean;
  encryption: string;
  fileRetentionTime: string;
}

/**************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/**************************************************************************
 * TABLE
 * ************************************************************************* */

const $serverConfiguration = defineStore("serverConfiguration", {
  state: (): ServerConfig => {
    return {
      message_archive_enabled: false, 
      message_archive_retention: "P1Y", 
      file_upload_allowed: true, 
      file_storage_encryption_scheme: "",
      file_storage_retention: "infinite",
    };
  },

  getters: {
    getSettings: function () {
      return (): ServerConfigUi => {
        return {
          messaging: {
            archiveEnabled: this.message_archive_enabled,
            messageRetentionTime: this.message_archive_retention
          },
          files: {
            fileUploadEnabled: this.file_upload_allowed,
            encryption: this.file_storage_encryption_scheme,
            fileRetentionTime: this.file_storage_retention,
          }
        };
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    async loadServerConfiguration() { 
      await store.$globalConfig.loadGlobalConfig();

      const response = await store.$globalConfig.getGlobalConfig();
      // console.log('response', response)

      this.$patch(() => {
        this.message_archive_enabled = response.message_archive_enabled; 
        this.message_archive_retention = response.message_archive_retention; 
        this.file_upload_allowed = response.file_upload_allowed; 
        this.file_storage_encryption_scheme = response.file_storage_encryption_scheme;
        this.file_storage_retention = response.file_storage_retention;
      })
    },

    async toggleMessageArchiveEnabled(activated: boolean) {
      await APIServerConfiguration.updateMessageArchiveEnabled(activated);

      this.$patch(() => {
        this.message_archive_enabled = activated;
      })
    },

    async changeMessageRetentionTime(newTime: string): Promise<void> {
      await APIServerConfiguration.updateMessageRetentionTime(newTime)

      this.$patch(() => {
        this.message_archive_retention = newTime;
      })
    },

    async toggleFileUploadEnabled(allowed: boolean): Promise<void> {
      await APIServerConfiguration.updateFileUploadPermission(allowed)

      this.$patch(() => {
        this.file_upload_allowed = allowed;
      })
    },

    async changeFileEncryption(newEncryptionScheme: string): Promise<void> {
      await APIServerConfiguration.updateFileEncryptionScheme(newEncryptionScheme)

      this.$patch(() => {
        this.file_storage_encryption_scheme = newEncryptionScheme;
      })
    },

    async changeFileRetentionTime(newTime: string): Promise<void> {
      await APIServerConfiguration.updateFileRetentionTime(newTime) 

      this.$patch(() => {
        this.file_storage_retention = newTime;
      })
    },

    async restoreMessagingConfig(): Promise<void> {
      const response = await APIServerConfiguration.resetMessagesConfig();

      this.$patch(() => {
        this.message_archive_enabled = response.message_archive_enabled;
        this.message_archive_retention =response.message_archive_retention;
      })
    },

    async restoreMessageArchiveRetention(): Promise<void> {
      const response = await APIServerConfiguration.resetMessageRetentionTime();
      
      this.$patch(() => {
        this.message_archive_retention = response.message_archive_retention;
      })
    },

    async restoreFileConfig(): Promise<void> {
      const response = await APIServerConfiguration.resetFilesConfig();
      console.log('files', response);

      this.$patch(() => {
        this.file_upload_allowed = response.file_upload_allowed;
        this.file_storage_encryption_scheme = response.file_storage_encryption_scheme;
        this.file_storage_retention = response.file_storage_retention;
      })
    },
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export {};
export type { ServerConfig, MessagingConfig, FilesConfig };
export default $serverConfiguration;
