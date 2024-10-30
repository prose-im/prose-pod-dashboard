<!--
* This file is part of prose-app-web
*
* Copyright 2024, Prose Foundation
-->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
.c-advanced-network-dns-table-row
  .c-advanced-network-dns-table-row__content(
    :class=`[
      {
        "c-advanced-network-dns-table-row__content--header": header
      }
    ]`
  )
    .c-advanced-network-dns-table-row__slot(
      ref="rowText"
      class="c-advanced-network-dns-table-row--flex"
    )
      slot

    .c-advanced-network-dns-table-row__icon(
      :class=`[
        {
          "c-advanced-network-dns-table-row__icon--hidden":header
        }
      ]`
      @click="copyRow"
    )
      transition(
        enter-active-class="u-animate u-animate--scale-up u-animate--semifast"
        leave-active-class="u-animate u-animate--scale-down u-animate--semifast"
      )
        .c-advanced-network-dns-table-row__icon-copied(
          v-if="copied"
          class="c-advanced-network-dns-table-row--flex"
        )
          base-icon(
            name="checkmark.circle.fill"
            fill="#05c02b"
            size="9.5px"
            width="10.2px"
          )
            
          p
            | Copied

      transition(
        enter-active-class="u-animate u-animate--scale-up u-animate--semifast"
        leave-active-class="u-animate u-animate--scale-down u-animate--semifast"
      )
        .c-advanced-network-dns-table-row__icon-copy(
          v-if="!copied"
          class="c-advanced-network-dns-table-row--flex"
        )
          base-icon(
            name="copy"
            fill="#2490f0"
            size="9.5px"
            width="10.2px"
          )

          p
            | Copy
</template>
  
<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from '@/components/base/BaseIcon.vue';

export default {
  name: "AdvancedNetworkDnsTableRow",

  components: {
    BaseIcon
  },

  props: {
    header:{
      type: Boolean,
      default: false
    }
  },

  emits: [],

  data() {
    return {
      // --> STATE <--
      copied: false,
    };
  },

  computed: {},

  watch: {},

  created() {},

  methods: {
    // --> HELPERS <--
    async copyText(htmlCollection : HTMLCollection) {
      const textToCopyArray : string[] = [];
      
      for (let i = 0; i < htmlCollection.children.length; i++) {
        textToCopyArray.push(htmlCollection.children[i].innerHTML);
      }

      const textToCopy = textToCopyArray.map(String).join(' ');
      // console.log(textToCopy);

      try {
        await navigator.clipboard.writeText(textToCopy);

        this.copied= true;

        setTimeout(() => {
          this.copied= false;
        }, 5000)

      } catch($e) {
        // alert('Cannot copy');
      }
    },

    async copyRow() {
      await this.copyText(this.$refs.rowText)
    }
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-advanced-network-dns-table-row";

#{$c} {
  font-family: $font-family-default;
  font-size: ($font-size-baseline - 3px);

  &--flex{
    display: flex;
    align-items: center;
  }

  #{$c}__content{
    display: flex;
    justify-content: space-between;
    line-height: ($font-size-baseline + 2px);
    padding-block: 5.5px;
    padding-inline: 19.5px;

    &--header{
      color: $color-text-secondary;
      font-weight: $font-weight-medium;
      background-color: $color-base-grey-ultra-light;
      border-bottom: 1px solid $color-border-primary;
    }
  }

  #{$c}__slot{
    width: 100%;
  }

  #{$c}__icon{
    position: relative;
    min-width: 50px;
    color: $color-base-blue-normal;
    font-weight: $font-weight-light;
    font-size: ($font-size-baseline - 2.5px);
    cursor: pointer;

    &-copied {
      position: absolute;
      color: $color-base-green-normal;
    }

    &--hidden{
      visibility: hidden;
    }


  }

  p{
    margin: 0;
  } 
}
</style>
        