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
    v-model="config.workspaceProfile"
    title="Workspace Profile"
    :items="profileItems"
  )

  base-subsection(
    v-model="config.appearance"
    title="Apps Appearance"
    :items="appearanceItems"
    @update="onUpdate"
  )
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from '@/components/base/BaseSubsection.vue';  

// STORE
import store from '@/store';

export default {
  name: "AppCustomizationWorkspace",

  components: {
    BaseSubsection
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      store: {},

      appearanceForm: {
        accentColor: "Medium Blue"
      },

      profileItems:[
        {
          subtitle:"Name for workspace",
          description: "The name of your workspace, as seen by server users as well as other servers on the network. It is recommended to enter the name of your company or organization.",
          type:"button",
          typeProps:{
            label:"Edit name...",
            size:"medium"
          },
          slot:'text',
        },
        {
          subtitle:"Icon for workspace",
          description: "Upload a logo for your workspace. This will be visible next to your workspace name in various spots of the Prose app. Other servers on the network will see it as well.",
          type:"button",
          typeProps:{
            label:"Edit logo...",
            size:"medium"
          },
          slot:'avatar',
        },
        {
          subtitle:"Server details card",
          description: "Configure extra details about your server, which is useful to other servers. This is especially useful if someone wants to obtain eg. the website of your organization and other details.",
          type:"button",
          typeProps:{
            label:"Edit details...",
            size:"medium"
          }
        },
      ],

      appearanceItems:[
        {
          subtitle: "Apps accent color",
          description: "The accent color is the dominant color that all Prose apps connected to this server will use for UI elements such as active buttons and contextual menus.",
          type:"select",
          typeProps:{
            options:[
              {
                colorPrev: "#2490F0",
                value:"Medium Blue"
              }, 
              {
                colorPrev: "#1C293B",
                value:"Dark Blue"
              }
            ],
            size:"medium"
          }
        },
      ]
    };
  },

  computed: {
    config() {
      return store.$customizationWorkspace.getConfig();
    }
  },

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
    onUpdate(newValue: boolean | string, changedKey: string){
      console.log('newValue', newValue, changedKey)
      if(this.config.appearance[changedKey] !== newValue) {
        switch (changedKey) {
          // Workspace Profile
          case 'archiveEnabled': {
            store.$serverConfiguration.toggleMessageArchiveEnabled();//!this.config.messaging[key]);
            break;
          }
          case 'messageRetentionTime': {
            store.$serverConfiguration.changeMessageRetentionTime(newValue);
            break;
          }

          // Appearance
          case 'color': {
            store.$customizationWorkspace.updateWorkspaceColor(newValue);//!this.config.messaging[key]);
            break;
          }
          default:
            break;
        }
      }
    },
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".v-app-customization-emojis";
</style>
