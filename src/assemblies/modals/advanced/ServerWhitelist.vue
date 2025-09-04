<!--
* This file is part of prose-pod-dashboard
*
* Copyright 2025, Prose Foundation
-->

<!-- **********************************************************************
TEMPLATE
********************************************************************** -->

<template lang="pug">
base-modal(
  @close="$emit('close')"
  @confirm="onProceed"
  @load="onLoad"
  :disabled="sendingRequest"
  :loading="sendingRequest"
  :visible="visibility"
  title="Set a server whitelist"
  button-color="purple"
  button-label="Save the server whitelist"
  button-icon="checkmark.circle.empty"
)
  .a-server-whitelist
    .a-server-whitelist__top
      h3
        | Currently approved servers:

      span(
        v-if="whitelist.length === 0"
      )
        template(
          v-if="whitelistEnabled"
        )
          | No server is approved (add domains to allow).

        template(
          v-else
        )
          | All servers are approved (add domains to restrict).

      .a-server-whitelist__servers(
        v-else
        v-for="(server, index) in whitelist"
      )
        span
          | {{ server }}

        form-checkbox(
          v-if="activeAction === 'remove'"
          v-model="domainsToRemove[index]"
          :id="index"
          :value="index"
          class="c-members-invites-row__checkbox"
        )


    .a-server-whitelist__options
      <!-- Initial option buttons -->
      .a-server-whitelist__initial(
        v-if="!activeAction"
      )
        base-button(
          @click="activateAddDomain"
          class="a-server-whitelist__button"
          size="medium"
          tint="purple"
        )
          p
            | Add a new domain

        base-button(
          @click="activateRemoveDomain"
          :disabled="!removeDomainButtonActive"
          class="a-server-whitelist__button--remove"
          size="medium"
          tint="red"
        )
          p
            | Remove a domain

      <!-- Adding domain active -->
      vee-form.a-server-whitelist__add(
        v-else-if="activeAction === 'add'"
        v-slot="{ errors, meta }"
        @submit="onAddNewDomain"
        ref="veeFormInstance"
      )
        base-modal-input-block(
          v-model="newDomain"
          :display-error="errors?.domain && meta.touched"
          :rules="{required: true}"
          error-message="This field is required"
          label="Enter the domain to add"
          name="domain"
          placeholder="Enter a domain..."
          type="text"
          autofocus
        )

        base-button(
          :disabled="!newDomain"
          class="a-server-whitelist__button"
          size="medium"
          tint="purple"
          type="submit"
        )
          p
            | Add domain

        base-button(
          @click="resetActiveAction"
          class="a-server-whitelist__button"
          size="medium"
        )
          p
            | Cancel

      <!-- ARemoving domain active -->
      .a-server-whitelist__remove(
        v-else-if="activeAction = 'remove'"
      )
        base-button(
          @click="onRemoveDomain"
          :disabled="!domainsSelected"
          class="a-server-whitelist__button"
          size="medium"
          tint="red"
        )
          p
            | Remove domain(s)

        base-button(
          @click="resetActiveAction"
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
// NPM
import { PropType } from "vue";

// PROJECT: VEE-VALIDATE
import { Form as VeeForm } from "vee-validate";

// PROJECT: STORE
import store from "@/store";
import isValidDomain from "is-valid-domain";
import BaseAlert from "@/components/base/BaseAlert.vue";

export default {
  name: "FactoryReset",

  components: {
    VeeForm
  },

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
      activeAction: null as null | string,

      domainsToRemove: [],

      newDomain: "",

      sendingRequest: false,

      whitelist: [] as string[]
    };
  },

  computed: {
    removeDomainButtonActive() {
      return this.whitelist.length > 0;
    },

    domainsSelected() {
      return this.domainsToRemove.some(element => element === true);
    },

    whitelistEnabled() {
      return store.$settingsNetwork.federation.whitelistEnabled;
    }
  },

  methods: {
    // --> HELPERS <--

    activateAddDomain() {
      this.activeAction = "add";
    },

    activateRemoveDomain() {
      this.activeAction = "remove";
    },

    resetActiveAction() {
      this.activeAction = null;
    },

    // --> EVENT LISTENERS <--

    onAddNewDomain() {
      if (
        (this.$refs.veeFormInstance as InstanceType<typeof VeeForm>).meta.valid
      ) {
        const domainValidated = isValidDomain(this.newDomain);

        if (domainValidated) {
          if (this.whitelist.includes(this.newDomain)) {
            BaseAlert.error("This domain is already in your whitelist");
          } else {
            this.whitelist.push(this.newDomain);

            this.resetActiveAction();
            this.newDomain = "";
          }
        } else {
          BaseAlert.error("Please enter a valid domain");
        }
      }
    },

    onRemoveDomain() {
      const newWhiteList = this.whitelist.filter((_, index) => {
        return !this.domainsToRemove[index];
      });

      this.whitelist = newWhiteList;

      this.resetActiveAction();
    },

    onClose() {
      this.activeAction = null;
      this.newDomain = "";

      this.$emit("close");
    },

    onLoad() {
      if (this.whitelist.length === 0) {
        this.whitelist = [...this.serverList];
      }
    },

    async onProceed() {
      if (this.serverList !== this.whitelist) {
        try {
          // Update loading status
          this.sendingRequest = true;

          await store.$settingsNetwork.updateServerWhitelist(this.whitelist);

          // Reinitialize variables + close modal
          this.sendingRequest = false;

          this.onClose();

          // Make success notitification visible
          this.$emit("showSuccess");
        } catch {
          BaseAlert.error("Something went wrong", "Please try again later");

          // Update loading status
          this.sendingRequest = false;
        }
      } else {
        this.onClose();
      }
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

  #{$c}__top {
    margin-block-end: 31px;

    #{$c}__servers {
      max-width: 50%;
      display: flex;
      justify-content: space-between;
      margin-block-end: 5px;
    }
  }

  #{$c}__options {
    p {
      margin: 0;
    }

    #{$c}__flex {
      display: flex;
    }

    #{$c}__button {
      margin-inline-end: 15px;
    }
  }
}
</style>
