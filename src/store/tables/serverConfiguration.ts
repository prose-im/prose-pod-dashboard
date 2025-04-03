/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024–2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";
import mitt from "mitt";

// PROJECT: BROKER
import APIServerConfig, {
  DEFAULT_SERVER_CONFIG
} from "@/api/providers/serverConfig";

// PROJECT: STORE
import store from "@/store/index";

// TYPES
import { ServerConfig } from "@/api/providers/serverConfig";

/* *************************************************************************
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

/* *************************************************************************
 * INSTANCES
 * ************************************************************************* */

const EventBus = mitt();

/* *************************************************************************
 * TABLE
 * ************************************************************************* */

const $serverConfiguration = defineStore("serverConfiguration", {
  state: (): ServerConfig => {
    return DEFAULT_SERVER_CONFIG;
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
            fileRetentionTime: this.file_storage_retention
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
        this.file_storage_encryption_scheme =
          response.file_storage_encryption_scheme;
        this.file_storage_retention = response.file_storage_retention;
      });
    },

    async toggleMessageArchiveEnabled(activated: boolean) {
      await APIServerConfig.setMessageArchiveEnabled(activated);

      this.$patch(() => {
        this.message_archive_enabled = activated;
      });
    },

    async changeMessageRetentionTime(newTime: string): Promise<void> {
      await APIServerConfig.setMessageArchiveRetention(newTime);

      this.$patch(() => {
        this.message_archive_retention = newTime;
      });
    },

    async toggleFileUploadEnabled(allowed: boolean): Promise<void> {
      await APIServerConfig.setFileUploadAllowed(allowed);

      this.$patch(() => {
        this.file_upload_allowed = allowed;
      });
    },

    async changeFileEncryption(newEncryptionScheme: string): Promise<void> {
      await APIServerConfig.setFileStorageEncryptionScheme(newEncryptionScheme);

      this.$patch(() => {
        this.file_storage_encryption_scheme = newEncryptionScheme;
      });
    },

    async changeFileRetentionTime(newTime: string): Promise<void> {
      await APIServerConfig.setFileStorageRetention(newTime);

      this.$patch(() => {
        this.file_storage_retention = newTime;
      });
    },

    async restoreMessagingConfig(): Promise<void> {
      const defaultValue = await APIServerConfig.resetMessagingConfig();

      this.$patch(() => {
        this.message_archive_enabled = defaultValue.message_archive_enabled;
        this.message_archive_retention = defaultValue.message_archive_retention;
      });
    },

    async restoreMessageArchiveRetention(): Promise<void> {
      const defaultValue = await APIServerConfig.resetMessageArchiveRetention();

      this.$patch(() => {
        this.message_archive_retention = defaultValue;
      });
    },

    async restoreFileConfig(): Promise<void> {
      const defaultValue = await APIServerConfig.resetFilesConfig();
      console.log("files", defaultValue);

      this.$patch(() => {
        this.file_upload_allowed = defaultValue.file_upload_allowed;
        this.file_storage_encryption_scheme =
          defaultValue.file_storage_encryption_scheme;
        this.file_storage_retention = defaultValue.file_storage_retention;
      });
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export {};
export type { ServerConfig, MessagingConfig, FilesConfig };
export default $serverConfiguration;
