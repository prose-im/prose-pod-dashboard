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
    title="Messaging"
    :items="messagingItems"
    :restoreOption="true"
  )

  base-subsection(
    title="Files"
    :items="filesItems"
  )

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from '@/components/base/BaseSubsection.vue';  

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
        // {
        //   subtitle: "Message archive retention time",
        //   description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
        //   type:"button",
        //   typeProps:{
        //     label:"Edit details...",
        //     size:"medium"
        //   }
        // },
        {
          subtitle: "Message archive retention time",
          description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
          restoreSubtitle:true,
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                label:"1 year"
              }, 
              {
                icon:"",
                label:"2 years"
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
        // {
        //   subtitle: "Message archive retention time",
        //   description: "Messages from the archive can be automatically expunged after some time. This is a good privacy practice, as it can be considered unsafe to retain all past messages in storage.",
        //   type:"button",
        //   typeProps:{
        //     label:"Edit details...",
        //     size:"medium"
        //   }
        // },
        {
          subtitle: "File storage encryption",
          description: "Files are encrypted when stored on the server. Only the file recipients can decrypt the files. It is heavily recommended to keep file storage encryption enabled.",
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                label:"Encrypted (AES-256)"
              }, 
              {
                icon:"",
                label:"Not Encrypted"
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
                label:"1 year"
              }, 
              {
                icon:"",
                label:"2 years"
              }
            ],
            size:"medium"
          }
        }
      ]
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-customization-emojis";


</style>
