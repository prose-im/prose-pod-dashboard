/*
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2025, Prose Foundation
 */

/* *************************************************************************
 * IMPORTS
 * ************************************************************************* */

// NPM
import { defineStore } from "pinia";
import mitt from "mitt";

// PROJECT: API
import APIServerConfig, {
  DEFAULT_SERVER_CONFIG,
  FileStorageRetention,
  MessageArchiveRetention
} from "@/api/providers/serverConfig";
import { ServerConfig } from "@/api/providers/serverConfig";

// PROJECT: STORE
import store from "@/store";

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
  state: (): { value: ServerConfig } => {
    return { value: DEFAULT_SERVER_CONFIG };
  },

  getters: {
    getSettings: function () {
      return (): ServerConfigUi => {
        const serverConfig = this.value;

        return {
          messaging: {
            archiveEnabled: serverConfig.message_archive_enabled,
            messageRetentionTime: serverConfig.message_archive_retention
          },

          files: {
            fileUploadEnabled: serverConfig.file_upload_allowed,
            fileRetentionTime: serverConfig.file_storage_retention
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
      try {
        await store.$globalConfig.loadGlobalConfig();

        const serverConfig = store.$globalConfig.getServerConfig();

        this.$patch(() => {
          this.value = serverConfig;
        });
      } catch (error) {
        console.error(
          "Error when loading the global configuration:",
          JSON.stringify(error, null, 2)
        );
      }
    },

    async toggleMessageArchiveEnabled(activated: boolean) {
      const value = await APIServerConfig.setMessageArchiveEnabled(activated);

      this.$patch(() => {
        this.value.message_archive_enabled = value;
      });
    },

    async changeMessageRetentionTime(
      newTime: MessageArchiveRetention
    ): Promise<void> {
      const value = await APIServerConfig.setMessageArchiveRetention(newTime);

      this.$patch(() => {
        this.value.message_archive_retention = value;
      });
    },

    async toggleFileUploadEnabled(allowed: boolean): Promise<void> {
      const value = await APIServerConfig.setFileUploadAllowed(allowed);

      this.$patch(() => {
        this.value.file_upload_allowed = value;
      });
    },

    async changeFileRetentionTime(
      newTime: FileStorageRetention
    ): Promise<void> {
      const value = await APIServerConfig.setFileStorageRetention(newTime);

      this.$patch(() => {
        this.value.file_storage_retention = value;
      });
    },

    async restoreMessagingConfig(): Promise<void> {
      try {
        const defaultValue = await APIServerConfig.resetMessagingConfig();

        this.$patch(() => {
          this.value = { ...this.value, ...defaultValue };
        });
      } catch (error) {
        console.error(
          "Error when resetting the 'Messaging' configuration:",
          JSON.stringify(error, null, 2)
        );
      }
    },

    async restoreMessageArchiveRetention(): Promise<void> {
      try {
        const defaultValue =
          await APIServerConfig.resetMessageArchiveRetention();

        this.$patch(() => {
          this.value.message_archive_retention = defaultValue;
        });
      } catch (error) {
        console.error(
          "Error when resetting 'Message archive retention':",
          JSON.stringify(error, null, 2)
        );
      }
    },

    async restoreFileStorageRetention(): Promise<void> {
      try {
        const defaultValue = await APIServerConfig.resetFileStorageRetention();

        this.$patch(() => {
          this.value.file_storage_retention = defaultValue;
        });
      } catch (error) {
        console.error(
          "Error when resetting 'Message archive retention':",
          JSON.stringify(error, null, 2)
        );
      }
    },

    async restoreFileConfig(): Promise<void> {
      try {
        const defaultValue = await APIServerConfig.resetFilesConfig();

        this.$patch(() => {
          this.value = { ...this.value, ...defaultValue };
        });
      } catch (error) {
        console.error(
          "Error when resetting the 'Files' configuration:",
          JSON.stringify(error, null, 2)
        );
      }
    }
  }
});

/* *************************************************************************
 * EXPORTS
 * ************************************************************************* */

export default $serverConfiguration;
