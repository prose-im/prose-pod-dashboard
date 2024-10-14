<!--
 * This file is part of prose-app-web
 *
 * Copyright 2023, Prose Foundation
 -->

<!-- **********************************************************************
 TEMPLATE
 ********************************************************************** -->
 <template lang="pug">
  .c-base-modal-network-check-block
    .c-base-modal-network-check-block__top
      .c-base-modal-network-check-block__top--left
        .c-base-modal-network-check-block__label
          | DNS

        .c-base-modal-network-check-block__header
          h4
            | DNS records

          p
            | Checks that all DNS records are properly configured.
      
      base-modal-status(
        status="verified"
      )

    .c-base-modal-network-check-block__details
        .c-base-modal-network-check-block--flex
          base-icon(
            name="check.circle"
            class="c-base-modal-network-check-block__icon"
          )

          p
            | IPv4 record for xmpp.crisp.chat

        p
          | Record is valid

</template>
 
 <!-- **********************************************************************
      SCRIPT
      ********************************************************************** -->
 
<script lang="ts">
import BaseIcon from '../BaseIcon.vue';
import BaseModalStatus from './BaseModalStatus.vue';

export default {
  name: "Modal",

  components:{
    BaseIcon,
    BaseModalStatus
  },

  props: {
    status:{
      type: String,
      default:"checking",

      validator(x: string) {
        return ["cheking", "verified", "warning", "issue"].includes(x);
      }
    },
  },

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {

  },

  watch: {

  },

  methods: {
    // <-- HELPERS -->
    capitalizeFirst(word: string){
      return word.charAt(0).toUpperCase() + word.slice(1)
    }  
    }
  }
 
 </script>
 
 <!-- **********************************************************************
   STYLE
   ********************************************************************** -->
 
<style lang="scss">
$c: ".c-base-modal-network-check-block";

// VARIABLES
$badge-padding-block: 3.5px;
$badge-padding-inline: 7px;

#{$c} {
  p {
    margin: 0;
  }

  h4 {
    color: $color-base-blue-normal;
    font-weight: $font-weight-bolder;
    font-size: ($font-size-baseline + 2px);
    margin-left: 0;
    margin-block-start: 0;
    margin-block-end: 7px;
  }

  #{$c}__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 17px;

    &--left {
      display: flex;
      align-items: center;
    }
  }

  #{$c}__label {
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 2px);
    padding-block: 3.5px;
    padding-inline: 7.5px;
    border: 1px solid $color-text-secondary;
    border-radius: 4px;
    margin-right: 19px;
    height: fit-content;
  }

  #{$c}__details {
    display: flex;
    justify-content: space-between;
    border-radius: 2px;
    border: 1px solid $color-border-primary;
    padding-block-start: 11px;
    padding-block-end: 14px;
    padding-inline-start: 20.5px;
    padding-inline-end: 28.5px;
    margin-left: 58px;
  }

  #{$c}__icon {
    margin-right: 9px;
  }

  &--flex {
    display: flex;
  }
}
</style>
 