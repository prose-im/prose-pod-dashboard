<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
base-modal(
  :visible="visibility"
  @close="$emit('close')"
  @confirm="onSendInvite"
  title="Invite a team member"
  buttonColor="purple"
  buttonLabel="Invite Team Member"
)
  .a-invite-team-member
    h4
      | Email to Invite
      
    form-field(
      v-model="inviteEmail"
      type="email"
      size="mid-large"
      align="left"
      placeholder="Enter e-mail address to invite..."
    )

    base-modal-information(
      class="a-invite-team-member__info"
      text="An email will be sent, so that the invited team member can setup their Prose account and download the Prose app within minutes."
    ) 
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from '@/components/base/BaseIcon.vue';
import BaseModal from '@/components/base/modal/BaseModal.vue';
import BaseModalInformation from '@/components/base/modal/BaseModalInformation.vue';
import FormField from '@/components/form/FormField.vue';
import store from '@/store';

export default {
  name: "InviteTeamMember",

  components: {
    BaseIcon,
    BaseModal,
    BaseModalInformation,
    FormField
  },

  props: {
    visibility:{
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "proceed", 'update'],

  data() {
    return {
      // --> STATE <--
      inviteEmail: ''
    };
  },

  computed: {
    
  },

  watch: {
  },

  created() {},

  methods: {
    // --> HELPERS <--
    onSendInvite(): void {
      console.log(this.inviteEmail)
      if(!this.inviteEmail) {
        return
      } else {
        store.$teamMembers.sendInvitation(this.inviteEmail);
        this.$emit('close')
      }
    }

    // onChange(value) {
    //   console.log(value)
    //   this.$emit('update', value)
    // }
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-invite-team-member";

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

  #{$c}__info{
    display: flex;
    align-items: center;
    font-weight: $font-weight-light;
    margin-top: 38px;
    margin-left: 9px;
  }
}
</style>
        