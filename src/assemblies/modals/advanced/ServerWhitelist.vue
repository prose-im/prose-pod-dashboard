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
  @close="$emit('close')"
  @confirm="onProceed"
  @load="onLoad"
  :visible="visibility"
  title="Set a server whitelist"
  button-color="purple"
  button-label="Save the server whitelist"
)
  .a-server-whitelist
    .a-server-whitelist__top
      p(
        v-for="server in whitelist"
      )
        | {{ server }}

      base-modal-input-block(
        v-if="addingDomain"
        v-model="newDomain"
        label="Enter the domain to add"
        placeholder="Enter a domain..."
        type="text"
      )

      base-button(
        v-if="!addingDomain"
        @click="toggleButtonLabel"
        class="a-server-whitelist__button"
        size="medium"
        tint="purple"
      )
        p
          | Add a new domain 

      .a-server-whitelist__buttons(
        v-else
      )
        base-button(
          @click="onNewDomainEntered"
          class="a-server-whitelist__button"
          size="medium"
        )
          p
            | Add

        base-button(
          @click="toggleButtonLabel"
          class="a-server-whitelist__button"
          size="medium"
          tint="red"
        )
          p
            | Cancel
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import store from "@/store";
import { PropType } from "vue";

export default {
  name: "FactoryReset",

  props: {
    serverList: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    visibility: {
      type: Boolean,
      default: false,
    },
  },

  emits: ["close"],

  data() {
    return {
      // --> STATE <--

      addingDomain: false,

      newDomain: "",

      whitelist: [] as string[],
    };
  },

  computed: {},

  watch: {
    serverList() {
      this.whitelist = this.serverList;
    },
  },

  methods: {
    // --> HELPERS <--

    toggleButtonLabel() {
      this.addingDomain = !this.addingDomain;
    },

    // --> EVENT LISTENER <--
    onNewDomainEntered() {
      this.whitelist.push(this.newDomain);

      this.addingDomain = false;
      this.newDomain = "";
    },

    onLoad() {
      store.$globalConfig.getGlobalConfig();
    },

    onProceed() {
      // Check if the whole form was filled
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".a-server-whitelist";

#{$c} {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
  margin-inline: 48px;

  #{$c}__buttons {
    display: flex;
  }

  #{$c}__disclaimer {
    margin-top: 4px;
    margin-bottom: 31px;
  }

  #{$c}__confirm {
    &--upper {
      margin-bottom: 8px;
    }
  }
}
</style>
