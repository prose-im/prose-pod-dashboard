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
    title="Messaging"
    :items="messagingItems"
    :restoreOption="true"
    :restoreAction="onGlobalRestore"
    @update="onUpdate"
  )

  base-subsection(
    v-model="config.files"
    title="Files"
    :items="filesItems"
    @update="onUpdate"
  )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from "@/components/base/BaseSubsection.vue";

// PROJECT: STORE
import store from "@/store";

export default {
  name: "AppServerConfiguration",

  components: {
    BaseSubsection,
  },

  props: {},

  emits: [],

  data() {
    return {
      // --> STATE <--

      messagingItems: [
        {
          subtitle: "Store archives of all messages",
          description:
            "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type: "toggle",
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
                label: "Infinite",
                value: "infinite",
              },
              {
                label: "1 year",
                value: "P1Y",
              },
              {
                label: "2 years",
                value: "P2Y",
              },
            ],
            size: "medium",
          },
        },
      ],

      filesItems: [
        {
          subtitle: "Users can upload and share files",
          description:
            "File sharing is a must-have feature. It is recommended that file uploading is enabled. If however you’d like to prevent users from sharing files eg. for secrecy reasons, you can do so from there.",
          type: "toggle",
        },

        {
          subtitle: "File storage encryption",
          description:
            "Files are encrypted when stored on the server. Only the file recipients can decrypt the files. It is heavily recommended to keep file storage encryption enabled.",
          type: "select",
          typeProps: {
            options: [
              {
                label: "Encrypted (AES-256)",
                value: "AES-256",
              },
              {
                label: "Not encrypted",
                value: "Not Encrypted",
              },
            ],
            size: "medium",
          },
        },

        {
          subtitle: "Files retention time",
          description:
            "Files can be automatically removed from the server after a certain time, in order to free some space. Most of old files are never accessed again, therefore it is recommended to enable this policy.",
          type: "select",
          typeProps: {
            options: [
              {
                label: "1 year",
                value: "P1Y",
              },
              {
                label: "2 years",
                value: "P2Y",
              },
            ],
            size: "medium",
          },
        },
      ],
    };
  },

  computed: {
    config() {
      return store.$serverConfiguration.getSettings();
    },
  },

  watch: {},

  mounted() {
    store.$serverConfiguration.loadServerConfiguration();
  },

  methods: {
    // --> HELPERS <--

    onUpdate(newValue: boolean | string, changedKey: string) {
      // console.log('newValue', newValue, changedKey)
      // console.log('condition', this.config.files[changedKey] )

      // Messaging
      if (
        this.config.messaging[changedKey] !== undefined &&
        this.config.messaging[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "archiveEnabled": {
            store.$serverConfiguration.toggleMessageArchiveEnabled(newValue);
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
      // Files
      else if (
        this.config.files[changedKey] !== undefined &&
        this.config.files[changedKey] !== newValue
      ) {
        switch (changedKey) {
          case "fileUploadEnabled": {
            store.$serverConfiguration.toggleFileUploadEnabled(newValue);
            break;
          }
          case "encryption": {
            store.$serverConfiguration.changeFileEncryption(newValue);
            break;
          }
          case "fileRetentionTime": {
            store.$serverConfiguration.changeFileRetentionTime(newValue);
            break;
          }
          default:
            break;
        }
      } else {
        return;
      }
    },

    onGlobalRestore() {
      store.$serverConfiguration.restoreMessaging();
    },

    onRestoreMessageArchiveRetention() {
      store.$serverConfiguration.restoreMessageArchiveRetention();
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-customization-emojis";
</style>
