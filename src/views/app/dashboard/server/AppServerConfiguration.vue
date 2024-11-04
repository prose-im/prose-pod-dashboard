<!--
 * This file is part of prose-app-web
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
import BaseSubsection from '@/components/base/BaseSubsection.vue';  

// PROJECT: STORE
import store from '@/store';

export default {
  name: "AppServerConfiguration",

  components: {
    BaseSubsection
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--

      messagingItems:[
        {
          subtitle:"Store archives of all messages",
          description: "Archives are required for users running Prose apps on multiple devices, so that previous messages synchronize across all devices. End-to-end encrypted messages are stored as-is",
          type:"toggle"
        },

        {
          subtitle: "Message archive retention time",
          description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          restoreSubtitle: true,
          type: "select",
          typeProps: {
            options: [
              {
                icon: "",
                label: "1 year",
                value: "1 year"
              }, 
              {
                icon:"",
                label:"2 years",
                value:"2 years"
              }
            ],
            size:"medium"
          }
        }
      ],

      filesItems:[
        {
          subtitle:"Users can upload and share files",
          description: "File sharing is a must-have feature. It is recommended that file uploading is enabled. If however you’d like to prevent users from sharing files eg. for secrecy reasons, you can do so from there.",
          type:"toggle"
        },

        {
          subtitle: "File storage encryption",
          description: "Files are encrypted when stored on the server. Only the file recipients can decrypt the files. It is heavily recommended to keep file storage encryption enabled.",
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                value:"Encrypted (AES-256)"
              }, 
              {
                icon:"",
                value:"Not Encrypted"
              }
            ],
            size:"medium"
          }
        },

        {
          subtitle: "Files retention time",
          description: "Files can be automatically removed from the server after a certain time, in order to free some space. Most of old files are never accessed again, therefore it is recommended to enable this policy.",
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                value:"1 year"
              }, 
              {
                icon:"",
                value:"2 years"
              }
            ],
            size:"medium"
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

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--

    onUpdate(newValue: boolean | string, changedKey: string){
      // console.log('newValue', newValue, changedKey)
      if(this.config.files[changedKey] !== newValue) {
        switch (changedKey) {
          // Messaging
          case 'archiveEnabled': {
            store.$serverConfiguration.toggleMessageArchiveEnabled();//!this.config.messaging[key]);
            break;
          }
          case 'messageRetentionTime': {
            store.$serverConfiguration.changeMessageRetentionTime(newValue);
            break;
          }

          // Files
          case 'fileUploadEnabled': {
            store.$serverConfiguration.toggleFileUploadEnabled();//!this.config.messaging[key]);
            break;
          }
          case 'encryption': {
            store.$serverConfiguration.changeFileEncryption(newValue);
            break;
          }
          case 'fileRetentionTime': {
            store.$serverConfiguration.changeFileRetentionTime(newValue);
            break;
          }
          default:
            break;
        }
      }

      /// Reload store /////
    }
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-customization-emojis";


</style>
