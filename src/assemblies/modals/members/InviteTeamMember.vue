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
  title="Invite a team member"
  buttonColor="purple"
  buttonLabel="Invite Team Member"
)
  p
    | Email to Invite
    
  form-field(
    type="email"
  )

  base-icon(
    name="help"
  )
  p
  | An email will be sent, so that the invited team member can setup their Prose account and download the Prose app within minutes.

</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseModal from '@/components/base/modal/BaseModal.vue';
import FormField from '@/components/form/FormField.vue';

export default {
  name: "AppAdvancedNetwork",

  components: {
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
$c: ".v-app-advanced-network";


</style>
        