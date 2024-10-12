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
  title="Add a custom emoji"
  buttonColor="purple"
  buttonLabel="Add custom Emoji"
)
  .a-add-custom-emoji
    h4
      | Emoji image

    .a-add-custom-emoji__upload
      base-avatar(
        class="a-add-custom-emoji__upload--avatar"
        size="60px"
        borderRadius="7px"
      )

      base-button(
        tint="white"
      )
        | Upload image...

    h4
      | Emoji shortcut
      
    form-field(
      type="text"
      size="mid-large"
      align="left"
      placeholder="Enter a :shortcut: for the emoji..."
    )

    .a-add-custom-emoji__info
      base-icon(
        class="a-add-custom-emoji__info--icon"
        name="information"
        height="20px"
        width="21.5px"
      )

      p
        | The emoji shortcut is what users can enter in the message field to insert the emoji, in text form. We recommend to keep it short and memorable.
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
  name: "AddCustomEmoji",

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
$c: ".a-add-custom-emoji";

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
        