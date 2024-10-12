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
    title="DNS setup instructions"
    buttonLabel="Add custom Emoji"
  )
    .a-dns-setup
      h4
        | Domain name
        
      form-field(
        type="text"
        size="mid-large"
        align="left"
        placeholder="prose.org"
      )
  
      .a-dns-setup__info
        base-icon(
          class="a-dns-setup__info--icon"
          name="information"
          height="20px"
          width="21.5px"
        )
  
        p
          | Once configured, the domain name of your server cannot be changed. If you need to change it, create a new server and import data from this server.
  
      h3
        | DNS Records
      
      p
        | 1️⃣  Add those records to specify your server IP address:
  

  
      p
        | 2️⃣  Add the records that let clients connect to your server:
  
      p
        | 3️⃣  Add the records that let servers connect to your server:
  
      p
        | 👉 Need help?  You can read the DNS setup guide here.
  
  </template>
    
  <!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->
  
  <script lang="ts">
  // PROJECT: COMPONENTS
  import BaseAvatar from '@/components/base/BaseAvatar.vue';
  import BaseButton from '@/components/base/BaseButton.vue';
  import BaseIcon from '@/components/base/BaseIcon.vue';
  import BaseModal from '@/components/base/modal/BaseModal.vue';
  import FormField from '@/components/form/FormField.vue';
  
  export default {
    name: "DnsSetup",
  
    components: {
      BaseAvatar,
      BaseButton,
      BaseIcon,
      BaseModal,
      FormField
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
  
    h4{
      color:$color-text-secondary;
      margin-top: 0;
      margin-bottom: 11px;
      margin-left: 8px;
      font-weight: $font-weight-medium;
    }
  
    #{$c}__upload{
      display: flex;
      align-items: center;
      padding-block: 13.5px;
      padding-left: 33px;
      margin-bottom: 30px;
      border: 1px solid $color-border-secondary;
      border-radius: 7px;
  
      &--avatar{
        outline: 1px solid $color-border-secondary;
        outline-offset: 1.5px;
        margin-right: 21.5px;
      }
    }
  
    #{$c}__info{
      display: flex;
      align-items: center;
      font-weight: $font-weight-light;
      margin-top: 38px;
      margin-left: 9px;
      font-size: ($font-size-baseline - 1px);
  
      p{
        margin: 0;
      }
  
      &--icon{
        margin-right: 13px;
      }
    }
    
  }
  
  </style>
          