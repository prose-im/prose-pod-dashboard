<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
      TEMPLATE
      ********************************************************************** -->

<template lang="pug">
.c-base-subsection
  .c-base-subsection__title
    h2(
      :class=`[
        "c-base-subsection__title--" + titleColor
      ]`
    )
      | {{ title}}

      span.c-base-subsection__sup(
        v-if="sup"
      )
        | &nbsp; {{ sup.toUpperCase() }}

    .c-base-subsection__restore(
      v-if="restoreOption"
      :class=`[
        {
          "c-base-subsection__restore--disabled": isRestoreDisabled
        }
      ]`
      @click="toggleResetModal"
    )
      base-icon(
        class="c-base-subsection__restore--icon"
        name="restore"
        size="9px"
        fill="#2490f0"
      )

      p
        | Restore defaults

  base-subsection-item(
    v-for="(item, index) in items"
    v-model="myVal[index]"
    @click="item.action"
    @update="updateValue"
    @showSucess="makeNotificationVisible"
    :key="item.subtitle"
    :item="item"
    :type="item.type"
    :color="item.color?item.color:'bw'"
    :index="index"

  )

  <!-- MODALS -->
  base-modal(
    v-if="isResetModalVisible"
    @close="onClose"
    @confirm="onProceed"
    :visible="resetModalVisibility"
    position="center"
    :title="restoreTitle"
    button-color="red"
    :button-label="restoreButton"
  )
    .c-base-subsection__modal
      h4 
        | {{ restoreText }}

      p 
        | This action will reset the following parameters: 
                
      ul
        li(
          v-for="description in restoreDescription"
        )
          | {{ description}}
        
  <!-- Tooltip Notification -->
  transition(
    enter-active-class="u-animate u-animate--scale-up u-animate--fast"
    leave-active-class="u-animate u-animate--scale-down u-animate--fast"
  )
    base-notification(
      v-if="isNotificationVisible"
    )
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
import type { PropType } from "vue";

//INTERFACES
interface Item {
  subtitle: string;
  restoreSubtitle?: boolean;
  description: string;
  tags?: string[];
  type: string;
  disabled?: boolean;
  typeProps?: object;
  slot?: "avatar" | "text";
  size?: string;
}

// TYPES
type Items = Item[];

export default {
  name: "BaseSubsection",

  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },

    title: {
      type: String,
      required: true
    },

    titleColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      }
    },

    restoreDescription: {
      type: Array,
      default: () => []
    },

    sup: {
      type: String,
      default: null
    },

    items: {
      type: Array as PropType<Items>,
      required: true
    },

    restoreOption: {
      type: Boolean,
      default: false
    },

    restoreAction: {
      type: Function,
      default: () => {
        return;
      }
    }
  },

  emits: ["update"],

  data() {
    return {
      isNotificationVisible: false,

      isResetModalVisible: false,
      resetModalVisibility: false
    };
  },

  computed: {
    myVal() {
      if (Object.keys(this.modelValue).length > 0) {
        return this.items.map(
          (_, index) => Object.values(this.modelValue)[index]
        );
      }

      return this.items.map(() => "");
    },

    isRestoreDisabled() {
      const result = this.items.every(item => {
        return item.disabled === true;
      });

      return result;
    },

    restoreTitle() {
      return "Restore " + this.title;
    },

    restoreText() {
      return (
        "Are you sure you want to reset the whole " +
        this.title +
        " configuration?"
      );
    },

    restoreButton() {
      return "Reset " + this.title.toLowerCase() + " configuration";
    }
  },

  watch: {
    isResetModalVisible(newValue) {
      setTimeout(() => (this.resetModalVisibility = newValue), 10);
    }
  },

  methods: {
    // --> HELPERS <--
    updateValue(
      newValue: boolean | string,
      index: number,
      element?: number
    ): void {
      // Array from the keys of the model value
      const keys = Object.keys(this.modelValue);

      // console.log("keys", keys);

      if (element === 0 || element === 1) {
        console.log("keys", keys, index);

        //Get the modified subsectionItem
        const key1 = keys[index];

        //Get the modified key from the modified subsectionItem
        const key2 = Object.keys(this.modelValue[key1])[element];

        //Ask for update on parent
        this.$emit("update", newValue, key1, key2);
        console.log("emitting", newValue, key1, key2);
      } else {
        //Get the modified subsectionItem
        const key = keys[index];

        //Ask for update on parent
        this.$emit("update", newValue, key);
        console.log("emitting", key);
      }
    },

    makeNotificationVisible() {
      if (this.isNotificationVisible === false) {
        this.isNotificationVisible = true;

        setTimeout(() => {
          this.isNotificationVisible = false;
        }, 3000);
      }
    },

    toggleResetModal() {
      this.isResetModalVisible = !this.isResetModalVisible;
    },

    // EVENT LISTENERS
    onProceed() {
      this.restoreAction();

      this.toggleResetModal();

      this.makeNotificationVisible();
    },

    onClose() {
      this.toggleResetModal();
    }
  }
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-subsection";

#{$c} {
  margin-top: 34.5px;
  margin-inline: 38px;

  #{$c}__title {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-block-end: 10px;
    margin-inline: 11px;
    margin-block-end: 16px;
    border-bottom: 1px solid $color-border-secondary;

    h2 {
      font-size: $font-size-baseline + 6px;
      font-weight: $font-weight-medium;
      padding-left: 10px;
      margin-block: 0;
      margin-inline-end: 10px;
    }

    p {
      margin: 0;
    }

    &--red {
      color: $color-base-red-normal;
    }
  }

  #{$c}__sup {
    position: relative;
    font-weight: $font-weight-bolder;
    font-size: 0.6em;
    bottom: 0.5em;
  }

  #{$c}__restore {
    display: flex;
    align-items: center;
    height: fit-content;
    color: $color-base-blue-normal;
    font-size: $font-size-baseline - 1.5px;
    padding-block-start: 6px;
    padding-inline-start: 3px;
    padding-inline-end: 14.5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--icon {
      margin-right: 4px;
      flex: none;
    }

    &--disabled {
      color: rgba($color-base-blue-normal, 0.7);
      cursor: not-allowed;

      &,
      &:hover {
        text-decoration: none;
      }
    }
  }

  #{$c}__list {
    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }

  @media (max-width: 768px) {
    margin-inline: 10px;
  }
}

#{$c}__modal {
  text-align: justify;

  h4 {
    margin-block: 0 40px;
  }

  p {
    margin: 0 !important;
  }
}
</style>
