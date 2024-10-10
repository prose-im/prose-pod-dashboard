<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
.c-members-invites-row(
  :class=`[
    {
      "c-members-invites-row--yellow" : (!userData.name && !tableHeaders),
      "c-members-invites-row--header" : tableHeaders
    }
  ]`
)
    <!--  1st column -->
    form-checkbox(
      :class=`[
        "c-members-invites-row__checkbox",
        {
          "c-members-invites-row--hidden" : tableHeaders
        }
      ]`
    )

    <!-- 2nd column -->
    base-avatar(
      :class=`[
        "c-members-invites-row__avatar",
        {
          "c-members-invites-row--hidden" : !userData.name
        }
      ]`
      :avatarDataUrl="userData.picture"
    )
    
    <!-- 3rd column -->
    .c-members-invites-row__user 
        p.c-members-invites-row--main {{ userData.name }}
        p.c-members-invites-row--submain {{ userData.email }}

        p(
          v-if="tableHeaders"
        )
          | {{tableHeaders[0]}}

    <!-- 4th column -->
    base-badge(
      v-if="!tableHeaders"
      :class=`[
        "c-members-invites-row__badge",
        {
          "c-members-invites-row--hidden" : !userData.name,
        }
      ]`
      :admin="userData.admin"
      size="long"
    )

    p(
      v-else
      :class=`[
        "c-members-invites-row__badge",
        "c-members-invites-row__badge--header"
      ]`
    )
      | {{tableHeaders[1]}}

    <!-- 5th column -->
    .c-members-invites-row__status
        p(
          :class=`[
            "c-members-invites-row--main",
            {
              "c-members-invites-row--none" : !userData.name
            }
          ]` 
        ) {{ userData.status}}
        p(
          v-if="!tableHeaders"
          class="c-members-invites-row--submain"
        )
          |{{ !userData.name? 'Invited' :userData.status === 'Active'? 'Prose ' + userData.os: 'Last active'}}
        
        p(
          v-else
        )
          | {{tableHeaders[2]}}

    <!-- 6th column -->
    .c-members-invites-row__encryption(
      :class=`[
        {
          "c-members-invites-row__encryption--hidden" : !userData.name && !tableHeaders
        }
      ]`
    )
      .c-members-invites-row__encryption--badge(
        v-if="!tableHeaders"
        :class=`[
          {
            "c-members-invites-row--hidden" : !userData.name
          }
        ]`
      )
        base-icon(
          class="c-members-invites-row__encryption--icon"
          name="padlock"
          fill="#05c02b"
          size="16px"
        )    
        p Enabled

      p(
        v-if="tableHeaders"
      )
        | {{tableHeaders[3]}}

    <!-- 7th column -->
    .c-members-invites-row__parameters
      base-button(
        v-if="!tableHeaders"
        size="medium"
        tint="white"
        :square="true"
      )
        base-icon(
          v-if="userData.name"
          name="gear"
          size="10px"
        )
        
        p(
          v-else
          class="c-members-invites-row__parameters--button"
        ) Cancel invite
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';
import BaseButton from '../base/BaseButton.vue';
import BaseIcon from '../base/BaseIcon.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';

export default {
  name: "MembersInvitesRow",

  components: {
    BaseAvatar,
    BaseBadge,
    BaseButton,
    BaseIcon,
    FormCheckbox,
  },

  props: {
    avatarUrl:{
      type:String,
      default:"../../assets/icons/missing.avatar.svg"
    },

    userData:{
      type: Object ,
      required: true
    },

    tableHeaders:{
      type: Array,
      default: null
    }
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {

  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-members-invites-row";

#{$c} {
  display: flex;
  align-items: center;
  padding-inline: 29px;
  padding-block: 18.5px;
  font-family: $font-family-default;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;

  #{$c}__checkbox {
    margin-right: 28px;
  }

  #{$c}__avatar {
    margin-right: 17px;
    min-width: 34px;
  }

  #{$c}__user {
    min-width: 220px;
    margin-right: 10px;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }

  #{$c}__badge {
    margin-right: 40px;

    &--header{
      min-width: 50px;
    }
  }

  #{$c}__status {
    min-width: 16.3%;
  }

  #{$c}__encryption {
    margin-right: 24%;
    &--badge{
      display: flex;
      align-items: center;
      font-size: ($font-size-baseline - 2px);
      color: $color-base-green-normal;
    }

    &--icon {
      margin-right: 6.3px;
    }

    &--hidden {
      margin-right: 14.95%;
      height: 0 !important;
    }

  }

  #{$c}__parameters {
    &--button {
      margin:0;
      padding-inline: 18px;
    }
  }

  //STYLE
  &--main {
    color: $color-text-primary;
    font-weight: $font-weight-bolder;
    font-size: ($font-size-baseline - 1px);
    margin-top: 0;
    margin-bottom: 5.5px;
  }

  &--submain {
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 2px);
    margin-block: 0;
  }

  &--header {
    color: $color-text-secondary; 
    font-size: ($font-size-baseline - 1.5px);
    font-weight: $font-weight-medium;
    border-block: 1px solid $color-border-primary;
    padding-block: 0;

    p{
      line-height: 13px;
      margin-block: 11px;
    }
  }

  //COLORS
  &--yellow{
    background-color: $color-base-yellow-light;
    padding-block: 11.5px;
  }

  //INVITED STATUS
  &--hidden {
    visibility: hidden;
    height: 0;
  }

  &--none {
    display: none;
  }
}
</style>
