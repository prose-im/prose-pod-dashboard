<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
  base-modal(
    @close="$emit('close')"
    @confirm="$emit('proceed')"
    title="Network configuration checker"
    buttonLabel="Add custom Emoji"
  )
    .a-dns-setup
      base-modal-network-check-block
      
  </template>
    
  <!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->
  
  <script lang="ts">
  // PROJECT: COMPONENTS
  import BaseModal from '@/components/base/modal/BaseModal.vue';
  import BaseModalNetworkCheckBlock from '@/components/base/modal/BaseModalNetworkCheckBlock.vue';
  
  export default {
    name: "DnsSetup",
  
    components: {
      BaseModal,
      BaseModalNetworkCheckBlock
    },
  
    props: {
  
    },
  
    emits: ["close", "proceed"],
  
    data() {
      return {
        // --> STATE <--
        
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
  $c: ".a-dns-setup";
  
  #{$c} {
    margin-inline: 48px;
    font-family: $font-family-default;
  

    
    
  }
  
  </style>
          