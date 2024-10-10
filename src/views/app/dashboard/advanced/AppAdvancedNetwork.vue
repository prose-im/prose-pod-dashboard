<!--
 * This file is part of prose-app-web
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
.v-app-advanced-network
  base-subsection(
    title="Server Federation"
    :items="federationItems"
    :restoreOption="true"
  )

  base-subsection(
    title="Network Setup Tools"
    :items="toolsItems"
  )

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from '@/components/base/BaseSubsection.vue';  

export default {
  name: "AppAdvancedNetwork",

  components: {
    BaseSubsection
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      federationItems:[
        {
          subtitle:"Allow other servers to connect with this server",
          restoreSubtitle:true,
          description: "Allowing other servers to connect will enable federation. This lets users from other Prose workspaces connect with users in this workspace. For more safety, whitelist friendly servers.",
          type:"toggle",
        },
        {
          subtitle:"Friendly servers whitelist",
          restoreSubtitle:true,
          description: "If a whitelist is defined, then other servers will not be allowed to connect to this server, except whitelisted ones. It is recommended to whitelist servers you typically work with, ie. other teams.",
          type:"button",
          typeProps:{
            label:"Edit servers...",
            size:"medium"
          }
        },
      ],

      toolsItems:[
        {
          subtitle: "DNS setup instructions",
          description: "The accent color is the dominant color that all Prose apps connected to this server will use for UI elements such as active buttons and contextual menus.",
          type:"button",
          typeProps:{
            label:"Show DNS instructions...",
            size:"medium"
          }
        },

        {
          subtitle: "Network configuration checker",
          description: "Experiencing issues? Check your server network configuration for possible misconfigurations. This tool checks for your DNS setup, open ports, IPv4/IPv6 and possibly filtered network traffic.",
          type:"button",
          typeProps:{
            label:"Start network check...",
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
$c: ".v-app-advanced-network";


</style>
    