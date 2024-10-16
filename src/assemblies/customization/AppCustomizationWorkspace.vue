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
    title="Workspace Profile"
    :items="profileItems"
  )

  base-subsection(
    v-model="appearanceForm"
    title="Apps Appearance"
    :items="appearanceItems"
  )

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from '@/components/base/BaseSubsection.vue';  

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
          slotData: 'Crisp'
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
          slotData: 'https://cdn.cmsfly.com/635bcad9b8a74e0091632998/cerp-GR1YU2.png'
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
                icon:"",
                value:"Medium Blue"
              }, 
              {
                icon:"",
                value:"Dark Blue"
              }
            ],
            size:"medium"
          }
        },
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
