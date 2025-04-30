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
        :name="item.subtitleLeftIcon"
        class="c-base-subsection-item__subtitle--left-icon"
        size="14px"
      )

      <!-- Subtitle if restore possible -->

      base-tooltip(
        v-if="item.restoreSubtitle"
        tooltip="Click to reset"
        align="right"
      )
        h3(
          @click="onSubtitleRestoreClick"
          :class=`[
            "c-base-subsection-item__subtitle--text",
            "c-base-subsection-item__subtitle--restore",
            {
              "c-base-subsection-item__subtitle--restore--disabled": item.disabled,
            }
          ]`
        )
          | {{ item.subtitle }}

          base-icon(
            class="c-base-subsection-item__subtitle--right-icon"
            name="restore"
            size="8px"
            fill="#2490f0"
          )

      <!-- Subtitle if NO restore available -->

      h3.c-base-subsection-item__subtitle--text(
        v-else
      )
        | {{ item.subtitle }}

      base-coming-soon(
        v-if="item.disabled"
      )

    p.c-base-subsection-item__description
      | {{ item.description}}

    .c-base-subsection-item__tag(
      v-if="item.tags"
    )
      p
        | {{ item.firstTag + " : "}}

      p(
        v-if="noTags"
      )
        | &nbsp;None

      p(
        v-else
        v-for="(tag, index) in item.tags"
        class="c-base-subsection-item__taglist"
      )
        p
          | {{ item.tags[index] }}

        p.c-base-subsection-item--grey
          | {{ (index<item.tags.length-1) ? ',' : '' }}

  .c-base-subsection-item__right
    <!-- OPTIONAL ELEMENT -->

    p(
      v-if="item.slot === 'text'"
      class="c-base-subsection-item__slot"
    )
      | {{ calculatedValue }}

    base-avatar(
      v-if="item.slot === 'avatar'"
      :avatar-data-64="calculatedValue?.base64"
      :avatar-content-type= "calculatedValue?.type"
      :placeholder-data="avatarName"
      :class=`[
        "c-base-subsection-item__slot",
        "c-base-subsection-item__slot--avatar"
      ]`
      type="image"
      border-radius="20px"
      size="40px"
    )

    <!-- INTERACTIVE ELEMENT -->

    form-toggle(
      v-if="type === 'toggle'"
      v-model="calculatedValue"
      @update:modelValue="onUpdateValue"
      :disabled="item.disabled"
    )

    base-button(
      v-if="type === 'button'"
      @click="$emit('click')"
      :disabled="item.disabled"
      :size="item.typeProps?.size || 'medium'"
      :min-width="item.typeProps?.minWidth"
      :tint="buttonColor"
    )
      | {{item.typeProps?.label}}

    .c-base-subsection-item__select
      form-select(
        v-if="(type === 'select') || type === 'doubleSelect'"
        v-model="calculatedValue"
        @update:modelValue="onUpdateValue"
        :color-preview="colorSquare"
        :disabled="item.disabled"
        :align="item.typeProps?.align"
        :position="item.typeProps?.position"
        :options="item.typeProps?.options"
        :size="item.typeProps?.size || 'mid-medium'"
        :min-width="item.typeProps?.minWidth"
        :search="false"
        position="bottom"
      )

      form-select(
        v-if="type === 'doubleSelect'"
        v-model="stateSecondSelect"
        @update:modelValue="onUpdateExtraSelect"
        :disabled="item.disabled"
        :search="false"
        :size="item.typeProps?.size || 'mid-medium'"
        :min-width="item.typeProps?.minWidth"
        :align="item.typeProps?.align"
        :position="item.typeProps?.position"
        :options="item.typeProps?.secondOptions"
        position="bottom"
        class="c-base-subsection-item__double-select"
      )

      <!-- MODALS -->

      base-modal(
        v-if="isResetModalVisible"
        @close="onClose"
        @confirm="onProceed"
        :visible="resetModalVisibility"
        :title="restoreTitle"
        position="center"
        button-color="red"
        button-label="Reset now"
      )
        p
          | {{ restoreText }}
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
        return [
          "bw",
          "redShell",
          "redBackground",
          "bwPurple",
          "greyBackground"
        ].includes(x);
      }
    },

    index: {
      type: Number,
      default: 0
    },

    slotName: {
      type: Function,

      default: () => {
        return;
      }
    }
  },

  emits: ["update", "click", "showSucess"],

  data() {
    return {
      // --> STATE <--

      state: null,

      stateSecondSelect: null as string | null,

      colorSquare: null as string | null,

      isResetModalVisible: false,
      resetModalVisibility: false
    };
  },

  computed: {
    calculatedValue: {
      get() {
        if (this.type !== "doubleSelect") {
          return this.modelValue;
        } else {
          const valueArray = Object.values(this.modelValue);
          return valueArray[0];
        }
      },

      set() {
        console.log("change Calculated");
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

        case "greyBackground": {
          return "black";
        }

        default: {
          return "white";
        }
      }
    },

    noTags() {
      return !(this.item.tags.length > 0);
    },

    restoreTitle() {
      return "Restore defaults?";
    },

    restoreText() {
      return (
        'Are you sure you want to reset the "' +
        this.item.subtitle.toLowerCase() +
        '" parameter?'
      );
    },

    restoreButton() {
      return "Reset " + this.item.subtitle.toLowerCase() + " configuration";
    },

    avatarName() {
      return this.slotName();
    }
  },

  watch: {
    modelValue: {
      immediate: true,

      handler(newValue) {
        if (this.type !== "doubleSelect") {
          this.changeColorSquare();
        } else {
          const valueArray: string[] = Object.values(newValue);

          this.changeSecondSelectState(valueArray);
        }
      }
    },

    isResetModalVisible(newValue) {
      setTimeout(() => (this.resetModalVisibility = newValue), 10);
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

      this.$emit("showSucess");
    },

    onUpdateExtraSelect(newValue: boolean | string): void {
      this.$emit("update", newValue, this.index, 1);
      this.$emit("showSucess");
    },

    onSubtitleRestoreClick() {
      if (this.item.restoreSubtitle && this.item.restoreAction) {
        this.toggleResetModalVisible();
      }
    },

    // --> HELPERS <--

    changeColorSquare() {
      if (
        typeof this.modelValue === "string" &&
        this.modelValue.startsWith("#")
      ) {
        this.colorSquare = this.modelValue;
      }
    },

    changeSecondSelectState(array: string[]) {
      this.stateSecondSelect = array[1];
    },

    toggleResetModalVisible() {
      this.isResetModalVisible = !this.isResetModalVisible;
    },

    onClose() {
      this.toggleResetModalVisible();
    },

    onProceed() {
      this.item.restoreAction();
      this.toggleResetModalVisible();

      this.$emit("showSucess");
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
  padding-inline: 22px;
  padding-block: 11.5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #{$c}__subtitle {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &--left-icon {
      margin-right: 7.5px;
    }

    &--text {
      margin-block: 0;
      font-size: ($font-size-baseline + 0.5px);
      font-weight: $font-weight-medium;
    }

    &--restore {
      color: $color-base-blue-normal;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }

      &--disabled {
        cursor: not-allowed;
      }
    }

    &--right-icon {
      margin-left: 3.5px;
    }
  }

  #{$c}__left {
    flex: 1 1 auto;
    max-width: 590px;
  }

  #{$c}__description {
    font-weight: $font-weight-light;
    max-width: 580px;
    margin-block: 0;
    margin-inline-end: 10px;
    color: $color-text-secondary;
    font-size: ($font-size-baseline - 0.5px);
  }

  #{$c}__tag {
    margin-top: 7px;
    font-size: ($font-size-baseline - 2px);
    font-weight: $font-weight-light;
    display: flex;
    flex-wrap: wrap;
    color: $color-text-secondary;

    p {
      margin-block: 0;
      white-space: nowrap;
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
    margin-block: 0;
    min-width: 40px;
    text-align: center;
    overflow: clip;

    &--avatar {
      outline: 1px solid $color-border-primary;
      outline-offset: 1px;
      margin-inline-end: 16px;
    }
  }

  #{$c}__right {
    display: flex;
    align-items: center;

    #{$c}__select {
      display: flex;
    }

    #{$c}__double-select {
      margin-inline-start: 3px;
    }
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

  &--greyBackground {
    background-color: rgba($color-base-grey-light, 0.12);
  }

  // --> MEDIA QUERIES <--

  @media (max-width: 922px) {
    #{$c}__right {
      flex-wrap: wrap;
      justify-content: center;
      width: min-content;
    }

    #{$c}__slot {
      margin-inline-end: 0;
      margin-block-end: 10px;
    }
  }

  @media (max-width: 768px) {
    #{$c}__right {
      flex-direction: column;
      align-items: center;

      #{$c}__select {
        flex-direction: column;
        align-items: center;
      }

      #{$c}__double-select {
        margin-inline-start: 0;
        margin-block-start: 3px;
      }
    }
  }
}
</style>
