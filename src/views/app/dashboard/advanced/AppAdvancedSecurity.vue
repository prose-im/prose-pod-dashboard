<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
    TEMPLATE
    ********************************************************************** -->

<template lang="pug">
  .v-app-advanced-security
    base-subsection(
      v-model="config.security"
      title="Account Security"
      :items="accountItems"
    )
  
    base-subsection(
      v-model="config.encryption"
      title="Network Encryption"
      :items="networkItems"
      :restoreOption="true"
    )
</template>
      
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->
    
<script lang="ts">
// PROJECT: COMPONENTS
import BaseSubsection from '@/components/base/BaseSubsection.vue';  
import store from '@/store';

export default {
  name: "AppAdvancedSecurity",

  components: {
    BaseSubsection
  },

  props: {

  },

  emits: [],

  data() {
    return {
      // --> STATE <--

      accountItems:[
        {
          subtitle:"Require Two Factor on all accounts",
          description: "All accounts member of this workspace must have Two Factor authentication enabled. Users will not be able to disable 2FA, although they can change their 2FA token anytime.",
          type:"toggle"
        },
      ],

      networkItems:[
        {
          subtitle: "Minimum SSL/TLS version",
          description: "Accepting older versions of SSL/TLS let older user devices and servers connect to your server, but is also considered less secure. It is recommended to configure the minimum version to TLS 1.2.",
          restoreSubtitle:true,
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                value:"TLS 1.0+",
              }, 
              {
                icon:"",
                value:"None",
              }
            ],
            size:"medium"
          }
        },
        {
          subtitle: "Minimum cipher suite (encryption strength)",
          description: "Accepting lower-security encryption ciphers let older user devices and servers connect to your server, but is also much less secure. A minimum cipher suite of High strength is recommended.",
          type:"select",
          typeProps:{
            options:[
              {
                icon:"",
                value:"High strength"
              }, 
              {
                icon:"",
                value:"Low strength"
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
      return store.$settingsSecurity.getSettings();
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
          // Security
          case 'twoFactor': {
            // store.$serverConfiguration.toggleMessageArchiveEnabled();//!this.config.messaging[key]);
            break;
          }

          // Encryption
          case 'version': {
            // store.$serverConfiguration.toggleFileUploadEnabled();//!this.config.messaging[key]);
            break;
          }
          case 'strength': {
            // store.$serverConfiguration.changeFileEncryption(newValue);
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
$c: ".v-app-advanced-security";
</style>
    