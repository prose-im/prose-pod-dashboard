<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2024–2025, Prose Foundation
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
      h3
        | Currently approved servers:

      p(
        v-if="whitelist.length === 0"
      )
        | No server approved

      p(
        v-else
        v-for="(server, index) in whitelist"
      )
        | {{ server }}

    .a-server-whitelist__add
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
          @click="onAddNewDomain"
          class="a-server-whitelist__button"
          size="medium"
          tint="purple"
        )
          p
            | Add domain

        base-button(
          @click="toggleButtonLabel"
          class="a-server-whitelist__button"
          size="medium"
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
      default: () => []
    },

    visibility: {
      type: Boolean,
      default: false
    }
  },

  emits: ["close", "showSuccess"],

  data() {
    return {
      // --> STATE <--

      addingDomain: false,

      newDomain: "",

      whitelist: [] as string[]
    };
  },

  computed: {},

  methods: {
    // --> HELPERS <--

    toggleButtonLabel() {
      this.addingDomain = !this.addingDomain;
    },

    // --> EVENT LISTENER <--
    onAddNewDomain() {
      this.whitelist.push(this.newDomain);

      this.addingDomain = false;
      this.newDomain = "";
    },

    onClose() {
      this.addingDomain = false;
      this.newDomain = "";

      this.$emit("close");
    },

    onLoad() {
      //TODO: store.$globalConfig.getServerConfig();

      if (this.whitelist.length === 0) {
        this.whitelist = [...this.serverList];
      }
    },

    onProceed() {
      if (this.serverList !== this.whitelist) {
        store.$settingsNetwork.updateServerWhitelist(this.whitelist);

        //Make success Notitification Visible
        this.$emit("showSuccess");
      }

      this.onClose();
    }
  }
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

  #{$c}__top {
    margin-block-end: 31px;
  }

  #{$c}__add {
    p {
      margin: 0;
    }

    #{$c}__buttons {
      display: flex;

      #{$c}__button {
        margin-inline-end: 15px;
      }
    }
  }
}
</style>
