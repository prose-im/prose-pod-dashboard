<!--
 * This file is part of prose-pod-dashboard
 *
 * Copyright 2024, Prose Foundation
 -->

<!-- **********************************************************************
  TEMPLATE
  ********************************************************************** -->

<template lang="pug">
div(
  :class=`[
    "c-base-subsection-item",
    "c-base-subsection-item--" + color
  ]`
)
  .c-base-subsection-item__left
    .c-base-subsection-item__subtitle
      base-icon(
        v-if="item.subtitleLeftIcon"
        class="c-base-subsection-item__subtitle--left-icon"
        :name="item.subtitleLeftIcon"
        size="14px"
      )

      h3(
        :class=`[
          "c-base-subsection-item__subtitle--text",
          {
            "c-base-subsection-item__subtitle--restore": item.restoreSubtitle,
            "c-base-subsection-item__subtitle--restore--disabled": item.restoreSubtitle && item.disabled,
          }
        ]`
        @click="onSubtitleClick"
      )
        | {{ item.subtitle }}

        base-icon(
          v-if="item.restoreSubtitle"
          class="c-base-subsection-item__subtitle--right-icon"
          name="restore"
          size="8px"
          fill="#2490f0"
        )

      base-coming-soon(
        v-if="item.disabled"
      )

    p.c-base-subsection-item__description
      | {{ item.description}}

    .c-base-subsection-item__tag(
      v-if="item.tags"
    )
      span(
      )
        | {{ item.tags[0] + ': ' }}

      span(
        v-for="(tag, index) in item.tags"
        class="c-base-subsection-item__taglist"
      )
        p
          | {{ item.tags[index + 1] }}

        p.c-base-subsection-item--grey
          | {{ (index<item.tags.length-2) ? ',' : '' }}

  <!-- OPTIONAL ELEMENT -->
  p(
    v-if="item.slot === 'text'"
    class="c-base-subsection-item__slot"
  )
    | {{ calculatedValue }}

  base-avatar(
    v-if="item.slot === 'avatar'"
    :avatar-data-url="calculatedValue"
    size="40px"
    border-radius="20px"
    :class=`[
      "c-base-subsection-item__slot",
      "c-base-subsection-item__slot--avatar"
    ]`
  )

  <!-- INTERACTIVE ELEMENT -->
  form-toggle(
    v-if="type === 'toggle'"
    v-model="calculatedValue"
    :disabled="item.disabled"
    @update:modelValue="onUpdateValue"
  )

  base-button(
    v-if="type === 'button'"
    :disabled="item.disabled"
    :size="item.typeProps?.size"
    :tint="buttonColor"
    @click="$emit('click')"
  )
    | {{item.typeProps?.label}}

  form-select(
    v-if="(type === 'select') || type === 'doubleSelect'"
    v-model="calculatedValue"
    :color-prev="colorSquare"
    :disabled="item.disabled"
    :options="item.typeProps?.options"
    position="bottom"
    size="medium"
    :search="false"
    @update:modelValue="onUpdateValue"
  )

  form-select(
    v-if="type === 'doubleSelect'"
    v-model="stateSecondSelect"
    class="c-base-subsection-item__double-select"
    :disabled="item.disabled"
    :search="false"
    size="medium"
    :options="item.typeProps?.secondOptions"
    position="bottom"
    @update:modelValue="onUpdateExtraSelect"
  )

</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
export default {
  name: "BaseSubsectionItem",

  props: {
    modelValue: {
      type: [String, Boolean, Object],
      default: null
    },

    secondaryData: {
      type: String,
      default: null
    },

    item: {
      type: Object,
      required: true
    },

    type: {
      type: String,
      required: true,

      validator(x: string) {
        return ["toggle", "button", "select", "doubleSelect"].includes(x);
      }
    },

    color: {
      type: String,
      default: "bw",

      validator(x: string) {
        return ["bw", "redShell", "redBackground", "bwPurple"].includes(x);
      }
    },

    index: {
      type: Number,
      default: 0
    }
  },

  emits: ["update", "click"],

  data() {
    return {
      // --> STATE <--
      state: null,

      stateSecondSelect: null,

      colorSquare: null as string | null
    };
  },

  computed: {
    calculatedValue: {
      get() {
        if (this.type !== "doubleSelect") {
          if (
            typeof this.modelValue === "string" &&
            this.modelValue.startsWith("#")
          ) {
            this.colorSquare = this.modelValue;
          }
          return this.modelValue;
        } else {
          const valueArray = Object.values(this.modelValue);
          this.stateSecondSelect = valueArray[1];

          return valueArray[0];
        }
      },

      set(nextValue: any[]) {
        console.log("nextValue", nextValue);
      }
    },

    buttonColor() {
      switch (this.color) {
        case "bw": {
          return "white";
        }
        case "bwPurple": {
          return "purple";
        }
        case "redBackground": {
          return "red";
        }
        case "redShell": {
          return "red";
        }
        default: {
          return "white";
        }
      }
    }
  },

  methods: {
    // --> EVENT LISTENERS <--
    onUpdateValue(newValue: boolean | string): void {
      if (this.type === "doubleSelect") {
        this.$emit("update", newValue, this.index, 0);
      } else {
        this.$emit("update", newValue, this.index);
      }
    },

    onUpdateExtraSelect(newValue: boolean | string): void {
      this.$emit("update", newValue, this.index, 1);
    },

    onSubtitleClick() {
      this.item.restoreSubtitle && this.item.restoreAction
        ? this.item.restoreAction()
        : "";
    }
  }
};
</script>

<!-- **********************************************************************
       STYLE
       ********************************************************************** -->

<style lang="scss">
$c: ".c-base-subsection-item";

#{$c} {
  display: flex;
  align-items: center;
  padding-inline: 22px;
  padding-block: 11.5px;

  #{$c}__left {
    flex: 1 1 auto;
    margin-inline-end: 10px;
  }

  #{$c}__subtitle {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &--left-icon {
      margin-right: 7.5px;
    }

    &--text {
      margin: 0;
      font-size: ($font-size-baseline + 0.5px);
      font-weight: $font-weight-medium;
    }

    &--restore {
      color: $color-base-blue-normal;
      cursor: pointer;

      &--disabled {
        cursor: not-allowed;
      }
    }

    &--right-icon {
      margin-left: 3.5px;
    }
  }

  #{$c}__description {
    font-weight: $font-weight-light;
    max-width: 580px;
    margin: 0;
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 0.5px);
  }

  #{$c}__tag {
    margin-top: 7px;
    font-size: ($font-size-baseline - 2px);
    font-weight: $font-weight-light;
    display: flex;
    color: $color-text-secondary;
    p {
      margin: 0;
    }
  }

  #{$c}__taglist {
    margin-left: 4px;
    font-size: ($font-size-baseline - 1.5px);
    display: flex;

    &:before {
      content: "\00a0";
    }
  }

  #{$c}__slot {
    font-size: ($font-size-baseline - 4px);
    font-weight: $font-weight-medium;
    margin-inline-end: 10px;
    min-width: 40px;
    text-align: center;
    overflow: clip;

    &--avatar {
      outline: 1px solid $color-border-primary;
      outline-offset: 1px;
      margin-inline-end: 16px;
    }
  }

  #{$c}__double-select {
    margin-inline-start: 3px;
  }

  // <!-- SIMPLE COLORS -->
  &--grey {
    color: $color-text-secondary;
  }

  // <!-- THEME COLORS -->
  &--bw {
    #{$c}__taglist {
      color: $color-base-blue-normal;
    }
  }

  &--redBackground {
    background-color: rgba($color-base-red-normal, 0.06);

    #{$c}__subtitle--left-icon {
      fill: #dd2f2f;
    }

    #{$c}__taglist,
    #{$c}__subtitle {
      color: $color-base-red-normal;
    }
  }

  &--redShell {
    color: $color-base-red-normal;

    #{$c}__subtitle--left-icon {
      fill: #dd2f2f;
    }

    #{$c}__description {
      color: $color-base-red-normal;
    }
  }
}
</style>
