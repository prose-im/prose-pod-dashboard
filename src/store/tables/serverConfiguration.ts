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
import ServerConfiguration from "@/api/serverConfiguration";

/**************************************************************************
 * ENUMERATIONS
 * ************************************************************************* */

/**************************************************************************
 * TYPES
 * ************************************************************************* */

/**************************************************************************
 * INTERFACES
 * ************************************************************************* */

interface ServerConfig {
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
      messaging: {
        archiveEnabled: false,
        messageRetentionTime: "1 year"
      },

      files: {
        fileUploadEnabled: true,
        encryption: "Encrypted (AES-256)",
        fileRetentionTime: "1 year"
      }
    };
  },

  getters: {
    getSettings: function () {
      return (): ServerConfig => {
        return {
          messaging: this.messaging,
          files: this.files
        };
      };
    }
  },

  actions: {
    events(): ReturnType<typeof mitt> {
      // Return event bus
      return EventBus;
    },

    toggleMessageArchiveEnabled(): void {
      // ServerConfiguration.updateMessageArchiveEnabled(!this.messaging.archiveEnabled);
      this.messaging.archiveEnabled = !this.messaging.archiveEnabled;
    },

    changeMessageRetentionTime(newTime: string): void {
      // ServerConfiguration.updateMessageRetentionTime(newTime);
      this.messaging.messageRetentionTime = newTime;
    },

    toggleFileUploadEnabled(): void {
      // ServerConfiguration.updateMessageArchiveEnabled(!this.messaging.archiveEnabled);
      this.files.fileUploadEnabled = !this.files.fileUploadEnabled;
    },

    changeFileEncryption(newEncryption: string): void {
      // ServerConfiguration.updateMessageRetentionTime(newTime);
      this.files.encryption = newEncryption;
      console.log("toggled");
    },

    changeFileRetentionTime(newTime: string): void {
      // ServerConfiguration.updateMessageRetentionTime(newTime);
      this.files.fileRetentionTime = newTime;
    }
  }
});

/**************************************************************************
 * EXPORTS
 * ************************************************************************* */

export {};
export type { ServerConfig, MessagingConfig, FilesConfig };
export default $serverConfiguration;
