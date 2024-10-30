<!--
 * This file is part of prose-app-web
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
          }
        ]`
      )

        | {{ item.subtitle }}

        base-icon(
          v-if="item.restoreSubtitle"
          class="c-base-subsection-item__subtitle--right-icon"
          name="restore"
          size="8px"
          fill="#2490f0"
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

  p(
    v-if="item.slot === 'text'"
    class="c-base-subsection-item__slot"
  )
    | {{ item.slotData }}

  base-avatar(
    v-if="item.slot === 'avatar'"
    :avatarDataUrl="item.slotData"
    size="40px"
    borderRadius="20px"
    :class=`[
      "c-base-subsection-item__slot",
      "c-base-subsection-item__slot--avatar"
    ]`
  )

  form-toggle(
    v-if="type === 'toggle'"
    v-model="state"
    @update:modelValue="updateValue"
  )

  base-button(
    v-if="type === 'button'"
    :size="item.typeProps?.size"
    :tint="buttonColor"
    @click="$emit('click')"
  )  
    | {{item.typeProps?.label}}

  form-select(
    v-if="(type === 'select') || type === 'doubleSelect'"
    v-model="state"
    :colorPrev="squareColor"
    :options="item.typeProps?.options"
    position="bottom"
    size="medium"
    :search="false"
    @update:modelValue="updateValue"
  )

  form-select(
    v-if="type === 'doubleSelect'"
    v-model="stateSecondSelect"
    class="c-base-subsection-item__double-select"
    :search="false"
    size="medium"
    :options="item.typeProps?.secondOptions"
    position="bottom"
    @update:modelValue="updateExtraSelect"
  )
    
</template>

<!-- **********************************************************************
       SCRIPT
       ********************************************************************** -->

<script lang="ts">
// PROJECT: COMPONENTS
import BaseAvatar from "@/components/base/BaseAvatar.vue";
import BaseButton from "@/components/base/BaseButton.vue";
import BaseIcon from "@/components/base/BaseIcon.vue";
import FormSelect from "@/components/form/FormSelect.vue";
import FormToggle from "@/components/form/FormToggle.vue";

export default {
  name: "BaseSubsectionItem",

  components: {
    BaseAvatar,
    BaseButton,
    BaseIcon,
    FormSelect,
    FormToggle,
  },

  props: {
    modelValue: {
      type: [String, Boolean, Object],
      default: null
    },

    secondaryData:{
      type: String,
      default: null
    },

    item: {
      type: Object,
      required: true,
    },

    type: {
      type: String,
      required:true,

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

    index:{
      type: Number,
      default: 0
    }
  },

  emits: ["update:modelValue", "click", "updateExtraSelect"],

  data() {
    return {
      // --> STATE <--
      state: null,

      stateSecondSelect: null,

      squareColor: null
    };
  },

  computed: {
    buttonColor() {
      switch (this.color) {
        case 'bw': {
          return 'white';
        }
        case 'bwPurple': {
          return 'purple';
        }
        case 'redBackground': {
          return 'red';
        }
        case 'redShell': {
          return 'red';
        }
        default: {
          return 'white';
        }
      }
    },

  },

  watch: {
    modelValue: {
      immediate: true,

      handler(value) {
        if(this.type !== 'doubleSelect') {
          this.state = value;
        } else {
          this.state = Object.values(value)[0];
          this.stateSecondSelect = Object.values(value)[1];
        }

        if(typeof value === 'string') {
          const normalValue = value.toLowerCase();
          switch (normalValue) {
            case 'medium blue':
              return this.squareColor = '#2490F0';
            case 'dark blue':
              return this.squareColor = '#1C293B';
            default:
              return null;
          }
        }
      }
    },

  },

  created() {},

  methods: {
    // --> HELPERS <--
    updateValue(newValue: boolean | string): void {

      if(this.type === 'doubleSelect'){
        this.$emit("update:modelValue", newValue, this.index, 0);
      } else {
        this.$emit("update:modelValue", newValue, this.index);
      }

    },

    updateExtraSelect(newValue: boolean | string): void {
      this.$emit("update:modelValue", newValue, this.index, 1);
    }
  }, 
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
  font-family: $font-family-default;
  padding-inline: 22px;
  padding-block: 11.5px;

  #{$c}__left {
    width: 100%;
  }

  #{$c}__subtitle {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    &--left-icon {
      margin-right: 7.5px;
    }

    &--text{
      margin: 0;
      font-size: ($font-size-baseline + 0.5px);
      font-weight: $font-weight-mid;
    }

    &--restore {
      color:$color-base-blue-normal;
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
    font-size: ($font-size-baseline - 1px);
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
    margin-inline-end: 20px;

    &--avatar{
      outline: 1px solid $color-border-primary;
      outline-offset: 1px;
    }
  }  

  #{$c}__double-select {
    margin-inline-start: 3px;
  }

  // <!-- SIMPLE COLORS -->
  &--grey{
    color: $color-text-secondary;
  }

  // <!-- THEME COLORS -->
  &--bw {
    #{$c}__taglist{
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
