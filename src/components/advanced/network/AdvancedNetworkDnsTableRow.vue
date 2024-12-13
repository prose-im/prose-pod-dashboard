<!--
* This file is part of prose-pod-dashboard
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
    div(
      ref="rowText"
      :class=`[
        "c-advanced-network-dns-table-row__slot",
        "c-advanced-network-dns-table-row--flex",
        {
          "u-select": !header
        }
      ]`
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
      base-copy-icon(
        :isCopied="copied"
      )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
export default {
  name: "AdvancedNetworkDnsTableRow",

  props: {
    header: {
      type: Boolean,
      default: false
    }
  },

  emits: [],

  data() {
    return {
      // --> STATE <--

      copied: false,

      timer: null
    };
  },

  computed: {},

  watch: {},

  methods: {
    // --> HELPERS <--

    async copyText(htmlCollection: HTMLCollection) {
      const textToCopyArray: string[] = [];

      for (let i = 0; i < htmlCollection.children.length; i++) {
        textToCopyArray.push(htmlCollection.children[i].innerHTML);
      }

      const textToCopy = textToCopyArray.map(String).join(" ");
      // console.log(textToCopy);

      try {
        await navigator.clipboard.writeText(textToCopy);

        this.copied = true;

        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
          this.copied = false;
        }, 5000);
      } catch (_) {
        // alert('Cannot copy');
      }
    },

    async copyRow() {
      await this.copyText(this.$refs.rowText);
    }
  },

  onBeforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-advanced-network-dns-table-row";

#{$c} {
  font-size: ($font-size-baseline - 2px);

  &--flex {
    display: flex;
    align-items: center;
  }

  #{$c}__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: ($font-size-baseline + 2px);
    padding-block: 5.5px;
    padding-inline: 19.5px;
    min-height: 22px;

    &--header {
      color: $color-text-secondary;
      font-weight: $font-weight-medium;
      background-color: $color-base-grey-ultra-light;
      border-bottom: 1px solid $color-border-primary;
    }
  }

  #{$c}__slot {
    width: 100%;
    overflow: hidden;
  }

  #{$c}__icon {
    &--hidden {
      visibility: hidden;
    }
  }

  p {
    margin: 0;
  }
}
</style>
