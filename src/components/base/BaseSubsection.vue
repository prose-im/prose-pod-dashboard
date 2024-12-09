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
        @click="restoreAction"
      )
        base-icon(
          class="c-base-subsection__restore--icon"
          name="restore"
          size="8px"
          fill="#2490f0"
        )
        | Restore defaults

    base-subsection-item(
      v-for="(item, index) in items"
      v-model="myVal[index]"
      class="c-base-subsection__list"
      :key="item.subtitle"
      :item="item"
      :type="item.type"
      :color="item.color?item.color:'bw'"
      :index="index"
      @click="item.action"
      @update="updateValue"
    )
    
    p(
      class="c-base-subsection__erase"
    )
      | {{ myVal }}
</template>

<!-- **********************************************************************
     SCRIPT
     ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseIcon from "@/components/base/BaseIcon.vue";
import BaseSubsectionItem from "@/components/base/BaseSubsectionItem.vue";

export default {
  name: "BaseSubsection",

  components: {
    BaseIcon,
    BaseSubsectionItem,
  },

  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },

    title: {
      type: String,
      required: true,
    },

    titleColor: {
      type: String,
      default: "black",

      validator(x: string) {
        return ["black", "red"].includes(x);
      },
    },

    sup: {
      type: String,
      default: null,
    },

    items: {
      type: Array,
      required: true,
    },

    restoreOption: {
      type: Boolean,
      default: false,
    },

    restoreAction: {
      type: Function,
      default: () => {
        return;
      },
    },
  },

  emits: ["update"],

  data() {
    return {
      // --> STATE <--
    };
  },

  computed: {
    myVal: {
      get() {
        if (Object.keys(this.modelValue).length) {
          // console.log('hi', this.items?.map((_, index) => Object.values(this.modelValue)[index] ))
          return this.items.map((_, index) => Object.values(this.modelValue)[index]);
        } else {
          return this.items.map((_) => "");
        }
      },

      set(nextValue: any[]) {
        // console.log('nextValue', nextValue)
        const updatedModel = { ...this.modelValue };
        nextValue.forEach((value, index) => {
          updatedModel[index] = value;
        });
      },
    },

    isRestoreDisabled() {
      const result = this.items.every((item) => {
        return item.disabled === true;
      });

      return result;
    },
  },

  watch: {},

  methods: {
    // --> HELPERS <--
    updateValue(newValue: boolean | string, index: number, element?: number): void {
      // console.log("hearding", newValue, index, element);

      // Creating a copy of the modelValueObject
      const updatedModel = { ...this.modelValue };
      const keys = Object.keys(this.modelValue);

      if (element === 0 || element === 1) {
        console.log(this.modelValue);

        // the
        const key1 = keys[index];

        const key2 = Object.keys(this.modelValue[key1])[element];

        updatedModel[key1][key2] = newValue;
      } else {
        const key = keys[index];
        updatedModel[key] = newValue;
        this.$emit("update", newValue, key);
        console.log("emitting", key);
      }

      // this.$emit("update", updatedModel[key], newValue);
      // this.$emit("update", updatedModel);
    },
  },
};
</script>

<!-- **********************************************************************
     STYLE
     ********************************************************************** -->

<style lang="scss">
$c: ".c-base-subsection";

#{$c} {
  font-family: $font-family-default;
  margin-top: 34.5px;
  margin-left: 38px;
  margin-right: 39px;

  #{$c}__title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-inline: 11px;
    margin-bottom: 16px;
    border-bottom: 1px solid $color-border-secondary;

    h2 {
      font-size: $font-size-baseline + 6px;
      font-weight: $font-weight-medium;
      padding-left: 10px;
      margin-block: 0;
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
    height: fit-content;
    color: $color-base-blue-normal;
    font-size: $font-size-baseline - 2px;
    padding-top: 6px;
    padding-bottom: 3px;
    padding-right: 14.5px;
    cursor: pointer;

    &--icon {
      margin-right: 5px;
    }

    &--disabled {
      color: rgba($color-base-blue-normal, 0.7);
      cursor: not-allowed;
    }
  }

  #{$c}__list {
    &:nth-child(even) {
      background-color: $color-base-purple-ultra-light;
    }
  }

  //////ERASE
  #{$c}__erase {
    max-width: 600px;
    max-height: 20px;
    overflow: clip;
  }
}
</style>
