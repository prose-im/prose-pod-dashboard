<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
.v-app-customization-emojis
  base-subsection(
    v-model="config.messaging"
    @update="onMessagingUpdate"
    title="Messaging"
    :items="messagingItems"
    :restore-option="true"
    :restore-action="onMessagingRestore"
    :restore-description="restoreMessagingDescription"
  )

  base-subsection(
    v-model="config.files"
    @update="onFileUpdate"
    title="Files"
    :items="filesItems"
    :restore-option="true"
    :restore-action="onFileRestore"
    :restore-description="restoreFilesDescription"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: STORE
import store from "@/store";

// ENUMERATIONS
enum MessagingKey {
  Archive = "archiveEnabled",
  RetentionTime = "messageRetentionTime"
}

enum FileKey {
  UploadEnabled = "fileUploadEnabled",
  Encryption = "encryption",
  RetentionTime = "fileRetentionTime"
}

export default {
  name: "AppServerConfiguration",

  data() {
    return {
      // --> STATE <--
      restoreMessagingDescription: [
        `Allow message archiving`,
        "Message archive retention time"
      ],

      restoreFilesDescription: [
        `File upload & share persmissions`,
        "File storage encryption and retention time"
      ],

      messagingItems: [
        {
          subtitle: "Store archives of all messages",
          description:
            "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type: "toggle"
        },

        {
          subtitle: "Message archive retention time",
          description:
            "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          restoreSubtitle: true,
          restoreAction: this.onRestoreMessageArchiveRetention,
          type: "select",
          typeProps: {
            options: [
              {
                label: "Keep forever",
                value: "infinite"
              },
              {
                label: "1 year",
                value: "P1Y"
              },
              {
                label: "2 years",
                value: "P2Y"
              }
            ]
          }
        }
      ],

      filesItems: [
        {
          subtitle: "Users can upload and share files",
          description:
            "File sharing is a must-have feature. It is recommended that file uploading is enabled. If however you'd like to prevent users from sharing files eg. for secrecy reasons, you can do so from there.",
          type: "toggle"
        },

        {
          subtitle: "File storage encryption",
          description:
            "Files are encrypted when stored on the server. Only the file recipients can decrypt the files. It is heavily recommended to keep file storage encryption enabled.",
          type: "select",
          disabled: true,
          typeProps: {
            options: [
              {
                label: "Encrypted (AES-256)",
                value: "AES-256"
              },
              {
                label: "Not encrypted",
                value: "Not Encrypted"
              }
            ]
          }
        },

        {
          subtitle: "Files retention time",
          description:
            "Files can be automatically removed from the server after a certain time, in order to free some space. Most of old files are never accessed again, therefore it is recommended to enable this policy.",
          type: "select",
          typeProps: {
            options: [
              {
                label: "Keep forever",
                value: "infinite"
              },
              {
                label: "1 year",
                value: "P1Y"
              },
              {
                label: "2 years",
                value: "P2Y"
              }
            ]
          }
        }
      ]
    };
  },

  computed: {
    config() {
      return store.$serverConfiguration.getSettings();
    }
  },

  mounted() {
    store.$serverConfiguration.loadServerConfiguration();
  },

  methods: {
    // --> EVENT LISTENERS <--

    onMessagingUpdate(newValue: boolean | string, changedKey: MessagingKey) {
      if (
        this.config.messaging[changedKey] !== undefined &&
        this.config.messaging[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "archiveEnabled": {
            if (typeof newValue === "boolean") {
              store.$serverConfiguration.toggleMessageArchiveEnabled(newValue);
            }
            break;
          }
          case "messageRetentionTime": {
            if (typeof newValue === "string") {
              store.$serverConfiguration.changeMessageRetentionTime(newValue);
            }
            break;
          }
        }
      }
    },

    onFileUpdate(newValue: boolean | string, changedKey: FileKey) {
      if (
        this.config.files[changedKey] !== undefined &&
        this.config.files[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "fileUploadEnabled": {
            if (typeof newValue === "boolean") {
              store.$serverConfiguration.toggleFileUploadEnabled(newValue);
            }
            break;
          }
          case "encryption": {
            if (typeof newValue === "string") {
              store.$serverConfiguration.changeFileEncryption(newValue);
            }
            break;
          }
          case "fileRetentionTime": {
            if (typeof newValue === "string") {
              store.$serverConfiguration.changeFileRetentionTime(newValue);
            }
            break;
          }
          default: {
            break;
          }
        }
      } else {
        return;
      }
    },

    onMessagingRestore() {
      store.$serverConfiguration.restoreMessagingConfig();
    },

    onFileRestore() {
      store.$serverConfiguration.restoreFileConfig();
    },

    onRestoreMessageArchiveRetention() {
      store.$serverConfiguration.restoreMessageArchiveRetention();
    }
  }
};
</script>
